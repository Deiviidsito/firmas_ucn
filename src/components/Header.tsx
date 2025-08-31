import React from 'react';
import { Mail, CaseSensitive as University } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-ucnnav text-white py-6 shadow-md">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <div className="flex items-center justify-center w-full mb-2">
          <img src="/disc.svg" alt="Logo UCN" className="w-14 h-14 mr-3" />
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-center">Generador de Firmas Gmail</h1>
        </div>
        <p className="text-blue-200 text-sm font-medium text-center">Universidad Católica del Norte</p>
      </div>
    </header>
  );
};

export default Header;