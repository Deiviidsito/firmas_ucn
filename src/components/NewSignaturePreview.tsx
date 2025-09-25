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
  orcid?: string;
  website?: string;
  isCiaraMemb?: boolean;
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
        background: '#fff'
      }}
      loading="lazy"
    />
  </a>
);

const LogoIcon: React.FC<{
  icon: string;
  alt: string;
  size?: number;
}> = ({ icon, alt, size = 18 }) => (
  <span
    className="inline-block"
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
        background: '#fff'
      }}
      loading="lazy"
    />
  </span>
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
    <div className="flex flex-row items-start gap-4 sm:gap-6 min-w-0" ref={signatureRef} lang="es" translate="no">
      <div className="flex justify-start shrink-0">
        <img
          src="https://i.imgur.com/sC4luNO.png"
          alt="Logo Universidad Católica del Norte"
          className="object-contain"
          style={{
            width: logoSize,
            height: logoSize,
            maxWidth: '120px',
            maxHeight: '120px',
            minWidth: '60px',
            minHeight: '60px'
          }}
          loading="eager"
          decoding="async"
        />
      </div>
      <div className="flex-1 min-w-0 text-left" ref={contentRef}>
        {data.fullName && (
          <h1 className="font-bold text-base sm:text-lg mb-1 break-words" title={data.fullName}>
            {data.fullName}
          </h1>
        )}
        {data.positions.filter(Boolean).map((position, index) => (
          <p key={index} className="text-sm sm:text-base text-gray-800 leading-tight mb-1 break-words" title={position}>
            {position}
          </p>
        ))}
        <p className="text-xs sm:text-sm text-gray-500 leading-tight mb-1">
          Departamento de Ingeniería de Sistemas y Computación
        </p>
        <p className="text-xs sm:text-sm text-gray-500 leading-tight mb-1 flex items-center justify-start">
          <img 
            src="https://i.imgur.com/mmdOunR.png" 
            alt="UCN Logo" 
            className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 object-contain inline-block"
            loading="eager"
            decoding="async"
          />
          Universidad Católica del Norte
        </p>
        <p className="text-xs sm:text-sm text-gray-500 leading-tight mb-1">
          Av. Angamos 0610, Antofagasta
        </p>
        {data.phone && (
          <p className="text-xs sm:text-sm text-gray-800 mb-1 break-words">{data.phone}</p>
        )}
        {data.email && (
          <p className="text-xs sm:text-sm mb-1 break-words">
            <a
              href={`mailto:${data.email}`}
              className="text-blue-700 hover:text-blue-800 underline"
            >
              {data.email}
            </a>
          </p>
        )}
        
        {/* Íconos sociales */}
        {(data.social?.googleScholar || data.social?.linkedin || data.orcid || data.website || data.isCiaraMemb) && (
          <div className="flex gap-2 mt-3 justify-start" role="list" aria-label="Redes sociales">
            {data.social?.googleScholar && (
              <SocialIcon
                url={data.social.googleScholar}
                icon="https://i.imgur.com/visHiHK.png"
                alt="Google Scholar"
              />
            )}
            {data.social?.linkedin && (
              <SocialIcon
                url={data.social.linkedin}
                icon="https://i.imgur.com/2VBQAgT.png"
                alt="LinkedIn"
              />
            )}
            {data.orcid && (
              <SocialIcon
                url={data.orcid}
                icon="https://i.imgur.com/to2V1e9.png"
                alt="ORCID"
              />
            )}
            {data.website && (
              <SocialIcon
                url={data.website}
                icon="https://i.imgur.com/HZhe06X.png"
                alt="Sitio Web"
              />
            )}
            {data.isCiaraMemb && (
              <LogoIcon
                icon="https://i.imgur.com/LWlb8oT.png"
                alt="CIARA UCN"
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
      <div className="bg-white shadow-lg rounded-xl w-full max-w-6xl mx-auto border border-gray-200">
        {/* Toolbar */}
        <div className="bg-blue-50 rounded-t-xl px-4 sm:px-6 py-2 border-b border-gray-200 flex items-center justify-between">
          <span className="text-xs sm:text-sm font-medium text-blue-900" role="status">
            Nuevo mensaje
          </span>
          <button
            onClick={handleCopy}
            disabled={disabled}
            className="flex items-center gap-1 sm:gap-2 bg-blue-600 text-white text-xs sm:text-sm font-medium px-3 py-1.5 sm:py-2 rounded hover:bg-blue-700 disabled:opacity-50 transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none"
            aria-label={success ? 'Firma copiada' : 'Copiar firma'}
          >
            <Copy className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
            <span className="hidden sm:inline">{success ? '¡Copiado!' : 'Copiar firma'}</span>
            <span className="sm:hidden">📋</span>
          </button>
        </div>
        
        {/* Campos Para y Asunto */}
        <div className="px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-2">
          <div className="flex flex-col gap-3">
            <div className="flex items-center border-b border-gray-100 pb-3">
              <label className="w-12 sm:w-16 text-gray-500 text-xs">Para</label>
              <input
                type="text"
                disabled
                value=""
                className="flex-1 bg-transparent text-xs sm:text-sm text-gray-700 outline-none"
                aria-label="Campo Para (deshabilitado)"
              />
            </div>
            <div className="flex items-center border-b border-gray-100 pb-3">
              <label className="w-12 sm:w-16 text-gray-500 text-xs">Asunto</label>
              <input
                type="text"
                disabled
                value=""
                className="flex-1 bg-transparent text-xs sm:text-sm text-gray-700 outline-none"
                aria-label="Campo Asunto (deshabilitado)"
              />
            </div>
          </div>
        </div>
        
        {/* Mensaje de previsualización */}
        <div className="px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-2">
          <p className="text-gray-700 text-xs sm:text-sm mb-4" role="status">
            Estimad@s,<br />
            <br />
            Esta es la previsualización de cómo está quedando tu firma. <br />
            <br />
            Saludos cordiales.
          </p>
        </div>
        
        {/* Área de firma */}
        <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="bg-white w-full rounded-lg overflow-x-auto">
            <div className="min-w-[450px] w-full">
              {signatureContent}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewSignaturePreview;
