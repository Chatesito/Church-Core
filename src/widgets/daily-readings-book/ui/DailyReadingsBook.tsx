'use client';

import { useEffect, useMemo, useState } from 'react';
import { paginateReading } from '../lib/paginate-reading';
import type { DailyReadingsBookProps, PaginationConfig } from '../model/types';
import { LiturgicalBook } from './LiturgicalBook';
import { PlainTextView } from './PlainTextView';

type ViewMode = 'book' | 'text';

const DEFAULT_LAYOUT_CONFIG: PaginationConfig = {
  containerWidth: 820,
  containerHeight: 980,
  fontSize: 18,
  lineHeight: 1.8,
  fontFamily: 'Georgia, serif',
  paddingX: 32,
  paddingY: 32,
};

const SINGLE_PAGE_BREAKPOINT = 1024;

export function DailyReadingsBook({
  initialDayReading,
  paginationConfig,
}: DailyReadingsBookProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('book');
  const [isSinglePage, setIsSinglePage] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const updateMedia = () => {
      setIsSinglePage(window.innerWidth < SINGLE_PAGE_BREAKPOINT);
    };

    updateMedia();
    window.addEventListener('resize', updateMedia);

    return () => {
      window.removeEventListener('resize', updateMedia);
    };
  }, []);

  const [resolvedConfig] = useState<PaginationConfig>(() => {
    const baseWidth = DEFAULT_LAYOUT_CONFIG.containerWidth;
    const baseHeight = DEFAULT_LAYOUT_CONFIG.containerHeight;

    return {
      ...DEFAULT_LAYOUT_CONFIG,
      ...paginationConfig,
      containerWidth: Math.max(320, paginationConfig?.containerWidth ?? baseWidth),
      containerHeight: Math.max(420, paginationConfig?.containerHeight ?? baseHeight),
    };
  });

  const pages = useMemo(() => {
    if (!initialDayReading) {
      return [];
    }

    return paginateReading(initialDayReading, resolvedConfig);
  }, [initialDayReading, resolvedConfig]);

  if (!initialDayReading) {
    return null;
  }

  return (
    <section className="space-y-5">
      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => setViewMode('book')}
          aria-pressed={viewMode === 'book'}
          className="rounded-md border border-[var(--book-divider)] px-3 py-1.5 text-sm text-[var(--book-text)] aria-pressed:bg-[var(--book-button-bg)] aria-pressed:text-[var(--book-button-text)]"
        >
          Vista libro
        </button>
        <button
          type="button"
          onClick={() => setViewMode('text')}
          aria-pressed={viewMode === 'text'}
          className="rounded-md border border-[var(--book-divider)] px-3 py-1.5 text-sm text-[var(--book-text)] aria-pressed:bg-[var(--book-button-bg)] aria-pressed:text-[var(--book-button-text)]"
        >
          Vista texto
        </button>
      </div>

      <div className="w-full min-h-[640px]">
        {viewMode === 'book' ? (
          <LiturgicalBook pages={pages} isSinglePage={isSinglePage} />
        ) : (
          <div className="mx-auto max-w-4xl px-4 md:px-0">
            <PlainTextView day={initialDayReading} />
          </div>
        )}
      </div>
    </section>
  );
}
