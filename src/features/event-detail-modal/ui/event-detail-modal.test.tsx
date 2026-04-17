import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { createElement } from 'react';

import { createTenantId, createTimestamp, createUUID } from '@/shared/types';
import type { Event } from '@/entities/events';
import { EventDetailModal } from './event-detail-modal';

function buildEvent(overrides?: Partial<Event>): Event {
  return {
    id: createUUID('123e4567-e89b-12d3-a456-426614174002'),
    tenant_id: createTenantId('sanjuan'),
    created_at: createTimestamp('2026-01-01T00:00:00Z'),
    updated_at: createTimestamp('2026-01-01T00:00:00Z'),
    title: 'Retiro de Adviento',
    event_date: '2026-12-01',
    event_type: 'retreat',
    status: 'published',
    is_recurring: false,
    description: 'Jornada espiritual de preparación.',
    ...overrides,
  };
}

describe('EventDetailModal', () => {
  afterEach(() => {
    cleanup();
  });

  it('dismisses modal when Escape key is pressed', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(createElement(EventDetailModal, { event: buildEvent(), onClose }));

    await user.keyboard('{Escape}');

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('dismisses modal when backdrop is clicked', () => {
    const onClose = vi.fn();

    const { container } = render(createElement(EventDetailModal, { event: buildEvent(), onClose }));

    const backdrop = container.querySelector('[role="presentation"]');
    expect(backdrop).not.toBeNull();

    if (!backdrop) {
      return;
    }

    fireEvent.mouseDown(backdrop);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('traps focus inside modal and exposes aria-modal semantics', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <>
        <button type="button">Outside trigger</button>
        <EventDetailModal event={buildEvent()} onClose={onClose} />
      </>,
    );

    const dialog = screen.getByRole('dialog', { name: 'Retiro de Adviento' });
    const closeButton = screen.getByRole('button', { name: 'Cerrar detalles del evento' });

    expect(dialog).toHaveAttribute('aria-modal', 'true');

    await user.tab();
    expect(closeButton).toHaveFocus();

    await user.tab();
    expect(closeButton).toHaveFocus();

    await user.tab({ shift: true });
    expect(closeButton).toHaveFocus();
  });

  it('renders event image and opens/closes lightbox with Escape', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      createElement(EventDetailModal, {
        event: buildEvent({ image_url: 'https://example.com/event.jpg' }),
        onClose,
      }),
    );

    const inlineImageButton = screen.getByRole('button', {
      name: 'Ampliar imagen del evento Retiro de Adviento',
    });

    await user.click(inlineImageButton);

    expect(screen.getByRole('button', { name: 'Cerrar imagen ampliada' })).toBeInTheDocument();
    expect(screen.getByAltText('Vista ampliada de Retiro de Adviento')).toBeInTheDocument();

    await user.keyboard('{Escape}');

    expect(screen.queryByRole('button', { name: 'Cerrar imagen ampliada' })).not.toBeInTheDocument();
    expect(onClose).not.toHaveBeenCalled();
  });

  it('shows event time metadata and supports zoom controls in lightbox', async () => {
    const user = userEvent.setup();

    render(
      createElement(EventDetailModal, {
        event: buildEvent({ image_url: 'https://example.com/event.jpg', start_time: '18:30:00' }),
        onClose: vi.fn(),
      }),
    );

    expect(screen.getByText('18:30')).toBeInTheDocument();

    const inlineImageButton = screen.getByRole('button', {
      name: 'Ampliar imagen del evento Retiro de Adviento',
    });
    await user.click(inlineImageButton);

    const enlargedImage = screen.getByAltText('Vista ampliada de Retiro de Adviento');

    await user.click(screen.getByRole('button', { name: 'Aumentar zoom' }));
    expect(enlargedImage).toHaveStyle({ transform: 'scale(1.25)' });

    await user.click(screen.getByRole('button', { name: 'Reducir zoom' }));
    expect(enlargedImage).toHaveStyle({ transform: 'scale(1)' });
  });

  it('closes lightbox on backdrop click and keeps modal open', () => {
    const onClose = vi.fn();

    const { container } = render(
      createElement(EventDetailModal, {
        event: buildEvent({ image_url: 'https://example.com/event.jpg' }),
        onClose,
      }),
    );

    const inlineImageButton = screen.getByRole('button', {
      name: 'Ampliar imagen del evento Retiro de Adviento',
    });
    fireEvent.click(inlineImageButton);

    const overlays = container.querySelectorAll('[role="presentation"]');
    const lightboxBackdrop = overlays[1];

    expect(lightboxBackdrop).toBeDefined();

    if (!lightboxBackdrop) {
      return;
    }

    fireEvent.mouseDown(lightboxBackdrop);

    expect(screen.queryByRole('button', { name: 'Cerrar imagen ampliada' })).not.toBeInTheDocument();
    expect(screen.getByRole('dialog', { name: 'Retiro de Adviento' })).toBeInTheDocument();
    expect(onClose).not.toHaveBeenCalled();
  });
});
