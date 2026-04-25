import React from 'react';

interface VialImageProps {
  name: string;
  mg?: string;
  image?: string;
  className?: string;
  group?: string;
  color?: string;
}

export function VialImage({ name, className }: VialImageProps) {
  return (
    <div className={`relative w-full h-full overflow-hidden ${className || ''}`}>
      <img
        src='/vial.png'
        alt={name}
        className='w-full h-full object-cover'
        referrerPolicy='no-referrer'
        onError={(e) => {
          const target = e.currentTarget;
          target.style.display = 'none';
          const parent = target.parentElement;
          if (parent) { parent.style.background = 'linear-gradient(135deg, #1e3a5f 0%, #0a1628 100%)'; }
        }}
      />
    </div>
  );
}

export default VialImage;