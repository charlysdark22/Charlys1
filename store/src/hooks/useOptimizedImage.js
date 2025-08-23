import { useState, useEffect } from 'react';

export const useOptimizedImage = (src, options = {}) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    width = 800,
    quality = 75,
    blur = true
  } = options;

  useEffect(() => {
    const img = new Image();
    const optimizedSrc = `${src}?w=${width}&q=${quality}${blur ? '&blur=20' : ''}`;
    
    img.src = optimizedSrc;
    img.onload = () => {
      setImageSrc(optimizedSrc);
      setLoading(false);
    };
    img.onerror = () => {
      setError('Failed to load image');
      setLoading(false);
    };
  }, [src, width, quality, blur]);

  return { imageSrc, loading, error };
};