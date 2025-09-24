import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import InstructionsModal from './InstructionsModal';

const Header: React.FC = () => {
  const [showInstructions, setShowInstructions] = useState(false);

  return (
    <>
      <header className="bg-ucnnav text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          {/* Layout Desktop */}
          <div className="hidden lg:flex items-center justify-between">
            <button
              onClick={() => setShowInstructions(true)}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors duration-200 text-sm font-semibold shadow-lg"
            >
              <HelpCircle className="w-4 h-4" />
              ¿Cómo usar?
            </button>

            <div className="flex items-center gap-4">
              <img src="/disc.svg" alt="Logo UCN" className="w-14 h-14" />
              <div className="text-center">
                <h1 className="text-2xl xl:text-3xl font-bold tracking-tight">
                  Generador de Firmas Gmail
                </h1>
                <p className="text-blue-200 text-sm font-medium mt-1">
                  Universidad Católica del Norte
                </p>
              </div>
            </div>

            <div className="w-32"></div> {/* Spacer para centrar */}
          </div>

          {/* Layout Mobile/Tablet */}
          <div className="lg:hidden">
            <div className="flex items-center justify-center gap-3 sm:gap-4">
              <img 
                src="/disc.svg" 
                alt="Logo UCN" 
                className="w-10 h-10 sm:w-12 sm:h-12 shrink-0" 
              />
              <div className="text-center">
                <h1 className="text-lg sm:text-xl font-bold tracking-tight">
                  <span className="hidden sm:inline">Generador de Firmas Gmail</span>
                  <span className="sm:hidden">Firmas Gmail</span>
                </h1>
                <p className="text-blue-200 text-xs sm:text-sm font-medium mt-1">
                  Universidad Católica del Norte
                </p>
              </div>
            </div>

            <div className="flex justify-center mt-4">
              <button
                onClick={() => setShowInstructions(true)}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors duration-200 text-sm font-semibold shadow-lg"
              >
                <HelpCircle className="w-4 h-4" />
                ¿Cómo usar esta herramienta?
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Modal de Instrucciones */}
      <InstructionsModal
        isOpen={showInstructions}
        onClose={() => setShowInstructions(false)}
      />
    </>
  );
};

export default Header;