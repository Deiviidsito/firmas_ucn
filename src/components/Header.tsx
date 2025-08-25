import React from 'react';
import { Mail, CaseSensitive as University } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-[#2C3E50] to-[#6B88A3] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-white/10 p-3 rounded-lg">
            <University className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              Generador de Firmas Gmail
            </h1>
            <p className="text-blue-100 text-lg">
              Universidad Católica del Norte
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-blue-100">
          <Mail className="w-4 h-4" />
          <p className="text-sm">
            Crea firmas profesionales con el estilo corporativo UCN
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;