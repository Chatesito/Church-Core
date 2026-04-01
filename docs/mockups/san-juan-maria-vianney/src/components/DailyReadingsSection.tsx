import { useState } from "react";
import { BookOpen, Calendar, ChevronLeft, ChevronRight } from "lucide-react";

interface Reading {
  type: string;
  reference: string;
  text: string;
}

interface DayReading {
  date: string;
  liturgicalDay: string;
  readings: Reading[];
}

export function DailyReadingsSection() {
  const [selectedDate, setSelectedDate] = useState(0);

  const dailyReadings: DayReading[] = [
    {
      date: "8 de Diciembre, 2025",
      liturgicalDay: "Inmaculada Concepción de la Virgen María",
      readings: [
        {
          type: "Primera Lectura",
          reference: "Génesis 3, 9-15.20",
          text: "En aquellos días, después de que el hombre y la mujer comieron del fruto del árbol prohibido, el Señor Dios llamó al hombre y le preguntó: '¿Dónde estás?' El hombre contestó: 'Oí tus pasos en el jardín; y tuve miedo, porque estoy desnudo, y me escondí'..."
        },
        {
          type: "Salmo Responsorial",
          reference: "Salmo 97",
          text: "R. Canten al Señor un canto nuevo, porque ha hecho maravillas.\n\nCanten al Señor un canto nuevo, porque ha hecho maravillas. Su diestra y su santo brazo le han dado la victoria. R."
        },
        {
          type: "Segunda Lectura",
          reference: "Efesios 1, 3-6.11-12",
          text: "Hermanos: Bendito sea Dios, Padre de nuestro Señor Jesucristo, que nos ha bendecido en él con toda clase de bienes espirituales y celestiales. Él nos eligió en Cristo, antes de crear el mundo, para que fuéramos santos e irreprochables en su presencia..."
        },
        {
          type: "Evangelio",
          reference: "Lucas 1, 26-38",
          text: "En aquel tiempo, el ángel Gabriel fue enviado por Dios a una ciudad de Galilea, llamada Nazaret, a una virgen desposada con un varón de la estirpe de David, llamado José. La virgen se llamaba María. Entró el ángel a donde ella estaba y le dijo: 'Alégrate, llena de gracia, el Señor está contigo'..."
        }
      ]
    },
    {
      date: "7 de Diciembre, 2025",
      liturgicalDay: "Sábado de la I semana de Adviento",
      readings: [
        {
          type: "Primera Lectura",
          reference: "Isaías 30, 19-21.23-26",
          text: "Esto dice el Señor: Pueblo de Sión, que habitas en Jerusalén, no llorarás más. El Señor se apiadará de ti cuando grites y te responderá en cuanto te oiga..."
        },
        {
          type: "Salmo Responsorial",
          reference: "Salmo 146",
          text: "R. Dichosos los que esperan en el Señor.\n\nAlaba, alma mía, al Señor. Alabaré al Señor toda mi vida, mientras viva cantaré a mi Dios. R."
        },
        {
          type: "Evangelio",
          reference: "Mateo 9, 35-10, 1.6-8",
          text: "En aquel tiempo, Jesús recorría todas las ciudades y los poblados, enseñando en las sinagogas, proclamando la buena nueva del Reino y curando toda enfermedad y dolencia..."
        }
      ]
    },
    {
      date: "6 de Diciembre, 2025",
      liturgicalDay: "Viernes de la I semana de Adviento",
      readings: [
        {
          type: "Primera Lectura",
          reference: "Isaías 29, 17-24",
          text: "Esto dice el Señor: '¿Acaso no es verdad que dentro de poco tiempo el Líbano se convertirá en un vergel y el vergel parecerá un bosque?'..."
        },
        {
          type: "Salmo Responsorial",
          reference: "Salmo 26",
          text: "R. El Señor es mi luz y mi salvación.\n\nEl Señor es mi luz y mi salvación, ¿a quién voy a tenerle miedo? El Señor es la defensa de mi vida, ¿quién podrá hacerme temblar? R."
        },
        {
          type: "Evangelio",
          reference: "Mateo 9, 27-31",
          text: "En aquel tiempo, dos ciegos siguieron a Jesús, gritando: 'Hijo de David, ten compasión de nosotros'. Al llegar a la casa, los ciegos se le acercaron y Jesús les preguntó: '¿Creen que puedo hacerlo?'..."
        }
      ]
    }
  ];

  const goToPreviousDay = () => {
    if (selectedDate < dailyReadings.length - 1) {
      setSelectedDate(selectedDate + 1);
    }
  };

  const goToNextDay = () => {
    if (selectedDate > 0) {
      setSelectedDate(selectedDate - 1);
    }
  };

  const currentReading = dailyReadings[selectedDate];

  return (
    <div className="bg-white py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-4xl text-blue-900 mb-4">Lecturas del Día</h2>
          <p className="text-gray-600">Reflexiona con la Palabra de Dios</p>
        </div>

        {/* Date Navigation */}
        <div className="flex items-center justify-between mb-8 bg-gray-50 p-4 rounded-lg">
          <button
            onClick={goToPreviousDay}
            disabled={selectedDate >= dailyReadings.length - 1}
            className="flex items-center gap-2 text-blue-900 hover:text-blue-700 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Día anterior</span>
          </button>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-blue-900 mb-1">
              <Calendar className="w-5 h-5" />
              <span>{currentReading.date}</span>
            </div>
            <div className="text-gray-600 text-sm">{currentReading.liturgicalDay}</div>
          </div>
          
          <button
            onClick={goToNextDay}
            disabled={selectedDate <= 0}
            className="flex items-center gap-2 text-blue-900 hover:text-blue-700 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            <span className="hidden sm:inline">Día siguiente</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Readings */}
        <div className="space-y-8">
          {currentReading.readings.map((reading, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-start gap-3 mb-4">
                <BookOpen className="w-6 h-6 text-blue-900 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl text-blue-900">{reading.type}</h3>
                  <p className="text-gray-600 italic">{reading.reference}</p>
                </div>
              </div>
              <div className="text-gray-700 leading-relaxed whitespace-pre-line pl-9">
                {reading.text}
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-900 text-center">
            Las lecturas se actualizan diariamente siguiendo el calendario litúrgico católico.
          </p>
        </div>
      </div>
    </div>
  );
}