import { CalendarDays, Clock, MapPin } from 'lucide-react';
import { ImageWithFallback } from '@/shared/ui';
import type { Event } from '../model/event.types';

export interface EventCardProps {
  event: Event;
  onClick: (event: Event) => void;
}

function formatEventDate(eventDate: string): string {
  const parsedDate = eventDate.includes('T') ? new Date(eventDate) : new Date(`${eventDate}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return eventDate;
  }

  return new Intl.DateTimeFormat('es-CO', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(parsedDate);
}

function formatEventTime(event: Event): string | null {
  if (event.start_time) {
    const parsedStartTime = new Date(`1970-01-01T${event.start_time}`);

    if (Number.isNaN(parsedStartTime.getTime())) {
      return event.start_time;
    }

    return new Intl.DateTimeFormat('es-CO', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(parsedStartTime);
  }

  const parsedDate = new Date(event.event_date);
  const hasTimeInDate = /T\d{2}:\d{2}/.test(event.event_date);

  if (Number.isNaN(parsedDate.getTime()) || !hasTimeInDate) {
    return null;
  }

  return new Intl.DateTimeFormat('es-CO', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(parsedDate);
}

export function EventCard({ event, onClick }: EventCardProps) {
  const hasImage = Boolean(event.image_url);
  const eventTime = formatEventTime(event);

  return (
    <article className="overflow-hidden rounded-xl border border-secondary/20 bg-surface shadow-sm transition-shadow hover:shadow-md">
      <div className="relative h-48 w-full overflow-hidden">
        {hasImage ? (
          <ImageWithFallback
            src={event.image_url!}
            alt={event.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-primary px-4 text-center text-primary-foreground">
            <span className="text-sm font-semibold">Imagen del evento no disponible</span>
          </div>
        )}
      </div>

      <div className="space-y-3 p-4">
        <h3 className="line-clamp-2 text-xl font-bold text-primary">{event.title}</h3>

        <div className="space-y-1 text-sm text-secondary/80">
          <p className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-primary" aria-hidden="true" />
            <span>{formatEventDate(event.event_date)}</span>
          </p>

          {eventTime ? (
            <p className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" aria-hidden="true" />
              <span>{eventTime}</span>
            </p>
          ) : null}

          {event.location ? (
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
              <span className="line-clamp-1">{event.location}</span>
            </p>
          ) : null}
        </div>

        <p className="line-clamp-3 text-base text-secondary/90">
          {event.description ?? 'Próximamente compartiremos más detalles de este evento.'}
        </p>

        <button
          type="button"
          onClick={() => onClick(event)}
          className="inline-flex cursor-pointer text-sm font-semibold text-primary underline underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          aria-label={`Leer más sobre el evento ${event.title}`}
        >
          Leer más
        </button>
      </div>
    </article>
  );
}
