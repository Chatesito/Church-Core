'use client';

import { forwardRef } from 'react';
import type { BookPage } from '../model/types';

export interface BookPageLeafProps {
  page: BookPage;
  pageHeight?: number;
}

/**
 * Leaf page node required by react-pageflip.
 * Must be wrapped with forwardRef so pageflip can attach DOM refs.
 */
export const BookPageLeaf = forwardRef<HTMLDivElement, BookPageLeafProps>(function BookPageLeaf(
  { page, pageHeight },
  ref,
) {
  return (
    <article
      ref={ref}
      className="h-full w-full overflow-hidden bg-[var(--book-page-bg)] text-[var(--book-text)] p-8 md:p-10 shadow-[0_2px_10px_var(--book-shadow)]"
      style={{ backfaceVisibility: 'hidden', height: pageHeight ? `${pageHeight}px` : undefined }}
      aria-label={`Página ${page.pageNumber}: ${page.readingTypeLabel}`}
    >
      <header className="mb-6 border-b border-[var(--book-divider)] pb-4">
        <p className="text-[var(--book-muted)] text-sm md:text-base font-medium tracking-wide uppercase">
          {page.readingTypeLabel}
        </p>
        <p className="text-[var(--book-muted)] text-base mt-1">{page.reference}</p>
      </header>

      <section
        className="min-h-0 overflow-hidden text-[18px] leading-relaxed whitespace-pre-line"
        style={{ fontFamily: 'Georgia, serif' }}
      >
        {page.content}
      </section>
    </article>
  );
});
