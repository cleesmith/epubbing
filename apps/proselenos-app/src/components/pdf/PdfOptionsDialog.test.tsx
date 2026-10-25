import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import PdfOptionsDialog from './PdfOptionsDialog';
afterEach(cleanup);
describe('interior-only PDF options', () => {
  it.each(['6x9', '5x8'])('keeps %s options limited to TOC and headings', size => {
    const create = vi.fn();
    render(<PdfOptionsDialog isOpen formatLabel={`${size} inch PDF (KDP)`} onCancel={vi.fn()} onCreate={create} />);
    expect(screen.getAllByRole('checkbox')).toHaveLength(2);
    expect(screen.queryByLabelText('Also create paperback cover')).toBeNull();
    fireEvent.click(screen.getByLabelText('Include Table of Contents'));
    fireEvent.click(screen.getByText('Create PDF'));
    expect(create).toHaveBeenCalledWith({ includeToc: true, includeChapterHeadings: false });
  });
});
