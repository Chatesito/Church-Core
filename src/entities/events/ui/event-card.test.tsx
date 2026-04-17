import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { createElement } from 'react';

import { createTenantId, createTimestamp, createUUID } from '@/shared/types';
import type { Event } from '../model/event.types';
import { EventCard } from './event-card';

function buildEvent(overrides?: Partial<Event>): Event {
  return {
    id: createUUID('123e4567-e89b-12d3-a456-426614174001'),
    tenant_id: createTenantId('sanjuan'),
    created_at: createTimestamp('2026-01-01T00:00:00Z'),
    updated_at: createTimestamp('2026-01-01T00:00:00Z'),
    title: 'Fiesta Patronal',
    event_date: '2026-08-04',
    event_type: 'liturgical',
    status: 'published',
    is_recurring: false,
    description: 'Celebración parroquial',
    location: 'Templo principal',
    ...overrides,
  };
}

describe('EventCard', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders fallback placeholder when image_url is undefined', () => {
    const eventWithoutImage = buildEvent({ image_url: undefined });

    render(createElement(EventCard, { event: eventWithoutImage, onClick: vi.fn() }));

    expect(screen.getByText('Imagen del evento no disponible')).toBeInTheDocument();
  });

  it('applies line-clamp class for long descriptions', () => {
    const eventWithLongDescription = buildEvent({
      description:
        'Texto largo. '.repeat(120),
    });

    const { container } = render(
      createElement(EventCard, { event: eventWithLongDescription, onClick: vi.fn() }),
    );

    const descriptionText = container.querySelector('p.line-clamp-3');

    expect(descriptionText).not.toBeNull();
    expect(descriptionText).toHaveClass('line-clamp-3');
  });

  it('uses theme token classes for contrast and avoids hardcoded tenant colors', () => {
    const event = buildEvent({ image_url: undefined });

    const { container } = render(createElement(EventCard, { event, onClick: vi.fn() }));

    const article = container.querySelector('article');
    const title = screen.getByRole('heading', { level: 3, name: event.title });
    const description = screen.getByText(event.description!);
    const fallback = screen.getByText('Imagen del evento no disponible').closest('div');

    expect(article).toHaveClass('bg-surface');
    expect(article).toHaveClass('border-secondary/20');
    expect(title).toHaveClass('text-primary');
    expect(description).toHaveClass('text-secondary/90');
    expect(fallback).toHaveClass('bg-primary');
    expect(fallback).not.toHaveClass('bg-yellow-500');
    expect(fallback).not.toHaveClass('text-black');
  });

  it('opens details only when clicking the Leer más button', async () => {
    const user = userEvent.setup();
    const event = buildEvent();
    const onClick = vi.fn();

    const { container } = render(createElement(EventCard, { event, onClick }));

    const article = container.querySelector('article');

    expect(article).not.toBeNull();

    await user.click(article!);

    expect(onClick).not.toHaveBeenCalled();

    await user.click(screen.getByRole('button', { name: `Leer más sobre el evento ${event.title}` }));

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith(event);
  });
});
