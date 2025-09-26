import React, { useState } from 'react';
import { Mail, Phone, User, Briefcase, Link, Globe, GraduationCap, AlertCircle } from 'lucide-react';

interface SignatureData {
  fullName: string;
  positions: string[];
  email: string;
  phone?: string;
  additionalLink?: string;
  additionalLinkText?: string;
  orcid?: string;
  website?: string;
  isCiaraMemb?: boolean;
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
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
  
  const inputClass = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-800 bg-white";
  const inputErrorClass = "w-full px-4 py-3 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 text-gray-800 bg-red-50";
  const labelClass = "block text-sm font-medium text-gray-700 mb-2";

  // Funciones de validación
  const validateField = (fieldName: string, value: string): string => {
    switch (fieldName) {
      case 'fullName':
        if (!value.trim()) return 'El nombre completo es obligatorio';
        if (value.length > 60) return 'El nombre no debe exceder 60 caracteres';
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s\-'\.]+$/.test(value)) return 'Solo se permiten letras, espacios y caracteres básicos';
        return '';
      
      case 'email':
        if (!value.trim()) return 'El email es obligatorio';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Formato de email inválido';
        if (!value.includes('@ucn.cl')) return 'Se recomienda usar el email institucional (@ucn.cl)';
        return '';
      
      case 'phone':
        if (value && !/^\+56\s9\s\d{4}\s\d{4}$/.test(value)) {
          return 'Formato sugerido: +56 9 XXXX XXXX';
        }
        return '';
      
      case 'website':
        if (value && !/^https?:\/\/.+/.test(value)) {
          return 'La URL debe comenzar con http:// o https://';
        }
        return '';
      
      case 'orcid':
        if (value && !/^https:\/\/orcid\.org\/\d{4}-\d{4}-\d{4}-\d{3}[\dX]$/.test(value)) {
          return 'Formato ORCID: https://orcid.org/0000-0000-0000-0000';
        }
        return '';
      
      case 'googleScholar':
        if (value && !value.includes('scholar.google.com')) {
          return 'Debe ser una URL válida de Google Scholar';
        }
        return '';
      
      case 'linkedin':
        if (value && !value.includes('linkedin.com')) {
          return 'Debe ser una URL válida de LinkedIn';
        }
        return '';
      
      default:
        return '';
    }
  };

  const validatePosition = (value: string): string => {
    if (!value.trim()) return 'El cargo es obligatorio';
    if (value.length > 80) return 'El cargo no debe exceder 80 caracteres';
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s\-',\.0-9()]+$/.test(value)) return 'Contiene caracteres no permitidos';
    return '';
  };

  const handleFieldChange = (fieldName: string, value: string) => {
    // Actualizar el valor
    onUpdate(fieldName as keyof SignatureData, value);
    
    // Limpiar error si el campo ya no tiene errores
    const error = validateField(fieldName, value);
    setFieldErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));
  };

  const handleFieldBlur = (fieldName: string, value: string) => {
    setTouchedFields(prev => ({ ...prev, [fieldName]: true }));
    const error = validateField(fieldName, value);
    setFieldErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));
  };

  const handlePositionChange = (index: number, value: string) => {
    onUpdatePosition(index, value);
    const error = validatePosition(value);
    setFieldErrors(prev => ({
      ...prev,
      [`position_${index}`]: error
    }));
  };

  const handlePositionBlur = (index: number, value: string) => {
    setTouchedFields(prev => ({ ...prev, [`position_${index}`]: true }));
    const error = validatePosition(value);
    setFieldErrors(prev => ({
      ...prev,
      [`position_${index}`]: error
    }));
  };

  const getInputClassName = (fieldName: string) => {
    const hasError = fieldErrors[fieldName] && touchedFields[fieldName];
    return hasError ? inputErrorClass : inputClass;
  };

  const ErrorMessage: React.FC<{ fieldName: string }> = ({ fieldName }) => {
    const error = fieldErrors[fieldName];
    const isTouched = touchedFields[fieldName];
    
    if (!error || !isTouched) return null;
    
    return (
      <div className="flex items-center mt-1 text-sm text-red-600">
        <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
        <span>{error}</span>
      </div>
    );
  };

  const CharacterCounter: React.FC<{ current: number; max: number }> = ({ current, max }) => {
    const isNearLimit = current > max * 0.8;
    const isOverLimit = current > max;
    
    return (
      <div className={`text-xs mt-1 ${isOverLimit ? 'text-red-500' : isNearLimit ? 'text-orange-500' : 'text-gray-500'}`}>
        {current}/{max} caracteres
        {isOverLimit && ' (excede el límite)'}
      </div>
    );
  };

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
                  onChange={(e) => handleFieldChange('fullName', e.target.value)}
                  onBlur={(e) => handleFieldBlur('fullName', e.target.value)}
                  placeholder="Ej: Matías Saavedra"
                  className={getInputClassName('fullName')}
                  maxLength={70}
                />
                <CharacterCounter current={data.fullName?.length || 0} max={60} />
                <ErrorMessage fieldName="fullName" />
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
                    <div key={idx} className="space-y-1">
                      <div className="flex gap-2 items-center">
                        <input
                          type="text"
                          value={pos}
                          onChange={(e) => handlePositionChange(idx, e.target.value)}
                          onBlur={(e) => handlePositionBlur(idx, e.target.value)}
                          placeholder={`Cargo ${idx + 1}`}
                          className={`${getInputClassName(`position_${idx}`)} flex-1`}
                          maxLength={90}
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
                      <CharacterCounter current={pos?.length || 0} max={80} />
                      <ErrorMessage fieldName={`position_${idx}`} />
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
                  onChange={(e) => handleFieldChange('email', e.target.value)}
                  onBlur={(e) => handleFieldBlur('email', e.target.value)}
                  placeholder="Ej: msaavedra@ucn.cl"
                  className={getInputClassName('email')}
                />
                <ErrorMessage fieldName="email" />
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
                  onChange={(e) => handleFieldChange('phone', e.target.value)}
                  onBlur={(e) => handleFieldBlur('phone', e.target.value)}
                  placeholder="Ej: +56 9 1234 5678"
                  className={getInputClassName('phone')}
                />
                <ErrorMessage fieldName="phone" />
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
                  onChange={(e) => {
                    const value = e.target.value;
                    onUpdate('social', { ...data.social, googleScholar: value });
                    handleFieldChange('googleScholar', value);
                  }}
                  onBlur={(e) => handleFieldBlur('googleScholar', e.target.value)}
                  placeholder="https://scholar.google.com/citations?user=..."
                  className={getInputClassName('googleScholar')}
                />
                <ErrorMessage fieldName="googleScholar" />
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
                  onChange={(e) => {
                    const value = e.target.value;
                    onUpdate('social', { ...data.social, linkedin: value });
                    handleFieldChange('linkedin', value);
                  }}
                  onBlur={(e) => handleFieldBlur('linkedin', e.target.value)}
                  placeholder="https://www.linkedin.com/in/usuario"
                  className={getInputClassName('linkedin')}
                />
                <ErrorMessage fieldName="linkedin" />
              </div>

              <div>
                <label className={labelClass}>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-gray-600" />
                    ORCID
                  </div>
                </label>
                <input
                  type="url"
                  value={data.orcid || ''}
                  onChange={(e) => handleFieldChange('orcid', e.target.value)}
                  onBlur={(e) => handleFieldBlur('orcid', e.target.value)}
                  placeholder="https://orcid.org/0000-0000-0000-0000"
                  className={getInputClassName('orcid')}
                />
                <ErrorMessage fieldName="orcid" />
              </div>

              <div>
                <label className={labelClass}>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-gray-600" />
                    Sitio Web Personal
                  </div>
                </label>
                <input
                  type="url"
                  value={data.website || ''}
                  onChange={(e) => handleFieldChange('website', e.target.value)}
                  onBlur={(e) => handleFieldBlur('website', e.target.value)}
                  placeholder="https://misitio.cl"
                  className={getInputClassName('website')}
                />
                <ErrorMessage fieldName="website" />
              </div>

              <div className="border-t pt-5">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="ciaraMember"
                    checked={data.isCiaraMemb || false}
                    onChange={(e) => onUpdate('isCiaraMemb', e.target.checked)}
                    className="mt-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <label htmlFor="ciaraMember" className="text-sm font-medium text-gray-700 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <img 
                        src="https://i.imgur.com/LWlb8oT.png" 
                        alt="CIARA Logo" 
                        className="w-5 h-5 object-contain"
                      />
                      ¿Perteneces a CIARA?
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Centro de Innovación en Inteligencia Artificial
                    </p>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignatureForm;