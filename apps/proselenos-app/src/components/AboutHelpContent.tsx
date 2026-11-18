import type { ReactNode } from 'react';

function HelpSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className='space-y-2'>
      <h3 className='text-lg font-semibold'>{title}</h3>
      {children}
    </section>
  );
}

// Library About and its welcome window share this guide. Both About pages
// also use the same backup and offline instructions.
export default function AboutHelpContent({ page }: { page: 'authors' | 'library' }) {
  return (
    <div className='w-full space-y-6 text-left text-sm leading-relaxed'>
      {page === 'authors' ? (
        <>
          <HelpSection title='Start your book in Authors'>
            <p>Your ebook is your manuscript. EverythingEbooks opens in Authors, where you write, edit, and organize your book in EPUB form.</p>
            <p>Use Open to choose:</p>
            <ul className='list-disc space-y-1 pl-5'>
              <li><strong>New</strong> — start a new ebook.</li>
              <li><strong>Load EPUB</strong> — open an .epub file from your device.</li>
              <li><strong>Load from Library</strong> — work on a book already in your EE Library.</li>
              <li><strong>Load DOCX → EPUB</strong> — bring in a Word document.</li>
              <li><strong>Load PDF → EPUB</strong> — bring in text from a PDF.</li>
              <li><strong>Load manuscript.txt → EPUB</strong> — bring in a plain-text manuscript.</li>
            </ul>
          </HelpSection>

          <HelpSection title='Write, organize, and save'>
            <p>Select the Title Page or a section in the sidebar to edit it. Use the sidebar to add and arrange sections.</p>
            <p>The full editor provides formatting and images. Writing mode gives you distraction-free writing for the current chapter or section; press Escape to return. Sections with attached audio use the full editor.</p>
            <p>Save turns red when there are unsaved changes, including on the Title Page. Click Save to keep those edits in this browser.</p>
            <p>Click the chapter title above the editor to change it. EE includes that heading in both EPUB editions, so you do not need to repeat it inside the chapter text.</p>
            <p>Review text checks the current section and reports possible issues without changing your words. Its explanation lists what it checks. Scenecraft adds presentation and audio for enhanced reading.</p>
            <p>No Matter sections are for your author notes. They remain in the Authors EPUB and enhanced reader, and are left out of the Booksellers EPUB and paperback PDFs.</p>
          </HelpSection>

          <HelpSection title='Publish to your Library'>
            <p>Save your edits, then click Publish to put a copy in your own EE Library for reading, reviewing, and downloading. Publish does not send your book to a bookseller.</p>
            <p>Click Library to review your book while keeping Authors open. If an already-open Library shows an older copy, use its reload arrow.</p>
            <p>In Library, Ebook Plus offers the Booksellers EPUB for uploading to a bookseller and the Authors EPUB for keeping an editable EE copy, along with paperback PDF tools.</p>
            <p>Authors Menu also offers Cover, TXT, DOCX, and X-Ray. TXT and DOCX download your writing in those formats; X-Ray lets you look inside the EPUB.</p>
          </HelpSection>
        </>
      ) : (
        <>
          <HelpSection title='From Authors to Library'>
            <p>Library is where you read, review, and download the books you publish from Authors.</p>
            <p>To start or load a book, click Authors, use Open, then write or edit and Save. Click Publish to put the book in your EE Library. Publish does not send it to a bookseller.</p>
            <p>If you return to an already-open Library and do not see your latest changes, click the reload arrow.</p>
          </HelpSection>

          <HelpSection title='Read your book'>
            <ul className='list-disc space-y-1 pl-5'>
              <li><strong>Book cover</strong> — read the Booksellers EPUB.</li>
              <li><strong>Blue book icon</strong> — read the Authors EPUB, including author notes.</li>
              <li><strong>Orange icon</strong> — open the enhanced reader with Scenecraft presentation and audio, where included.</li>
              <li><strong>Plus</strong> — open Ebook Plus for downloads and other book tools. Its Help button explains each icon.</li>
            </ul>
          </HelpSection>

          <HelpSection title='Download and check your book'>
            <p>In Ebook Plus, the green download arrow saves the Booksellers EPUB for uploading to a bookseller. The blue book icon downloads the Authors EPUB, including author notes and saved paperback cover settings.</p>
            <p>Check EPUB checks the Booksellers edition and shows errors and warnings. You can download a readable text report. It does not repair your book or keep the results after you close the checker.</p>
            <p>X-ray shows the files inside the Authors EPUB. The web download saves an enhanced-reading version as a ZIP.</p>
            <p>The PDF tools create paperback interiors and a separate 6×9 cover PDF. The 6×9 interior offers a table of contents and chapter headings. Create the interior first so you have its page count for the cover.</p>
            <p>No Matter author notes are excluded from the Booksellers EPUB and paperback PDFs.</p>
          </HelpSection>

          <HelpSection title='Arrange your Library'>
            <p>Search finds books by their details. The three-dot view menu changes the shelf layout and sorting. Menu → Settings opens your Library preferences.</p>
            <p>The sun/moon button changes the shared light/dark setting for Library and Authors. An already-open tab may need a reload to show the change.</p>
          </HelpSection>
        </>
      )}

      <HelpSection title='Your work stays in this browser'>
        <p>EverythingEbooks is free, with no account, no cloud storage, and no tracking. Your writing and Library are stored in this browser on this device. Downloads give you copies to keep or move elsewhere.</p>
        {page === 'authors' && <p>The sun/moon button changes the shared light/dark setting for Authors and Library. An already-open tab may need a reload to show the change.</p>}
      </HelpSection>

      <HelpSection title='Keep a ZIP backup'>
        <p>Save your edits, then click the stoplight in either Authors or Library. You can also use Library Menu → Storage: Export &amp; Import. Export All Data downloads a ZIP of your saved Authors work, Library, and settings.</p>
        <ul className='list-disc space-y-1 pl-5'>
          <li><strong>Green</strong> — no changes waiting for a backup.</li>
          <li><strong>Yellow</strong> — changes need a new ZIP backup.</li>
          <li><strong>Red</strong> — changes still need a backup after two intervening calendar days. Changes after a Monday export stay yellow through Wednesday and turn red on Thursday. The last export date appears beside the light.</li>
        </ul>
        <p>If you have not exported a ZIP yet, the reminder counts from your first change. Reading alone does not turn the light yellow.</p>
        <p>Import Data restores a ZIP backup. After checking the file and asking you to confirm, it resets Library &amp; Authors before restoring the backup. Export your current work first if you want to keep it.</p>
      </HelpSection>

      <HelpSection title='Work online or offline'>
        <p>While online, choose Menu → Prep for offline use in either Authors or Library and wait for it to finish. Bookmark everythingebooks.org and use that bookmark in the same browser on the same device, online or offline. Nothing installs.</p>
        <p>Menu → Update App is available in both places when you are online. It loads the latest app update.</p>
      </HelpSection>
    </div>
  );
}
