import type { CSSProperties, ReactNode } from 'react';

type DecorProps = {
  children: ReactNode;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  rot?: number;
  delay?: number;
  size?: number;
};

export default function Decor({
  children,
  top,
  left,
  right,
  bottom,
  rot = 0,
  delay = 0,
  size = 60,
}: DecorProps) {
  const responsive = `clamp(${size * 0.45}px, ${size / 10}vw, ${size}px)`;
  const style = {
    top,
    left,
    right,
    bottom,
    width: responsive,
    height: responsive,
    '--rot': `${rot}deg`,
    animationDelay: `${delay}s`,
  } as CSSProperties;

  return (
    <div className="absolute pointer-events-none z-[1] animate-float-y" style={style}>
      {children}
    </div>
  );
}
