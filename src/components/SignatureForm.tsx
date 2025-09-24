import React, { useState } from 'react';
import { Mail, Phone, User, Briefcase, Link, Globe, GraduationCap } from 'lucide-react';

interface SignatureData {
  fullName: string;
  positions: string[];
  email: string;
  phone?: string;
  additionalLink?: string;
  additionalLinkText?: string;
  social?: {
    linkedin?: string;
    googleScholar?: string;
  };
}

interface SignatureFormProps {
  data: SignatureData;
  onUpdate: (field: keyof SignatureData, value: string | any) => void;
  onUpdatePosition: (index: number, value: string) => void;
  onAddPosition: () => void;
  onRemovePosition: (index: number) => void;
  onReset: () => void;
}

const SignatureForm: React.FC<SignatureFormProps> = ({ 
  data, 
  onUpdate, 
  onUpdatePosition, 
  onAddPosition, 
  onRemovePosition, 
  onReset 
}) => {
  const [activeTab, setActiveTab] = useState<'personal' | 'academic'>('personal');
  
  const inputClass = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-800 bg-white";
  const labelClass = "block text-sm font-medium text-gray-700 mb-2";

  return (
    <div className="h-full bg-white">
      {/* Mobile/Tablet Navigation */}
      <div className="lg:hidden border-b border-gray-200 bg-gray-50">
        <div className="flex">
          <button
            onClick={() => setActiveTab('personal')}
            className={`flex-1 flex items-center justify-center gap-2 py-4 px-4 text-sm font-medium transition-colors ${
              activeTab === 'personal' 
                ? 'text-blue-600 border-b-2 border-blue-600 bg-white' 
                : 'text-gray-600 hover:text-gray-800 bg-gray-50'
            }`}
          >
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Datos Personales</span>
            <span className="sm:hidden">Datos</span>
          </button>
          <button
            onClick={() => setActiveTab('academic')}
            className={`flex-1 flex items-center justify-center gap-2 py-4 px-4 text-sm font-medium transition-colors ${
              activeTab === 'academic' 
                ? 'text-green-600 border-b-2 border-green-600 bg-white' 
                : 'text-gray-600 hover:text-gray-800 bg-gray-50'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span className="hidden sm:inline">Enlaces Académicos</span>
            <span className="sm:hidden">Enlaces</span>
          </button>
        </div>
      </div>

      <div className="flex h-full">
        {/* Desktop Sidebar */}
        <div className="hidden lg:flex w-16 bg-gray-50 border-r border-gray-200 flex-col items-center py-6 space-y-3">
          <button
            onClick={() => setActiveTab('personal')}
            className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-200 ${
              activeTab === 'personal' 
                ? 'bg-blue-500 text-white shadow-md' 
                : 'bg-white text-gray-500 hover:text-blue-600 hover:bg-blue-50 border border-gray-200'
            }`}
            title="Datos Personales"
          >
            <User className="w-5 h-5" />
          </button>

          <button
            onClick={() => setActiveTab('academic')}
            className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-200 ${
              activeTab === 'academic' 
                ? 'bg-green-500 text-white shadow-md' 
                : 'bg-white text-gray-500 hover:text-green-600 hover:bg-green-50 border border-gray-200'
            }`}
            title="Enlaces Académicos"
          >
            <GraduationCap className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {activeTab === 'personal' ? 'Datos Personales' : 'Enlaces Académicos'}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {activeTab === 'personal' 
                  ? 'Información básica y de contacto' 
                  : 'Perfiles y redes profesionales (opcional)'}
              </p>
            </div>
            <button
              onClick={onReset}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
            >
              Limpiar
            </button>
          </div>

          {/* PERSONAL DATA TAB */}
          {activeTab === 'personal' && (
            <div className="space-y-5">
              <div>
                <label htmlFor="fullName" className={labelClass}>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-600" />
                    Nombre Completo <span className="text-red-500">*</span>
                  </div>
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={data.fullName}
                  onChange={(e) => onUpdate('fullName', e.target.value)}
                  placeholder="Ej: Matías Saavedra"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-gray-600" />
                    Cargo(s) / Título(s) <span className="text-red-500">*</span>
                  </div>
                </label>
                <div className="space-y-3">
                  {data.positions.map((pos, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={pos}
                        onChange={(e) => onUpdatePosition(idx, e.target.value)}
                        placeholder={`Cargo ${idx + 1}`}
                        className={`${inputClass} flex-1`}
                      />
                      {data.positions.length > 1 && idx > 0 && (
                        <button 
                          type="button" 
                          onClick={() => onRemovePosition(idx)} 
                          className="w-10 h-10 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition flex items-center justify-center font-bold shrink-0"
                        >
                          –
                        </button>
                      )}
                      {idx === data.positions.length - 1 && data.positions.length < 3 && (
                        <button 
                          type="button" 
                          onClick={onAddPosition} 
                          className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition flex items-center justify-center font-bold shrink-0"
                        >
                          +
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="email" className={labelClass}>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-600" />
                    Correo Electrónico <span className="text-red-500">*</span>
                  </div>
                </label>
                <input
                  type="email"
                  id="email"
                  value={data.email}
                  onChange={(e) => onUpdate('email', e.target.value)}
                  placeholder="Ej: msaavedra@ucn.cl"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="phone" className={labelClass}>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-600" />
                    Teléfono (opcional)
                  </div>
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={data.phone || ''}
                  onChange={(e) => onUpdate('phone', e.target.value)}
                  placeholder="Ej: +56 55 355 1234"
                  className={inputClass}
                />
              </div>
            </div>
          )}

          {/* ACADEMIC LINKS TAB */}
          {activeTab === 'academic' && (
            <div className="space-y-5">
              <div>
                <label className={labelClass}>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-gray-600" />
                    Google Scholar
                  </div>
                </label>
                <input
                  type="url"
                  value={data.social?.googleScholar || ''}
                  onChange={(e) => onUpdate('social', { ...data.social, googleScholar: e.target.value })}
                  placeholder="https://scholar.google.com/citations?user=..."
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  <div className="flex items-center gap-2">
                    <Link className="w-4 h-4 text-gray-600" />
                    LinkedIn
                  </div>
                </label>
                <input
                  type="url"
                  value={data.social?.linkedin || ''}
                  onChange={(e) => onUpdate('social', { ...data.social, linkedin: e.target.value })}
                  placeholder="https://www.linkedin.com/in/usuario"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-gray-600" />
                    ORCID / Sitio Web Personal
                  </div>
                </label>
                <input
                  type="url"
                  value={data.additionalLink || ''}
                  onChange={(e) => onUpdate('additionalLink', e.target.value)}
                  placeholder="https://orcid.org/0000-0000-0000-0000"
                  className={inputClass}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignatureForm;