import React from 'react';
import { Copy } from 'lucide-react';

interface SignatureData {
  fullName: string;
  positions: string[];
  email: string;
  phone?: string;
  additionalLink?: string;
  additionalLinkText?: string;
  social?: {
    linkedin?: string;
    facebook?: string;
    twitter?: string;
    instagram?: string;
    googleScholar?: string;
  };
}

interface SignaturePreviewProps {
  data: SignatureData;
  onCopy: () => void;
  success: boolean;
  disabled?: boolean;
}


const SignaturePreview: React.FC<SignaturePreviewProps> = ({ data, onCopy, success, disabled = false }) => {
  const textRef = React.useRef<HTMLDivElement>(null);
  const previewRef = React.useRef<HTMLDivElement>(null);
  const handleCopy = async () => {
    if (previewRef.current) {
      const html = previewRef.current.outerHTML;
      try {
        if (navigator.clipboard && window.ClipboardItem) {
          const item = new ClipboardItem({
            'text/html': new Blob([html], { type: 'text/html' }),
            'text/plain': new Blob([html.replace(/<[^>]+>/g, '')], { type: 'text/plain' })
          });
          await navigator.clipboard.write([item]);
        } else {
          await navigator.clipboard.writeText(html);
        }
        onCopy();
      } catch (e) {
        console.error('Error copiando firma:', e);
      }
    }
  };
  const [logoSize, setLogoSize] = React.useState(90);

  React.useEffect(() => {
    const ref = textRef.current;
    if (!ref) return;
    const updateSize = () => {
      const height = ref.offsetHeight;
      // El logo será igual al alto del bloque de texto, ajustándose hasta la última línea
      let size = Math.max(80, Math.min(200, height * 0.95));
      setLogoSize(size);
    };
    updateSize();
    const observer = new window.ResizeObserver(updateSize);
    observer.observe(ref);
    return () => observer.disconnect();
  }, [data.fullName, data.positions, data.email, data.phone, data.additionalLink, data.additionalLinkText]);

  return (
    <div ref={previewRef} className="bg-white flex justify-center items-start w-full min-h-[600px] py-8">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl mx-auto border border-gray-200">
        {/* Toolbar - Nuevo mensaje y botón Copiar firma */}
  <div className="bg-blue-50 rounded-t-xl px-6 py-2 border-b border-gray-200 flex items-center justify-between">
          <span className="text-sm font-medium text-blue-900">Nuevo mensaje</span>
      <button
        onClick={handleCopy}
            disabled={disabled}
            className="flex items-center gap-1 bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            <Copy className="w-4 h-4" aria-hidden="true" />
            {success ? '¡Copiado!' : 'Copiar firma'}
          </button>
        </div>
        {/* Campos Para y Asunto */}
        <div className="px-6 pt-4 pb-2">
          <div className="flex flex-col gap-2">
            <div className="flex items-center border-b border-gray-100 pb-2">
              <span className="w-16 text-gray-500 text-xs">Para</span>
              <input type="text" disabled value="" className="flex-1 bg-transparent text-xs text-gray-700 outline-none" />
            </div>
            <div className="flex items-center border-b border-gray-100 pb-2">
              <span className="w-16 text-gray-500 text-xs">Asunto</span>
              <input type="text" disabled value="" className="flex-1 bg-transparent text-xs text-gray-700 outline-none" />
            </div>
          </div>
        </div>
        {/* Mensaje de correo simulado */}
        <div className="px-6 pt-4 pb-2">
          <div className="text-gray-700 text-sm mb-4">
            Esta es la previsualización de cómo está quedando tu firma.
          </div>
        </div>
        {/* Área de firma */}
        <div className="px-6 py-6">
  <div className="bg-white w-full rounded-lg">
            <div className="flex items-stretch gap-6" style={{ minWidth: '650px' }}>
              <div className="flex h-full">
                <img
                  src="https://i.imgur.com/sC4luNO.png"
                  alt="Logo UCN"
                  style={{ width: logoSize, height: logoSize, objectFit: 'contain', display: 'block' }}
                />
              </div>
              <div className="flex-1 min-w-0" ref={textRef} style={{ minWidth: '500px' }}>
                <div className="mb-1">
                  {data.fullName && (
                    <span className="font-bold text-lg">{data.fullName}</span>
                  )}
                </div>
                {(data.positions || []).filter(Boolean).map((pos, idx) => (
                  <div key={idx} className="text-base text-gray-800 leading-tight mb-1">{pos}</div>
                ))}
                <div className="text-sm text-gray-500 leading-tight mb-1 whitespace-nowrap">Departamento de Ingeniería de Sistemas y Computación</div>
                <div className="text-sm text-gray-500 leading-tight mb-1">Universidad Católica del Norte</div>
                <div className="text-sm text-gray-500 leading-tight mb-1">Av. Angamos 0610, Antofagasta</div>
                {data.phone && (
                  <div className="text-sm text-gray-800 mb-1">{data.phone}</div>
                )}
                {data.email && (
                  <div className="text-sm mb-1">
                    <a href={`mailto:${data.email}`} className="text-blue-700 underline">{data.email}</a>
                  </div>
                )}
                {data.additionalLink && (
                  <div className="text-sm mb-1">
                    <a href={data.additionalLink} className="text-blue-700 underline">{data.additionalLinkText || data.additionalLink}</a>
                  </div>
                )}
                {/* Íconos de redes sociales */}
                {(data.social?.googleScholar || data.social?.linkedin || data.additionalLink) && (
                  <div className="flex gap-2 mt-3">
                    {data.social?.googleScholar && (
                      <a
                        href={data.social.googleScholar}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block"
                        style={{ lineHeight: 0 }}
                      >
                        <img
                          src="https://scholar.google.com/favicon.ico"
                          alt="Google Scholar"
                          style={{ width: 18, height: 18, display: 'inline-block', borderRadius: 3, background: '#fff', boxShadow: '0 0 2px #ccc' }}
                        />
                      </a>
                    )}
                    {data.social?.linkedin && (
                      <a
                        href={data.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block"
                        style={{ lineHeight: 0 }}
                      >
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/32px-LinkedIn_logo_initials.png"
                          alt="LinkedIn"
                          style={{ width: 18, height: 18, display: 'inline-block', borderRadius: 3, background: '#fff', boxShadow: '0 0 2px #ccc' }}
                        />
                      </a>
                    )}
                    {data.additionalLink && (
                      <a
                        href={data.additionalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block"
                        style={{ lineHeight: 0 }}
                      >
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/0/06/ORCID_iD.svg"
                          alt="ORCID/Sitio Web"
                          style={{ width: 18, height: 18, display: 'inline-block', borderRadius: 3, background: '#fff', boxShadow: '0 0 2px #ccc' }}
                        />
                      </a>
                    )}
                  </div>
                )}
                <hr className="mt-4 border-blue-900" />
                {/* Botón de copiar movido al toolbar superior */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignaturePreview;