type PhotoTone = 'default' | 'sea' | 'sunset' | 'jungle';

type PhotoProps = {
  label: string;
  ratio?: string;
  rotate?: number;
  tone?: PhotoTone;
};

const tones: Record<PhotoTone, string> = {
  default: 'linear-gradient(135deg, rgba(58,77,57,0.22), rgba(200,85,61,0.22))',
  sea: 'linear-gradient(135deg, rgba(42,111,151,0.30), rgba(232,176,75,0.20))',
  sunset: 'linear-gradient(135deg, rgba(232,176,75,0.30), rgba(200,85,61,0.30))',
  jungle: 'linear-gradient(135deg, rgba(58,77,57,0.40), rgba(58,77,57,0.10))',
};

export default function Photo({
  label,
  ratio = '4/5',
  rotate = 0,
  tone = 'default',
}: PhotoProps) {
  return (
    <div
      className="photo-placeholder"
      style={{
        aspectRatio: ratio,
        transform: `rotate(${rotate}deg)`,
        background: `${tones[tone]}, #ECE0CD`,
      }}
    >
      <span>📷 {label}</span>
    </div>
  );
}
