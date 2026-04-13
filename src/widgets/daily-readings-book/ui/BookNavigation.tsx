'use client';

export interface BookNavigationProps {
  canGoPrevious: boolean;
  canGoNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
  previousLabel?: string;
  nextLabel?: string;
}

export function BookNavigation({
  canGoPrevious,
  canGoNext,
  onPrevious,
  onNext,
  previousLabel = 'Anterior',
  nextLabel = 'Siguiente',
}: BookNavigationProps) {
  return (
    <nav className="flex items-center justify-between gap-3" aria-label="Navegación del libro litúrgico">
      <button
        type="button"
        onClick={onPrevious}
        disabled={!canGoPrevious}
        className="px-4 py-2 rounded-md bg-[var(--book-button-bg)] text-[var(--book-button-text)] text-base font-medium enabled:hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {previousLabel}
      </button>

      <button
        type="button"
        onClick={onNext}
        disabled={!canGoNext}
        className="px-4 py-2 rounded-md bg-[var(--book-button-bg)] text-[var(--book-button-text)] text-base font-medium enabled:hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {nextLabel}
      </button>
    </nav>
  );
}
