import { appPath } from './app-path';

export const AUTHORS_TAB_NAME = 'proselenos_authors_mode';

export function openAuthorsTab(): void {
  const authorsUrl = new URL(appPath('/authors/'), window.location.href);
  // A named tab survives Library reloads. An empty URL finds it without
  // navigating it, preserving the editor and any unsaved writing.
  const tab = window.open('', AUTHORS_TAB_NAME);
  if (!tab) {
    window.location.assign(authorsUrl.href);
    return;
  }

  let alreadyAuthors = false;
  try {
    alreadyAuthors = tab.location.origin === authorsUrl.origin &&
      tab.location.pathname.replace(/\/$/, '') === authorsUrl.pathname.replace(/\/$/, '');
  } catch {
    // A previously named tab may have navigated to another website.
  }
  if (!alreadyAuthors) tab.location.href = authorsUrl.href;
  tab.focus();
}
