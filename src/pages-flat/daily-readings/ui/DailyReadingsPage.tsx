import { DailyReadingsBook } from '@/widgets';
import { mockReadings } from '@/widgets/daily-readings-book/_mocks/readings.mock';

export default function DailyReadingsPage() {
  const initialDayReading = mockReadings[0];

  return <DailyReadingsBook initialDayReading={initialDayReading} />;
}
