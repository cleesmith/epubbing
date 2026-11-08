export interface TitlePageFields {
  title: string;
  author: string;
  subtitle?: string;
  publisher?: string;
}

const escape = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** The author's explicit Save replaces the title page with EE's four fields. */
export function createSavedTitlePage(fields: TitlePageFields): string {
  const subtitle = fields.subtitle ? `\n  <p class="book-subtitle">${escape(fields.subtitle)}</p>` : '';
  return `<section xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" class="title-page" epub:type="titlepage">
  <h1 class="book-title">${escape((fields.title || 'Untitled').toUpperCase())}</h1>${subtitle}
  <p class="book-author">${escape(fields.author || 'Unknown Author')}</p>
  <p class="book-publisher">${escape(fields.publisher || 'Independent Publisher')}</p>
</section>`;
}
