'use client';

import { useState } from 'react';
import { EventCard, type Event } from '@/entities/events';
import { EventDetailModal } from '@/features/event-detail-modal/ui/event-detail-modal';

export interface EventsGridProps {
  events: Event[];
}

export function EventsGrid({ events }: EventsGridProps) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  if (events.length === 0) {
    return (
      <div className="rounded-xl border border-secondary/20 bg-surface px-6 py-10 text-center text-secondary">
        <p className="text-lg font-semibold text-primary">No upcoming events</p>
        <p className="mt-2 text-base text-secondary/90">Pronto compartiremos nuevos eventos parroquiales.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.id} event={event} onClick={setSelectedEvent} />
        ))}
      </div>

      <EventDetailModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </>
  );
}
