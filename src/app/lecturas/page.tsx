import type { Metadata } from 'next';
import { DailyReadingsPage } from '@/pages-flat/daily-readings';

export const metadata: Metadata = {
  title: 'Lecturas del Día',
  description: 'Lecturas de la liturgia católica',
};

export default function LecturasPage() {
  return <DailyReadingsPage />;
}
