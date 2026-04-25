import React from 'react';

// Partial-fill star rating component
const PartialStar: React.FC<{ fill: number; size?: number }> = ({ fill, size = 10 }) => {
  const id = `star-clip-${Math.random().toString(36).slice(2)}`;
  const pct = Math.max(0, Math.min(1, fill)) * 100;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: 'inline-block', flexShrink: 0 }}>
      <defs>
        <clipPath id={id}>
          <rect x="0" y="0" width={`${pct}%`} height="24" />
        </clipPath>
      </defs>
      {/* Background empty star */}
      <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" fill="none" stroke="#fbbf24" strokeWidth="1.5" strokeOpacity="0.4" />
      {/* Filled portion */}
      <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" fill="#fbbf24" clipPath={`url(#${id})`} />
    </svg>
  );
};

export const StarRating = ({ rating, size = 10 }: { rating: number; size?: number }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    const fill = Math.max(0, Math.min(1, rating - i));
    stars.push(<PartialStar key={i} fill={fill} size={size} />);
  }
  return <div className="flex items-center gap-0.5">{stars}</div>;
};
