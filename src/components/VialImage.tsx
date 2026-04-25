import React from 'react';

interface VialImageProps {
  name: string;
  mg?: string;
  image?: string;
  className?: string;
  group?: string;
  color?: string;
}

/**
 * VialImage Component
 * Displays the universal "vial.png" absolute and unmodified.
 */
export function VialImage({ name, className }: VialImageProps) {
  return (
    <div className={`relative w-full h-full overflow-hidden ${className || ''}`}>
      <img
        src="/vial.png"
        alt={name}
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

export default VialImage;
