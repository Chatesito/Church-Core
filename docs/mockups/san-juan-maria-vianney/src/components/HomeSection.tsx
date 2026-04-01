import { useState } from "react";
import { ChevronLeft, ChevronRight, Clock, MapPin, Phone, Mail } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function HomeSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1608569569089-5d2e3e644ea6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBidWlsZGluZyUyMGV4dGVyaW9yfGVufDF8fHx8MTc2NTE0ODcxNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Bienvenidos a Nuestra Parroquia",
      subtitle: "Un lugar de fe, esperanza y amor"
    },
    {
      image: "https://images.unsplash.com/photo-1631656773931-dda2e0c51b26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBpbnRlcmlvciUyMGFsdGFyfGVufDF8fHx8MTc2NTE1MzYwMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Celebremos Juntos",
      subtitle: "Te esperamos en nuestras celebraciones"
    },
    {
      image: "https://images.unsplash.com/photo-1761640864240-f793d7ec8348?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWxpZ2lvdXMlMjBjb21tdW5pdHklMjBnYXRoZXJpbmd8ZW58MXx8fHwxNzY1MjE5ODEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Somos Comunidad",
      subtitle: "Unidos en Cristo, crecemos en fe"
    }
  ];

  const galleryImages = [
    "https://images.unsplash.com/photo-1608569569089-5d2e3e644ea6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBidWlsZGluZyUyMGV4dGVyaW9yfGVufDF8fHx8MTc2NTE0ODcxNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1631656773931-dda2e0c51b26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBpbnRlcmlvciUyMGFsdGFyfGVufDF8fHx8MTc2NTE1MzYwMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1761640864240-f793d7ec8348?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWxpZ2lvdXMlMjBjb21tdW5pdHklMjBnYXRoZXJpbmd8ZW58MXx8fHwxNzY1MjE5ODEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1638722843611-425345688b16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaWJsZSUyMHJlYWRpbmclMjBzcGlyaXR1YWx8ZW58MXx8fHwxNzY1MjE5ODExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="bg-white">
      {/* Hero Slider */}
      <div className="relative h-[500px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <ImageWithFallback
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h1 className="text-5xl mb-4">{slide.title}</h1>
                <p className="text-xl">{slide.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
        
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-all"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-all"
        >
          <ChevronRight className="w-6 h-6 text-gray-800" />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Church Information */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Column - Info */}
          <div>
            <h2 className="text-3xl text-blue-900 mb-6">Información General</h2>
            
            <div className="space-y-6">
              {/* Address */}
              <div className="flex gap-3">
                <MapPin className="w-6 h-6 text-blue-900 flex-shrink-0" />
                <div>
                  <div>Dirección</div>
                  <p className="text-gray-600">Carrera 5 # 12-34, Neiva, Huila</p>
                </div>
              </div>

              {/* Contact */}
              <div className="flex gap-3">
                <Phone className="w-6 h-6 text-blue-900 flex-shrink-0" />
                <div>
                  <div>Teléfono</div>
                  <p className="text-gray-600">(608) 871-2345</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Mail className="w-6 h-6 text-blue-900 flex-shrink-0" />
                <div>
                  <div>Correo Electrónico</div>
                  <p className="text-gray-600">parroquia@sjmvianney.org</p>
                </div>
              </div>

              {/* Mass Schedule */}
              <div className="flex gap-3">
                <Clock className="w-6 h-6 text-blue-900 flex-shrink-0" />
                <div>
                  <div>Horarios de Misa</div>
                  <div className="text-gray-600 space-y-1 mt-1">
                    <p>Lunes a Viernes: 6:00 AM y 6:00 PM</p>
                    <p>Sábados: 6:00 AM y 6:00 PM</p>
                    <p>Domingos: 7:00 AM, 9:00 AM, 11:00 AM y 6:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <div className="flex gap-3">
                <Clock className="w-6 h-6 text-blue-900 flex-shrink-0" />
                <div>
                  <div>Horario de Oficina</div>
                  <div className="text-gray-600 space-y-1 mt-1">
                    <p>Lunes a Viernes: 8:00 AM - 12:00 PM, 2:00 PM - 6:00 PM</p>
                    <p>Sábados: 8:00 AM - 12:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Gallery */}
          <div>
            <h2 className="text-3xl text-blue-900 mb-6">Galería</h2>
            <div className="grid grid-cols-2 gap-4">
              {galleryImages.map((image, index) => (
                <div key={index} className="aspect-square overflow-hidden rounded-lg">
                  <ImageWithFallback
                    src={image}
                    alt={`Galería ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Google Maps */}
        <div className="mt-12">
          <h2 className="text-3xl text-blue-900 mb-6">Ubicación</h2>
          <div className="w-full h-96 bg-gray-200 rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.1234567890!2d-75.28!3d2.93!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM8KwNTUnNDguMCJOIDc1wrAxNic0OC4wIlc!5e0!3m2!1ses!2sco!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de la Parroquia"
            />
          </div>
        </div>
      </div>
    </div>
  );
}