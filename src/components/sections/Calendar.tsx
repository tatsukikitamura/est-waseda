type Month = { m: string; e: string; k: string; big?: boolean };

const months: Month[] = [
  { m: '5月', e: '新メンバー入会', k: 'kickoff' },
  { m: '毎週火', e: 'ミーティング 18:30〜', k: 'weekly' },
  { m: '夏', e: 'パンダノン島 渡航 (10日間)', k: 'trip', big: true },
  { m: '11月', e: '早稲田祭で発表', k: 'fest' },
  { m: '3月', e: '春渡航・カモテス諸島', k: 'trip' },
];

export default function Calendar() {
  return (
    <section id="info" className="bg-cream-deep py-[120px] px-6 relative">
      <div className="max-w-[1100px] mx-auto">
        <div className="reveal mb-16">
          <span className="font-mono text-[13px] text-terra tracking-[0.15em] font-semibold">
            04 — YEAR AT A GLANCE
          </span>
          <h2
            className="font-display font-extrabold text-forest mt-3"
            style={{ fontSize: 'clamp(40px, 6vw, 76px)', lineHeight: 0.98, letterSpacing: '-0.03em' }}
          >
            一年の<span className="text-terra">動き</span>。
          </h2>
        </div>

        <div className="reveal flex flex-col gap-1">
          {months.map((m, i) => (
            <div
              key={i}
              className={`grid gap-6 items-center rounded-[4px] transition-transform duration-200 ${
                m.big
                  ? 'bg-forest text-cream py-7 px-6'
                  : 'bg-paper text-ink py-[18px] px-6 border-[1.5px]'
              }`}
              style={{
                gridTemplateColumns: '120px 1fr auto',
                borderColor: m.big ? 'transparent' : 'rgba(58,77,57,0.15)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(8px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateX(0)';
              }}
            >
              <div
                className={`font-display font-bold tracking-tight ${
                  m.big ? 'text-[32px] text-mustard' : 'text-2xl text-terra'
                }`}
              >
                {m.m}
              </div>
              <div className={m.big ? 'text-[22px] font-bold' : 'text-base font-medium'}>
                {m.e}
              </div>
              <div className="text-[11px] font-mono opacity-70 tracking-wider">
                {m.k.toUpperCase()}
              </div>
            </div>
          ))}
        </div>

        <p className="reveal mt-10 text-[13px] text-forest opacity-70 text-center font-mono">
          ※ 春は カモテス諸島ラナオバランガイ、夏は パンダノン島 へ渡航
        </p>
      </div>
    </section>
  );
}
