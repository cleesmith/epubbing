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
            <p>Scenecraft adds presentation and audio for enhanced reading.</p>
            <p>No Matter sections are for your author notes. They remain in the Authors EPUB and enhanced reader, and are left out of the Booksellers EPUB and paperback PDFs.</p>
          </HelpSection>

          <HelpSection title='Save and read in your Library'>
            <p>Click <strong>Save &amp; read in Library</strong> to save your latest edits and a fresh copy in your EE Library. After a brief confirmation, the Booksellers EPUB opens at the chapter or section you were editing, even if it is empty. No Matter author notes are excluded; from those notes, the book opens at its title page instead.</p>
            <p>Authors stays open while you read. An existing Library tab is reused, or one opens if needed. This does not send your book to a bookseller.</p>
            <p>The separate <strong>Library</strong> button leaves Authors without making a new Library copy. It closes the Authors tab when Library is already open, or takes this tab to Library otherwise. Save any edits you want to keep before leaving. If you switch to an older Library tab yourself, use its reload arrow to see the latest saved books.</p>
            <p>In Library, Ebook Plus offers the Booksellers EPUB for uploading to a bookseller and the Authors EPUB for keeping an editable EE copy, along with paperback PDF tools.</p>
            <p>Authors Menu also offers Cover, TXT, DOCX, and X-Ray. TXT and DOCX export your writing in those formats; X-Ray lets you look inside the EPUB.</p>
          </HelpSection>
        </>
      ) : (
        <>
          <HelpSection title='From Authors to Library'>
            <p>Library is where you read, review, and export the books you save from Authors.</p>
            <p>To start or load a book, click Authors and use Open. When you are ready to review your writing, click <strong>Save &amp; read in Library</strong>. It saves your latest edits and a fresh Library copy, then opens the Booksellers EPUB at your current section, including an empty one. No Matter author notes are excluded; from those notes, the book opens at its title page instead.</p>
            <p>This keeps Authors open and reuses or opens a Library tab. The separate <strong>Library</strong> button leaves Authors without making a new Library copy. To publish for sale, export your EPUB or PDF from Ebook Plus and submit it to your chosen bookseller.</p>
            <p>If you switch to an older Library tab yourself and do not see the latest saved books, click the reload arrow.</p>
          </HelpSection>

          <HelpSection title='Read your book'>
            <ul className='list-disc space-y-1 pl-5'>
              <li><strong>Book cover</strong> — read the Booksellers EPUB.</li>
              <li><strong>Blue book icon</strong> — read the Authors EPUB, including author notes.</li>
              <li><strong>Orange icon</strong> — open the enhanced reader with Scenecraft presentation and audio, where included.</li>
              <li><strong>Plus</strong> — open Ebook Plus for exports and other book tools. Its Help button explains each icon.</li>
            </ul>
          </HelpSection>

          <HelpSection title='Export and check your book'>
            <p>In Ebook Plus, the green export arrow saves the Booksellers EPUB for uploading to a bookseller. The blue book icon exports the Authors EPUB, including author notes and saved paperback cover settings.</p>
            <p>Check EPUB checks the Booksellers edition and shows errors and warnings. You can export a readable text report. It does not repair your book or keep the results after you close the checker.</p>
            <p>X-ray shows the files inside the Authors EPUB. The web export saves an enhanced-reading version as a ZIP.</p>
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
        <p>EverythingEbooks is free, with no account, no cloud storage, and no tracking. Your writing and Library are stored in this browser on this device. Exports give you copies to keep or move elsewhere.</p>
        {page === 'authors' && <p>The sun/moon button changes the shared light/dark setting for Authors and Library. An already-open tab may need a reload to show the change.</p>}
      </HelpSection>

      <HelpSection title='Keep a ZIP backup'>
        <p>Save your edits, then click the stoplight in either Authors or Library. You can also use Library Menu → Storage: Export &amp; Import. Export All Data exports a ZIP of your saved Authors work, Library, and settings.</p>
        <ul className='list-disc space-y-1 pl-5'>
          <li><strong>Green</strong> — no changes waiting for a backup.</li>
          <li><strong>Yellow</strong> — changes need a new ZIP backup.</li>
          <li><strong>Red</strong> — changes still need a backup after two intervening calendar days. Changes after a Monday export stay yellow through Wednesday and turn red on Thursday. The last export date appears beside the light.</li>
        </ul>
        <p>If you have not exported a ZIP yet, the reminder counts from your first change. Reading alone does not turn the light yellow.</p>
        <p>Import Data restores a ZIP backup. After checking the file and asking you to confirm, it resets Library &amp; Authors before restoring the backup. Export your current work first if you want to keep it.</p>
      </HelpSection>

      <HelpSection title='Work online or offline'>
        <p>Your first visit while online prepares the complete app in this browser automatically. The progress popup shows the number of files saved and verified. Keep this tab open until Ready to write and read offline appears. The completed file count stays visible until you choose OK. You do not need to choose Update App to finish setup.</p>
        <p>Successful setup is remembered in this browser. If interrupted, setup tries again the next time you open EE online or your connection returns. A different browser or cleared app cache needs its own setup.</p>
        <p>Later, Menu → Update App in either Authors or Library checks for the latest version and prepares its offline files together. It reuses files that are already correct and shows progress. When finished, the completion message and file count stay visible until you choose OK to reopen the updated app. Stay online and save any unsaved writing before updating.</p>
        <p>The number beside Update App identifies the version currently open. Other open EE tabs may need a reload after updating. Bookmark everythingebooks.org and use that bookmark in this same browser on this device, online or offline. Nothing installs.</p>
      </HelpSection>
    </div>
  );
}
