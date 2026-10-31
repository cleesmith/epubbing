import Swal from 'sweetalert2';
import { REVIEW_LABELS, type AuthorsReview, type ReviewReport } from './text-review';

// Static shell only. Manuscript strings are always inserted with textContent,
// never HTML. No remote assets, stored results, routes, or downloaded reports.
const SHELL = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; img-src 'none'; base-uri 'none'; form-action 'none'">
<title>Review text — EverythingEbooks</title><style>
:root { color-scheme: light; --bg:#f4f4f5; --panel:#fff; --text:#202024; --muted:#5b5b65; --border:#d6d6dc; --accent:#4943ad; --mark:#fff0b4; }
:root.dark { color-scheme: dark; --bg:#18181b; --panel:#232327; --text:#ededf0; --muted:#b7b7c1; --border:#45454d; --accent:#b7b1ff; --mark:#624b12; }
* { box-sizing:border-box; } body { margin:0; background:var(--bg); color:var(--text); font:16px/1.55 system-ui,sans-serif; }
main { max-width:1040px; margin:0 auto; padding:28px 24px 60px; }
header { display:flex; gap:20px; align-items:start; justify-content:space-between; } h1 { font-size:29px; margin:0; } h2 { font-size:20px; margin:0 0 12px; } h3 { font-size:17px; margin:0 0 4px; }
p { margin:8px 0; } .muted { color:var(--muted); } #scope { font-size:19px; overflow-wrap:anywhere; }
button { cursor:pointer; font:inherit; border:1px solid var(--border); color:var(--text); background:var(--panel); border-radius:8px; padding:7px 14px; white-space:nowrap; } button:focus-visible { outline:3px solid var(--accent); outline-offset:3px; }
.actions { display:flex; gap:8px; flex-wrap:wrap; } dialog { width:min(850px,calc(100vw - 32px)); max-height:85vh; overflow:auto; padding:24px; color:var(--text); background:var(--panel); border:1px solid var(--border); border-radius:12px; } dialog::backdrop { background:#0009; } dialog header { margin-bottom:18px; }
.panel { margin-top:20px; padding:20px; border:1px solid var(--border); background:var(--panel); border-radius:10px; }
dl { display:grid; grid-template-columns:180px 1fr; gap:12px 20px; margin:0; } dt { font-weight:650; } dd { margin:0; } .notice { margin:16px 0 0; padding-top:14px; border-top:1px solid var(--border); }
#status { color:var(--accent); font-weight:600; }
.finding { padding-top:20px; margin-top:20px; border-top:1px solid var(--border); overflow-wrap:anywhere; } .category { color:var(--accent); font-size:13px; font-weight:650; letter-spacing:.02em; }
blockquote { margin:12px 0; padding:10px 14px; border-left:3px solid var(--border); } mark { color:inherit; background:var(--mark); padding:1px 2px; } .count { font-size:14px; color:var(--muted); }
@media(max-width:620px) { main { padding:20px 14px; } dl { grid-template-columns:1fr; gap:3px; } dd { margin-bottom:14px; } header { flex-wrap:wrap; } }
</style></head><body><main id="ee-text-review"><header><div><h1>Review text</h1><p id="scope"></p></div><div class="actions"><button id="explain" type="button" aria-haspopup="dialog">What is checked?</button></div></header>
<dialog id="explanation" aria-labelledby="checks-heading"><header><h2 id="checks-heading">What this review checks</h2><button id="close-explanation" type="button">Close</button></header>
<dl>
<dt>Unusual characters</dt><dd>Looks for the replacement character �, unexpected control characters, and common damaged character sequences such as Ã©. Accented letters, other languages, and emoji are not errors by themselves.</dd>
<dt>Different accents</dt><dd>Compares words using the Latin alphabet that differ only in accents, such as café / cafe or José / Jose. Both forms must appear in the open section. Capitals and lowercase are treated alike. Names and differences between languages may be intentional.</dd>
<dt>Different hyphenation</dt><dd>Compares joined and hyphenated forms, such as goodbye / good-bye, and different hyphen characters. Both forms must appear in the open section. It does not compare separate words such as “some one” with “someone.”</dd>
<dt>Internal links</dt><dd>Checks links that start in the open section, including notes and return links. If a link points to a named place in another section, the review looks there for that destination. For linked images and audio, it checks that the file exists. It does not open websites, check email links, or judge whether a link leads to the place you intended.</dd>
</dl>
<p class="notice">All four checks run every time. There is no dictionary, spelling or grammar check, AI review, or quotation-style check. Nothing is corrected or changed.</p>
<p class="muted">The review reads the open chapter or section, including its notes, captions, and unsaved text. It does not review book information fields, image descriptions, or words drawn inside pictures. Each finding shows up to eight excerpts per section; the full occurrence count is always shown.</p>
<p class="muted">When the open section is clear, EE looks ahead and lists up to three later sections with findings, in reading order.</p>
<p class="muted">Results are temporary. They are not saved in your book or stored by EE. Closing this tab discards them. All checks run on your device and work offline.</p>
</dialog>
<section class="panel" aria-label="Review results"><p id="status"></p><p id="stamp" class="muted"></p></section>
<p class="muted">Click Review text in Authors to review the open section again.</p>
<div id="results"></div></main></body></html>`;

function openFindingsTab(report: ReviewReport, previous: Window | null, isDarkMode: boolean, sectionTitle: string, bookTitle: string): Window | null {
  let tab: Window | null = null;
  try {
    if (previous && !previous.closed && previous.document.getElementById('ee-text-review')) tab = previous;
  } catch {
    // The author navigated the old tab to another site. Leave it alone.
  }
  if (!tab) tab = window.open('', '_blank');
  if (!tab) return null;
  const doc = tab.document;
  doc.open();
  doc.write(SHELL);
  doc.close();
  doc.documentElement.classList.toggle('dark', isDarkMode);
  const label = sectionTitle || 'Untitled section';
  doc.title = `Review text — ${label}`;
  doc.getElementById('scope')!.textContent = bookTitle ? `${label} · ${bookTitle}` : label;
  const explanation = doc.getElementById('explanation') as HTMLDialogElement;
  doc.getElementById('explain')!.addEventListener('click', () => explanation.showModal());
  doc.getElementById('close-explanation')!.addEventListener('click', () => explanation.close());
  tab.focus();
  const node = <K extends keyof HTMLElementTagNameMap>(tag: K, text: string, className?: string) => {
    const element = doc.createElement(tag);
    element.textContent = text;
    if (className) element.className = className;
    return element;
  };
  const count = report.findings.length;
  doc.getElementById('status')!.textContent = `${count.toLocaleString()} ${count === 1 ? 'finding' : 'findings'} in this section.`;
  doc.getElementById('stamp')!.textContent = `Checked ${new Date(report.checkedAt).toLocaleString()} · ${report.internalLinksChecked.toLocaleString()} internal ${report.internalLinksChecked === 1 ? 'link' : 'links'}${report.includesUnsavedChanges ? ' · Includes unsaved changes' : ''}`;
  const results = doc.getElementById('results')!;
  results.replaceChildren();
  for (const finding of report.findings) {
    const article = doc.createElement('article');
    article.className = 'panel finding';
    article.append(node('p', REVIEW_LABELS[finding.category], 'category'), node('h3', finding.label), node('p', finding.explanation));
    article.append(node('p', `${finding.count.toLocaleString()} ${finding.count === 1 ? 'occurrence' : 'occurrences'} in this section${finding.count > finding.examples.length ? ` · Showing the first ${finding.examples.length}; use Find in Authors to see the others.` : ''}`, 'count'));
    for (const example of finding.examples) {
      const passage = doc.createElement('blockquote');
      passage.append(doc.createTextNode(example.before), node('mark', example.match), doc.createTextNode(example.after));
      article.append(passage);
    }
    results.append(article);
  }
  return tab;
}

export async function showTextReviewResult(
  report: AuthorsReview, previous: Window | null, isDarkMode: boolean, sectionTitle: string, bookTitle: string,
): Promise<Window | null> {
  const popup = {
    titleText: 'Review text',
    background: isDarkMode ? '#222' : '#fff',
    color: isDarkMode ? '#fff' : '#333',
    confirmButtonColor: '#3085d6',
    allowOutsideClick: true,
  };
  if (report.findings.length === 0) {
    const titles = report.nextSectionsWithFindings;
    if (titles.length === 0) {
      void Swal.fire({ ...popup, text: 'No findings in this section or any later section.', confirmButtonText: 'OK' });
      return previous;
    }
    const content = document.createElement('div');
    const message = document.createElement('p');
    message.textContent = 'No findings in this section.';
    const heading = document.createElement('strong');
    heading.textContent = titles.length === 1 ? 'Next section to review' : 'Next sections to review';
    const list = document.createElement('ul');
    list.setAttribute('aria-label', 'Next sections to review, in reading order');
    list.tabIndex = 0;
    Object.assign(list.style, {
      textAlign: 'left', listStyle: 'disc', paddingInlineStart: '1.6rem',
      maxHeight: 'min(35vh, 16rem)', overflowY: 'auto', overflowWrap: 'anywhere',
      margin: '0.5rem 0 1rem',
    });
    for (const title of titles) {
      const entry = document.createElement('li');
      entry.textContent = title;
      list.append(entry);
    }
    const hint = document.createElement('p');
    hint.textContent = 'Open a listed section in Authors and click Review text for details.';
    content.append(message, heading, list, hint);
    void Swal.fire({ ...popup, html: content, confirmButtonText: 'OK' });
    return previous;
  }

  const open = () => openFindingsTab(report, previous, isDarkMode, sectionTitle, bookTitle);
  let tab = open();
  if (!tab) {
    // Some browsers require another click to open a tab after an asynchronous review.
    await Swal.fire({
      ...popup,
      text: 'Your findings are ready.',
      confirmButtonText: 'Open report',
      showCancelButton: true,
      preConfirm: () => {
        tab = open();
        if (!tab) Swal.showValidationMessage('Allow a new tab for EverythingEbooks, then click Open report.');
        return !!tab;
      },
    });
  }
  return tab || previous;
}
