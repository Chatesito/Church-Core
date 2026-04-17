import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { createElement } from 'react';

import { createTenantId, createTimestamp, createUUID } from '@/shared/types';
import type { Event } from '@/entities/events';
import { EventsGrid } from './events-grid';

function buildEvent(overrides?: Partial<Event>): Event {
  return {
    id: createUUID('123e4567-e89b-12d3-a456-426614174003'),
    tenant_id: createTenantId('sanjuan'),
    created_at: createTimestamp('2026-01-01T00:00:00Z'),
    updated_at: createTimestamp('2026-01-01T00:00:00Z'),
    title: 'Bingo Parroquial',
    event_date: '2026-09-18',
    event_type: 'social',
    status: 'published',
    is_recurring: false,
    description: 'Evento solidario para recaudar fondos.',
    location: 'Salón parroquial',
    ...overrides,
  };
}

describe('EventsGrid', () => {
  it('opens the event detail modal when clicking the Leer más button', async () => {
    const user = userEvent.setup();
    const event = buildEvent();

    render(createElement(EventsGrid, { events: [event] }));

    await user.click(screen.getByRole('button', { name: `Leer más sobre el evento ${event.title}` }));

    const dialog = screen.getByRole('dialog');

    expect(dialog).toBeInTheDocument();
    expect(within(dialog).getByRole('heading', { name: event.title })).toBeInTheDocument();
  });
});
