type Voice = { name: string; year: string; quote: string; rot: number };

const voices: Voice[] = [
  {
    name: 'Aさん',
    year: '教育学部 3年',
    quote:
      '10日間、電気もガスもない島で過ごす。最初は不安だったけど、子どもたちの笑顔で全部吹っ飛んだ。',
    rot: -1.5,
  },
  {
    name: 'Bさん',
    year: '国際教養 2年',
    quote: '毎週火曜のミーティングが、いちばん楽しい時間。みんな真剣で、でも笑いが絶えない。',
    rot: 1,
  },
  {
    name: 'Cさん',
    year: '文化構想 1年',
    quote: '「学生にできる支援って何?」っていう問いに、ずっと向き合えるサークル。',
    rot: -0.5,
  },
];

export default function Voices() {
  return (
    <section className="py-[120px] px-6">
      <div className="max-w-[1100px] mx-auto">
        <div className="reveal mb-16">
          <span className="font-mono text-[13px] text-terra tracking-[0.15em] font-semibold">
            05 — MEMBER VOICES
          </span>
          <h2
            className="font-display font-extrabold text-forest mt-3"
            style={{ fontSize: 'clamp(40px, 6vw, 76px)', lineHeight: 0.98, letterSpacing: '-0.03em' }}
          >
            メンバーの<span className="text-terra">声</span>。
          </h2>
        </div>

        <div
          className="reveal grid gap-8"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}
        >
          {voices.map((v, i) => (
            <div
              key={i}
              className="bg-paper py-8 px-7 border-2 border-forest rounded-[4px] relative transition-transform duration-200"
              style={{ transform: `rotate(${v.rot}deg)` }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'rotate(0deg) translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = `rotate(${v.rot}deg)`;
              }}
            >
              <div className="text-[48px] text-terra font-display mb-3" style={{ lineHeight: 0.4 }}>
                "
              </div>
              <p className="font-maru text-base leading-loose font-medium m-0 mb-6">{v.quote}</p>
              <div
                className="flex items-center gap-3 pt-4 border-t border-dashed"
                style={{ borderColor: 'rgba(58,77,57,0.3)' }}
              >
                <div className="w-9 h-9 rounded-full bg-mustard flex items-center justify-center text-sm font-extrabold text-ink border-2 border-ink">
                  {v.name[0]}
                </div>
                <div>
                  <div className="text-[13px] font-bold text-forest">{v.name}</div>
                  <div className="text-[11px] text-forest opacity-70 font-mono">{v.year}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="reveal mt-8 text-[11px] text-forest opacity-50 text-center font-mono">
          ※ 仮の文面です。実際のメンバーのコメントに差し替え可能
        </p>
      </div>
    </section>
  );
}
