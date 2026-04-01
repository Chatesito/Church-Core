import { Users, Church, Calendar } from "lucide-react";

interface LearnMoreSectionProps {
  activePage: string;
}

export function LearnMoreSection({ activePage }: LearnMoreSectionProps) {
  const members = [
    { role: "Párroco", name: "Padre Juan Carlos Rodríguez", description: "Líder espiritual de nuestra comunidad" },
    { role: "Diácono", name: "Diácono Miguel Ángel Torres", description: "Servicio pastoral y litúrgico" },
    { role: "Coordinador de Música", name: "Carlos Mendoza", description: "Director del coro parroquial" },
    { role: "Secretaria Parroquial", name: "María Elena Gutiérrez", description: "Atención administrativa" }
  ];

  const groups = [
    { name: "Monaguillos", description: "Niños y jóvenes que sirven en el altar durante las celebraciones litúrgicas", schedule: "Ensayos: Sábados 10:00 AM" },
    { name: "Coro Parroquial", description: "Ministerio de música que anima las celebraciones eucarísticas", schedule: "Ensayos: Jueves 7:00 PM" },
    { name: "Catequistas", description: "Grupo dedicado a la formación en la fe de niños y jóvenes", schedule: "Reunión: Viernes 6:00 PM" },
    { name: "Grupo Juvenil", description: "Jóvenes comprometidos con su fe y servicio a la comunidad", schedule: "Reuniones: Domingos 4:00 PM" },
    { name: "Legión de María", description: "Grupo mariano dedicado a la oración y el servicio", schedule: "Reuniones: Martes 6:00 PM" }
  ];

  const activities = [
    { day: "Lunes", activity: "Adoración Eucarística", time: "7:00 PM - 8:00 PM", place: "Capilla" },
    { day: "Martes", activity: "Legión de María", time: "6:00 PM", place: "Salón Parroquial" },
    { day: "Miércoles", activity: "Lectio Divina", time: "7:00 PM", place: "Salón de Reuniones" },
    { day: "Jueves", activity: "Ensayo del Coro", time: "7:00 PM", place: "Templo" },
    { day: "Viernes", activity: "Reunión de Catequistas", time: "6:00 PM", place: "Aulas Catequísticas" },
    { day: "Sábado", activity: "Catequesis Familiar", time: "3:00 PM", place: "Aulas Catequísticas" },
    { day: "Sábado", activity: "Ensayo Monaguillos", time: "10:00 AM", place: "Templo" },
    { day: "Domingo", activity: "Grupo Juvenil", time: "4:00 PM", place: "Salón Parroquial" }
  ];

  const renderContent = () => {
    switch (activePage) {
      case "members":
        return (
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Users className="w-8 h-8 text-blue-900" />
              <h2 className="text-4xl text-blue-900">Miembros de la Iglesia</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {members.map((member, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                  <div className="text-sm text-blue-900 mb-1">{member.role}</div>
                  <h4 className="text-xl mb-2">{member.name}</h4>
                  <p className="text-gray-600">{member.description}</p>
                </div>
              ))}
            </div>
          </div>
        );
      
      case "groups":
        return (
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Church className="w-8 h-8 text-blue-900" />
              <h2 className="text-4xl text-blue-900">Grupos Parroquiales</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groups.map((group, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                  <h4 className="text-xl text-blue-900 mb-3">{group.name}</h4>
                  <p className="text-gray-600 mb-3">{group.description}</p>
                  <div className="text-sm text-gray-500 border-t border-gray-200 pt-3">
                    {group.schedule}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case "activities":
        return (
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Calendar className="w-8 h-8 text-blue-900" />
              <h2 className="text-4xl text-blue-900">Actividades Semanales</h2>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-blue-900 text-white">
                    <tr>
                      <th className="px-6 py-3 text-left">Día</th>
                      <th className="px-6 py-3 text-left">Actividad</th>
                      <th className="px-6 py-3 text-left">Horario</th>
                      <th className="px-6 py-3 text-left">Lugar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {activities.map((activity, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4">{activity.day}</td>
                        <td className="px-6 py-4">{activity.activity}</td>
                        <td className="px-6 py-4 text-gray-600">{activity.time}</td>
                        <td className="px-6 py-4 text-gray-600">{activity.place}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        {renderContent()}
      </div>
    </div>
  );
}