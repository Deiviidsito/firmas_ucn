import React, { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  loading?: 'lazy' | 'eager';
  [key: string]: any;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({ 
  src, 
  alt, 
  className = '', 
  style = {},
  loading = 'eager',
  ...props 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative inline-block" style={{ width: style.width, height: style.height }}>
      {!imageLoaded && !imageError && (
        <div 
          className={`absolute inset-0 bg-gray-200 animate-pulse rounded ${className}`}
          style={style}
        />
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${!imageLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        style={style}
        loading={loading}
        decoding="async"
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
        {...props}
      />
      {imageError && (
        <div 
          className={`absolute inset-0 bg-gray-300 flex items-center justify-center text-xs text-gray-500 ${className}`}
          style={style}
        >
          ?
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;