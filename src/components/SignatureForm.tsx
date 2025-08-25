import React from 'react';
import { Mail, Phone, User, Briefcase, Link, Globe } from 'lucide-react';

interface SignatureData {
  fullName: string;
  position: string;
  email: string;
  phone?: string;
  additionalLink?: string;
  additionalLinkText?: string;
}

interface SignatureFormProps {
  data: SignatureData;
  onUpdate: (field: keyof SignatureData, value: string) => void;
  onReset: () => void;
}

const SignatureForm: React.FC<SignatureFormProps> = ({ data, onUpdate, onReset }) => {
  const inputClass = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-800";
  const labelClass = "block text-sm font-medium text-gray-700 mb-2";

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Datos de la Firma</h2>
        <button
          onClick={onReset}
          className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200"
        >
          Limpiar
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="fullName" className={labelClass}>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-gray-600" />
              Nombre Completo *
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
          <label htmlFor="position" className={labelClass}>
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-gray-600" />
              Cargo / Título *
            </div>
          </label>
          <input
            type="text"
            id="position"
            value={data.position}
            onChange={(e) => onUpdate('position', e.target.value)}
            placeholder="Ej: Académico, Departamento de Ingeniería de Sistemas y Computación"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-600" />
              Correo Electrónico *
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

        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-sm font-medium text-gray-700 mb-4">Enlace Adicional (opcional)</h3>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="additionalLinkText" className={labelClass}>
                <div className="flex items-center gap-2">
                  <Link className="w-4 h-4 text-gray-600" />
                  Texto del Enlace
                </div>
              </label>
              <input
                type="text"
                id="additionalLinkText"
                value={data.additionalLinkText || ''}
                onChange={(e) => onUpdate('additionalLinkText', e.target.value)}
                placeholder="Ej: ORCID, Sitio Web Personal, ResearchGate"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="additionalLink" className={labelClass}>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-gray-600" />
                  URL del Enlace
                </div>
              </label>
              <input
                type="url"
                id="additionalLink"
                value={data.additionalLink || ''}
                onChange={(e) => onUpdate('additionalLink', e.target.value)}
                placeholder="Ej: https://orcid.org/0000-0000-0000-0000"
                className={inputClass}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignatureForm;