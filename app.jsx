/* global React, ReactDOM, useTweaks, TweaksPanel, TweakSection, TweakColor, TweakSelect, TweakRadio */
const { useState, useEffect, useRef } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "primaryColor": "#C8553D",
  "forestColor": "#3A4D39",
  "mustardColor": "#E8B04B",
  "creamColor": "#F5EDE0",
  "headingFont": "fraunces",
  "showStickers": true,
  "heroVariant": "big-type"
}/*EDITMODE-END*/;

// ============================================================
// Reveal-on-scroll hook
// ============================================================
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
    // Safety fallback: if anything stayed hidden after 2s (e.g. user
    // jumped via anchor link past it), force-reveal everything.
    const t = setTimeout(() => {
      document.querySelectorAll('.reveal:not(.in)').forEach(el => el.classList.add('in'));
    }, 2500);
    return () => { io.disconnect(); clearTimeout(t); };
  }, []);
}

// ============================================================
// Photo placeholder — user will swap with real images later
// ============================================================
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
        background: `${tones[tone]}, var(--cream-deep)`
      }}
    >
      <span>📷 {label}</span>
    </div>
  );
}

// ============================================================
// Floating decorations — small SVG shapes scattered around
// ============================================================
function Decor({ children, top, left, right, bottom, rot = 0, delay = 0, size = 60 }) {
  return (
    <div
      className="float"
      style={{
        position: 'absolute',
        top, left, right, bottom,
        width: size, height: size,
        '--rot': `${rot}deg`,
        animationDelay: `${delay}s`,
        pointerEvents: 'none',
        zIndex: 1
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

// ============================================================
// HERO
// ============================================================
function Hero({ tweaks }) {
  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      padding: '40px 24px 80px',
      overflow: 'hidden'
    }}>
      {/* Decorations */}
      <Decor top="80px" right="8%" rot={-8} size={70}><SunSVG color={tweaks.mustardColor}/></Decor>
      <Decor top="240px" left="5%" rot={12} delay={1} size={36}><StarSVG color={tweaks.primaryColor}/></Decor>
      <Decor bottom="180px" right="12%" rot={6} delay={2} size={50}><StarSVG color={tweaks.forestColor}/></Decor>
      <Decor bottom="60px" left="8%" rot={0} delay={0.5} size={90}><PalmSVG color={tweaks.forestColor}/></Decor>
      <Decor top="50%" right="3%" rot={0} delay={1.5} size={80}><WaveSVG color={tweaks.forestColor}/></Decor>

      {/* Top nav strip */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: 1100,
        margin: '0 auto 60px',
        position: 'relative',
        zIndex: 2,
        flexWrap: 'wrap',
        gap: 16
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
          <span className="display" style={{
            fontWeight: 800,
            fontSize: 32,
            letterSpacing: '-0.04em',
            color: 'var(--forest)'
          }}>EST</span>
          <span className="mono" style={{ fontSize: 12, color: 'var(--forest)', opacity: 0.7 }}>
            since 2003 · 早稲田大学公認
          </span>
        </div>
        <nav style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <a href="#about" className="anchor-pill">about</a>
          <a href="#story" className="anchor-pill">story</a>
          <a href="#info" className="anchor-pill">info</a>
          <a href="#join" className="anchor-pill">join us</a>
        </nav>
      </div>

      {/* Hero content */}
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        position: 'relative',
        zIndex: 2
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
          {tweaks.showStickers && <span className="sticker">2026 新メンバー募集中</span>}
          <span className="mono" style={{ fontSize: 13, color: 'var(--forest)', opacity: 0.8 }}>
            ⌖ 早稲田大学 / フィリピン・パンダノン島
          </span>
        </div>

        <h1
          className="display hero-headline"
          style={{
            fontSize: 'clamp(56px, 11vw, 156px)',
            lineHeight: 0.88,
            letterSpacing: '-0.04em',
            margin: '0 0 28px',
            fontWeight: 800,
            color: 'var(--forest)'
          }}
        >
          <span style={{ display: 'block' }}>心の</span>
          <span style={{
            display: 'block',
            color: 'var(--terra)',
            fontStyle: 'italic',
            fontWeight: 600
          }}>
            ボランティア、
          </span>
          <span style={{ display: 'block' }}>はじめよう。</span>
        </h1>

        <p
          className="maru"
          style={{
            fontSize: 'clamp(16px, 2vw, 20px)',
            maxWidth: 580,
            lineHeight: 1.9,
            color: 'var(--ink)',
            margin: '0 0 40px',
            fontWeight: 500
          }}
        >
          電気もガスもない、政府から見捨てられた島。<br/>
          僕らに資金は出せない。だけど、<br/>
          <span className="squiggle">学生にできる支援が、ここにある。</span>
        </p>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
          <a href="#join" className="btn-primary">
            <span>サークルに参加する</span>
            <span style={{ fontSize: 22 }}>→</span>
          </a>
          <a href="#story" style={{
            color: 'var(--forest)',
            textDecoration: 'underline',
            textUnderlineOffset: 6,
            textDecorationThickness: 2,
            fontWeight: 600,
            fontSize: 15
          }}>
            まずは活動を見る
          </a>
        </div>

        {/* Bottom info strip */}
        <div style={{
          marginTop: 80,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 24,
          paddingTop: 32,
          borderTop: '2px solid var(--forest)',
          maxWidth: 800
        }}>
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
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
        <span className="stat-num" style={{ fontSize: 56, color: 'var(--forest)' }}>{num}</span>
        <span style={{ fontSize: 14, color: 'var(--forest)', fontWeight: 600 }}>{unit}</span>
      </div>
      <div style={{ fontSize: 12, color: 'var(--forest)', opacity: 0.75, fontWeight: 500, letterSpacing: '0.05em' }}>
        {label}
      </div>
    </div>
  );
}

// ============================================================
// MARQUEE — strip of running text
// ============================================================
function Marquee() {
  const items = [
    "PHILIPPINES",
    "★",
    "PANDANON ISLAND",
    "★",
    "STUDENT NGO EST",
    "★",
    "WASEDA UNIVERSITY",
    "★",
    "心のボランティア",
    "★"
  ];
  const doubled = [...items, ...items, ...items, ...items];
  return (
    <div style={{
      background: 'var(--forest)',
      color: 'var(--cream)',
      padding: '20px 0',
      overflow: 'hidden',
      borderTop: '3px solid var(--ink)',
      borderBottom: '3px solid var(--ink)',
      transform: 'rotate(-1.5deg)',
      margin: '0 -8px',
      position: 'relative',
      zIndex: 3
    }}>
      <div className="marquee-track">
        {doubled.map((t, i) => (
          <span key={i} className="display" style={{
            fontSize: 36,
            fontWeight: 800,
            letterSpacing: '-0.02em',
            whiteSpace: 'nowrap'
          }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// ABOUT — what is EST
// ============================================================
function About() {
  return (
    <section id="about" style={{ padding: '120px 24px', position: 'relative' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="reveal" style={{ marginBottom: 48 }}>
          <span className="mono" style={{
            fontSize: 13,
            color: 'var(--terra)',
            letterSpacing: '0.15em',
            fontWeight: 600
          }}>
            01 — ABOUT US
          </span>
          <h2
            className="display section-title"
            style={{
              fontSize: 'clamp(40px, 7vw, 88px)',
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              margin: '12px 0 0',
              color: 'var(--forest)'
            }}
          >
            学生NGO EST<br/>
            <span style={{ fontStyle: 'italic', color: 'var(--terra)', fontWeight: 600 }}>って、なに？</span>
          </h2>
        </div>

        <div className="reveal" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 48,
          alignItems: 'start'
        }}>
          <div>
            <p className="maru" style={{ fontSize: 18, lineHeight: 2, fontWeight: 500 }}>
              フィリピンで教育支援をしている、<br/>
              早稲田大学のボランティアサークルです。
            </p>
            <p style={{ fontSize: 15, lineHeight: 2, color: 'var(--ink)', marginTop: 24 }}>
              支援地は、セブから船で渡る<strong style={{ color: 'var(--terra)' }}>パンダノン島</strong>。
              電気もガスも通っていない、政府から見捨てられた小さな島です。
              夏に10日間、現地に滞在して子どもたちと一緒に過ごします。
            </p>
            <p style={{ fontSize: 15, lineHeight: 2, color: 'var(--ink)', marginTop: 16 }}>
              「<strong>学生にできる最大の支援を</strong>」をモットーに、
              自分たちにどんなことができるのか、毎週話し合いながら活動しています。
            </p>
          </div>

          <div style={{
            background: 'var(--paper)',
            padding: 32,
            border: '2px solid var(--forest)',
            borderRadius: 4,
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: -14,
              left: 24,
              background: 'var(--terra)',
              color: 'var(--paper)',
              padding: '4px 14px',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.1em',
              fontFamily: 'DM Mono, monospace'
            }}>
              QUICK FACTS
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                ["📍", "活動拠点", "早稲田大学・教室"],
                ["🌴", "支援地", "フィリピン パンダノン島"],
                ["🗓", "ミーティング", "毎週火曜 18:30〜"],
                ["✈️", "渡航", "夏 / 春 の年2回"],
                ["💰", "会費", "4,000円"],
                ["📚", "カテゴリ", "教育・国際ボランティア"]
              ].map(([icon, k, v]) => (
                <li key={k} style={{ display: 'flex', gap: 14, alignItems: 'baseline' }}>
                  <span style={{ fontSize: 18 }}>{icon}</span>
                  <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed rgba(58,77,57,0.3)', paddingBottom: 8 }}>
                    <span style={{ color: 'var(--forest)', fontWeight: 600, fontSize: 13 }}>{k}</span>
                    <span style={{ fontWeight: 600, fontSize: 14, textAlign: 'right' }}>{v}</span>
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

// ============================================================
// HEART OF VOLUNTEERING — the BIG idea
// ============================================================
function HeartSection() {
  return (
    <section style={{
      background: 'var(--forest)',
      color: 'var(--cream)',
      padding: '140px 24px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative shape */}
      <Decor top="40px" right="6%" rot={15} size={70}><SunSVG color="#E8B04B"/></Decor>
      <Decor bottom="60px" left="6%" rot={-10} delay={1.2} size={50}><StarSVG color="#E8B04B"/></Decor>

      <div className="reveal" style={{ maxWidth: 1000, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <span className="mono" style={{
          fontSize: 13,
          color: 'var(--mustard)',
          letterSpacing: '0.15em',
          fontWeight: 600
        }}>
          02 — OUR PHILOSOPHY
        </span>

        <p
          className="display"
          style={{
            fontSize: 'clamp(32px, 5.5vw, 68px)',
            lineHeight: 1.25,
            fontWeight: 600,
            fontStyle: 'italic',
            margin: '24px 0 40px',
            letterSpacing: '-0.02em'
          }}
        >
          資金じゃなく、<br/>
          <span style={{ color: 'var(--mustard)' }}>「心」を、</span><br/>
          置いてくる。
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 32,
          marginTop: 60
        }}>
          <div>
            <p className="maru" style={{ fontSize: 17, lineHeight: 2, fontWeight: 500 }}>
              僕らは、お金を渡しに行くわけじゃない。<br/>
              <span style={{ color: 'var(--mustard)' }}>大学生だからできる、ちいさなボランティア</span>を、大事にしてます。
            </p>
          </div>
          <div>
            <p style={{ fontSize: 14, lineHeight: 2, opacity: 0.85 }}>
              支援地でホームステイをして、現地の子どもたちと一緒に暮らす。
              僕らが歯磨きをすれば、子どもたちも真似をする。
              いつか壊れてしまうモノじゃなくて、代々伝わる知恵を残していく。
              それが、貧困を根本から解消する一番の近道だと信じています。
            </p>
          </div>
        </div>

        {/* Three pillars */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 24,
          marginTop: 80
        }}>
          {[
            { n: "01", t: "ホームステイ型", d: "現地の家族と暮らす。地域に深く入る。" },
            { n: "02", t: "知恵を残す", d: "モノじゃなく、伝わる習慣をつくる。" },
            { n: "03", t: "夢を応援する", d: "胸を張って夢を追える子を、増やしたい。" }
          ].map(p => (
            <div key={p.n} style={{
              borderTop: '2px solid var(--mustard)',
              paddingTop: 20
            }}>
              <div className="mono" style={{ fontSize: 12, color: 'var(--mustard)', letterSpacing: '0.1em', marginBottom: 8 }}>
                {p.n}
              </div>
              <h3 className="display" style={{
                fontSize: 24,
                fontWeight: 700,
                margin: '0 0 12px',
                letterSpacing: '-0.01em'
              }}>{p.t}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.8, opacity: 0.85, margin: 0 }}>{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// STORY — the photo / episode section
// ============================================================
function Story() {
  return (
    <section id="story" style={{ padding: '120px 24px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="reveal" style={{ marginBottom: 60, maxWidth: 700 }}>
          <span className="mono" style={{
            fontSize: 13,
            color: 'var(--terra)',
            letterSpacing: '0.15em',
            fontWeight: 600
          }}>
            03 — A STORY FROM THE ISLAND
          </span>
          <h2 className="display section-title" style={{
            fontSize: 'clamp(40px, 6vw, 76px)',
            lineHeight: 0.98,
            letterSpacing: '-0.03em',
            fontWeight: 800,
            margin: '12px 0 0',
            color: 'var(--forest)'
          }}>
            生まれた場所で、<br/>
            <span style={{ fontStyle: 'italic', color: 'var(--terra)', fontWeight: 600 }}>夢を、</span>あきらめない。
          </h2>
        </div>

        {/* Photo collage */}
        <div className="reveal" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: 24,
          marginBottom: 80
        }}>
          <div style={{ gridColumn: 'span 5', transform: 'rotate(-2deg)' }} className="polaroid">
            <Photo label="子どもたちとの写真をここに" tone="sunset" ratio="4/5" />
            <div style={{ marginTop: 14, fontFamily: 'Caveat, cursive', fontSize: 18, textAlign: 'center', color: 'var(--forest)', fontStyle: 'italic' }}>
              みんなで歯みがきタイム ✦
            </div>
          </div>
          <div style={{ gridColumn: 'span 7', display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ transform: 'rotate(1.5deg)' }} className="polaroid">
              <Photo label="島の風景・海の写真をここに" tone="sea" ratio="16/9" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <div style={{ transform: 'rotate(-1deg)' }} className="polaroid">
                <Photo label="授業の様子" tone="default" ratio="1/1" />
              </div>
              <div style={{ transform: 'rotate(2deg)' }} className="polaroid">
                <Photo label="メンバー集合写真" tone="jungle" ratio="1/1" />
              </div>
            </div>
          </div>
        </div>

        {/* Quote */}
        <div className="reveal" style={{
          maxWidth: 760,
          margin: '0 auto',
          padding: '48px 0',
          borderTop: '2px solid var(--forest)',
          borderBottom: '2px solid var(--forest)',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: 60,
            lineHeight: 0.5,
            color: 'var(--terra)',
            fontFamily: 'Fraunces, serif',
            marginBottom: 8
          }}>"</div>
          <p className="display" style={{
            fontSize: 'clamp(22px, 3.2vw, 34px)',
            lineHeight: 1.6,
            fontStyle: 'italic',
            fontWeight: 600,
            color: 'var(--forest)',
            margin: 0
          }}>
            「本を読んで、広い世界をみせてあげよう」<br/>
            「ゴミは、ゴミ箱に捨てようね」<br/>
            <span style={{ color: 'var(--terra)' }}>そんな小さな一つひとつが、教育支援。</span>
          </p>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// ACTIVITY CALENDAR
// ============================================================
function Calendar() {
  const months = [
    { m: "5月", e: "新メンバー入会", k: "kickoff", color: "mustard" },
    { m: "毎週火", e: "ミーティング 18:30〜", k: "weekly", color: "forest" },
    { m: "夏", e: "パンダノン島 渡航 (10日間)", k: "trip", color: "terra", big: true },
    { m: "11月", e: "早稲田祭で発表", k: "fest", color: "forest" },
    { m: "3月", e: "春渡航・カモテス諸島", k: "trip", color: "terra" }
  ];

  return (
    <section style={{
      background: 'var(--cream-deep)',
      padding: '120px 24px',
      position: 'relative'
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="reveal" style={{ marginBottom: 60 }}>
          <span className="mono" style={{
            fontSize: 13,
            color: 'var(--terra)',
            letterSpacing: '0.15em',
            fontWeight: 600
          }}>
            04 — YEAR AT A GLANCE
          </span>
          <h2 className="display section-title" style={{
            fontSize: 'clamp(40px, 6vw, 76px)',
            lineHeight: 0.98,
            fontWeight: 800,
            letterSpacing: '-0.03em',
            margin: '12px 0 0',
            color: 'var(--forest)'
          }}>
            一年の<span style={{ fontStyle: 'italic', color: 'var(--terra)', fontWeight: 600 }}>うごき</span>。
          </h2>
        </div>

        <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {months.map((m, i) => (
            <div key={i} style={{
              display: 'grid',
              gridTemplateColumns: '120px 1fr auto',
              gap: 24,
              alignItems: 'center',
              padding: m.big ? '28px 24px' : '18px 24px',
              background: m.big ? 'var(--forest)' : 'var(--paper)',
              color: m.big ? 'var(--cream)' : 'var(--ink)',
              borderRadius: 4,
              border: m.big ? 'none' : '1.5px solid rgba(58,77,57,0.15)',
              transition: 'transform .2s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(8px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
            >
              <div className="display" style={{
                fontSize: m.big ? 32 : 24,
                fontWeight: 700,
                color: m.big ? 'var(--mustard)' : 'var(--terra)',
                letterSpacing: '-0.02em'
              }}>
                {m.m}
              </div>
              <div style={{ fontSize: m.big ? 22 : 16, fontWeight: m.big ? 700 : 500 }}>
                {m.e}
              </div>
              <div style={{ fontSize: 11, fontFamily: 'DM Mono, monospace', opacity: 0.7, letterSpacing: '0.1em' }}>
                {m.k.toUpperCase()}
              </div>
            </div>
          ))}
        </div>

        <p className="reveal" style={{
          marginTop: 40,
          fontSize: 13,
          color: 'var(--forest)',
          opacity: 0.7,
          textAlign: 'center',
          fontFamily: 'DM Mono, monospace'
        }}>
          ※ 春は カモテス諸島ラナオバランガイ、夏は パンダノン島 へ渡航
        </p>
      </div>
    </section>
  );
}

// ============================================================
// VOICES — fake-y but plausible member voices
// ============================================================
function Voices() {
  const voices = [
    {
      name: "Aさん",
      year: "教育学部 3年",
      quote: "10日間、電気もガスもない島で過ごす。最初は不安だったけど、子どもたちの笑顔で全部吹っ飛んだ。",
      rot: -1.5
    },
    {
      name: "Bさん",
      year: "国際教養 2年",
      quote: "毎週火曜のミーティングが、いちばん楽しい時間。みんな真剣で、でも笑いが絶えない。",
      rot: 1
    },
    {
      name: "Cさん",
      year: "文化構想 1年",
      quote: "「学生にできる支援って何?」っていう問いに、ずっと向き合えるサークル。",
      rot: -0.5
    }
  ];

  return (
    <section style={{ padding: '120px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="reveal" style={{ marginBottom: 60 }}>
          <span className="mono" style={{
            fontSize: 13,
            color: 'var(--terra)',
            letterSpacing: '0.15em',
            fontWeight: 600
          }}>
            05 — MEMBER VOICES
          </span>
          <h2 className="display section-title" style={{
            fontSize: 'clamp(40px, 6vw, 76px)',
            lineHeight: 0.98,
            fontWeight: 800,
            letterSpacing: '-0.03em',
            margin: '12px 0 0',
            color: 'var(--forest)'
          }}>
            メンバーの<span style={{ fontStyle: 'italic', color: 'var(--terra)', fontWeight: 600 }}>こえ</span>。
          </h2>
        </div>

        <div className="reveal" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 32
        }}>
          {voices.map((v, i) => (
            <div key={i} style={{
              background: 'var(--paper)',
              padding: '32px 28px',
              border: '2px solid var(--forest)',
              borderRadius: 4,
              transform: `rotate(${v.rot}deg)`,
              position: 'relative',
              transition: 'transform .25s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(0deg) translateY(-4px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = `rotate(${v.rot}deg)`}
            >
              <div style={{
                fontSize: 48,
                lineHeight: 0.4,
                color: 'var(--terra)',
                fontFamily: 'Fraunces, serif',
                marginBottom: 12
              }}>"</div>
              <p className="maru" style={{
                fontSize: 16,
                lineHeight: 1.9,
                fontWeight: 500,
                margin: '0 0 24px'
              }}>
                {v.quote}
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                paddingTop: 16,
                borderTop: '1.5px dashed rgba(58,77,57,0.3)'
              }}>
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: 'var(--mustard)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 14,
                  fontWeight: 800,
                  color: 'var(--ink)',
                  border: '2px solid var(--ink)'
                }}>
                  {v.name[0]}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--forest)' }}>{v.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--forest)', opacity: 0.7, fontFamily: 'DM Mono, monospace' }}>
                    {v.year}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="reveal" style={{
          marginTop: 32,
          fontSize: 11,
          color: 'var(--forest)',
          opacity: 0.5,
          textAlign: 'center',
          fontFamily: 'DM Mono, monospace'
        }}>
          ※ 仮の文面です。実際のメンバーのコメントに差し替え可能
        </p>
      </div>
    </section>
  );
}

// ============================================================
// JOIN — the big CTA
// ============================================================
function Join() {
  return (
    <section id="join" style={{
      background: 'var(--terra)',
      color: 'var(--paper)',
      padding: '140px 24px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Decor top="40px" left="6%" rot={-12} size={60}><SunSVG color="#E8B04B"/></Decor>
      <Decor bottom="60px" right="8%" rot={20} delay={1} size={50}><StarSVG color="#E8B04B"/></Decor>
      <Decor top="50%" right="5%" rot={0} size={70}><WaveSVG color="#E8B04B"/></Decor>

      <div className="reveal" style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <span className="mono" style={{
          fontSize: 13,
          color: 'var(--mustard)',
          letterSpacing: '0.15em',
          fontWeight: 600,
          display: 'inline-block',
          marginBottom: 24
        }}>
          06 — JOIN US
        </span>

        <h2 className="display" style={{
          fontSize: 'clamp(48px, 9vw, 120px)',
          lineHeight: 0.92,
          fontWeight: 800,
          letterSpacing: '-0.04em',
          margin: '0 0 32px'
        }}>
          一緒に、<br/>
          <span style={{ fontStyle: 'italic', color: 'var(--mustard)', fontWeight: 600 }}>島へ。</span>
        </h2>

        <p className="maru" style={{
          fontSize: 18,
          lineHeight: 2,
          fontWeight: 500,
          maxWidth: 580,
          margin: '0 auto 48px'
        }}>
          学年・学部、関係なし。<br/>
          まずはInstagramのDMから、お気軽に声をかけてください。<br/>
          毎週火曜のミーティングに、見学に来るのもOK。
        </p>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 48 }}>
          <a
            href="https://www.instagram.com/est_waseda/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ background: 'var(--paper)', color: 'var(--terra)', boxShadow: '4px 4px 0 var(--ink)' }}
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
            style={{ background: 'var(--forest)', color: 'var(--paper)', boxShadow: '4px 4px 0 var(--ink)' }}
          >
            <span>メールで聞く</span>
            <span style={{ fontSize: 22 }}>✉</span>
          </a>
        </div>

        {/* Contact card */}
        <div style={{
          background: 'var(--paper)',
          color: 'var(--ink)',
          padding: '32px 28px',
          maxWidth: 560,
          margin: '0 auto',
          textAlign: 'left',
          borderRadius: 4,
          boxShadow: '6px 6px 0 var(--ink)'
        }}>
          <div className="mono" style={{
            fontSize: 11,
            color: 'var(--terra)',
            letterSpacing: '0.15em',
            fontWeight: 600,
            marginBottom: 16
          }}>
            CONTACT
          </div>
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
  const content = (
    <>
      <span style={{ fontSize: 12, color: 'var(--forest)', opacity: 0.7, fontWeight: 600, fontFamily: 'DM Mono, monospace', minWidth: 110 }}>
        {k}
      </span>
      <span style={{ flex: 1, fontSize: 14, fontWeight: 600 }}>
        {v}
        {sub && <span style={{ display: 'block', fontSize: 12, fontWeight: 400, opacity: 0.7, marginTop: 2 }}>{sub}</span>}
      </span>
      {link && <span style={{ color: 'var(--terra)', fontSize: 14 }}>↗</span>}
    </>
  );
  const style = {
    display: 'flex',
    alignItems: 'baseline',
    gap: 12,
    padding: '12px 0',
    borderBottom: last ? 'none' : '1px dashed rgba(58,77,57,0.25)',
    textDecoration: 'none',
    color: 'var(--ink)'
  };
  return link ? (
    <a href={link} target="_blank" rel="noopener noreferrer" style={style}>{content}</a>
  ) : (
    <div style={style}>{content}</div>
  );
}

// ============================================================
// FOOTER
// ============================================================
function Footer() {
  return (
    <footer style={{
      background: 'var(--ink)',
      color: 'var(--cream)',
      padding: '60px 24px 32px',
      textAlign: 'center'
    }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div className="display" style={{
          fontSize: 80,
          fontWeight: 800,
          letterSpacing: '-0.04em',
          color: 'var(--mustard)',
          fontStyle: 'italic',
          lineHeight: 1
        }}>
          EST.
        </div>
        <p style={{ fontSize: 13, opacity: 0.6, marginTop: 16, fontFamily: 'DM Mono, monospace' }}>
          学生NGO EST · Waseda University · est.2003
        </p>
        <p style={{ fontSize: 11, opacity: 0.4, marginTop: 24 }}>
          © 学生NGO EST. Made with care for the kids of Pandanon Island.
        </p>
      </div>
    </footer>
  );
}

// ============================================================
// TWEAKS PANEL CONTENT
// ============================================================
function TweaksContent({ tweaks, setTweak }) {
  return (
    <>
      <TweakSection title="カラー">
        <TweakColor label="メインカラー (terra)" value={tweaks.primaryColor} onChange={(v) => {
          setTweak('primaryColor', v);
          document.documentElement.style.setProperty('--terra', v);
        }} />
        <TweakColor label="サブカラー (forest)" value={tweaks.forestColor} onChange={(v) => {
          setTweak('forestColor', v);
          document.documentElement.style.setProperty('--forest', v);
        }} />
        <TweakColor label="アクセント (mustard)" value={tweaks.mustardColor} onChange={(v) => {
          setTweak('mustardColor', v);
          document.documentElement.style.setProperty('--mustard', v);
        }} />
        <TweakColor label="背景 (cream)" value={tweaks.creamColor} onChange={(v) => {
          setTweak('creamColor', v);
          document.documentElement.style.setProperty('--cream', v);
        }} />
      </TweakSection>
      <TweakSection title="表示">
        <TweakRadio
          label="ステッカー表示"
          value={tweaks.showStickers ? "on" : "off"}
          options={[{value: "on", label: "ON"}, {value: "off", label: "OFF"}]}
          onChange={(v) => setTweak('showStickers', v === "on")}
        />
      </TweakSection>
    </>
  );
}

// ============================================================
// MAIN APP
// ============================================================
function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply CSS vars on mount
  useEffect(() => {
    document.documentElement.style.setProperty('--terra', tweaks.primaryColor);
    document.documentElement.style.setProperty('--forest', tweaks.forestColor);
    document.documentElement.style.setProperty('--mustard', tweaks.mustardColor);
    document.documentElement.style.setProperty('--cream', tweaks.creamColor);
  }, []);

  useReveal();

  return (
    <>
      <Hero tweaks={tweaks} />
      <Marquee />
      <About />
      <HeartSection />
      <Story />
      <Calendar />
      <Voices />
      <Join />
      <Footer />
      <TweaksPanel title="Tweaks">
        <TweaksContent tweaks={tweaks} setTweak={setTweak} />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
