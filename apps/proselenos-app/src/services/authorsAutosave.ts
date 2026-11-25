import { saveSectionEdits, saveTitlePageMetadata } from './manuscriptStorage';
import type { TitlePageFields } from '@/lib/title-page-fields';

export type AuthorsEdit =
  | { kind: 'section'; id: string; fields: { title?: string; xhtml?: string } }
  | { kind: 'title-page'; id: string; fields: TitlePageFields };

export type AutosaveState = { pending: boolean; error: string | null };

async function persist(edit: AuthorsEdit): Promise<void> {
  if (edit.kind === 'title-page') await saveTitlePageMetadata(edit.id, edit.fields);
  else await saveSectionEdits(edit.id, edit.fields);
}

/** One writer; edits arriving during a write remain pending until committed.
 * No debounce, polling, EPUB generation, or editor updates on completion.
 * Only superseded snapshots of the SAME section are combined, including both
 * its heading and text. In-flight snapshots are immutable.
 */
export class AuthorsAutosave {
  private pending = new Map<string, AuthorsEdit>();
  private running: Promise<void> | null = null;
  private state: AutosaveState = { pending: false, error: null };
  private listeners = new Set<() => void>();

  constructor(private write: (edit: AuthorsEdit) => Promise<void> = persist) {}

  getSnapshot = (): AutosaveState => this.state;
  subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener);
    return () => { this.listeners.delete(listener); };
  };

  private notify(error: string | null = null) {
    const pending = this.pending.size > 0;
    if (pending === this.state.pending && error === this.state.error) return;
    this.state = { pending, error };
    this.listeners.forEach(listener => listener());
  }

  enqueue(edit: AuthorsEdit): void {
    const key = `${edit.kind}:${edit.id}`;
    const previous = this.pending.get(key);
    const next = { ...edit, fields: { ...previous?.fields, ...edit.fields } } as AuthorsEdit;
    this.pending.set(key, next);
    this.notify();
    this.start();
  }

  private start(): void {
    if (this.running || !this.pending.size) return;
    this.notify();
    // Install the promise before calling storage, including synchronous throws.
    this.running = Promise.resolve().then(async () => {
      while (this.pending.size) {
        const [key, edit] = this.pending.entries().next().value!;
        try {
          await this.write(edit);
        } catch (error) {
          this.notify(error instanceof Error ? error.message : 'Browser storage could not save your changes.');
          return; // Keep the latest edits for Retry or the next edit.
        }
        if (this.pending.get(key) === edit) this.pending.delete(key);
        this.notify();
      }
    }).finally(() => {
      this.running = null;
      // An edit can arrive between the last write and this microtask.
      if (this.pending.size && !this.state.error) this.start();
    });
  }

  /** Wait for ALL writes, including typing that arrives while waiting. */
  async flush(): Promise<void> {
    this.start();
    while (this.running) await this.running;
    if (this.pending.size) throw new Error(this.state.error || 'Changes have not been saved yet.');
  }
}
