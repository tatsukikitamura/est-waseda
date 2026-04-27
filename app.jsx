/* global React, ReactDOM */
const { useEffect } = React;

// Reveal-on-scroll
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -10% 0px' });
    els.forEach(el => io.observe(el));
    const t = setTimeout(() => {
      document.querySelectorAll('.reveal:not(.in)').forEach(el => el.classList.add('in'));
    }, 2500);
    return () => { io.disconnect(); clearTimeout(t); };
  }, []);
}

// Photo placeholder
function Photo({ label, ratio = "4/5", rotate = 0, tone = "default" }) {
  const tones = {
    default: "linear-gradient(135deg, rgba(58,77,57,0.22), rgba(200,85,61,0.22))",
    sea: "linear-gradient(135deg, rgba(42,111,151,0.30), rgba(232,176,75,0.20))",
    sunset: "linear-gradient(135deg, rgba(232,176,75,0.30), rgba(200,85,61,0.30))",
    jungle: "linear-gradient(135deg, rgba(58,77,57,0.40), rgba(58,77,57,0.10))"
  };
  return (
    <div
      className="photo-placeholder"
      style={{
        aspectRatio: ratio,
        transform: `rotate(${rotate}deg)`,
        background: `${tones[tone]}, #ECE0CD`
      }}
    >
      <span>📷 {label}</span>
    </div>
  );
}

// Floating decoration
function Decor({ children, top, left, right, bottom, rot = 0, delay = 0, size = 60 }) {
  return (
    <div
      className="absolute pointer-events-none z-[1] animate-float-y"
      style={{
        top, left, right, bottom,
        width: size, height: size,
        '--rot': `${rot}deg`,
        animationDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

const SunSVG = ({ color = "#E8B04B" }) => (
  <svg viewBox="0 0 60 60" fill="none">
    <circle cx="30" cy="30" r="14" fill={color}/>
    {[...Array(8)].map((_, i) => {
      const a = (i * Math.PI * 2) / 8;
      const x1 = 30 + Math.cos(a) * 20, y1 = 30 + Math.sin(a) * 20;
      const x2 = 30 + Math.cos(a) * 28, y2 = 30 + Math.sin(a) * 28;
      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="3" strokeLinecap="round"/>;
    })}
  </svg>
);

const StarSVG = ({ color = "#C8553D" }) => (
  <svg viewBox="0 0 40 40" fill="none">
    <path d="M20 4 L24 16 L36 20 L24 24 L20 36 L16 24 L4 20 L16 16 Z" fill={color}/>
  </svg>
);

const WaveSVG = ({ color = "#3A4D39" }) => (
  <svg viewBox="0 0 80 30" fill="none">
    <path d="M2 15 Q 12 4 22 15 T 42 15 T 62 15 T 78 15" stroke={color} strokeWidth="3" strokeLinecap="round" fill="none"/>
    <path d="M2 24 Q 12 13 22 24 T 42 24 T 62 24 T 78 24" stroke={color} strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6"/>
  </svg>
);

const PalmSVG = ({ color = "#3A4D39" }) => (
  <svg viewBox="0 0 60 80" fill="none">
    <path d="M30 78 L30 30" stroke="#8B5A2B" strokeWidth="3" strokeLinecap="round"/>
    <path d="M30 30 Q 12 24 4 14" stroke={color} strokeWidth="4" strokeLinecap="round" fill="none"/>
    <path d="M30 30 Q 48 24 56 14" stroke={color} strokeWidth="4" strokeLinecap="round" fill="none"/>
    <path d="M30 30 Q 14 30 6 38" stroke={color} strokeWidth="4" strokeLinecap="round" fill="none"/>
    <path d="M30 30 Q 46 30 54 38" stroke={color} strokeWidth="4" strokeLinecap="round" fill="none"/>
    <path d="M30 30 Q 26 16 18 6" stroke={color} strokeWidth="4" strokeLinecap="round" fill="none"/>
    <path d="M30 30 Q 34 16 42 6" stroke={color} strokeWidth="4" strokeLinecap="round" fill="none"/>
  </svg>
);

// HERO
function Hero() {
  return (
    <section className="relative min-h-screen px-6 pt-10 pb-20 overflow-hidden">
      <Decor top="80px" right="8%" rot={-8} size={70}><SunSVG/></Decor>
      <Decor top="240px" left="5%" rot={12} delay={1} size={36}><StarSVG/></Decor>
      <Decor bottom="180px" right="12%" rot={6} delay={2} size={50}><StarSVG color="#3A4D39"/></Decor>
      <Decor bottom="60px" left="8%" rot={0} delay={0.5} size={90}><PalmSVG/></Decor>
      <Decor top="50%" right="3%" rot={0} delay={1.5} size={80}><WaveSVG/></Decor>

      <div className="flex items-center justify-between max-w-[1100px] mx-auto mb-16 relative z-[2] flex-wrap gap-4">
        <div className="flex items-baseline gap-3">
          <span className="font-display font-extrabold text-[32px] tracking-tighter text-forest">EST</span>
          <span className="font-mono text-[12px] text-forest opacity-70">since 2003 · 早稲田大学公認</span>
        </div>
        <nav className="flex gap-2 flex-wrap">
          <a href="#about" className="anchor-pill">about</a>
          <a href="#story" className="anchor-pill">story</a>
          <a href="#info" className="anchor-pill">info</a>
          <a href="#join" className="anchor-pill">join us</a>
        </nav>
      </div>

      <div className="max-w-[1100px] mx-auto relative z-[2]">
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <span className="sticker">2026 新メンバー募集中</span>
          <span className="font-mono text-[13px] text-forest opacity-80">⌖ 早稲田大学 / フィリピン・パンダノン島</span>
        </div>

        <h1
          className="font-display font-extrabold text-forest m-0 mb-7"
          style={{ fontSize: 'clamp(56px, 11vw, 156px)', lineHeight: 0.88, letterSpacing: '-0.04em' }}
        >
          <span className="block">心の</span>
          <span className="block text-terra italic font-semibold">ボランティア、</span>
          <span className="block">はじめよう。</span>
        </h1>

        <p
          className="font-maru max-w-[580px] text-ink m-0 mb-10 font-medium"
          style={{ fontSize: 'clamp(16px, 2vw, 20px)', lineHeight: 1.9 }}
        >
          電気もガスもない、政府から見捨てられた島。<br/>
          僕らに資金は出せない。だけど、<br/>
          <span className="squiggle">学生にできる支援が、ここにある。</span>
        </p>

        <div className="flex gap-4 flex-wrap items-center">
          <a href="#join" className="btn-primary">
            <span>サークルに参加する</span>
            <span className="text-[22px]">→</span>
          </a>
          <a href="#story" className="text-forest underline underline-offset-[6px] decoration-2 font-semibold text-[15px]">
            まずは活動を見る
          </a>
        </div>

        <div className="mt-20 grid gap-6 pt-8 border-t-2 border-forest max-w-[800px]"
             style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))' }}>
          <Stat num="10" unit="日間" label="夏のフィリピン渡航" />
          <Stat num="12" unit="人" label="現役メンバー" />
          <Stat num="23" unit="期" label="続いてきた歴史" />
          <Stat num="2" unit="回/年" label="春・夏に渡航" />
        </div>
      </div>
    </section>
  );
}

function Stat({ num, unit, label }) {
  return (
    <div>
      <div className="flex items-baseline gap-1">
        <span className="stat-num text-forest text-[56px]">{num}</span>
        <span className="text-forest text-sm font-semibold">{unit}</span>
      </div>
      <div className="text-[12px] text-forest opacity-75 font-medium tracking-wider">{label}</div>
    </div>
  );
}

// MARQUEE
function Marquee() {
  const items = ["PHILIPPINES", "★", "PANDANON ISLAND", "★", "STUDENT NGO EST", "★", "WASEDA UNIVERSITY", "★", "心のボランティア", "★"];
  const doubled = [...items, ...items, ...items, ...items];
  return (
    <div className="bg-forest text-cream py-5 overflow-hidden border-y-[3px] border-ink relative z-[3] -mx-2"
         style={{ transform: 'rotate(-1.5deg)' }}>
      <div className="flex gap-12 w-max animate-scroll-x">
        {doubled.map((t, i) => (
          <span key={i} className="font-display text-[36px] font-extrabold tracking-tight whitespace-nowrap">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

// ABOUT
function About() {
  return (
    <section id="about" className="py-[120px] px-6 relative">
      <div className="max-w-[1100px] mx-auto">
        <div className="reveal mb-12">
          <span className="font-mono text-[13px] text-terra tracking-[0.15em] font-semibold">01 — ABOUT US</span>
          <h2
            className="font-display font-extrabold text-forest mt-3"
            style={{ fontSize: 'clamp(40px, 7vw, 88px)', lineHeight: 0.95, letterSpacing: '-0.03em' }}
          >
            学生NGO EST<br/>
            <span className="italic text-terra font-semibold">って、なに？</span>
          </h2>
        </div>

        <div className="reveal grid gap-12 items-start"
             style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          <div>
            <p className="font-maru text-lg leading-loose font-medium">
              フィリピンで教育支援をしている、<br/>
              早稲田大学のボランティアサークルです。
            </p>
            <p className="text-[15px] leading-loose text-ink mt-6">
              支援地は、セブから船で渡る<strong className="text-terra">パンダノン島</strong>。
              電気もガスも通っていない、政府から見捨てられた小さな島です。
              夏に10日間、現地に滞在して子どもたちと一緒に過ごします。
            </p>
            <p className="text-[15px] leading-loose text-ink mt-4">
              「<strong>学生にできる最大の支援を</strong>」をモットーに、
              自分たちにどんなことができるのか、毎週話し合いながら活動しています。
            </p>
          </div>

          <div className="bg-paper p-8 border-2 border-forest rounded-[4px] relative">
            <div className="absolute -top-3.5 left-6 bg-terra text-paper px-3.5 py-1 text-[12px] font-bold tracking-widest font-mono">
              QUICK FACTS
            </div>
            <ul className="list-none p-0 m-0 flex flex-col gap-3.5">
              {[
                ["📍", "活動拠点", "早稲田大学・教室"],
                ["🌴", "支援地", "フィリピン パンダノン島"],
                ["🗓", "ミーティング", "毎週火曜 18:30〜"],
                ["✈️", "渡航", "夏 / 春 の年2回"],
                ["💰", "会費", "4,000円"],
                ["📚", "カテゴリ", "教育・国際ボランティア"]
              ].map(([icon, k, v]) => (
                <li key={k} className="flex gap-3.5 items-baseline">
                  <span className="text-lg">{icon}</span>
                  <div className="flex-1 flex justify-between border-b border-dashed pb-2" style={{ borderColor: 'rgba(58,77,57,0.3)' }}>
                    <span className="text-forest font-semibold text-[13px]">{k}</span>
                    <span className="font-semibold text-sm text-right">{v}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// HEART
function HeartSection() {
  return (
    <section className="bg-forest text-cream py-[140px] px-6 relative overflow-hidden">
      <Decor top="40px" right="6%" rot={15} size={70}><SunSVG/></Decor>
      <Decor bottom="60px" left="6%" rot={-10} delay={1.2} size={50}><StarSVG color="#E8B04B"/></Decor>

      <div className="reveal max-w-[1000px] mx-auto relative z-[2]">
        <span className="font-mono text-[13px] text-mustard tracking-[0.15em] font-semibold">02 — OUR PHILOSOPHY</span>

        <p
          className="font-display italic font-semibold my-10"
          style={{ fontSize: 'clamp(32px, 5.5vw, 68px)', lineHeight: 1.25, letterSpacing: '-0.02em' }}
        >
          資金じゃなく、<br/>
          <span className="text-mustard">「心」を、</span><br/>
          置いてくる。
        </p>

        <div className="grid gap-8 mt-16"
             style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
          <div>
            <p className="font-maru text-[17px] leading-loose font-medium">
              僕らは、お金を渡しに行くわけじゃない。<br/>
              <span className="text-mustard">大学生だからできる、ちいさなボランティア</span>を、大事にしてます。
            </p>
          </div>
          <div>
            <p className="text-sm leading-loose opacity-85">
              支援地でホームステイをして、現地の子どもたちと一緒に暮らす。
              僕らが歯磨きをすれば、子どもたちも真似をする。
              いつか壊れてしまうモノじゃなくて、代々伝わる知恵を残していく。
              それが、貧困を根本から解消する一番の近道だと信じています。
            </p>
          </div>
        </div>

        <div className="grid gap-6 mt-20"
             style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
          {[
            { n: "01", t: "ホームステイ型", d: "現地の家族と暮らす。地域に深く入る。" },
            { n: "02", t: "知恵を残す", d: "モノじゃなく、伝わる習慣をつくる。" },
            { n: "03", t: "夢を応援する", d: "胸を張って夢を追える子を、増やしたい。" }
          ].map(p => (
            <div key={p.n} className="border-t-2 border-mustard pt-5">
              <div className="font-mono text-[12px] text-mustard tracking-wider mb-2">{p.n}</div>
              <h3 className="font-display text-2xl font-bold m-0 mb-3 tracking-tight">{p.t}</h3>
              <p className="text-sm leading-relaxed opacity-85 m-0">{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// STORY
function Story() {
  return (
    <section id="story" className="py-[120px] px-6 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        <div className="reveal mb-16 max-w-[700px]">
          <span className="font-mono text-[13px] text-terra tracking-[0.15em] font-semibold">03 — A STORY FROM THE ISLAND</span>
          <h2
            className="font-display font-extrabold text-forest mt-3"
            style={{ fontSize: 'clamp(40px, 6vw, 76px)', lineHeight: 0.98, letterSpacing: '-0.03em' }}
          >
            生まれた場所で、<br/>
            <span className="italic text-terra font-semibold">夢を、</span>あきらめない。
          </h2>
        </div>

        <div className="reveal grid grid-cols-12 gap-6 mb-20">
          <div className="col-span-12 md:col-span-5 polaroid" style={{ transform: 'rotate(-2deg)' }}>
            <Photo label="子どもたちとの写真をここに" tone="sunset" ratio="4/5" />
            <div className="mt-3.5 font-caveat text-lg text-center text-forest italic">
              みんなで歯みがきタイム ✦
            </div>
          </div>
          <div className="col-span-12 md:col-span-7 flex flex-col gap-6">
            <div className="polaroid" style={{ transform: 'rotate(1.5deg)' }}>
              <Photo label="島の風景・海の写真をここに" tone="sea" ratio="16/9" />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="polaroid" style={{ transform: 'rotate(-1deg)' }}>
                <Photo label="授業の様子" tone="default" ratio="1/1" />
              </div>
              <div className="polaroid" style={{ transform: 'rotate(2deg)' }}>
                <Photo label="メンバー集合写真" tone="jungle" ratio="1/1" />
              </div>
            </div>
          </div>
        </div>

        <div className="reveal max-w-[760px] mx-auto py-12 border-y-2 border-forest text-center">
          <div className="text-[60px] text-terra font-display mb-2" style={{ lineHeight: 0.5 }}>"</div>
          <p
            className="font-display italic font-semibold text-forest m-0"
            style={{ fontSize: 'clamp(22px, 3.2vw, 34px)', lineHeight: 1.6 }}
          >
            「本を読んで、広い世界をみせてあげよう」<br/>
            「ゴミは、ゴミ箱に捨てようね」<br/>
            <span className="text-terra">そんな小さな一つひとつが、教育支援。</span>
          </p>
        </div>
      </div>
    </section>
  );
}

// CALENDAR
function Calendar() {
  const months = [
    { m: "5月", e: "新メンバー入会", k: "kickoff" },
    { m: "毎週火", e: "ミーティング 18:30〜", k: "weekly" },
    { m: "夏", e: "パンダノン島 渡航 (10日間)", k: "trip", big: true },
    { m: "11月", e: "早稲田祭で発表", k: "fest" },
    { m: "3月", e: "春渡航・カモテス諸島", k: "trip" }
  ];

  return (
    <section id="info" className="bg-cream-deep py-[120px] px-6 relative">
      <div className="max-w-[1100px] mx-auto">
        <div className="reveal mb-16">
          <span className="font-mono text-[13px] text-terra tracking-[0.15em] font-semibold">04 — YEAR AT A GLANCE</span>
          <h2
            className="font-display font-extrabold text-forest mt-3"
            style={{ fontSize: 'clamp(40px, 6vw, 76px)', lineHeight: 0.98, letterSpacing: '-0.03em' }}
          >
            一年の<span className="italic text-terra font-semibold">うごき</span>。
          </h2>
        </div>

        <div className="reveal flex flex-col gap-1">
          {months.map((m, i) => (
            <div
              key={i}
              className={`grid gap-6 items-center rounded-[4px] transition-transform duration-200 ${
                m.big ? 'bg-forest text-cream py-7 px-6' : 'bg-paper text-ink py-[18px] px-6 border-[1.5px]'
              }`}
              style={{
                gridTemplateColumns: '120px 1fr auto',
                borderColor: m.big ? 'transparent' : 'rgba(58,77,57,0.15)',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(8px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
            >
              <div
                className={`font-display font-bold tracking-tight ${m.big ? 'text-[32px] text-mustard' : 'text-2xl text-terra'}`}
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

// VOICES
function Voices() {
  const voices = [
    { name: "Aさん", year: "教育学部 3年", quote: "10日間、電気もガスもない島で過ごす。最初は不安だったけど、子どもたちの笑顔で全部吹っ飛んだ。", rot: -1.5 },
    { name: "Bさん", year: "国際教養 2年", quote: "毎週火曜のミーティングが、いちばん楽しい時間。みんな真剣で、でも笑いが絶えない。", rot: 1 },
    { name: "Cさん", year: "文化構想 1年", quote: "「学生にできる支援って何?」っていう問いに、ずっと向き合えるサークル。", rot: -0.5 }
  ];

  return (
    <section className="py-[120px] px-6">
      <div className="max-w-[1100px] mx-auto">
        <div className="reveal mb-16">
          <span className="font-mono text-[13px] text-terra tracking-[0.15em] font-semibold">05 — MEMBER VOICES</span>
          <h2
            className="font-display font-extrabold text-forest mt-3"
            style={{ fontSize: 'clamp(40px, 6vw, 76px)', lineHeight: 0.98, letterSpacing: '-0.03em' }}
          >
            メンバーの<span className="italic text-terra font-semibold">こえ</span>。
          </h2>
        </div>

        <div className="reveal grid gap-8"
             style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
          {voices.map((v, i) => (
            <div
              key={i}
              className="bg-paper py-8 px-7 border-2 border-forest rounded-[4px] relative transition-transform duration-200"
              style={{ transform: `rotate(${v.rot}deg)` }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(0deg) translateY(-4px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = `rotate(${v.rot}deg)`}
            >
              <div className="text-[48px] text-terra font-display mb-3" style={{ lineHeight: 0.4 }}>"</div>
              <p className="font-maru text-base leading-loose font-medium m-0 mb-6">{v.quote}</p>
              <div className="flex items-center gap-3 pt-4 border-t border-dashed" style={{ borderColor: 'rgba(58,77,57,0.3)' }}>
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

// JOIN
function Join() {
  return (
    <section id="join" className="bg-terra text-paper py-[140px] px-6 relative overflow-hidden">
      <Decor top="40px" left="6%" rot={-12} size={60}><SunSVG/></Decor>
      <Decor bottom="60px" right="8%" rot={20} delay={1} size={50}><StarSVG color="#E8B04B"/></Decor>
      <Decor top="50%" right="5%" rot={0} size={70}><WaveSVG color="#E8B04B"/></Decor>

      <div className="reveal max-w-[900px] mx-auto relative z-[2] text-center">
        <span className="font-mono text-[13px] text-mustard tracking-[0.15em] font-semibold inline-block mb-6">
          06 — JOIN US
        </span>

        <h2
          className="font-display font-extrabold m-0 mb-8"
          style={{ fontSize: 'clamp(48px, 9vw, 120px)', lineHeight: 0.92, letterSpacing: '-0.04em' }}
        >
          一緒に、<br/>
          <span className="italic text-mustard font-semibold">島へ。</span>
        </h2>

        <p className="font-maru text-lg leading-loose font-medium max-w-[580px] mx-auto mb-12">
          学年・学部、関係なし。<br/>
          まずはInstagramのDMから、お気軽に声をかけてください。<br/>
          毎週火曜のミーティングに、見学に来るのもOK。
        </p>

        <div className="flex gap-4 flex-wrap justify-center mb-12">
          <a
            href="https://www.instagram.com/est_waseda/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ background: '#FBF7EE', color: '#C8553D', boxShadow: '4px 4px 0 #1F2A1E' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor"/>
            </svg>
            <span>@est_waseda にDM</span>
          </a>
          <a
            href="mailto:est.2019.16th@gmail.com"
            className="btn-primary"
            style={{ background: '#3A4D39', color: '#FBF7EE', boxShadow: '4px 4px 0 #1F2A1E' }}
          >
            <span>メールで聞く</span>
            <span className="text-[22px]">✉</span>
          </a>
        </div>

        <div className="bg-paper text-ink py-8 px-7 max-w-[560px] mx-auto text-left rounded-[4px]"
             style={{ boxShadow: '6px 6px 0 #1F2A1E' }}>
          <div className="font-mono text-[11px] text-terra tracking-[0.15em] font-semibold mb-4">CONTACT</div>
          <ContactRow k="代表" v="柴田 拓郎" sub="早稲田大学 教育学部 3年" />
          <ContactRow k="メール" v="est.2019.16th@gmail.com" link="mailto:est.2019.16th@gmail.com" />
          <ContactRow k="Instagram" v="@est_waseda" link="https://www.instagram.com/est_waseda/" />
          <ContactRow k="X (Twitter)" v="@EST_ngo" link="https://twitter.com/EST_ngo" />
          <ContactRow k="Facebook" v="ngoest" link="https://ja-jp.facebook.com/ngoest/" />
          <ContactRow k="HP" v="pando.life/EST_ngo" link="https://pando.life/EST_ngo" last />
        </div>
      </div>
    </section>
  );
}

function ContactRow({ k, v, sub, link, last }) {
  const inner = (
    <>
      <span className="text-[12px] text-forest opacity-70 font-semibold font-mono min-w-[110px]">{k}</span>
      <span className="flex-1 text-sm font-semibold">
        {v}
        {sub && <span className="block text-[12px] font-normal opacity-70 mt-0.5">{sub}</span>}
      </span>
      {link && <span className="text-terra text-sm">↗</span>}
    </>
  );
  const cls = `flex items-baseline gap-3 py-3 no-underline text-ink ${last ? '' : 'border-b border-dashed'}`;
  const style = last ? {} : { borderColor: 'rgba(58,77,57,0.25)' };
  return link ? (
    <a href={link} target="_blank" rel="noopener noreferrer" className={cls} style={style}>{inner}</a>
  ) : (
    <div className={cls} style={style}>{inner}</div>
  );
}

// FOOTER
function Footer() {
  return (
    <footer className="bg-ink text-cream py-16 pb-8 px-6 text-center">
      <div className="max-w-[800px] mx-auto">
        <div className="font-display text-[80px] font-extrabold tracking-tighter text-mustard italic leading-none">
          EST.
        </div>
        <p className="text-[13px] opacity-60 mt-4 font-mono">学生NGO EST · Waseda University · est.2003</p>
        <p className="text-[11px] opacity-40 mt-6">© 学生NGO EST. Made with care for the kids of Pandanon Island.</p>
      </div>
    </footer>
  );
}

function App() {
  useReveal();
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <HeartSection />
      <Story />
      <Calendar />
      <Voices />
      <Join />
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
