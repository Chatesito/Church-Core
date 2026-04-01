import { useState } from "react";
import { Calendar, Clock, MapPin, ChevronRight } from "lucide-react";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  place: string;
  description: string;
}

export function EventsSection() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const events: Event[] = [
    {
      id: 1,
      title: "Misa de Navidad",
      date: "24 de Diciembre, 2025",
      time: "11:00 PM",
      place: "Templo Principal",
      description: "Celebremos juntos el nacimiento de nuestro Señor Jesucristo. Una noche especial de oración, alabanza y reflexión. Todos están invitados a compartir este momento de paz y alegría en comunidad."
    },
    {
      id: 2,
      title: "Retiro Espiritual para Jóvenes",
      date: "15 de Enero, 2026",
      time: "9:00 AM - 5:00 PM",
      place: "Salón Parroquial",
      description: "Un día completo dedicado al crecimiento espiritual de nuestros jóvenes. Incluye charlas, dinámicas de grupo, tiempo de oración y reflexión personal. Se compartirá el almuerzo."
    },
    {
      id: 3,
      title: "Catequesis Familiar",
      date: "Todos los Sábados",
      time: "3:00 PM",
      place: "Aulas Catequísticas",
      description: "Preparación para los sacramentos de Primera Comunión y Confirmación. Un espacio de aprendizaje y crecimiento en la fe para toda la familia."
    },
    {
      id: 4,
      title: "Adoración Eucarística",
      date: "Primer Viernes de cada mes",
      time: "7:00 PM - 9:00 PM",
      place: "Templo Principal",
      description: "Momento de adoración al Santísimo Sacramento. Un tiempo especial para estar en la presencia del Señor, orar por nuestras necesidades y agradecer sus bendiciones."
    },
    {
      id: 5,
      title: "Servicio Comunitario",
      date: "20 de Enero, 2026",
      time: "8:00 AM",
      place: "Punto de encuentro: Parroquia",
      description: "Actividad de servicio a la comunidad. Visitaremos hogares de ancianos y llevaremos alimentos a familias necesitadas. Una oportunidad para vivir el evangelio en acción."
    }
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl text-blue-900 mb-8 text-center">Próximos Eventos</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl text-blue-900 mb-4">{event.title}</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-2 text-gray-600">
                    <Calendar className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>{event.date}</span>
                  </div>
                  
                  <div className="flex items-start gap-2 text-gray-600">
                    <Clock className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>{event.time}</span>
                  </div>
                  
                  <div className="flex items-start gap-2 text-gray-600">
                    <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>{event.place}</span>
                  </div>
                </div>
                
                <button
                  onClick={() => setSelectedEvent(event)}
                  className="flex items-center gap-2 text-blue-900 hover:text-blue-700 transition-colors"
                >
                  Ver detalles completos
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedEvent(null)}
        >
          <div 
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <h3 className="text-3xl text-blue-900 mb-6">{selectedEvent.title}</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-gray-700">
                  <Calendar className="w-6 h-6 text-blue-900" />
                  <span>{selectedEvent.date}</span>
                </div>
                
                <div className="flex items-center gap-3 text-gray-700">
                  <Clock className="w-6 h-6 text-blue-900" />
                  <span>{selectedEvent.time}</span>
                </div>
                
                <div className="flex items-center gap-3 text-gray-700">
                  <MapPin className="w-6 h-6 text-blue-900" />
                  <span>{selectedEvent.place}</span>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6 mb-6">
                <h4 className="text-xl mb-3">Descripción</h4>
                <p className="text-gray-600 leading-relaxed">{selectedEvent.description}</p>
              </div>
              
              <button
                onClick={() => setSelectedEvent(null)}
                className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}