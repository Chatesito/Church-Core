import { createTenantId, createTimestamp, createUUID } from '@/shared/types';
import type { Event } from '@/entities/events';
import { EventsGrid } from './events-grid';

const MOCK_EVENTS: Event[] = [
  {
    id: createUUID('11111111-1111-1111-1111-111111111111'),
    tenant_id: createTenantId('san-juan-maria-vianney'),
    created_at: createTimestamp('2026-04-01T08:00:00.000Z'),
    updated_at: createTimestamp('2026-04-01T08:00:00.000Z'),
    title: 'Retiro de Cuaresma Parroquial',
    description:
      'Jornada espiritual para toda la comunidad con momentos de oración, confesiones y adoración eucarística. Traé tu Biblia y cuaderno para las reflexiones guiadas.',
    event_date: '2026-04-24',
    start_time: '08:30',
    end_time: '16:00',
    location: 'Salón Parroquial San Juan María Vianney',
    event_type: 'retreat',
    status: 'published',
    is_recurring: false,
    image_url:
      'https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: createUUID('22222222-2222-2222-2222-222222222222'),
    tenant_id: createTenantId('san-juan-maria-vianney'),
    created_at: createTimestamp('2026-04-02T08:00:00.000Z'),
    updated_at: createTimestamp('2026-04-02T08:00:00.000Z'),
    title: 'Bingo Solidario Pro-Obras del Templo',
    description:
      'Actividad comunitaria para recaudar fondos destinados al mantenimiento del templo parroquial. Habrá premios, refrigerio y espacios para compartir en familia.',
    event_date: '2026-05-03',
    start_time: '15:00',
    end_time: '19:30',
    location: 'Cancha cubierta de la parroquia',
    event_type: 'charitable',
    status: 'published',
    is_recurring: false,
  },
  {
    id: createUUID('33333333-3333-3333-3333-333333333333'),
    tenant_id: createTenantId('san-juan-maria-vianney'),
    created_at: createTimestamp('2026-04-03T08:00:00.000Z'),
    updated_at: createTimestamp('2026-04-03T08:00:00.000Z'),
    title: 'Fiesta Patronal de San Juan María Vianney',
    description:
      'Celebración principal del año con Eucaristía solemne, procesión, presentación del coro parroquial y encuentro fraterno abierto a todos los feligreses.',
    event_date: '2026-08-04',
    start_time: '10:00',
    end_time: '14:00',
    location: 'Templo principal y atrio parroquial',
    event_type: 'liturgical',
    status: 'published',
    is_recurring: false,
    image_url:
      'https://images.unsplash.com/photo-1519491050282-cf00c82424b4?auto=format&fit=crop&w=1400&q=80',
  },
];

async function getEvents(): Promise<Event[]> {
  return Promise.resolve(MOCK_EVENTS);
}

export async function EventsSection() {
  const events = await getEvents();

  return (
    <section aria-labelledby="events-section-title" className="space-y-6">
      <header className="space-y-2">
        <h2 id="events-section-title" className="text-3xl font-bold tracking-tight text-primary">
          Próximos Eventos
        </h2>
      </header>

      <EventsGrid events={events} />
    </section>
  );
}
