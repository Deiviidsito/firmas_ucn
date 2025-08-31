import React from 'react';

interface SignatureData {
  fullName: string;
  positions: string[];
  email: string;
  phone?: string;
  additionalLink?: string;
  additionalLinkText?: string;
}

interface SignaturePreviewProps {
  data: SignatureData;
}

const SignaturePreview: React.FC<SignaturePreviewProps> = ({ data }) => {
  const textRef = React.useRef<HTMLDivElement>(null);
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
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm w-full min-w-[700px] mx-auto" style={{ minWidth: '700px' }}>
      <div className="flex items-stretch gap-6" style={{ minWidth: '650px' }}>
        <div className="flex h-full">
          <img
            src="/disc.svg"
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
          <hr className="mt-4 border-blue-900" />
        </div>
      </div>
    </div>
  );
};

export default SignaturePreview;