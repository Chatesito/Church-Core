'use client';

export interface ProgressIndicatorProps {
  currentPage: number;
  totalPages: number;
}

export function ProgressIndicator({ currentPage, totalPages }: ProgressIndicatorProps) {
  const safeTotal = Math.max(1, totalPages);
  const safeCurrent = Math.min(Math.max(1, currentPage), safeTotal);

  return (
    <p className="text-base md:text-lg text-[var(--book-muted)]" aria-live="polite">
      Página {safeCurrent} de {safeTotal}
    </p>
  );
}
