const items = [
  'PHILIPPINES',
  '★',
  'PANDANON ISLAND',
  '★',
  'STUDENT NGO EST',
  '★',
  'WASEDA UNIVERSITY',
  '★',
  '心のボランティア',
  '★',
];

const doubled = [...items, ...items, ...items, ...items];

export default function Marquee() {
  return (
    <div
      className="bg-forest text-cream py-5 overflow-hidden border-y-[3px] border-ink relative z-[3] -mx-2"
      style={{ transform: 'rotate(-1.5deg)' }}
    >
      <div className="flex gap-12 w-max animate-scroll-x">
        {doubled.map((t, i) => (
          <span
            key={i}
            className="font-display text-[36px] font-extrabold tracking-tight whitespace-nowrap"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
