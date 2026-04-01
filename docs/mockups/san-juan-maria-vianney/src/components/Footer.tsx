import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo/Church Name */}
          <div>
            <h3 className="text-2xl mb-4">Parroquia San Juan María Vianney</h3>
            <p className="text-blue-200">
              Una comunidad de fe, esperanza y amor en el corazón de Neiva.
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-xl mb-4">Contacto</h4>
            <div className="space-y-3 text-blue-200">
              <div className="flex items-start gap-2">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>Carrera 5 # 12-34, Neiva, Huila</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                <span>(608) 871-2345</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                <span>parroquia@sjmvianney.org</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <div>Lunes a Viernes: 8:00 AM - 12:00 PM, 2:00 PM - 6:00 PM</div>
                  <div>Sábados: 8:00 AM - 12:00 PM</div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-xl mb-4">Síguenos</h4>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-800 hover:bg-blue-700 p-3 rounded-full transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-800 hover:bg-blue-700 p-3 rounded-full transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-800 hover:bg-blue-700 p-3 rounded-full transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-6 h-6" />
              </a>
            </div>
            <div className="mt-6 text-blue-200 text-sm">
              <p>Transmisiones en vivo de nuestras Misas todos los domingos a las 11:00 AM</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-blue-800 pt-8 text-center text-blue-200">
          <p>&copy; 2025 Parroquia San Juan María Vianney - Neiva. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
