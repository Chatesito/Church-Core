'use client';

import { BookOpen } from 'lucide-react';
import type { DayReading } from '../model/types';
import { READING_TYPE_LABELS, READING_TYPE_ORDER } from '../model/types';

export interface PlainTextViewProps {
  day: DayReading;
}

/**
 * Accessibility fallback for users who prefer standard scroll reading.
 */
export function PlainTextView({ day }: PlainTextViewProps) {
  const orderedReadings = READING_TYPE_ORDER
    .map((type) => day.readings.find((reading) => reading.type === type))
    .filter((reading): reading is NonNullable<typeof reading> => reading !== undefined);

  return (
    <section className="px-4 pb-4 md:px-0" aria-label={`Lecturas del ${day.date}`}>
      <header className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-semibold text-slate-900">Lecturas del Día</h1>
        <p className="mt-2 text-sm md:text-base text-slate-500">Reflexiona con la Palabra de Dios</p>
        <p className="mt-4 text-sm text-slate-500 italic">
          {day.liturgicalDayName} · {day.date}
        </p>
      </header>

      <div>
        {orderedReadings.map((reading) => (
          <article key={reading.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 mb-6">
            <header className="mb-4">
              <div className="flex items-center gap-3">
                <BookOpen className="h-5 w-5 text-blue-600" aria-hidden="true" />
                <h2 className="text-xl md:text-2xl font-semibold text-slate-900">{READING_TYPE_LABELS[reading.type]}</h2>
              </div>
              <p className="mt-2 text-sm md:text-base italic text-gray-500">{reading.reference}</p>
            </header>
            <p
              className="text-lg leading-relaxed whitespace-pre-line text-gray-800"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              {reading.text}
            </p>
          </article>
        ))}
      </div>

      <footer className="bg-blue-50/50 border-l-4 border-blue-500 p-4 rounded-r-lg text-sm text-gray-600 text-center">
        Las lecturas se actualizan diariamente siguiendo el calendario litúrgico católico.
      </footer>
    </section>
  );
}
