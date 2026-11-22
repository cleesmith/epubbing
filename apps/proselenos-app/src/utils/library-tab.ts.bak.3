import { appPath } from './app-path';
import Swal from 'sweetalert2';

export const LIBRARY_TAB_NAME = 'proselenos_library_mode';
export const PUBLISH_CONFIRMATION = 'Saved to your Library. Opening your book for reading.';
let libraryTab: Window | null = null;

export function isLibraryTab(tab: Window | null): tab is Window {
  if (!tab || tab.closed || tab === window) return false;
  try {
    const url = new URL(appPath('/library/'), window.location.href);
    return tab.location.origin === url.origin &&
      tab.location.pathname.replace(/\/$/, '') === url.pathname.replace(/\/$/, '');
  } catch {
    return false;
  }
}

export function findLibraryTab(): Window | null {
  if (isLibraryTab(window.opener)) return window.opener;
  return isLibraryTab(libraryTab) ? libraryTab : null;
}

export function openLibraryTab(): void {
  const existing = findLibraryTab();
  if (existing) {
    existing.location.reload();
    existing.focus();
    return;
  }
  libraryTab = window.open(appPath('/library/'), LIBRARY_TAB_NAME);
  if (!libraryTab) window.location.assign(appPath('/library/'));
}

/** Reserve during the Publish click, before any await or timer can block a new tab. */
export function reserveLibraryReview(isDarkMode: boolean) {
  const tab = findLibraryTab() || window.open('', LIBRARY_TAB_NAME);
  libraryTab = tab;
  let placeholder = false;
  try { placeholder = !!tab && tab.location.href === 'about:blank'; } catch { /* Not our page. */ }

  const showStatus = (message: string) => {
    if (!placeholder || !tab || tab.closed) return;
    const doc = tab.document;
    doc.title = 'Library — EverythingEbooks';
    doc.body.replaceChildren();
    doc.body.style.cssText = `margin:0;min-height:100vh;display:grid;place-items:center;background:${isDarkMode ? '#191919' : '#f3f3f3'};color:${isDarkMode ? '#fff' : '#222'};font:24px system-ui,sans-serif;`;
    const status = doc.createElement('div');
    status.setAttribute('role', 'status');
    status.style.cssText = `padding:48px;border-radius:12px;background:${isDarkMode ? '#222' : '#fff'};text-align:center;`;
    status.textContent = message;
    doc.body.appendChild(status);
  };
  showStatus('Saving your ebook…');
  // Browsers decide whether focus may return to Authors. Keep the confirmation
  // identical in the reserved tab as well, in case it remains in the foreground.
  if (placeholder) window.focus();

  const mirrorConfirmation = (confirmation: HTMLElement | null) => {
    if (!placeholder || !tab || tab.closed || !confirmation) return;
    const doc = tab.document;
    // Copy the actual Authors popup and its already-loaded styles. Do not
    // maintain a second version of the success message, icon or layout.
    const base = doc.createElement('base');
    base.href = document.baseURI;
    doc.head.appendChild(base);
    for (const sheet of Array.from(document.styleSheets)) {
      try {
        const style = doc.createElement('style');
        // EE's styles are same-origin. Inline the loaded rules so this popup
        // does not need to fetch stylesheets again, including when offline.
        style.textContent = Array.from(sheet.cssRules, rule => rule.cssText).join('\n');
        doc.head.appendChild(style);
      } catch {
        // An extension's protected stylesheet must not interrupt publication.
      }
    }
    doc.documentElement.className = document.documentElement.className;
    doc.documentElement.style.fontSize = getComputedStyle(document.documentElement).fontSize;
    doc.body.className = document.body.className;
    doc.body.style.cssText = `margin:0;background:${isDarkMode ? '#191919' : '#f3f3f3'};`;
    doc.body.style.fontFamily = getComputedStyle(document.body).fontFamily;
    const copy = confirmation.cloneNode(true) as HTMLElement;
    // SweetAlert briefly keeps its popup transparent before its opening
    // animation. The copied popup has no SweetAlert instance to finish that step.
    const popup = copy.querySelector<HTMLElement>('.swal2-popup');
    popup?.style.removeProperty('opacity');
    popup?.classList.add('swal2-show');
    doc.body.replaceChildren(copy);
  };

  return {
    // Own the wording, timing and both displays together. Authors must not
    // create a separate success popup with its own message or timer.
    confirmPublished: () => Swal.fire({
      title: PUBLISH_CONFIRMATION,
      icon: 'success',
      showConfirmButton: false,
      timer: 3000,
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => mirrorConfirmation(Swal.getContainer()),
      background: isDarkMode ? '#222' : '#fff',
      color: isDarkMode ? '#fff' : '#333',
      customClass: { container: 'swal-above-modal' },
    }),
    open: (fragment: string) => {
      const url = appPath('/library/') + fragment;
      if (!tab || tab.closed) {
        // A blocked/closed review tab must not turn Publish into a dead button.
        window.location.assign(url);
        return;
      }
      const needsReload = isLibraryTab(tab);
      tab.location.href = url;
      // A fragment change alone would leave an existing Library's old reader mounted.
      // Reload the ordinary cached URL, never a cache-busting query string.
      if (needsReload) tab.location.reload();
      tab.focus();
    },
    cancel: () => {
      if (placeholder && tab && !tab.closed) tab.close();
    },
  };
}
