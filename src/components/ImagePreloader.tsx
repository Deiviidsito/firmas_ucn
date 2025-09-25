import { useEffect } from 'react';

const CRITICAL_IMAGES = [
  'https://i.imgur.com/sC4luNO.png', // Logo principal UCN
  'https://i.imgur.com/mmdOunR.png', // Logo pequeño UCN
  'https://i.imgur.com/2VBQAgT.png', // LinkedIn
  'https://i.imgur.com/visHiHK.png', // Google Scholar
  'https://i.imgur.com/to2V1e9.png', // ORCID
  'https://i.imgur.com/HZhe06X.png', // Website
  'https://i.imgur.com/LWlb8oT.png', // CIARA
];

const ImagePreloader: React.FC = () => {
  useEffect(() => {
    // Precargar imágenes críticas al cargar la aplicación
    const preloadImages = () => {
      CRITICAL_IMAGES.forEach(src => {
        const img = new Image();
        img.src = src;
        // Opcional: agregar a caché del navegador
        img.onload = () => {
          console.log(`Precargada: ${src}`);
        };
        img.onerror = () => {
          console.warn(`Error precargando: ${src}`);
        };
      });
    };

    // Precargar con un pequeño delay para no bloquear el renderizado inicial
    const timer = setTimeout(preloadImages, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return null; // Este componente no renderiza nada
};

export default ImagePreloader;