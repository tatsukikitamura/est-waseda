type SVGProps = { color?: string };

export const SunSVG = ({ color = '#E8B04B' }: SVGProps) => (
  <svg viewBox="0 0 60 60" fill="none">
    <circle cx="30" cy="30" r="14" fill={color} />
    {Array.from({ length: 8 }).map((_, i) => {
      const a = (i * Math.PI * 2) / 8;
      const x1 = 30 + Math.cos(a) * 20;
      const y1 = 30 + Math.sin(a) * 20;
      const x2 = 30 + Math.cos(a) * 28;
      const y2 = 30 + Math.sin(a) * 28;
      return (
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
        />
      );
    })}
  </svg>
);

export const StarSVG = ({ color = '#C8553D' }: SVGProps) => (
  <svg viewBox="0 0 40 40" fill="none">
    <path d="M20 4 L24 16 L36 20 L24 24 L20 36 L16 24 L4 20 L16 16 Z" fill={color} />
  </svg>
);

export const WaveSVG = ({ color = '#3A4D39' }: SVGProps) => (
  <svg viewBox="0 0 80 30" fill="none">
    <path
      d="M2 15 Q 12 4 22 15 T 42 15 T 62 15 T 78 15"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M2 24 Q 12 13 22 24 T 42 24 T 62 24 T 78 24"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
      opacity="0.6"
    />
  </svg>
);

export const PalmSVG = ({ color = '#3A4D39' }: SVGProps) => (
  <svg viewBox="0 0 60 80" fill="none">
    <path d="M30 78 L30 30" stroke="#8B5A2B" strokeWidth="3" strokeLinecap="round" />
    <path
      d="M30 30 Q 12 24 4 14"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M30 30 Q 48 24 56 14"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M30 30 Q 14 30 6 38"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M30 30 Q 46 30 54 38"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M30 30 Q 26 16 18 6"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M30 30 Q 34 16 42 6"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);
