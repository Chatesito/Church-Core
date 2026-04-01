import { MapPin, Phone } from "lucide-react";

export function TopBar() {
  return (
    <div className="bg-gray-100 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-sm text-gray-600">
        <div className="italic">
          "En Cristo somos una familia de fe"
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>Huila – Neiva</span>
          </div>
          <div className="flex items-center gap-1">
            <Phone className="w-4 h-4" />
            <span>(608) 871-2345</span>
          </div>
        </div>
      </div>
    </div>
  );
}
