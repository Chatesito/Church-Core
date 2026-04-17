'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { CalendarDays, Clock, MapPin, X, ZoomIn, ZoomOut } from 'lucide-react';
import type { Event } from '@/entities/events';
import { ImageWithFallback } from '@/shared/ui';

export interface EventDetailModalProps {
  event: Event | null;
  onClose: () => void;
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

export function EventDetailModal({ event, onClose }: EventDetailModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const lightboxContainerRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const [isImageExpanded, setIsImageExpanded] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [startY, setStartY] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const eventTime = event ? formatEventTime(event) : null;

  useEffect(() => {
    setIsImageExpanded(false);
    setZoomLevel(1);
  }, [event?.id]);

  useEffect(() => {
    if (!event) {
      return;
    }

    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const focusableElements = dialogRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );

    const firstFocusable = focusableElements?.[0] ?? dialogRef.current;
    firstFocusable?.focus();

    const handleKeyDown = (keyboardEvent: KeyboardEvent) => {
      if (!dialogRef.current) {
        return;
      }

      if (keyboardEvent.key === 'Escape') {
        keyboardEvent.preventDefault();

        if (isImageExpanded) {
          setIsImageExpanded(false);
          return;
        }

        onClose();
        return;
      }

      if (isImageExpanded) {
        return;
      }

      if (keyboardEvent.key !== 'Tab') {
        return;
      }

      const focusableNodes = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );

      if (focusableNodes.length === 0) {
        keyboardEvent.preventDefault();
        dialogRef.current.focus();
        return;
      }

      const first = focusableNodes[0];
      const last = focusableNodes[focusableNodes.length - 1];
      const current = document.activeElement;

      if (keyboardEvent.shiftKey && current === first) {
        keyboardEvent.preventDefault();
        last.focus();
        return;
      }

      if (!keyboardEvent.shiftKey && current === last) {
        keyboardEvent.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [event, isImageExpanded, onClose]);

  if (!event) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-secondary/70 p-4"
      role="presentation"
      onMouseDown={(mouseEvent) => {
        if (mouseEvent.target === mouseEvent.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        tabIndex={-1}
        className="flex h-full w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-secondary/20 bg-surface text-secondary shadow-xl"
      >
        <header className="flex items-start justify-between gap-3 border-b border-secondary/15 px-6 py-4">
          <div className="space-y-2">
            <h2 id={titleId} className="text-2xl font-bold text-primary">
              {event.title}
            </h2>

            <div className="space-y-1 text-sm text-secondary/90">
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
                  <span>{event.location}</span>
                </p>
              ) : null}
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-secondary/20 text-secondary transition-colors hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            aria-label="Cerrar detalles del evento"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-5" id={descriptionId}>
          {event.image_url ? (
            <button
              type="button"
              className="mb-5 block w-full cursor-pointer overflow-hidden rounded-xl border border-secondary/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              onClick={() => {
                setZoomLevel(1);
                setIsImageExpanded(true);
              }}
              aria-label={`Ampliar imagen del evento ${event.title}`}
            >
              <ImageWithFallback
                src={event.image_url}
                alt={event.title}
                width={1200}
                height={700}
                draggable={false}
                className="h-auto w-full cursor-pointer object-cover"
              />
            </button>
          ) : null}

          <p className="whitespace-pre-line text-base leading-relaxed text-secondary">
            {event.description ?? 'Próximamente compartiremos más detalles de este evento.'}
          </p>
        </div>
      </div>

      {isImageExpanded && event.image_url ? (
        <div
          ref={lightboxContainerRef}
          className={`fixed inset-0 z-[60] overflow-auto bg-secondary/90 p-4 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          role="presentation"
          onMouseDown={(mouseEvent) => {
            if (mouseEvent.target === mouseEvent.currentTarget) {
              setIsImageExpanded(false);
              setZoomLevel(1);
              setIsDragging(false);
              return;
            }

            const scrollContainer = lightboxContainerRef.current;

            if (!scrollContainer) {
              return;
            }

            setIsDragging(true);
            setStartX(mouseEvent.pageX);
            setScrollLeft(scrollContainer.scrollLeft);
            setStartY(mouseEvent.pageY);
            setScrollTop(scrollContainer.scrollTop);
          }}
          onMouseLeave={() => {
            setIsDragging(false);
          }}
          onMouseUp={() => {
            setIsDragging(false);
          }}
          onMouseMove={(mouseEvent) => {
            if (!isDragging) {
              return;
            }

            mouseEvent.preventDefault();

            const scrollContainer = lightboxContainerRef.current;

            if (!scrollContainer) {
              return;
            }

            const xDistance = mouseEvent.pageX - startX;
            const yDistance = mouseEvent.pageY - startY;

            scrollContainer.scrollLeft = scrollLeft - xDistance;
            scrollContainer.scrollTop = scrollTop - yDistance;
          }}
        >
          <div className="pointer-events-none fixed right-4 top-4 z-[61] flex items-center gap-2">
            <button
              type="button"
              onClick={() => setZoomLevel((previous) => Math.max(1, Number((previous - 0.25).toFixed(2))))}
              className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-surface/40 bg-surface/85 text-secondary transition-colors hover:bg-surface hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-secondary"
              aria-label="Reducir zoom"
            >
              <ZoomOut className="h-5 w-5" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => setZoomLevel((previous) => Math.min(3, Number((previous + 0.25).toFixed(2))))}
              className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-surface/40 bg-surface/85 text-secondary transition-colors hover:bg-surface hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-secondary"
              aria-label="Aumentar zoom"
            >
              <ZoomIn className="h-5 w-5" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => {
                setIsImageExpanded(false);
                setZoomLevel(1);
              }}
              className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-surface/40 bg-surface/85 text-secondary transition-colors hover:bg-surface hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-secondary"
              aria-label="Cerrar imagen ampliada"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div className="flex min-h-full min-w-full items-center justify-center">
            <ImageWithFallback
              src={event.image_url}
              alt={`Vista ampliada de ${event.title}`}
              width={1600}
              height={1200}
              draggable={false}
              style={{ transform: `scale(${zoomLevel})` }}
              className="max-h-[90vh] w-auto max-w-full transform object-contain"
            />
          </div>

        </div>
      ) : null}
    </div>
  );
}
