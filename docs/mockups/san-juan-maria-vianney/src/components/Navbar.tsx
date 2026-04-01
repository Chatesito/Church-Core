import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

interface NavbarProps {
  onNavigate: (section: string) => void;
  currentPage: string;
}

export function Navbar({ onNavigate, currentPage }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleNavClick = (section: string) => {
    onNavigate(section);
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Church Name */}
          <div className="flex-shrink-0">
            <button
              onClick={() => handleNavClick("home")}
              className="text-blue-900 hover:text-blue-700 transition-colors"
            >
              Parroquia San Juan María Vianney
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => handleNavClick("home")}
              className={`transition-colors ${
                currentPage === "home" 
                  ? "text-blue-900 border-b-2 border-blue-900" 
                  : "text-gray-700 hover:text-blue-900"
              }`}
            >
              Inicio
            </button>
            <button
              onClick={() => handleNavClick("events")}
              className={`transition-colors ${
                currentPage === "events" 
                  ? "text-blue-900 border-b-2 border-blue-900" 
                  : "text-gray-700 hover:text-blue-900"
              }`}
            >
              Eventos
            </button>
            <button
              onClick={() => handleNavClick("readings")}
              className={`transition-colors ${
                currentPage === "readings" 
                  ? "text-blue-900 border-b-2 border-blue-900" 
                  : "text-gray-700 hover:text-blue-900"
              }`}
            >
              Lecturas del Día
            </button>
            
            {/* Learn More Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`flex items-center gap-1 transition-colors ${
                  ["members", "groups", "activities"].includes(currentPage)
                    ? "text-blue-900 border-b-2 border-blue-900" 
                    : "text-gray-700 hover:text-blue-900"
                }`}
              >
                Conoce Más
                <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                  <button
                    onClick={() => handleNavClick("members")}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Miembros de la Iglesia
                  </button>
                  <button
                    onClick={() => handleNavClick("groups")}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Grupos Parroquiales
                  </button>
                  <button
                    onClick={() => handleNavClick("activities")}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Actividades Semanales
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <button
              onClick={() => handleNavClick("home")}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Inicio
            </button>
            <button
              onClick={() => handleNavClick("events")}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Eventos
            </button>
            <button
              onClick={() => handleNavClick("readings")}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Lecturas del Día
            </button>
            <div className="px-4 py-2 text-gray-500 text-sm">Conoce Más</div>
            <button
              onClick={() => handleNavClick("members")}
              className="block w-full text-left px-8 py-2 text-gray-700 hover:bg-gray-100"
            >
              Miembros de la Iglesia
            </button>
            <button
              onClick={() => handleNavClick("groups")}
              className="block w-full text-left px-8 py-2 text-gray-700 hover:bg-gray-100"
            >
              Grupos Parroquiales
            </button>
            <button
              onClick={() => handleNavClick("activities")}
              className="block w-full text-left px-8 py-2 text-gray-700 hover:bg-gray-100"
            >
              Actividades Semanales
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}