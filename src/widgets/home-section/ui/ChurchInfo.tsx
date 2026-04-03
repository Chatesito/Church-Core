import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import type { ContactInfo, Schedule } from '../model/types';

export interface ChurchInfoProps {
  contact: ContactInfo;
  massSchedule: Schedule;
  officeHours: Schedule;
}

export function ChurchInfo({ contact, massSchedule, officeHours }: ChurchInfoProps) {
  return (
    <div>
      <h2 className="text-3xl text-primary mb-6 font-bold">Información General</h2>

      <div className="space-y-6">
        {/* Address */}
        <div className="flex gap-3">
          <MapPin className="w-6 h-6 text-primary flex-shrink-0" />
          <div>
            <div className="font-semibold">Dirección</div>
            <p className="text-secondary/70">{contact.address}</p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex gap-3">
          <Phone className="w-6 h-6 text-primary flex-shrink-0" />
          <div>
            <div className="font-semibold">Teléfono</div>
            <p className="text-secondary/70">{contact.phone}</p>
          </div>
        </div>

        {/* Email */}
        <div className="flex gap-3">
          <Mail className="w-6 h-6 text-primary flex-shrink-0" />
          <div>
            <div className="font-semibold">Correo Electrónico</div>
            <p className="text-secondary/70">{contact.email}</p>
          </div>
        </div>

        {/* Mass Schedule */}
        <div className="flex gap-3">
          <Clock className="w-6 h-6 text-primary flex-shrink-0" />
          <div>
            <div className="font-semibold">{massSchedule.label}</div>
            <div className="text-secondary/70 space-y-1 mt-1">
              {massSchedule.times.map((time, index) => (
                <p key={index}>{time}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Office Hours */}
        <div className="flex gap-3">
          <Clock className="w-6 h-6 text-primary flex-shrink-0" />
          <div>
            <div className="font-semibold">{officeHours.label}</div>
            <div className="text-secondary/70 space-y-1 mt-1">
              {officeHours.times.map((time, index) => (
                <p key={index}>{time}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
