import React from 'react';

interface VialImageProps {
  name: string;
  mg?: string;
  image?: string;
  className?: string;
  group?: string;
  color?: string;
  variant?: 'card' | 'detail' | 'thumb';
}

const FALLBACK_IMG = '/vial.png';

export function VialImage({ name, className, image, variant = 'card' }: VialImageProps) {
  const [src, setSrc] = React.useState(image || FALLBACK_IMG);
  const isThumb = variant === 'thumb';
  const isDetail = variant === 'detail';

  React.useEffect(() => { setSrc(image || FALLBACK_IMG); }, [image]);

  const wrapperBg = {
    background:
      'radial-gradient(ellipse at 50% 35%, #1e3a5f 0%, #0f172a 45%, #050912 100%)',
  };

  return (
    <div className={`relative w-full h-full overflow-hidden group/vial ${className || ''}`} style={wrapperBg}>
      {!isThumb && (
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(circle at 50% 45%, rgba(96,165,250,0.28) 0%, rgba(59,130,246,0.12) 30%, transparent 65%)' }} />
      )}

      <div className="relative w-full h-full flex items-center justify-center">
        <img
          src={src}
          alt={name}
          onError={() => setSrc(FALLBACK_IMG)}
          className={`relative z-10 object-contain transition-transform duration-500 group-hover/vial:scale-105 ${isThumb ? 'max-h-full max-w-full' : isDetail ? 'max-h-[26rem] lg:max-h-[32rem] w-auto' : 'max-h-[14rem] sm:max-h-[16rem] w-auto'}`}
        />
      </div>

      {!isThumb && (
        <div className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(5,9,18,0.85))' }} />
      )}
    </div>
  );
}
