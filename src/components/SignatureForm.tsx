import React, { useState } from 'react';
import { Mail, Phone, User, Briefcase, GraduationCap, Linkedin, Globe } from 'lucide-react';

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
  onUpdate: (field: keyof SignatureData, value: string) => void;
  onUpdatePosition: (index: number, value: string) => void;
  onAddPosition: () => void;
  onRemovePosition: (index: number) => void;
  onReset: () => void;
}

const SignatureForm: React.FC<SignatureFormProps> = ({ data, onUpdate, onUpdatePosition, onAddPosition, onRemovePosition, onReset }) => {
  const inputClass = "w-full px-3 py-2 border-b border-gray-200 focus:border-blue-500 focus:outline-none transition-all duration-200 text-gray-800 bg-transparent";
  const labelClass = "block text-sm font-medium text-gray-600 mb-1";

  type ErrorMessage = '' | 'Debe tener al menos 3 caracteres.' | 'No puede superar los 100 caracteres.' | 'Campo obligatorio.' | 'Correo inválido.';
  const [errors, setErrors] = useState<{ fullName: ErrorMessage; positions: ErrorMessage[]; email: ErrorMessage }>({
    fullName: '',
    positions: [],
    email: '',
  });
  const [touched, setTouched] = useState({
    fullName: false,
    positions: [] as boolean[],
    email: false,
  });

  // Validaciones
  const validate = () => {
    let valid = true;
    const newErrors: { fullName: ErrorMessage; positions: ErrorMessage[]; email: ErrorMessage } = {
      fullName: '',
      positions: [],
      email: '',
    };

    // Nombre completo
    if (!data.fullName || data.fullName.length < 3) {
      newErrors.fullName = 'Debe tener al menos 3 caracteres.';
      valid = false;
    } else if (data.fullName.length > 100) {
      newErrors.fullName = 'No puede superar los 100 caracteres.';
      valid = false;
    }

    // Cargo(s)
    newErrors.positions = data.positions.map(pos => {
      if (!pos || pos.length < 3) return 'Debe tener al menos 3 caracteres.';
      if (pos.length > 100) return 'No puede superar los 100 caracteres.';
      return '';
    }) as ErrorMessage[];
    if (newErrors.positions.some(e => e)) valid = false;

    // Email
    if (!data.email) {
      newErrors.email = 'Campo obligatorio.';
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      newErrors.email = 'Correo inválido.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Validar en cada cambio
  React.useEffect(() => {
    validate();
    // eslint-disable-next-line
  }, [data]);

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-medium text-gray-800">Datos de la Firma</h2>
        <button
          onClick={onReset}
          className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 border-b border-transparent hover:border-gray-300 transition-all duration-200"
        >
          Limpiar
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-gray-600" />
              Nombre Completo <span className="text-red-600">*</span>
            </div>
          </label>
          <input
            type="text"
            id="fullName"
            value={data.fullName}
            onChange={(e) => onUpdate('fullName', e.target.value)}
            onBlur={() => setTouched(t => ({ ...t, fullName: true }))}
            placeholder="Ej: Matías Saavedra"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-800"
          />
          {errors.fullName && touched.fullName && <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>}
        </div>

        <div>
          <label className={labelClass}>
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-gray-600" />
              Cargo(s) / Título(s) <span className="text-red-600">*</span>
            </div>
          </label>
          <div className="space-y-2">
            {data.positions.map((pos, idx) => (
              <div key={idx} className="flex flex-col items-start gap-0">
                <div className="w-full flex gap-2 items-center">
                  <input
                    type="text"
                    value={pos}
                    onChange={(e) => onUpdatePosition(idx, e.target.value)}
                    onBlur={() => setTouched(t => ({
                      ...t,
                      positions: Object.assign([], t.positions, { [idx]: true })
                    }))}
                    placeholder={`Ej: Cargo ${idx + 1}`}
                    className={inputClass + (errors.positions[idx] && touched.positions[idx] ? ' border-red-500' : '')}
                  />
                  {data.positions.length > 1 && idx > 0 && (
                    <button type="button" onClick={() => onRemovePosition(idx)} className="px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition">–</button>
                  )}
                  {idx === data.positions.length - 1 && data.positions.length < 3 && (
                    <button type="button" onClick={onAddPosition} className="px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition">+</button>
                  )}
                </div>
                {errors.positions[idx] && touched.positions[idx] && <p className="text-xs text-red-600 mt-1 text-left w-full">{errors.positions[idx]}</p>}
              </div>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-600" />
              Correo Electrónico <span className="text-red-600">*</span>
            </div>
          </label>
          <input
            type="email"
            id="email"
            value={data.email}
            onChange={(e) => onUpdate('email', e.target.value)}
            onBlur={() => setTouched(t => ({ ...t, email: true }))}
            placeholder="Ej: msaavedra@ucn.cl"
            className={inputClass + (errors.email && touched.email ? ' border-red-500' : '')}
          />
          {errors.email && touched.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
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

        {/* Redes sociales */}
        <div className="pt-8 mt-8 border-t border-gray-100">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Enlaces Académicos</h3>
          <div className="flex flex-col space-y-6">
            <div className="flex items-center gap-3">
              <GraduationCap className="w-4 h-4 text-gray-500" aria-hidden="true" />
              <span className="text-sm text-gray-600 w-24">Google Scholar</span>
              <input
                type="url"
                value={data.social?.googleScholar || ''}
                onChange={e => onUpdate('social', { ...data.social, googleScholar: e.target.value } as any)}
                placeholder="https://scholar.google.com/..."
                className={`flex-1 ${inputClass}`}
              />
            </div>
            <div className="flex items-center gap-2">
              <Linkedin className="w-4 h-4 text-gray-500" aria-hidden="true" />
              <span className="text-sm text-gray-600 w-24">LinkedIn</span>
              <input
                type="url"
                value={data.social?.linkedin || ''}
                onChange={e => onUpdate('social', { ...data.social, linkedin: e.target.value } as any)}
                placeholder="https://www.linkedin.com/..."
                className={`flex-1 ${inputClass}`}
              />
            </div>
            <div className="flex items-center gap-3">
              <Globe className="w-4 h-4 text-gray-500" aria-hidden="true" />
              <span className="text-sm text-gray-600 w-24">ORCID/Sitio</span>
              <input
                type="url"
                value={data.additionalLink || ''}
                onChange={e => onUpdate('additionalLink', e.target.value)}
                placeholder="https://orcid.org/..."
                className={`flex-1 ${inputClass}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignatureForm;