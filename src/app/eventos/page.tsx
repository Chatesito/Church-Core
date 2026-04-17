import type { Metadata } from 'next';
import { EventsPage } from '@/pages-flat/events';

export const metadata: Metadata = {
  title: 'Eventos Parroquiales',
  description: 'Conocé los próximos eventos y celebraciones de la parroquia.',
};

export default function EventosRoutePage() {
  return <EventsPage />;
}
