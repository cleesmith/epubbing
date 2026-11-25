// app/authors/EditorPanel.tsx

'use client';

import { useState, useRef, useEffect, useCallback, useImperativeHandle, forwardRef, useId } from 'react';
import { ThemeConfig } from '../shared/theme';
import StyledSmallButton from '@/components/StyledSmallButton';
import SearchResultsPanel, { SearchResult } from './SearchResultsPanel';
import ImagePickerModal from './ImagePickerModal';
import AudioPickerModal from './AudioPickerModal';
import SceneCraftModal from './SceneCraftModal';
import { ImageLibraryProvider } from '@/contexts/ImageLibraryContext';
import { AudioLibraryProvider } from '@/contexts/AudioLibraryContext';
import type { SceneCraftConfig } from '@/services/manuscriptStorage';


// PlateJS imports
import { Plate, usePlateEditor } from 'platejs/react';
import { EditorKit } from '@/components/plate-editor/editor-kit';
import { EditorContainer, Editor } from '@/components/plate-ui/editor';
import { createEmptyValue, xhtmlToPlate, plateToXhtml } from '@/lib/plateXhtml';
import type { Value } from 'platejs';
import { FindReplacePlugin } from '@platejs/find-replace';
import { MentionPlugin } from '@platejs/mention/react';
import { EmojiPlugin } from '@platejs/emoji/react';
import { cn } from '@/lib/utils';
import { WritingModeContext } from '@/contexts/WritingModeContext';
import { hasAudioMarkup, hasAudioNodes, hasSceneCraftAudio } from './writingMode';
import writingStyles from './WritingMode.module.css';

interface ImageInfo {
  filename: string;
  url: string;
}

interface AudioInfo {
  filename: string;
  size: number;
}

interface EditorPanelProps {
  writingMode?: boolean;
  onWritingModeChange?: (active: boolean) => void;
  theme: ThemeConfig;
  isDarkMode: boolean;
  onToggleSidebar: () => void;
  // Section content - XHTML-Native: Single source of truth
  sectionId?: string;
  sectionTitle: string;
  sectionXhtml: string;             // XHTML content (single source of truth)
  sectionType?: string;
  sectionWordCount: number;
  // XHTML-Native: Passes XHTML directly
  onContentChange?: (xhtml: string) => void;
  onTitleChange?: (newTitle: string) => void;
  // Section navigation
  onPrevSection?: () => void;
  onNextSection?: () => void;
  hasPrevSection?: boolean;
  hasNextSection?: boolean;
  // Search panel props
  searchActive?: boolean;
  searchResults?: SearchResult[];
  currentSearchIndex?: number;
  searchQuery?: string;
  onSearchNavigate?: (result: SearchResult, index: number) => void;
  onSearchPrev?: () => void;
  onSearchNext?: () => void;
  onSearchClose?: () => void;
  // Image picker props
  images?: ImageInfo[];
  onImageUpload?: (file: File) => Promise<void>;
  onImageDelete?: (filename: string) => void;
  // Audio picker props
  audios?: AudioInfo[];
  onAudioUpload?: (file: File) => Promise<void>;
  onAudioDelete?: (filename: string) => void;
  // SceneCraft props
  sceneCraftConfig?: SceneCraftConfig | null;
  onSceneCraftConfigChange?: (config: SceneCraftConfig) => void;
  getImageUrl?: (filename: string) => string | null;
  getAudioUrl?: (filename: string) => Promise<string | null>;
  // Book metadata (for preview display)
}

// Ref handle for parent to control editor
export interface EditorPanelRef {
  scrollToPassage: (passage: string, startIndex?: number) => boolean;
}

const EditorPanel = forwardRef<EditorPanelRef, EditorPanelProps>(function EditorPanel({
  writingMode = false,
  onWritingModeChange,
  theme,
  isDarkMode,
  onToggleSidebar,
  sectionId,
  sectionTitle,
  sectionXhtml,
  sectionType: _sectionType,
  sectionWordCount,
  onContentChange,
  onTitleChange,
  // Search panel props
  searchActive,
  searchResults,
  currentSearchIndex,
  searchQuery,
  onSearchNavigate,
  onSearchPrev,
  onSearchNext,
  onSearchClose,
  // Image picker props
  images,
  onImageUpload,
  onImageDelete,
  // Audio picker props
  audios,
  onAudioUpload,
  onAudioDelete,
  // SceneCraft props
  sceneCraftConfig,
  onSceneCraftConfigChange,
  getImageUrl,
  getAudioUrl,
}, ref) {
  const borderColor = isDarkMode ? '#404040' : '#e5e5e5';
  const mutedText = isDarkMode ? '#888' : '#666';

  // Editable chapter title state (initialized from prop, but editable locally for now)
  const [chapterTitle, setChapterTitle] = useState(sectionTitle);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');


  // Update local title when section changes
  useEffect(() => {
    setChapterTitle(sectionTitle);
  }, [sectionTitle]);

  const titleInputRef = useRef<HTMLInputElement>(null);

  // Image picker state
  const [showImagePicker, setShowImagePicker] = useState(false);
  const pendingImageCallbackRef = useRef<((filename: string, altText: string) => void) | null>(null);

  // Audio picker state
  const [showAudioPicker, setShowAudioPicker] = useState(false);

  // SceneCraft modal state
  const [showSceneCraft, setShowSceneCraft] = useState(false);

  const [hasEmbeddedAudio, setHasEmbeddedAudio] = useState(() => hasAudioMarkup(sectionXhtml));

  // AuthorsLayout keys this panel by workspace/section. Initialize once; echoing
  // autosaved XHTML must never reset the live editor, its selection, or undo stack.
  const [initialValue] = useState<Value>(() => {
    let value = sectionXhtml?.trim() ? xhtmlToPlate(sectionXhtml) : createEmptyValue();
    const first = value[0] as { type?: string; children?: { text?: string }[] } | undefined;
    if (!(first?.type === 'p' && first.children?.length === 1 && first.children[0]?.text === '')) {
      value = [{ type: 'p', children: [{ text: '' }] }, { type: 'p', children: [{ text: '' }] }, ...value] as Value;
    }
    return value;
  });
  const editor = usePlateEditor({ plugins: EditorKit, value: initialValue });
  const lastXhtml = useRef<string | null>(null);
  if (lastXhtml.current === null) lastXhtml.current = plateToXhtml(editor.children as Value);

  const writingModeReasonId = useId();
  const writingBlockedReason = !sectionId
    ? 'Select a chapter to use Writing mode.'
    : hasEmbeddedAudio || hasSceneCraftAudio(sceneCraftConfig)
      ? 'Audio is attached to the text.'
      : '';

  const changeWritingMode = useCallback((active: boolean) => {
    if (active && (!sectionId || hasAudioNodes(editor.children) || hasSceneCraftAudio(sceneCraftConfig))) return;
    // Changing presentation never resets, serializes, or replaces the editor value.
    onWritingModeChange?.(active);
    requestAnimationFrame(() => editor.tf.focus());
  }, [editor, onWritingModeChange, sceneCraftConfig, sectionId]);

  useEffect(() => {
    if (writingMode && writingBlockedReason) onWritingModeChange?.(false);
  }, [writingMode, writingBlockedReason, onWritingModeChange]);

  // Keep @ and : as ordinary typing while the suggestion menus are hidden.
  // Restore each plugin's original trigger rule when returning to the full editor.
  useEffect(() => {
    if (!writingMode) return;
    const mentionQuery = editor.getOptions(MentionPlugin).triggerQuery;
    const emojiQuery = editor.getOptions(EmojiPlugin).triggerQuery;
    editor.setOptions(MentionPlugin, { triggerQuery: () => false });
    editor.setOptions(EmojiPlugin, { triggerQuery: () => false });
    return () => {
      editor.setOptions(MentionPlugin, { triggerQuery: mentionQuery });
      editor.setOptions(EmojiPlugin, { triggerQuery: emojiQuery });
    };
  }, [editor, writingMode]);

  useEffect(() => {
    if (!writingMode) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || event.isComposing || event.defaultPrevented) return;
      event.preventDefault();
      event.stopPropagation();
      changeWritingMode(false);
    };
    // Plate handles Escape itself, so the mode exit must run in capture phase.
    window.addEventListener('keydown', handleEscape, true);
    return () => window.removeEventListener('keydown', handleEscape, true);
  }, [writingMode, changeWritingMode]);

  // Set/clear find-replace highlighting based on active search
  useEffect(() => {
    if (!editor) return;
    if (!writingMode && searchActive && searchQuery) {
      editor.setOptions(FindReplacePlugin, { search: searchQuery });
    } else {
      editor.setOptions(FindReplacePlugin, { search: '' });
    }
  }, [editor, searchActive, searchQuery, writingMode]);

  // Value changes only: moving the cursor or selecting words does not save.
  const handleEditorChange = useCallback(() => {
    const value = editor.children as Value;
    setHasEmbeddedAudio(hasAudioNodes(value));
    const xhtml = plateToXhtml(value);
    if (xhtml === lastXhtml.current) return;
    lastXhtml.current = xhtml;
    onContentChange?.(xhtml);
  }, [editor, onContentChange]);

  // Handle image insertion from picker
  // XHTML-Native: Inserts as proper Plate image element node, or calls pending callback
  const handleImageInsert = useCallback((filename: string, altText: string) => {
    // If a callback is pending (e.g. from StickyImageElement), call it instead of inserting
    if (pendingImageCallbackRef.current) {
      const cb = pendingImageCallbackRef.current;
      pendingImageCallbackRef.current = null;
      setShowImagePicker(false);
      cb(filename, altText);
      return;
    }

    if (!editor) return;

    // Insert proper Plate image element node
    editor.tf.insertNodes({
      type: 'img',
      url: filename,
      alt: altText,
      children: [{ text: '' }],
    });

    setShowImagePicker(false);

    // Update parent with new XHTML
    handleEditorChange();
  }, [editor, handleEditorChange]);

  // Handle audio insertion from picker
  const handleAudioInsert = useCallback((filename: string, _label: string, _mediaType: string) => {
    if (!editor) return;

    editor.tf.insertNodes({
      type: 'audio',
      url: `audio/${filename}`,
      children: [{ text: '' }],
    });

    setShowAudioPicker(false);

    // Update parent with new XHTML
    handleEditorChange();
  }, [editor, handleEditorChange]);

  // Scroll to and highlight a passage in the editor
  // FindReplacePlugin handles highlighting all matches automatically
  // Returns true if selection was successfully placed, false otherwise
  const scrollToPassage = useCallback((passage: string, startIndex?: number): boolean => {
    if (!editor) return false;
    editor.tf.focus();

    // Find the editor position by walking text nodes
    // plateToPlainText joins blocks with '\n\n', so account for that
    let charCount = 0;
    const blocks = editor.children;
    let foundMatch = false;

    for (let blockIdx = 0; blockIdx < blocks.length; blockIdx++) {
      if (blockIdx > 0) charCount += 2; // '\n\n' separator between blocks

      const block = blocks[blockIdx] as { children?: { text?: string }[] };
      if (!block.children) continue;

      for (let textIdx = 0; textIdx < block.children.length; textIdx++) {
        const textNode = block.children[textIdx];
        if (!textNode || typeof textNode.text !== 'string') continue;

        const textLength = textNode.text.length;

        if (startIndex !== undefined) {
          // Use character position if provided
          if (charCount + textLength > startIndex) {
            const offset = startIndex - charCount;
            editor.tf.select({ path: [blockIdx, textIdx], offset });
            foundMatch = true;
            break;
          }
        } else {
          // Fall back to text match
          const matchPos = textNode.text.indexOf(passage);
          if (matchPos !== -1) {
            editor.tf.select({ path: [blockIdx, textIdx], offset: matchPos });
            foundMatch = true;
            break;
          }
        }

        charCount += textLength;
      }

      if (foundMatch) break;
    }

    // Check if selection was actually set
    if (!editor.selection) return false;

    // Scroll the selection into view via the DOM
    setTimeout(() => {
      const domSelection = window.getSelection();
      if (!domSelection || domSelection.rangeCount === 0) return;

      const range = domSelection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      if (!rect || (rect.top === 0 && rect.left === 0)) return;

      // Use scrollIntoView for more reliable scrolling
      const node = range.startContainer.parentElement;
      if (node) {
        node.scrollIntoView({ behavior: 'instant', block: 'center' });
      }
    }, 50);

    return true;
  }, [editor]);

  // Expose methods to parent via ref
  useImperativeHandle(ref, () => ({
    scrollToPassage,
  }), [scrollToPassage]);

  // Focus input when entering edit mode
  useEffect(() => {
    if (isEditingTitle && titleInputRef.current) {
      titleInputRef.current.focus();
      titleInputRef.current.select();
    }
  }, [isEditingTitle]);

  const handleTitleClick = () => {
    setEditedTitle(chapterTitle);
    setIsEditingTitle(true);
  };

  const handleTitleChange = (value: string) => {
    setEditedTitle(value);
    setChapterTitle(value);
    onTitleChange?.(value); // Keep spaces and empty headings exactly as edited.
  };

  const handleTitleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing) return;
    if (event.key === 'Enter' || event.key === 'Escape') {
      event.preventDefault();
      setIsEditingTitle(false); // Ends editing; saving never depends on Return.
    }
  };

  return (
    <WritingModeContext.Provider value={writingMode}>
    <ImageLibraryProvider value={{
      openImageLibrary: (callback) => {
        if (writingMode) return;
        if (callback) {
          pendingImageCallbackRef.current = callback;
        }
        setShowImagePicker(true);
      },
      images: images ?? [],
    }}>
    <AudioLibraryProvider value={{
      openAudioLibrary: () => { if (!writingMode) setShowAudioPicker(true); },
      uploadAudioToLibrary: async (file: File) => {
        await onAudioUpload?.(file);
      },
    }}>
    <main
      className={writingMode ? writingStyles.writingMode : undefined}
      data-writing-mode={writingMode ? 'true' : 'false'}
      data-dark={isDarkMode ? 'true' : 'false'}
      style={{
        flex: 1,
        backgroundColor: theme.bg,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {writingMode && (
        <div className={writingStyles.modeBar} aria-label="Writing mode controls">
          <button type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => changeWritingMode(false)} title="Return to the full editor (Esc)">
            Full editor (Esc)
          </button>
        </div>
      )}
      {/* Chapter header */}
      <div
        className={writingStyles.normalControls}
        style={{
          padding: '4px 8px',
          borderBottom: `1px solid ${borderColor}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {isEditingTitle ? (
            <input
              ref={titleInputRef}
              type="text"
              value={editedTitle}
              onChange={(e) => handleTitleChange(e.target.value)}
              onKeyDown={handleTitleKeyDown}
              onBlur={() => setIsEditingTitle(false)}
              aria-label="Chapter heading"
              style={{
                fontSize: '16px',
                fontWeight: 600,
                margin: 0,
                color: '#6366f1',
                backgroundColor: 'transparent',
                border: `1px solid ${borderColor}`,
                borderRadius: '4px',
                padding: '2px 6px',
                outline: 'none',
                width: '300px',
              }}
            />
          ) : (
            <button
              onClick={handleTitleClick}
              title="Click to edit chapter title"
              style={{
                fontSize: '16px',
                fontWeight: 600,
                margin: 0,
                padding: 0,
                color: '#6366f1',
                cursor: 'pointer',
                background: 'none',
                border: 'none',
                textAlign: 'left',
              }}
            >
              {chapterTitle || 'Untitled section'}
            </button>
          )}
        </div>
        <span
          style={{
            padding: '2px 8px',
            backgroundColor: isDarkMode ? '#3a3a3a' : '#f0f0f0',
            borderRadius: '4px',
            fontSize: '11px',
            color: mutedText,
          }}
        >
          {sectionWordCount.toLocaleString()} w
        </span>
      </div>

      {/* Toolbar */}
      <div
        className={writingStyles.normalControls}
        style={{
          padding: '4px 8px',
          borderBottom: `1px solid ${borderColor}`,
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          flexWrap: 'wrap',
        }}
      >
        <StyledSmallButton theme={theme} onClick={onToggleSidebar} title="Toggle sidebar">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <line x1="9" y1="3" x2="9" y2="21" />
          </svg>
        </StyledSmallButton>

        <span
          title={writingBlockedReason || 'distraction free writing, ESC to exit'}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}
        >
          <StyledSmallButton
            theme={theme}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => changeWritingMode(true)}
            disabled={!!writingBlockedReason}
            aria-describedby={writingBlockedReason ? writingModeReasonId : undefined}
            styleOverrides={writingBlockedReason ? { pointerEvents: 'none' } : undefined}
            title={writingBlockedReason || 'distraction free writing, ESC to exit'}
          >
            Writing mode
          </StyledSmallButton>
          {writingBlockedReason && (
            <span id={writingModeReasonId} style={{ color: theme.textSecondary, fontSize: '11px' }}>
              {writingBlockedReason}
            </span>
          )}
        </span>

        {/* SceneCraft button */}
        <StyledSmallButton
          theme={theme}
          onClick={() => setShowSceneCraft(true)}
          title="Open Scenecraft immersive editor"
          styleOverrides={{
            backgroundColor: 'rgba(255, 120, 68, 0.15)',
            borderColor: 'rgba(255, 120, 68, 0.25)',
            color: '#ff7844',
          }}
        >
          Scenecraft
        </StyledSmallButton>
      </div>

      {/* Editor content area - PlateJS editor (always visible; preview is now a full-screen overlay) */}
      <div
        className={writingStyles.editorArea}
        style={{
          flex: 1,
          overflow: 'hidden',
          padding: '4px',
        }}
      >
        <Plate
          editor={editor}
          onValueChange={handleEditorChange}
        >
          <EditorContainer
            className={cn(
              writingStyles.paperScroll,
              'h-full rounded border',
              isDarkMode ? 'bg-[#343a40] border-gray-600' : 'bg-[#f8f9fa] border-gray-300'
            )}
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '14px',
              lineHeight: '1.6',
              color: theme.text,
            }}
          >
            <Editor
              variant="default"
              placeholder="Type here..."
              className={cn(
                writingStyles.page,
                'min-h-full',
                isDarkMode && 'placeholder:text-gray-500'
              )}
            />
          </EditorContainer>
        </Plate>
      </div>

      {/* Search results panel */}
      {!writingMode && searchActive && searchResults && searchResults.length > 0 && (
        <SearchResultsPanel
          theme={theme}
          isDarkMode={isDarkMode}
          results={searchResults}
          currentIndex={currentSearchIndex ?? 0}
          searchQuery={searchQuery ?? ''}
          onNavigate={onSearchNavigate ?? (() => {})}
          onPrev={onSearchPrev ?? (() => {})}
          onNext={onSearchNext ?? (() => {})}
          onClose={onSearchClose ?? (() => {})}
        />
      )}

      {/* Image picker modal */}
      <ImagePickerModal
        isOpen={showImagePicker}
        theme={theme}
        isDarkMode={isDarkMode}
        images={images ?? []}
        onSelect={handleImageInsert}
        onUpload={onImageUpload ?? (async () => {})}
        onDelete={onImageDelete ?? (() => {})}
        onClose={() => {
          pendingImageCallbackRef.current = null;
          setShowImagePicker(false);
        }}
      />

      {/* Audio picker modal */}
      <AudioPickerModal
        isOpen={showAudioPicker}
        theme={theme}
        isDarkMode={isDarkMode}
        audios={audios ?? []}
        onSelect={handleAudioInsert}
        onUpload={onAudioUpload ?? (async () => {})}
        onDelete={onAudioDelete ?? (() => {})}
        onClose={() => setShowAudioPicker(false)}
      />

      {/* SceneCraft immersive editor modal */}
      <SceneCraftModal
        isOpen={showSceneCraft}
        onClose={() => setShowSceneCraft(false)}
        sectionId={sectionId || ''}
        sectionTitle={chapterTitle}
        sectionXhtml={(() => {
          if (!editor) return sectionXhtml;
          const plateValue = editor.children as Value;
          return plateToXhtml(plateValue);
        })()}
        sceneCraftConfig={sceneCraftConfig ?? null}
        onConfigChange={onSceneCraftConfigChange ?? (() => {})}
        images={images ?? []}
        audios={audios ?? []}
        onImageUpload={onImageUpload ?? (async () => {})}
        onImageDelete={onImageDelete ?? (() => {})}
        onAudioUpload={onAudioUpload ?? (async () => {})}
        onAudioDelete={onAudioDelete ?? (() => {})}
        getImageUrl={getImageUrl ?? (() => null)}
        getAudioUrl={getAudioUrl ?? (async () => null)}
        theme={theme}
        isDarkMode={isDarkMode}
      />

    </main>
    </AudioLibraryProvider>
    </ImageLibraryProvider>
    </WritingModeContext.Provider>
  );
});

export default EditorPanel;
