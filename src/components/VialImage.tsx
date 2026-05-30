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
  const src = image || FALLBACK_IMG;
  const isFallback = !image || image === FALLBACK_IMG;
  const isThumb = variant === 'thumb';
  const isDetail = variant === 'detail';

  const aspectClass = isDetail
    ? 'aspect-[4/5] lg:aspect-auto lg:h-full'
    : isThumb
      ? 'w-full h-full'
      : 'aspect-square';

  return (
    <div className={`group/vial relative ${isThumb ? '' : 'w-full'} ${aspectClass} overflow-hidden ${className || ''}`}>
      {/* Studio gradient backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background: isThumb
            ? 'radial-gradient(ellipse at 50% 35%, #1e3a5f 0%, #0f172a 100%)'
            : 'radial-gradient(ellipse at 50% 35%, #1e3a5f 0%, #0f172a 45%, #050912 100%)'
        }}
      />
      {/* Soft blue spotlight behind vial (skip on thumb) */}
      {!isThumb && (
        <div
          className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] rounded-full opacity-60 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(59,130,246,0.35) 0%, rgba(59,130,246,0) 70%)',
            filter: 'blur(20px)'
          }}
        />
      )}
      {/* The vial image itself */}
      <img
        src={src}
        alt={name}
        className={`relative z-10 w-full h-full object-contain ${isThumb ? 'p-1' : 'p-4'} transition-transform duration-500 group-hover/vial:scale-105`}
        referrerPolicy="no-referrer"
        onError={(e) => {
          const target = e.currentTarget;
          target.src = FALLBACK_IMG;
        }}
      />
      {/* Branded label overlay for fallback images (skip on thumb — too small) */}
      {isFallback && !isThumb && (
        <div className="absolute inset-0 z-20 flex items-end justify-center pb-[18%] pointer-events-none">
          <div className="bg-white/95 backdrop-blur-sm border border-blue-200 px-3 py-1.5 rounded-sm shadow-lg max-w-[55%]">
            <div className="text-[7px] font-black tracking-[0.2em] text-blue-700 uppercase leading-none mb-0.5 text-center">Ascend Labz</div>
            <div className="text-[10px] font-black text-slate-900 uppercase tracking-tight leading-tight text-center truncate">{name}</div>
            <div className="text-[6px] font-bold tracking-[0.15em] text-slate-500 uppercase leading-none mt-0.5 text-center">For Research Use Only</div>
          </div>
        </div>
      )}
      {/* Bottom fade so image blends into card (skip on thumb) */}
      {!isThumb && (
        <div
          className="absolute inset-x-0 bottom-0 h-16 z-30 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(17,24,39,0) 0%, rgba(17,24,39,0.55) 100%)'
          }}
        />
      )}
      {/* Subtle inner border highlight */}
      <div className="absolute inset-0 z-40 pointer-events-none rounded-[inherit] ring-1 ring-inset ring-white/5" />
    </div>
  );
}

export default VialImage;
