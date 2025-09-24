import React from 'react';
import { Mail, CaseSensitive as University } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-ucnnav text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <img 
              src="/disc.svg" 
              alt="Logo UCN" 
              className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 shrink-0" 
            />
            <div className="text-center sm:text-left">
              <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold tracking-tight">
                <span className="hidden sm:inline">Generador de Firmas Gmail</span>
                <span className="sm:hidden">Firmas Gmail</span>
              </h1>
              <p className="text-blue-200 text-xs sm:text-sm font-medium mt-1">
                Universidad Católica del Norte
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;