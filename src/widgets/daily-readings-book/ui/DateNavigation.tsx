'use client';

import type { DayReading } from '../model/types';

export interface DateNavigationProps {
  days: DayReading[];
  selectedDate: string;
  onDateChange: (date: string) => void;
}

function resolveOrder(days: DayReading[]): 'asc' | 'desc' {
  if (days.length < 2) {
    return 'desc';
  }

  const first = new Date(days[0].date).getTime();
  const second = new Date(days[1].date).getTime();
  return first <= second ? 'asc' : 'desc';
}

export function DateNavigation({ days, selectedDate, onDateChange }: DateNavigationProps) {
  const selectedIndex = Math.max(
    0,
    days.findIndex((day) => day.date === selectedDate),
  );

  const currentDay = days[selectedIndex];
  const order = resolveOrder(days);

  const previousIndex = order === 'desc' ? selectedIndex + 1 : selectedIndex - 1;
  const nextIndex = order === 'desc' ? selectedIndex - 1 : selectedIndex + 1;

  const canGoPrevious = previousIndex >= 0 && previousIndex < days.length;
  const canGoNext = nextIndex >= 0 && nextIndex < days.length;

  const goPrevious = () => {
    if (!canGoPrevious) {
      return;
    }

    onDateChange(days[previousIndex].date);
  };

  const goNext = () => {
    if (!canGoNext) {
      return;
    }

    onDateChange(days[nextIndex].date);
  };

  return (
    <nav
      className="flex items-center justify-between gap-4 rounded-lg border border-[var(--book-divider)] bg-[var(--book-page-bg)] p-4"
      aria-label="Navegación de fecha para lecturas litúrgicas"
    >
      <button
        type="button"
        onClick={goPrevious}
        disabled={!canGoPrevious}
        className="rounded-md bg-[var(--book-button-bg)] px-4 py-2 text-base font-medium text-[var(--book-button-text)] enabled:hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Día anterior
      </button>

      <div className="text-center">
        <p className="text-sm text-[var(--book-muted)]">{currentDay?.date ?? selectedDate}</p>
        <p className="text-base md:text-lg text-[var(--book-text)]">{currentDay?.liturgicalDayName ?? 'Lecturas del día'}</p>
      </div>

      <button
        type="button"
        onClick={goNext}
        disabled={!canGoNext}
        className="rounded-md bg-[var(--book-button-bg)] px-4 py-2 text-base font-medium text-[var(--book-button-text)] enabled:hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Día siguiente
      </button>
    </nav>
  );
}
