import React from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  onCopy: () => void;
  success: boolean;
  disabled?: boolean;
}

const CopyButton: React.FC<CopyButtonProps> = ({ onCopy, success, disabled = false }) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={onCopy}
        disabled={disabled}
        aria-label={success ? 'Firma copiada' : 'Copiar firma'}
        className={`
          flex items-center gap-3 px-8 py-4 rounded-lg font-semibold text-white 
          transition-all duration-300 transform hover:scale-105 shadow-lg
          ${disabled 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-gradient-to-r from-[#6B88A3] to-[#2C3E50] hover:from-[#5a7591] hover:to-[#243342] active:scale-95'
          }
        `}
      >
        {success ? (
          <>
            <Check className="w-5 h-5" aria-hidden="true" />
            Copiado
          </>
        ) : (
          <>
            <Copy className="w-5 h-5" aria-hidden="true" />
            Copiar Firma
          </>
        )}
      </button>

      {success && (
        <div className="flex items-center gap-2 text-green-600 font-medium animate-fade-in">
          <Check className="w-4 h-4" aria-hidden="true" />
          <span>✅ Firma copiada con éxito</span>
        </div>
      )}

      {!disabled && (
        <p className="text-sm text-gray-600 text-center max-w-md">
          La firma se copiará en formato HTML. Pégala directamente en la configuración de Gmail.
        </p>
      )}
    </div>
  );
};

export default CopyButton;