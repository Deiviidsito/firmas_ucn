import React from 'react';
import { Copy } from 'lucide-react';

interface SocialLinks {
  linkedin?: string;
  googleScholar?: string;
  orcid?: string;
}

interface SignatureData {
  fullName: string;
  positions: string[];
  email: string;
  phone?: string;
  additionalLink?: string;
  additionalLinkText?: string;
  social?: SocialLinks;
}

interface SignaturePreviewProps {
  data: SignatureData;
  onCopy: () => void;
  success: boolean;
  disabled?: boolean;
}

const SocialIcon: React.FC<{
  url: string;
  icon: string;
  alt: string;
  size?: number;
}> = ({ url, icon, alt, size = 18 }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block hover:opacity-80 transition-opacity"
    style={{ lineHeight: 0 }}
    title={alt}
  >
    <img
      src={icon}
      alt={alt}
      style={{
        width: size,
        height: size,
        display: 'inline-block',
        borderRadius: 3,
        background: '#fff',
        boxShadow: '0 0 2px #ccc'
      }}
      loading="lazy"
    />
  </a>
);

const ToolbarButton: React.FC<{
  onClick: () => void;
  disabled: boolean;
  success: boolean;
}> = ({ onClick, disabled, success }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="flex items-center gap-1 bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded hover:bg-blue-700 disabled:opacity-50 transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none"
    aria-label={success ? 'Firma copiada' : 'Copiar firma'}
  >
    <Copy className="w-4 h-4" aria-hidden="true" />
    <span>{success ? '¡Copiado!' : 'Copiar firma'}</span>
  </button>
);

const NewSignaturePreview: React.FC<SignaturePreviewProps> = ({
  data,
  onCopy,
  success,
  disabled = false
}) => {
  const signatureRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [logoSize, setLogoSize] = React.useState(90);

  const handleCopy = async () => {
    if (!signatureRef.current) return;

    try {
      const signatureElement = signatureRef.current;
      const htmlContent = signatureElement.outerHTML;
      const plainText = signatureElement.innerText;

      if (navigator.clipboard && window.ClipboardItem) {
        const clipboardItem = new ClipboardItem({
          'text/html': new Blob([htmlContent], { type: 'text/html' }),
          'text/plain': new Blob([plainText], { type: 'text/plain' })
        });
        
        await navigator.clipboard.write([clipboardItem]);
      } else {
        // Fallback para navegadores que no soportan ClipboardItem
        await navigator.clipboard.writeText(plainText);
      }
      
      onCopy();
    } catch (error) {
      console.error('Error al copiar la firma:', error);
      alert('Hubo un error al copiar la firma. Por favor, intenta nuevamente.');
    }
  };

  // Optimizar el recálculo del tamaño del logo
  React.useEffect(() => {
    if (!contentRef.current) return;

    const calculateLogoSize = () => {
      const contentHeight = contentRef.current?.offsetHeight || 0;
      const newSize = Math.max(80, Math.min(200, contentHeight * 0.95));
      
      if (Math.abs(newSize - logoSize) > 5) {
        setLogoSize(newSize);
      }
    };

    calculateLogoSize();

    const resizeObserver = new ResizeObserver(calculateLogoSize);
    resizeObserver.observe(contentRef.current);

    return () => resizeObserver.disconnect();
  }, [data]);

  const signatureContent = (
    <div className="flex items-stretch gap-6" style={{ minWidth: '650px', maxWidth: '800px' }} ref={signatureRef}>
      <div className="flex h-full shrink-0">
        <img
          src="https://i.imgur.com/sC4luNO.png"
          alt="Logo Universidad Católica del Norte"
          style={{
            width: logoSize,
            height: logoSize,
            objectFit: 'contain',
            display: 'block'
          }}
          loading="lazy"
        />
      </div>
      <div className="flex-1 min-w-0 overflow-hidden" ref={contentRef} style={{ minWidth: '500px', maxWidth: '600px' }}>
        {data.fullName && (
          <h1 className="font-bold text-lg mb-1 truncate max-w-[400px]" title={data.fullName}>
            {data.fullName}
          </h1>
        )}
        {data.positions.filter(Boolean).map((position, index) => (
          <p key={index} className="text-base text-gray-800 leading-tight mb-1 truncate max-w-[400px]" title={position}>
            {position}
          </p>
        ))}
        <p className="text-sm text-gray-500 leading-tight mb-1 whitespace-nowrap">
          Departamento de Ingeniería de Sistemas y Computación
        </p>
        <p className="text-sm text-gray-500 leading-tight mb-1">
          Universidad Católica del Norte
        </p>
        <p className="text-sm text-gray-500 leading-tight mb-1">
          Av. Angamos 0610, Antofagasta
        </p>
        {data.phone && (
          <p className="text-sm text-gray-800 mb-1">{data.phone}</p>
        )}
        {data.email && (
          <p className="text-sm mb-1">
            <a
              href={`mailto:${data.email}`}
              className="text-blue-700 hover:text-blue-800 underline"
            >
              {data.email}
            </a>
          </p>
        )}
        
        {/* Íconos sociales */}
        {(data.social?.googleScholar || data.social?.linkedin || data.social?.orcid) && (
          <div className="flex gap-2 mt-3" role="list" aria-label="Redes sociales">
            {data.social?.googleScholar && (
              <SocialIcon
                url={data.social.googleScholar}
                icon="https://scholar.google.com/favicon.ico"
                alt="Google Scholar"
              />
            )}
            {data.social?.linkedin && (
              <SocialIcon
                url={data.social.linkedin}
                icon="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/32px-LinkedIn_logo_initials.png"
                alt="LinkedIn"
              />
            )}
            {(data.social?.orcid || data.additionalLink) && (
              <SocialIcon
                url={data.social?.orcid || data.additionalLink || ''}
                icon="https://upload.wikimedia.org/wikipedia/commons/0/06/ORCID_iD.svg"
                alt="ORCID"
              />
            )}
          </div>
        )}
        <hr className="mt-4 border-blue-900" />
      </div>
    </div>
  );

  return (
    <div className="w-full">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-4xl mx-auto border border-gray-200">
        {/* Toolbar */}
        <div className="bg-blue-50 rounded-t-xl px-6 py-2 border-b border-gray-200 flex items-center justify-between">
          <span className="text-sm font-medium text-blue-900" role="status">
            Nuevo mensaje
          </span>
          <ToolbarButton
            onClick={handleCopy}
            disabled={disabled}
            success={success}
          />
        </div>
        
        {/* Campos Para y Asunto */}
        <div className="px-8 pt-6 pb-2">
          <div className="flex flex-col gap-3">
            <div className="flex items-center border-b border-gray-100 pb-3">
              <label className="w-16 text-gray-500 text-xs">Para</label>
              <input
                type="text"
                disabled
                value=""
                className="flex-1 bg-transparent text-sm text-gray-700 outline-none"
                aria-label="Campo Para (deshabilitado)"
              />
            </div>
            <div className="flex items-center border-b border-gray-100 pb-3">
              <label className="w-16 text-gray-500 text-xs">Asunto</label>
              <input
                type="text"
                disabled
                value=""
                className="flex-1 bg-transparent text-sm text-gray-700 outline-none"
                aria-label="Campo Asunto (deshabilitado)"
              />
            </div>
          </div>
        </div>
        
        {/* Mensaje de previsualización */}
        <div className="px-8 pt-6 pb-2">
          <p className="text-gray-700 text-sm mb-4" role="status">
            Estimad@s,<br />
            <br />
            Esta es la previsualización de cómo está quedando tu firma. <br />
            <br />
            Saludos cordiales.
          </p>
        </div>
        
        {/* Área de firma */}
        <div className="px-8 py-8">
          <div className="bg-white w-full rounded-lg">
            {signatureContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewSignaturePreview;
