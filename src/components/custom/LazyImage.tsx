import React, { useRef, useState, useEffect } from 'react';

type Props = {
  src: string;
  alt?: string;
  sx?: React.CSSProperties;
};

const LazyImage: React.FC<Props> = ({ src, alt = '', sx }) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.5s ease-in',
        ...sx
      }}
    />
  );
};

export default LazyImage;
