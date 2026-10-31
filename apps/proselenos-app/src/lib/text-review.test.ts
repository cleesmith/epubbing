import { afterEach, describe, expect, it, vi } from 'vitest';
import { reviewForAuthors, reviewText, snapshotForTextReview, type ReviewSection } from './text-review';
import { showTextReviewResult } from './text-review-tab';
import Swal from 'sweetalert2';

const snapshot = (texts: string[], selectedIndex = 0) => {
  const sections = texts.map((xhtml, i) => ({ id: `chapter-${i + 1}`, title: `Chapter ${i + 1}`, xhtml }));
  return snapshotForTextReview(sections[selectedIndex]!, sections, null, '', [], []);
};

const findings = (report: Awaited<ReturnType<typeof reviewText>>) => report.findings;
afterEach(() => vi.restoreAllMocks());

describe('read-only section review', () => {
  it('reports only occurrences from the selected section, even when other sections contain different spellings and damaged text', async () => {
    const input = snapshot([
      '<p>Café cafe\u0301 goodbye. Blorple and José.</p><p>cafe good-bye.</p>',
      '<p>CAFÉ cafe good\u2011bye. Jose. 日本語 سلام 😀 �</p>',
    ]);
    const before = JSON.stringify(input);
    const report = await reviewText(input, () => {});
    expect(findings(report).filter(item => item.category === 'accents').map(item => item.label)).toEqual(['café / cafe']);
    expect(findings(report).filter(item => item.category === 'hyphens')).toHaveLength(1);
    expect(findings(report).some(item => item.category === 'characters')).toBe(false);
    expect(JSON.stringify(input)).toBe(before);
    expect(findings(await reviewText(snapshot(['<p>cafe goodbye �</p>', '<p>Café CAFÉ cafe\u0301 Blorple good-bye</p>'], 1), () => {}))).toEqual([]);
  });

  it('keeps inline words together, separates blocks, and finds damaged text rather than markup', async () => {
    const report = await reviewText(snapshot(['<p>caf<em>é</em></p><p>cafe</p><p>It is � and Ã© here.</p><script>good-bye</script><style>goodbye</style><img src="good-bye" alt="goodbye"/>']), () => {});
    expect(findings(report).filter(item => item.category === 'accents')).toHaveLength(1);
    expect(findings(report).filter(item => item.category === 'characters')).toHaveLength(2);
    expect(findings(report).filter(item => item.category === 'hyphens')).toHaveLength(0);
  });

  it('checks renamed files, encoded anchors, note returns, No Matter sections, and media without fetching', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network must not be used'));
    const sections: ReviewSection[] = [
      { id: 'chapter-1', title: 'Chapter 1', sourceHref: 'text/old.xhtml', xhtml: '<p id="return"><a href="../notes/end.xhtml#n%C3%A9">Note</a> <a href="chapter-2.xhtml#present">Current filename</a> <a href="#return">Local</a> <a href="../images/plate.jpg">Picture</a> <a href="https://example.org/#missing">Website</a> <a href="mailto:writer@example.org">Email</a> <a href="../notes/end.xhtml#absent">Missing note</a> <a href="missing.xhtml">Missing chapter</a> <a href="nav.xhtml#toc">Contents</a></p>' },
      { id: 'notes', title: 'Notes', type: 'no-matter', sourceHref: 'notes/end.xhtml', xhtml: '<p id="né">� cafe good-bye in a note. <a href="../text/old.xhtml#return">Back</a><a href="missing-note.xhtml">Unrelated broken link</a></p>' },
      { id: 'chapter-2', title: 'Chapter 2', xhtml: '<p id="present">Next chapter.</p>' },
      { id: 'unrelated', title: 'Unrelated section', get xhtml(): string { throw new Error('Unlinked section text was read'); } },
    ];
    const input = snapshotForTextReview(sections[0]!, sections, null, '', ['plate.jpg'], []);
    const report = await reviewForAuthors(input, () => {});
    expect(report.nextSectionsWithFindings).toEqual([]);
    const broken = findings(report).filter(item => item.category === 'links');
    expect(broken.map(item => item.label)).toEqual(['Missing note', 'Missing chapter']);
    expect(report.findings).toHaveLength(2);
    expect(report.internalLinksChecked).toBe(7);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('includes unsaved edits only in the snapshot, without saving or replacing original XHTML', async () => {
    const sections = [
      { id: 'first', title: 'First', xhtml: '<p>Another section. �</p>' },
      { id: 'second', title: 'Second', xhtml: '<p>Saved café.</p>' },
    ];
    const before = JSON.stringify(sections);
    const copy = snapshotForTextReview(sections[1]!, sections, '<p>Edited café cafe.</p>', 'New title', [], []);
    expect(copy.includesUnsavedChanges).toBe(true);
    expect(copy.section.title).toBe('New title');
    expect(findings(await reviewText(copy, () => {}))).toHaveLength(1);
    const empty = snapshotForTextReview(sections[1]!, sections, '', '', [], []);
    expect(empty.section.xhtml).toBe('');
    expect(findings(await reviewText(empty, () => {}))).toEqual([]);
    expect(JSON.stringify(sections)).toBe(before);
  });

  it('runs every check, counts all occurrences, and makes cancellation explicit', async () => {
    const progress: string[] = [];
    const report = await reviewText(snapshot([`<p>${'café cafe '.repeat(12)}</p>`]), message => progress.push(message));
    expect(findings(report)[0]!.count).toBe(24);
    expect(findings(report)[0]!.examples).toHaveLength(8);
    for (const phrase of ['unusual characters', 'different accents', 'different hyphenation', 'links from']) expect(progress.some(message => message.includes(phrase))).toBe(true);
    const controller = new AbortController();
    controller.abort();
    await expect(reviewText(snapshot(['<p>Words.</p>']), () => {}, controller.signal)).rejects.toMatchObject({ name: 'AbortError' });
  });
});

describe('next sections to review', () => {
  it('skips earlier and clear sections and stops reading at the third match, using current unsaved text', async () => {
    const sections: ReviewSection[] = [
      { id: 'earlier', title: 'Earlier', get xhtml(): string { throw new Error('Read an earlier section'); } },
      { id: 'opening', title: 'Opening', xhtml: '<p>Previously damaged �</p>' },
      { id: 'characters', title: 'Broken character', xhtml: '<p>Damaged �</p>' },
      { id: 'good', title: 'Good link', xhtml: '<p>goodbye cafe</p><a href="opening.xhtml#current">Opening</a>' },
      { id: 'accents', title: 'Notes', xhtml: '<p>Café cafe</p>' },
      { id: 'also-good', title: 'Also good', xhtml: '<p>good-bye café</p>' },
      { id: 'hyphens', title: 'Notes', xhtml: '<p>Goodbye good-bye</p>' },
      { id: 'beyond', title: 'Beyond', get xhtml(): string { throw new Error('Read beyond the third match'); } },
    ];
    const input = snapshotForTextReview(sections[1]!, sections, '<p id="current">Opening</p>', '', [], []);
    const report = await reviewForAuthors(input, () => {});
    expect(report.findings).toHaveLength(0);
    expect(report.nextSectionsWithFindings).toEqual([
      'Broken character', 'Section 5 · Notes', 'Section 7 · Notes',
    ]);
    expect(sections[1]!.xhtml).toContain('�');
  });

  it('reports a later section with just a broken link and ends at the last section without wrapping', async () => {
    const input = snapshot(['<p>�</p>', '<p>Clean</p>', '<a href="#absent">Note</a>', '<p>End</p>'], 1);
    input.linkDestinations[2]!.title = '';
    const report = await reviewForAuthors(input, () => {});
    expect(report.nextSectionsWithFindings).toEqual(['Section 3 · Untitled']);
    const last = await reviewForAuthors({ ...input, section: input.linkDestinations[3]! }, () => {});
    expect(last.nextSectionsWithFindings).toEqual([]);
  });

  it('cancels an overview instead of publishing a partial list', async () => {
    const controller = new AbortController();
    const input = snapshot(['<p>Clean</p>', '<p>�</p>', '<p>café cafe</p>']);
    await expect(reviewForAuthors(input, message => {
      if (message.includes('2 of 2')) controller.abort();
    }, controller.signal)).rejects.toMatchObject({ name: 'AbortError' });
  });
});

describe('temporary review tab', () => {
  function fakeTab() {
    return { document: document.implementation.createHTMLDocument(), closed: false, focus: vi.fn() } as unknown as Window;
  }

  it('opens and reuses one tab, explains checks in a popup, and renders manuscript strings safely', async () => {
    const tab = fakeTab();
    const open = vi.spyOn(window, 'open').mockReturnValue(tab);
    const report = await reviewForAuthors(snapshot(['<p>café cafe &lt;script&gt;unsafe&lt;/script&gt;</p>']), () => {});
    const first = await showTextReviewResult(report, null, false, '<img src=x onerror=alert(1)>', 'Book');
    expect(tab.document.getElementById('scope')!.textContent).toContain('<img');
    expect(tab.document.getElementById('scope')!.children.length).toBe(0);
    const dialog = tab.document.getElementById('explanation') as HTMLDialogElement;
    dialog.showModal = vi.fn(() => dialog.setAttribute('open', ''));
    dialog.close = vi.fn(() => dialog.removeAttribute('open'));
    expect(dialog.hasAttribute('open')).toBe(false);
    tab.document.getElementById('explain')!.click();
    expect(dialog.hasAttribute('open')).toBe(true);
    expect(dialog.textContent).toContain('no dictionary');
    tab.document.getElementById('close-explanation')!.click();
    expect(dialog.hasAttribute('open')).toBe(false);
    expect(tab.document.getElementById('results')!.textContent).toContain('<script>unsafe</script>');
    expect(tab.document.querySelectorAll('script, img, iframe, link')).toHaveLength(0);
    expect(tab.document.querySelectorAll('a[download]')).toHaveLength(0);
    const next = await reviewForAuthors(snapshot(['<p>goodbye good-bye</p>']), () => {});
    const second = await showTextReviewResult(next, first, true, 'Next chapter', 'Book');
    expect(second).toBe(first);
    expect(open).toHaveBeenCalledTimes(1);
    expect(tab.document.title).toBe('Review text — Next chapter');
    expect(tab.document.getElementById('results')!.textContent).toContain('goodbye');
    expect(tab.document.getElementById('results')!.textContent).not.toContain('unsafe');
    expect(tab.document.documentElement.classList.contains('dark')).toBe(true);
  });

  it.each(['OK', 'outside'])('keeps an empty review in Authors and dismisses it with %s', async dismissal => {
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    const open = vi.spyOn(window, 'open');
    const previous = dismissal === 'outside' ? fakeTab() : null;
    if (previous) previous.document.body.textContent = 'Earlier report';
    const input = snapshot(['<p>A clean section.</p>', ...Array.from({ length: dismissal === 'outside' ? 10 : 0 }, () => '<p>�</p>')]);
    if (dismissal === 'outside') input.linkDestinations[1]!.title = '<img src=x>';
    const report = await reviewForAuthors(input, () => {});
    expect(await showTextReviewResult(report, previous, false, 'Chapter', 'Book')).toBe(previous);
    const content = Swal.getHtmlContainer()!;
    if (dismissal === 'outside') {
      expect(content.textContent).toContain('No findings in this section.');
      expect(content.querySelectorAll('li')).toHaveLength(3);
      expect(content.querySelector('li')?.textContent).toBe('<img src=x>');
      expect(content.querySelector('img')).toBeNull();
      expect(content.querySelector('li:last-child')?.textContent).toBe('Chapter 4');
    } else {
      expect(content.textContent).toBe('No findings in this section or any later section.');
    }
    expect(Swal.getConfirmButton()?.textContent).toBe('OK');
    expect(open).not.toHaveBeenCalled();
    if (previous) {
      expect(previous.focus).not.toHaveBeenCalled();
      expect(previous.document.body.textContent).toBe('Earlier report');
    }
    if (dismissal === 'OK') Swal.clickConfirm();
    else Swal.getContainer()!.click();
    await vi.waitFor(() => expect(Swal.getPopup()).toBeNull());
  });

  it('opens the completed report on request if the browser initially blocks the tab', async () => {
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    const replacement = fakeTab();
    const open = vi.spyOn(window, 'open').mockReturnValueOnce(null).mockReturnValue(replacement);
    const report = await reviewForAuthors(snapshot(['<p>café cafe</p>']), () => {});
    const shown = showTextReviewResult(report, null, false, 'Chapter', 'Book');
    expect(Swal.getConfirmButton()?.textContent).toBe('Open report');
    Swal.clickConfirm();
    expect(await shown).toBe(replacement);
    expect(open).toHaveBeenCalledTimes(2);
    expect(replacement.document.getElementById('results')?.textContent).toContain('café');
  });

  it('leaves closed or navigated-away tabs alone', async () => {
    const replacement = fakeTab();
    vi.spyOn(window, 'open').mockReturnValue(replacement);
    const report = await reviewForAuthors(snapshot(['<p>café cafe</p>']), () => {});
    const old = fakeTab();
    old.document.body.textContent = 'Another page';
    expect(await showTextReviewResult(report, old, false, 'Chapter', 'Book')).toBe(replacement);
    expect(old.document.body.textContent).toBe('Another page');
    Object.defineProperty(old, 'closed', { value: true });
    expect(await showTextReviewResult(report, old, false, 'Chapter', 'Book')).toBe(replacement);
  });
});
