'use client';

import dynamic from 'next/dynamic';
import { useMemo, useState, useEffect } from 'react';
import type { ComponentType, CSSProperties, ReactNode } from 'react';
import { BookPageLeaf } from './BookPageLeaf';
import type { LiturgicalBookProps } from '../model/types';

interface FlipBookComponentProps {
  width: number;
  height: number;
  size?: 'fixed' | 'stretch';
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  maxShadowOpacity?: number;
  showCover?: boolean;
  mobileScrollSupport?: boolean;
  usePortrait?: boolean;
  flippingTime?: number;
  disableFlipByClick?: boolean;
  renderOnlyPageLengthChange?: boolean;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

function FlipBookLoadingFallback() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center rounded-lg border border-[var(--book-divider)] bg-[var(--book-page-bg)]">
      <p className="text-[var(--book-muted)]">Preparando libro litúrgico...</p>
    </div>
  );
}

const FLIPBOOK_IMPORT_DELAY_MS = 20;
const FLIPBOOK_READY_DELAY_MS = 50;
let mountCount = 0;

const HTMLFlipBook = dynamic<FlipBookComponentProps>(
  () =>
    new Promise<void>((resolve) => {
      window.setTimeout(() => resolve(), FLIPBOOK_IMPORT_DELAY_MS);
    }).then(() =>
      import('react-pageflip').then((module) => ({
        default: module.default as unknown as ComponentType<FlipBookComponentProps>,
      })),
    ),
  { ssr: false, loading: FlipBookLoadingFallback },
);

const MIN_PAGE_WIDTH = 300;
const MAX_PAGE_WIDTH = 620;

export function LiturgicalBook({ pages, isSinglePage }: LiturgicalBookProps) {
  const [isReady, setIsReady] = useState(false);
  const flipbookKey = useMemo(() => {
    mountCount += 1;
    return `flipbook-${mountCount}`;
  }, []);

  useEffect(() => {
    setIsReady(false);

    const timerId = window.setTimeout(() => {
      setIsReady(true);
    }, FLIPBOOK_READY_DELAY_MS);

    return () => {
      window.clearTimeout(timerId);
    };
  }, []);

  const { pageWidth, pageHeight } = useMemo(() => {
    const baseWidth = isSinglePage ? 340 : 580;
    const safeWidth = Math.max(MIN_PAGE_WIDTH, Math.min(MAX_PAGE_WIDTH, baseWidth));
    const height = Math.round(safeWidth * 1.4);
    return { pageWidth: safeWidth, pageHeight: height };
  }, [isSinglePage]);

  if (pages.length === 0) {
    return (
      <div className="flex min-h-[420px] items-center justify-center rounded-lg border border-[var(--book-divider)] bg-[var(--book-page-bg)]">
        <p className="text-[var(--book-muted)]">No hay contenido disponible.</p>
      </div>
    );
  }

  if (!isReady) {
    return <FlipBookLoadingFallback />;
  }

  return (
    <div className="w-full">
      <div className="flex justify-center" aria-label="Libro litúrgico interactivo">
        <HTMLFlipBook
          key={flipbookKey}
          width={pageWidth}
          height={pageHeight}
          size="fixed"
          minWidth={MIN_PAGE_WIDTH}
          maxWidth={MAX_PAGE_WIDTH}
          minHeight={Math.round(MIN_PAGE_WIDTH * 1.4)}
          maxHeight={Math.round(MAX_PAGE_WIDTH * 1.4)}
          maxShadowOpacity={0.1}
          mobileScrollSupport={false}
          usePortrait={isSinglePage}
          flippingTime={400}
          disableFlipByClick={false}
          className="shadow-[0_8px_32px_var(--book-shadow)]"
        >
          {pages.map((page) => (
            <BookPageLeaf
              key={`${page.readingType}-${page.pageNumber}`}
              page={page}
              pageHeight={pageHeight}
            />
          ))}
        </HTMLFlipBook>
      </div>
    </div>
  );
}
