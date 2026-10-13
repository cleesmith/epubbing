import type { SceneCraftConfig } from '@/services/manuscriptStorage';

const hasFilename = (value: unknown): boolean =>
  typeof value === 'string' && value.trim().length > 0;

/** Only associations in this chapter count, never the shared audio library. */
export function hasSceneCraftAudio(config?: SceneCraftConfig | null): boolean {
  if (!config) return false;
  return hasFilename(config.ambientFilename) ||
    [config.dialogueClips, config.stickyClips, config.paraClips].some((clips) =>
      Object.values(clips ?? {}).some((clip) => hasFilename(clip?.filename))
    );
}

/** Inspect the live document, including unsaved insertions and nested blocks. */
export function hasAudioNodes(nodes: readonly unknown[]): boolean {
  return nodes.some((node) => {
    if (!node || typeof node !== 'object') return false;
    const value = node as Record<string, unknown>;
    if (value.type === 'audio' || value.vnType === 'scene_audio') return true;
    return Array.isArray(value.children) && hasAudioNodes(value.children);
  });
}

/** Used before the editor has loaded the chapter's nodes. */
export function hasAudioMarkup(xhtml: string): boolean {
  // Ignore comments; escaped prose such as &lt;audio&gt; is not an audio element.
  const markup = xhtml.replace(/<!--[\s\S]*?-->/g, '');
  return /<(?:[\w-]+:)?audio(?=[\s/>])/i.test(markup);
}
