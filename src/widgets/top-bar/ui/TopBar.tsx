import { MapPin, Phone } from 'lucide-react';
import type { TopBarData } from '../model/types';

export function TopBar({ motto, location, phone }: TopBarData) {
  return (
    <div className="bg-accent border-b border-secondary/20">
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-sm text-secondary/70">
        <div className="italic">{motto}</div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Phone className="w-4 h-4" />
            <span>{phone}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
