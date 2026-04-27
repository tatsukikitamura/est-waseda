/* global React, ReactDOM, useTweaks, TweaksPanel, TweakSection, TweakColor, TweakSelect, TweakRadio */
const {
  useState,
  useEffect,
  useRef
} = React;
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "primaryColor": "#C8553D",
  "forestColor": "#3A4D39",
  "mustardColor": "#E8B04B",
  "creamColor": "#F5EDE0",
  "headingFont": "fraunces",
  "showStickers": true,
  "heroVariant": "big-type"
} /*EDITMODE-END*/;

// ============================================================
// Reveal-on-scroll hook
// ============================================================
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, {
      threshold: 0,
      rootMargin: '0px 0px -10% 0px'
    });
    els.forEach(el => io.observe(el));
    // Safety fallback: if anything stayed hidden after 2s (e.g. user
    // jumped via anchor link past it), force-reveal everything.
    const t = setTimeout(() => {
      document.querySelectorAll('.reveal:not(.in)').forEach(el => el.classList.add('in'));
    }, 2500);
    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, []);
}

// ============================================================
// Photo placeholder — user will swap with real images later
// ============================================================
function Photo({
  label,
  ratio = "4/5",
  rotate = 0,
  tone = "default"
}) {
  const tones = {
    default: "linear-gradient(135deg, rgba(58,77,57,0.22), rgba(200,85,61,0.22))",
    sea: "linear-gradient(135deg, rgba(42,111,151,0.30), rgba(232,176,75,0.20))",
    sunset: "linear-gradient(135deg, rgba(232,176,75,0.30), rgba(200,85,61,0.30))",
    jungle: "linear-gradient(135deg, rgba(58,77,57,0.40), rgba(58,77,57,0.10))"
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "photo-placeholder",
    style: {
      aspectRatio: ratio,
      transform: `rotate(${rotate}deg)`,
      background: `${tones[tone]}, var(--cream-deep)`
    }
  }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDCF7 ", label));
}

// ============================================================
// Floating decorations — small SVG shapes scattered around
// ============================================================
function Decor({
  children,
  top,
  left,
  right,
  bottom,
  rot = 0,
  delay = 0,
  size = 60
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "float",
    style: {
      position: 'absolute',
      top,
      left,
      right,
      bottom,
      width: size,
      height: size,
      '--rot': `${rot}deg`,
      animationDelay: `${delay}s`,
      pointerEvents: 'none',
      zIndex: 1
    }
  }, children);
}
const SunSVG = ({
  color = "#E8B04B"
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 60 60",
  fill: "none"
}, /*#__PURE__*/React.createElement("circle", {
  cx: "30",
  cy: "30",
  r: "14",
  fill: color
}), [...Array(8)].map((_, i) => {
  const a = i * Math.PI * 2 / 8;
  const x1 = 30 + Math.cos(a) * 20,
    y1 = 30 + Math.sin(a) * 20;
  const x2 = 30 + Math.cos(a) * 28,
    y2 = 30 + Math.sin(a) * 28;
  return /*#__PURE__*/React.createElement("line", {
    key: i,
    x1: x1,
    y1: y1,
    x2: x2,
    y2: y2,
    stroke: color,
    strokeWidth: "3",
    strokeLinecap: "round"
  });
}));
const StarSVG = ({
  color = "#C8553D"
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 40 40",
  fill: "none"
}, /*#__PURE__*/React.createElement("path", {
  d: "M20 4 L24 16 L36 20 L24 24 L20 36 L16 24 L4 20 L16 16 Z",
  fill: color
}));
const WaveSVG = ({
  color = "#3A4D39"
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 80 30",
  fill: "none"
}, /*#__PURE__*/React.createElement("path", {
  d: "M2 15 Q 12 4 22 15 T 42 15 T 62 15 T 78 15",
  stroke: color,
  strokeWidth: "3",
  strokeLinecap: "round",
  fill: "none"
}), /*#__PURE__*/React.createElement("path", {
  d: "M2 24 Q 12 13 22 24 T 42 24 T 62 24 T 78 24",
  stroke: color,
  strokeWidth: "3",
  strokeLinecap: "round",
  fill: "none",
  opacity: "0.6"
}));
const PalmSVG = ({
  color = "#3A4D39"
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 60 80",
  fill: "none"
}, /*#__PURE__*/React.createElement("path", {
  d: "M30 78 L30 30",
  stroke: "#8B5A2B",
  strokeWidth: "3",
  strokeLinecap: "round"
}), /*#__PURE__*/React.createElement("path", {
  d: "M30 30 Q 12 24 4 14",
  stroke: color,
  strokeWidth: "4",
  strokeLinecap: "round",
  fill: "none"
}), /*#__PURE__*/React.createElement("path", {
  d: "M30 30 Q 48 24 56 14",
  stroke: color,
  strokeWidth: "4",
  strokeLinecap: "round",
  fill: "none"
}), /*#__PURE__*/React.createElement("path", {
  d: "M30 30 Q 14 30 6 38",
  stroke: color,
  strokeWidth: "4",
  strokeLinecap: "round",
  fill: "none"
}), /*#__PURE__*/React.createElement("path", {
  d: "M30 30 Q 46 30 54 38",
  stroke: color,
  strokeWidth: "4",
  strokeLinecap: "round",
  fill: "none"
}), /*#__PURE__*/React.createElement("path", {
  d: "M30 30 Q 26 16 18 6",
  stroke: color,
  strokeWidth: "4",
  strokeLinecap: "round",
  fill: "none"
}), /*#__PURE__*/React.createElement("path", {
  d: "M30 30 Q 34 16 42 6",
  stroke: color,
  strokeWidth: "4",
  strokeLinecap: "round",
  fill: "none"
}));

// ============================================================
// HERO
// ============================================================
function Hero({
  tweaks
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      minHeight: '100vh',
      padding: '40px 24px 80px',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(Decor, {
    top: "80px",
    right: "8%",
    rot: -8,
    size: 70
  }, /*#__PURE__*/React.createElement(SunSVG, {
    color: tweaks.mustardColor
  })), /*#__PURE__*/React.createElement(Decor, {
    top: "240px",
    left: "5%",
    rot: 12,
    delay: 1,
    size: 36
  }, /*#__PURE__*/React.createElement(StarSVG, {
    color: tweaks.primaryColor
  })), /*#__PURE__*/React.createElement(Decor, {
    bottom: "180px",
    right: "12%",
    rot: 6,
    delay: 2,
    size: 50
  }, /*#__PURE__*/React.createElement(StarSVG, {
    color: tweaks.forestColor
  })), /*#__PURE__*/React.createElement(Decor, {
    bottom: "60px",
    left: "8%",
    rot: 0,
    delay: 0.5,
    size: 90
  }, /*#__PURE__*/React.createElement(PalmSVG, {
    color: tweaks.forestColor
  })), /*#__PURE__*/React.createElement(Decor, {
    top: "50%",
    right: "3%",
    rot: 0,
    delay: 1.5,
    size: 80
  }, /*#__PURE__*/React.createElement(WaveSVG, {
    color: tweaks.forestColor
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      maxWidth: 1100,
      margin: '0 auto 60px',
      position: 'relative',
      zIndex: 2,
      flexWrap: 'wrap',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "display",
    style: {
      fontWeight: 800,
      fontSize: 32,
      letterSpacing: '-0.04em',
      color: 'var(--forest)'
    }
  }, "EST"), /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 12,
      color: 'var(--forest)',
      opacity: 0.7
    }
  }, "since 2003 \xB7 \u65E9\u7A32\u7530\u5927\u5B66\u516C\u8A8D")), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#about",
    className: "anchor-pill"
  }, "about"), /*#__PURE__*/React.createElement("a", {
    href: "#story",
    className: "anchor-pill"
  }, "story"), /*#__PURE__*/React.createElement("a", {
    href: "#info",
    className: "anchor-pill"
  }, "info"), /*#__PURE__*/React.createElement("a", {
    href: "#join",
    className: "anchor-pill"
  }, "join us"))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1100,
      margin: '0 auto',
      position: 'relative',
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginBottom: 24,
      flexWrap: 'wrap'
    }
  }, tweaks.showStickers && /*#__PURE__*/React.createElement("span", {
    className: "sticker"
  }, "2026 \u65B0\u30E1\u30F3\u30D0\u30FC\u52DF\u96C6\u4E2D"), /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 13,
      color: 'var(--forest)',
      opacity: 0.8
    }
  }, "\u2316 \u65E9\u7A32\u7530\u5927\u5B66 / \u30D5\u30A3\u30EA\u30D4\u30F3\u30FB\u30D1\u30F3\u30C0\u30CE\u30F3\u5CF6")), /*#__PURE__*/React.createElement("h1", {
    className: "display hero-headline",
    style: {
      fontSize: 'clamp(56px, 11vw, 156px)',
      lineHeight: 0.88,
      letterSpacing: '-0.04em',
      margin: '0 0 28px',
      fontWeight: 800,
      color: 'var(--forest)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block'
    }
  }, "\u5FC3\u306E"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      color: 'var(--terra)',
      fontStyle: 'italic',
      fontWeight: 600
    }
  }, "\u30DC\u30E9\u30F3\u30C6\u30A3\u30A2\u3001"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block'
    }
  }, "\u306F\u3058\u3081\u3088\u3046\u3002")), /*#__PURE__*/React.createElement("p", {
    className: "maru",
    style: {
      fontSize: 'clamp(16px, 2vw, 20px)',
      maxWidth: 580,
      lineHeight: 1.9,
      color: 'var(--ink)',
      margin: '0 0 40px',
      fontWeight: 500
    }
  }, "\u96FB\u6C17\u3082\u30AC\u30B9\u3082\u306A\u3044\u3001\u653F\u5E9C\u304B\u3089\u898B\u6368\u3066\u3089\u308C\u305F\u5CF6\u3002", /*#__PURE__*/React.createElement("br", null), "\u50D5\u3089\u306B\u8CC7\u91D1\u306F\u51FA\u305B\u306A\u3044\u3002\u3060\u3051\u3069\u3001", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "squiggle"
  }, "\u5B66\u751F\u306B\u3067\u304D\u308B\u652F\u63F4\u304C\u3001\u3053\u3053\u306B\u3042\u308B\u3002")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16,
      flexWrap: 'wrap',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#join",
    className: "btn-primary"
  }, /*#__PURE__*/React.createElement("span", null, "\u30B5\u30FC\u30AF\u30EB\u306B\u53C2\u52A0\u3059\u308B"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 22
    }
  }, "\u2192")), /*#__PURE__*/React.createElement("a", {
    href: "#story",
    style: {
      color: 'var(--forest)',
      textDecoration: 'underline',
      textUnderlineOffset: 6,
      textDecorationThickness: 2,
      fontWeight: 600,
      fontSize: 15
    }
  }, "\u307E\u305A\u306F\u6D3B\u52D5\u3092\u898B\u308B")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 80,
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
      gap: 24,
      paddingTop: 32,
      borderTop: '2px solid var(--forest)',
      maxWidth: 800
    }
  }, /*#__PURE__*/React.createElement(Stat, {
    num: "10",
    unit: "\u65E5\u9593",
    label: "\u590F\u306E\u30D5\u30A3\u30EA\u30D4\u30F3\u6E21\u822A"
  }), /*#__PURE__*/React.createElement(Stat, {
    num: "12",
    unit: "\u4EBA",
    label: "\u73FE\u5F79\u30E1\u30F3\u30D0\u30FC"
  }), /*#__PURE__*/React.createElement(Stat, {
    num: "23",
    unit: "\u671F",
    label: "\u7D9A\u3044\u3066\u304D\u305F\u6B74\u53F2"
  }), /*#__PURE__*/React.createElement(Stat, {
    num: "2",
    unit: "\u56DE/\u5E74",
    label: "\u6625\u30FB\u590F\u306B\u6E21\u822A"
  }))));
}
function Stat({
  num,
  unit,
  label
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "stat-num",
    style: {
      fontSize: 56,
      color: 'var(--forest)'
    }
  }, num), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: 'var(--forest)',
      fontWeight: 600
    }
  }, unit)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--forest)',
      opacity: 0.75,
      fontWeight: 500,
      letterSpacing: '0.05em'
    }
  }, label));
}

// ============================================================
// MARQUEE — strip of running text
// ============================================================
function Marquee() {
  const items = ["PHILIPPINES", "★", "PANDANON ISLAND", "★", "STUDENT NGO EST", "★", "WASEDA UNIVERSITY", "★", "心のボランティア", "★"];
  const doubled = [...items, ...items, ...items, ...items];
  return /*#__PURE__*/React.createElement("div", {
    style: {
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
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "marquee-track"
  }, doubled.map((t, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    className: "display",
    style: {
      fontSize: 36,
      fontWeight: 800,
      letterSpacing: '-0.02em',
      whiteSpace: 'nowrap'
    }
  }, t))));
}

// ============================================================
// ABOUT — what is EST
// ============================================================
function About() {
  return /*#__PURE__*/React.createElement("section", {
    id: "about",
    style: {
      padding: '120px 24px',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1100,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "reveal",
    style: {
      marginBottom: 48
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 13,
      color: 'var(--terra)',
      letterSpacing: '0.15em',
      fontWeight: 600
    }
  }, "01 \u2014 ABOUT US"), /*#__PURE__*/React.createElement("h2", {
    className: "display section-title",
    style: {
      fontSize: 'clamp(40px, 7vw, 88px)',
      fontWeight: 800,
      lineHeight: 0.95,
      letterSpacing: '-0.03em',
      margin: '12px 0 0',
      color: 'var(--forest)'
    }
  }, "\u5B66\u751FNGO EST", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'italic',
      color: 'var(--terra)',
      fontWeight: 600
    }
  }, "\u3063\u3066\u3001\u306A\u306B\uFF1F"))), /*#__PURE__*/React.createElement("div", {
    className: "reveal",
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: 48,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "maru",
    style: {
      fontSize: 18,
      lineHeight: 2,
      fontWeight: 500
    }
  }, "\u30D5\u30A3\u30EA\u30D4\u30F3\u3067\u6559\u80B2\u652F\u63F4\u3092\u3057\u3066\u3044\u308B\u3001", /*#__PURE__*/React.createElement("br", null), "\u65E9\u7A32\u7530\u5927\u5B66\u306E\u30DC\u30E9\u30F3\u30C6\u30A3\u30A2\u30B5\u30FC\u30AF\u30EB\u3067\u3059\u3002"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 15,
      lineHeight: 2,
      color: 'var(--ink)',
      marginTop: 24
    }
  }, "\u652F\u63F4\u5730\u306F\u3001\u30BB\u30D6\u304B\u3089\u8239\u3067\u6E21\u308B", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--terra)'
    }
  }, "\u30D1\u30F3\u30C0\u30CE\u30F3\u5CF6"), "\u3002 \u96FB\u6C17\u3082\u30AC\u30B9\u3082\u901A\u3063\u3066\u3044\u306A\u3044\u3001\u653F\u5E9C\u304B\u3089\u898B\u6368\u3066\u3089\u308C\u305F\u5C0F\u3055\u306A\u5CF6\u3067\u3059\u3002 \u590F\u306B10\u65E5\u9593\u3001\u73FE\u5730\u306B\u6EDE\u5728\u3057\u3066\u5B50\u3069\u3082\u305F\u3061\u3068\u4E00\u7DD2\u306B\u904E\u3054\u3057\u307E\u3059\u3002"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 15,
      lineHeight: 2,
      color: 'var(--ink)',
      marginTop: 16
    }
  }, "\u300C", /*#__PURE__*/React.createElement("strong", null, "\u5B66\u751F\u306B\u3067\u304D\u308B\u6700\u5927\u306E\u652F\u63F4\u3092"), "\u300D\u3092\u30E2\u30C3\u30C8\u30FC\u306B\u3001 \u81EA\u5206\u305F\u3061\u306B\u3069\u3093\u306A\u3053\u3068\u304C\u3067\u304D\u308B\u306E\u304B\u3001\u6BCE\u9031\u8A71\u3057\u5408\u3044\u306A\u304C\u3089\u6D3B\u52D5\u3057\u3066\u3044\u307E\u3059\u3002")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--paper)',
      padding: 32,
      border: '2px solid var(--forest)',
      borderRadius: 4,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
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
    }
  }, "QUICK FACTS"), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, [["📍", "活動拠点", "早稲田大学・教室"], ["🌴", "支援地", "フィリピン パンダノン島"], ["🗓", "ミーティング", "毎週火曜 18:30〜"], ["✈️", "渡航", "夏 / 春 の年2回"], ["💰", "会費", "4,000円"], ["📚", "カテゴリ", "教育・国際ボランティア"]].map(([icon, k, v]) => /*#__PURE__*/React.createElement("li", {
    key: k,
    style: {
      display: 'flex',
      gap: 14,
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18
    }
  }, icon), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      justifyContent: 'space-between',
      borderBottom: '1px dashed rgba(58,77,57,0.3)',
      paddingBottom: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--forest)',
      fontWeight: 600,
      fontSize: 13
    }
  }, k), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600,
      fontSize: 14,
      textAlign: 'right'
    }
  }, v)))))))));
}

// ============================================================
// HEART OF VOLUNTEERING — the BIG idea
// ============================================================
function HeartSection() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--forest)',
      color: 'var(--cream)',
      padding: '140px 24px',
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(Decor, {
    top: "40px",
    right: "6%",
    rot: 15,
    size: 70
  }, /*#__PURE__*/React.createElement(SunSVG, {
    color: "#E8B04B"
  })), /*#__PURE__*/React.createElement(Decor, {
    bottom: "60px",
    left: "6%",
    rot: -10,
    delay: 1.2,
    size: 50
  }, /*#__PURE__*/React.createElement(StarSVG, {
    color: "#E8B04B"
  })), /*#__PURE__*/React.createElement("div", {
    className: "reveal",
    style: {
      maxWidth: 1000,
      margin: '0 auto',
      position: 'relative',
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 13,
      color: 'var(--mustard)',
      letterSpacing: '0.15em',
      fontWeight: 600
    }
  }, "02 \u2014 OUR PHILOSOPHY"), /*#__PURE__*/React.createElement("p", {
    className: "display",
    style: {
      fontSize: 'clamp(32px, 5.5vw, 68px)',
      lineHeight: 1.25,
      fontWeight: 600,
      fontStyle: 'italic',
      margin: '24px 0 40px',
      letterSpacing: '-0.02em'
    }
  }, "\u8CC7\u91D1\u3058\u3083\u306A\u304F\u3001", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--mustard)'
    }
  }, "\u300C\u5FC3\u300D\u3092\u3001"), /*#__PURE__*/React.createElement("br", null), "\u7F6E\u3044\u3066\u304F\u308B\u3002"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
      gap: 32,
      marginTop: 60
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "maru",
    style: {
      fontSize: 17,
      lineHeight: 2,
      fontWeight: 500
    }
  }, "\u50D5\u3089\u306F\u3001\u304A\u91D1\u3092\u6E21\u3057\u306B\u884C\u304F\u308F\u3051\u3058\u3083\u306A\u3044\u3002", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--mustard)'
    }
  }, "\u5927\u5B66\u751F\u3060\u304B\u3089\u3067\u304D\u308B\u3001\u3061\u3044\u3055\u306A\u30DC\u30E9\u30F3\u30C6\u30A3\u30A2"), "\u3092\u3001\u5927\u4E8B\u306B\u3057\u3066\u307E\u3059\u3002")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      lineHeight: 2,
      opacity: 0.85
    }
  }, "\u652F\u63F4\u5730\u3067\u30DB\u30FC\u30E0\u30B9\u30C6\u30A4\u3092\u3057\u3066\u3001\u73FE\u5730\u306E\u5B50\u3069\u3082\u305F\u3061\u3068\u4E00\u7DD2\u306B\u66AE\u3089\u3059\u3002 \u50D5\u3089\u304C\u6B6F\u78E8\u304D\u3092\u3059\u308C\u3070\u3001\u5B50\u3069\u3082\u305F\u3061\u3082\u771F\u4F3C\u3092\u3059\u308B\u3002 \u3044\u3064\u304B\u58CA\u308C\u3066\u3057\u307E\u3046\u30E2\u30CE\u3058\u3083\u306A\u304F\u3066\u3001\u4EE3\u3005\u4F1D\u308F\u308B\u77E5\u6075\u3092\u6B8B\u3057\u3066\u3044\u304F\u3002 \u305D\u308C\u304C\u3001\u8CA7\u56F0\u3092\u6839\u672C\u304B\u3089\u89E3\u6D88\u3059\u308B\u4E00\u756A\u306E\u8FD1\u9053\u3060\u3068\u4FE1\u3058\u3066\u3044\u307E\u3059\u3002"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: 24,
      marginTop: 80
    }
  }, [{
    n: "01",
    t: "ホームステイ型",
    d: "現地の家族と暮らす。地域に深く入る。"
  }, {
    n: "02",
    t: "知恵を残す",
    d: "モノじゃなく、伝わる習慣をつくる。"
  }, {
    n: "03",
    t: "夢を応援する",
    d: "胸を張って夢を追える子を、増やしたい。"
  }].map(p => /*#__PURE__*/React.createElement("div", {
    key: p.n,
    style: {
      borderTop: '2px solid var(--mustard)',
      paddingTop: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      fontSize: 12,
      color: 'var(--mustard)',
      letterSpacing: '0.1em',
      marginBottom: 8
    }
  }, p.n), /*#__PURE__*/React.createElement("h3", {
    className: "display",
    style: {
      fontSize: 24,
      fontWeight: 700,
      margin: '0 0 12px',
      letterSpacing: '-0.01em'
    }
  }, p.t), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      lineHeight: 1.8,
      opacity: 0.85,
      margin: 0
    }
  }, p.d))))));
}

// ============================================================
// STORY — the photo / episode section
// ============================================================
function Story() {
  return /*#__PURE__*/React.createElement("section", {
    id: "story",
    style: {
      padding: '120px 24px',
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "reveal",
    style: {
      marginBottom: 60,
      maxWidth: 700
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 13,
      color: 'var(--terra)',
      letterSpacing: '0.15em',
      fontWeight: 600
    }
  }, "03 \u2014 A STORY FROM THE ISLAND"), /*#__PURE__*/React.createElement("h2", {
    className: "display section-title",
    style: {
      fontSize: 'clamp(40px, 6vw, 76px)',
      lineHeight: 0.98,
      letterSpacing: '-0.03em',
      fontWeight: 800,
      margin: '12px 0 0',
      color: 'var(--forest)'
    }
  }, "\u751F\u307E\u308C\u305F\u5834\u6240\u3067\u3001", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'italic',
      color: 'var(--terra)',
      fontWeight: 600
    }
  }, "\u5922\u3092\u3001"), "\u3042\u304D\u3089\u3081\u306A\u3044\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "reveal",
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(12, 1fr)',
      gap: 24,
      marginBottom: 80
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: 'span 5',
      transform: 'rotate(-2deg)'
    },
    className: "polaroid"
  }, /*#__PURE__*/React.createElement(Photo, {
    label: "\u5B50\u3069\u3082\u305F\u3061\u3068\u306E\u5199\u771F\u3092\u3053\u3053\u306B",
    tone: "sunset",
    ratio: "4/5"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      fontFamily: 'Caveat, cursive',
      fontSize: 18,
      textAlign: 'center',
      color: 'var(--forest)',
      fontStyle: 'italic'
    }
  }, "\u307F\u3093\u306A\u3067\u6B6F\u307F\u304C\u304D\u30BF\u30A4\u30E0 \u2726")), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: 'span 7',
      display: 'flex',
      flexDirection: 'column',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      transform: 'rotate(1.5deg)'
    },
    className: "polaroid"
  }, /*#__PURE__*/React.createElement(Photo, {
    label: "\u5CF6\u306E\u98A8\u666F\u30FB\u6D77\u306E\u5199\u771F\u3092\u3053\u3053\u306B",
    tone: "sea",
    ratio: "16/9"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      transform: 'rotate(-1deg)'
    },
    className: "polaroid"
  }, /*#__PURE__*/React.createElement(Photo, {
    label: "\u6388\u696D\u306E\u69D8\u5B50",
    tone: "default",
    ratio: "1/1"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      transform: 'rotate(2deg)'
    },
    className: "polaroid"
  }, /*#__PURE__*/React.createElement(Photo, {
    label: "\u30E1\u30F3\u30D0\u30FC\u96C6\u5408\u5199\u771F",
    tone: "jungle",
    ratio: "1/1"
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "reveal",
    style: {
      maxWidth: 760,
      margin: '0 auto',
      padding: '48px 0',
      borderTop: '2px solid var(--forest)',
      borderBottom: '2px solid var(--forest)',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 60,
      lineHeight: 0.5,
      color: 'var(--terra)',
      fontFamily: 'Fraunces, serif',
      marginBottom: 8
    }
  }, "\""), /*#__PURE__*/React.createElement("p", {
    className: "display",
    style: {
      fontSize: 'clamp(22px, 3.2vw, 34px)',
      lineHeight: 1.6,
      fontStyle: 'italic',
      fontWeight: 600,
      color: 'var(--forest)',
      margin: 0
    }
  }, "\u300C\u672C\u3092\u8AAD\u3093\u3067\u3001\u5E83\u3044\u4E16\u754C\u3092\u307F\u305B\u3066\u3042\u3052\u3088\u3046\u300D", /*#__PURE__*/React.createElement("br", null), "\u300C\u30B4\u30DF\u306F\u3001\u30B4\u30DF\u7BB1\u306B\u6368\u3066\u3088\u3046\u306D\u300D", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--terra)'
    }
  }, "\u305D\u3093\u306A\u5C0F\u3055\u306A\u4E00\u3064\u3072\u3068\u3064\u304C\u3001\u6559\u80B2\u652F\u63F4\u3002")))));
}

// ============================================================
// ACTIVITY CALENDAR
// ============================================================
function Calendar() {
  const months = [{
    m: "5月",
    e: "新メンバー入会",
    k: "kickoff",
    color: "mustard"
  }, {
    m: "毎週火",
    e: "ミーティング 18:30〜",
    k: "weekly",
    color: "forest"
  }, {
    m: "夏",
    e: "パンダノン島 渡航 (10日間)",
    k: "trip",
    color: "terra",
    big: true
  }, {
    m: "11月",
    e: "早稲田祭で発表",
    k: "fest",
    color: "forest"
  }, {
    m: "3月",
    e: "春渡航・カモテス諸島",
    k: "trip",
    color: "terra"
  }];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--cream-deep)',
      padding: '120px 24px',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1100,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "reveal",
    style: {
      marginBottom: 60
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 13,
      color: 'var(--terra)',
      letterSpacing: '0.15em',
      fontWeight: 600
    }
  }, "04 \u2014 YEAR AT A GLANCE"), /*#__PURE__*/React.createElement("h2", {
    className: "display section-title",
    style: {
      fontSize: 'clamp(40px, 6vw, 76px)',
      lineHeight: 0.98,
      fontWeight: 800,
      letterSpacing: '-0.03em',
      margin: '12px 0 0',
      color: 'var(--forest)'
    }
  }, "\u4E00\u5E74\u306E", /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'italic',
      color: 'var(--terra)',
      fontWeight: 600
    }
  }, "\u3046\u3054\u304D"), "\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "reveal",
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, months.map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'grid',
      gridTemplateColumns: '120px 1fr auto',
      gap: 24,
      alignItems: 'center',
      padding: m.big ? '28px 24px' : '18px 24px',
      background: m.big ? 'var(--forest)' : 'var(--paper)',
      color: m.big ? 'var(--cream)' : 'var(--ink)',
      borderRadius: 4,
      border: m.big ? 'none' : '1.5px solid rgba(58,77,57,0.15)',
      transition: 'transform .2s ease'
    },
    onMouseEnter: e => e.currentTarget.style.transform = 'translateX(8px)',
    onMouseLeave: e => e.currentTarget.style.transform = 'translateX(0)'
  }, /*#__PURE__*/React.createElement("div", {
    className: "display",
    style: {
      fontSize: m.big ? 32 : 24,
      fontWeight: 700,
      color: m.big ? 'var(--mustard)' : 'var(--terra)',
      letterSpacing: '-0.02em'
    }
  }, m.m), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: m.big ? 22 : 16,
      fontWeight: m.big ? 700 : 500
    }
  }, m.e), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontFamily: 'DM Mono, monospace',
      opacity: 0.7,
      letterSpacing: '0.1em'
    }
  }, m.k.toUpperCase())))), /*#__PURE__*/React.createElement("p", {
    className: "reveal",
    style: {
      marginTop: 40,
      fontSize: 13,
      color: 'var(--forest)',
      opacity: 0.7,
      textAlign: 'center',
      fontFamily: 'DM Mono, monospace'
    }
  }, "\u203B \u6625\u306F \u30AB\u30E2\u30C6\u30B9\u8AF8\u5CF6\u30E9\u30CA\u30AA\u30D0\u30E9\u30F3\u30AC\u30A4\u3001\u590F\u306F \u30D1\u30F3\u30C0\u30CE\u30F3\u5CF6 \u3078\u6E21\u822A")));
}

// ============================================================
// VOICES — fake-y but plausible member voices
// ============================================================
function Voices() {
  const voices = [{
    name: "Aさん",
    year: "教育学部 3年",
    quote: "10日間、電気もガスもない島で過ごす。最初は不安だったけど、子どもたちの笑顔で全部吹っ飛んだ。",
    rot: -1.5
  }, {
    name: "Bさん",
    year: "国際教養 2年",
    quote: "毎週火曜のミーティングが、いちばん楽しい時間。みんな真剣で、でも笑いが絶えない。",
    rot: 1
  }, {
    name: "Cさん",
    year: "文化構想 1年",
    quote: "「学生にできる支援って何?」っていう問いに、ずっと向き合えるサークル。",
    rot: -0.5
  }];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '120px 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1100,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "reveal",
    style: {
      marginBottom: 60
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 13,
      color: 'var(--terra)',
      letterSpacing: '0.15em',
      fontWeight: 600
    }
  }, "05 \u2014 MEMBER VOICES"), /*#__PURE__*/React.createElement("h2", {
    className: "display section-title",
    style: {
      fontSize: 'clamp(40px, 6vw, 76px)',
      lineHeight: 0.98,
      fontWeight: 800,
      letterSpacing: '-0.03em',
      margin: '12px 0 0',
      color: 'var(--forest)'
    }
  }, "\u30E1\u30F3\u30D0\u30FC\u306E", /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'italic',
      color: 'var(--terra)',
      fontWeight: 600
    }
  }, "\u3053\u3048"), "\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "reveal",
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
      gap: 32
    }
  }, voices.map((v, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      background: 'var(--paper)',
      padding: '32px 28px',
      border: '2px solid var(--forest)',
      borderRadius: 4,
      transform: `rotate(${v.rot}deg)`,
      position: 'relative',
      transition: 'transform .25s ease'
    },
    onMouseEnter: e => e.currentTarget.style.transform = 'rotate(0deg) translateY(-4px)',
    onMouseLeave: e => e.currentTarget.style.transform = `rotate(${v.rot}deg)`
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 48,
      lineHeight: 0.4,
      color: 'var(--terra)',
      fontFamily: 'Fraunces, serif',
      marginBottom: 12
    }
  }, "\""), /*#__PURE__*/React.createElement("p", {
    className: "maru",
    style: {
      fontSize: 16,
      lineHeight: 1.9,
      fontWeight: 500,
      margin: '0 0 24px'
    }
  }, v.quote), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      paddingTop: 16,
      borderTop: '1.5px dashed rgba(58,77,57,0.3)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
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
    }
  }, v.name[0]), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: 'var(--forest)'
    }
  }, v.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--forest)',
      opacity: 0.7,
      fontFamily: 'DM Mono, monospace'
    }
  }, v.year)))))), /*#__PURE__*/React.createElement("p", {
    className: "reveal",
    style: {
      marginTop: 32,
      fontSize: 11,
      color: 'var(--forest)',
      opacity: 0.5,
      textAlign: 'center',
      fontFamily: 'DM Mono, monospace'
    }
  }, "\u203B \u4EEE\u306E\u6587\u9762\u3067\u3059\u3002\u5B9F\u969B\u306E\u30E1\u30F3\u30D0\u30FC\u306E\u30B3\u30E1\u30F3\u30C8\u306B\u5DEE\u3057\u66FF\u3048\u53EF\u80FD")));
}

// ============================================================
// JOIN — the big CTA
// ============================================================
function Join() {
  return /*#__PURE__*/React.createElement("section", {
    id: "join",
    style: {
      background: 'var(--terra)',
      color: 'var(--paper)',
      padding: '140px 24px',
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(Decor, {
    top: "40px",
    left: "6%",
    rot: -12,
    size: 60
  }, /*#__PURE__*/React.createElement(SunSVG, {
    color: "#E8B04B"
  })), /*#__PURE__*/React.createElement(Decor, {
    bottom: "60px",
    right: "8%",
    rot: 20,
    delay: 1,
    size: 50
  }, /*#__PURE__*/React.createElement(StarSVG, {
    color: "#E8B04B"
  })), /*#__PURE__*/React.createElement(Decor, {
    top: "50%",
    right: "5%",
    rot: 0,
    size: 70
  }, /*#__PURE__*/React.createElement(WaveSVG, {
    color: "#E8B04B"
  })), /*#__PURE__*/React.createElement("div", {
    className: "reveal",
    style: {
      maxWidth: 900,
      margin: '0 auto',
      position: 'relative',
      zIndex: 2,
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 13,
      color: 'var(--mustard)',
      letterSpacing: '0.15em',
      fontWeight: 600,
      display: 'inline-block',
      marginBottom: 24
    }
  }, "06 \u2014 JOIN US"), /*#__PURE__*/React.createElement("h2", {
    className: "display",
    style: {
      fontSize: 'clamp(48px, 9vw, 120px)',
      lineHeight: 0.92,
      fontWeight: 800,
      letterSpacing: '-0.04em',
      margin: '0 0 32px'
    }
  }, "\u4E00\u7DD2\u306B\u3001", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'italic',
      color: 'var(--mustard)',
      fontWeight: 600
    }
  }, "\u5CF6\u3078\u3002")), /*#__PURE__*/React.createElement("p", {
    className: "maru",
    style: {
      fontSize: 18,
      lineHeight: 2,
      fontWeight: 500,
      maxWidth: 580,
      margin: '0 auto 48px'
    }
  }, "\u5B66\u5E74\u30FB\u5B66\u90E8\u3001\u95A2\u4FC2\u306A\u3057\u3002", /*#__PURE__*/React.createElement("br", null), "\u307E\u305A\u306FInstagram\u306EDM\u304B\u3089\u3001\u304A\u6C17\u8EFD\u306B\u58F0\u3092\u304B\u3051\u3066\u304F\u3060\u3055\u3044\u3002", /*#__PURE__*/React.createElement("br", null), "\u6BCE\u9031\u706B\u66DC\u306E\u30DF\u30FC\u30C6\u30A3\u30F3\u30B0\u306B\u3001\u898B\u5B66\u306B\u6765\u308B\u306E\u3082OK\u3002"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16,
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginBottom: 48
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://www.instagram.com/est_waseda/",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "btn-primary",
    style: {
      background: 'var(--paper)',
      color: 'var(--terra)',
      boxShadow: '4px 4px 0 var(--ink)'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "3",
    width: "18",
    height: "18",
    rx: "5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "4"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "17.5",
    cy: "6.5",
    r: "0.8",
    fill: "currentColor"
  })), /*#__PURE__*/React.createElement("span", null, "@est_waseda \u306BDM")), /*#__PURE__*/React.createElement("a", {
    href: "mailto:est.2019.16th@gmail.com",
    className: "btn-primary",
    style: {
      background: 'var(--forest)',
      color: 'var(--paper)',
      boxShadow: '4px 4px 0 var(--ink)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\u30E1\u30FC\u30EB\u3067\u805E\u304F"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 22
    }
  }, "\u2709"))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--paper)',
      color: 'var(--ink)',
      padding: '32px 28px',
      maxWidth: 560,
      margin: '0 auto',
      textAlign: 'left',
      borderRadius: 4,
      boxShadow: '6px 6px 0 var(--ink)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      fontSize: 11,
      color: 'var(--terra)',
      letterSpacing: '0.15em',
      fontWeight: 600,
      marginBottom: 16
    }
  }, "CONTACT"), /*#__PURE__*/React.createElement(ContactRow, {
    k: "\u4EE3\u8868",
    v: "\u67F4\u7530 \u62D3\u90CE",
    sub: "\u65E9\u7A32\u7530\u5927\u5B66 \u6559\u80B2\u5B66\u90E8 3\u5E74"
  }), /*#__PURE__*/React.createElement(ContactRow, {
    k: "\u30E1\u30FC\u30EB",
    v: "est.2019.16th@gmail.com",
    link: "mailto:est.2019.16th@gmail.com"
  }), /*#__PURE__*/React.createElement(ContactRow, {
    k: "Instagram",
    v: "@est_waseda",
    link: "https://www.instagram.com/est_waseda/"
  }), /*#__PURE__*/React.createElement(ContactRow, {
    k: "X (Twitter)",
    v: "@EST_ngo",
    link: "https://twitter.com/EST_ngo"
  }), /*#__PURE__*/React.createElement(ContactRow, {
    k: "Facebook",
    v: "ngoest",
    link: "https://ja-jp.facebook.com/ngoest/"
  }), /*#__PURE__*/React.createElement(ContactRow, {
    k: "HP",
    v: "pando.life/EST_ngo",
    link: "https://pando.life/EST_ngo",
    last: true
  }))));
}
function ContactRow({
  k,
  v,
  sub,
  link,
  last
}) {
  const content = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--forest)',
      opacity: 0.7,
      fontWeight: 600,
      fontFamily: 'DM Mono, monospace',
      minWidth: 110
    }
  }, k), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 14,
      fontWeight: 600
    }
  }, v, sub && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 12,
      fontWeight: 400,
      opacity: 0.7,
      marginTop: 2
    }
  }, sub)), link && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--terra)',
      fontSize: 14
    }
  }, "\u2197"));
  const style = {
    display: 'flex',
    alignItems: 'baseline',
    gap: 12,
    padding: '12px 0',
    borderBottom: last ? 'none' : '1px dashed rgba(58,77,57,0.25)',
    textDecoration: 'none',
    color: 'var(--ink)'
  };
  return link ? /*#__PURE__*/React.createElement("a", {
    href: link,
    target: "_blank",
    rel: "noopener noreferrer",
    style: style
  }, content) : /*#__PURE__*/React.createElement("div", {
    style: style
  }, content);
}

// ============================================================
// FOOTER
// ============================================================
function Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--ink)',
      color: 'var(--cream)',
      padding: '60px 24px 32px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 800,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "display",
    style: {
      fontSize: 80,
      fontWeight: 800,
      letterSpacing: '-0.04em',
      color: 'var(--mustard)',
      fontStyle: 'italic',
      lineHeight: 1
    }
  }, "EST."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      opacity: 0.6,
      marginTop: 16,
      fontFamily: 'DM Mono, monospace'
    }
  }, "\u5B66\u751FNGO EST \xB7 Waseda University \xB7 est.2003"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 11,
      opacity: 0.4,
      marginTop: 24
    }
  }, "\xA9 \u5B66\u751FNGO EST. Made with care for the kids of Pandanon Island.")));
}

// ============================================================
// TWEAKS PANEL CONTENT
// ============================================================
function TweaksContent({
  tweaks,
  setTweak
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TweakSection, {
    title: "\u30AB\u30E9\u30FC"
  }, /*#__PURE__*/React.createElement(TweakColor, {
    label: "\u30E1\u30A4\u30F3\u30AB\u30E9\u30FC (terra)",
    value: tweaks.primaryColor,
    onChange: v => {
      setTweak('primaryColor', v);
      document.documentElement.style.setProperty('--terra', v);
    }
  }), /*#__PURE__*/React.createElement(TweakColor, {
    label: "\u30B5\u30D6\u30AB\u30E9\u30FC (forest)",
    value: tweaks.forestColor,
    onChange: v => {
      setTweak('forestColor', v);
      document.documentElement.style.setProperty('--forest', v);
    }
  }), /*#__PURE__*/React.createElement(TweakColor, {
    label: "\u30A2\u30AF\u30BB\u30F3\u30C8 (mustard)",
    value: tweaks.mustardColor,
    onChange: v => {
      setTweak('mustardColor', v);
      document.documentElement.style.setProperty('--mustard', v);
    }
  }), /*#__PURE__*/React.createElement(TweakColor, {
    label: "\u80CC\u666F (cream)",
    value: tweaks.creamColor,
    onChange: v => {
      setTweak('creamColor', v);
      document.documentElement.style.setProperty('--cream', v);
    }
  })), /*#__PURE__*/React.createElement(TweakSection, {
    title: "\u8868\u793A"
  }, /*#__PURE__*/React.createElement(TweakRadio, {
    label: "\u30B9\u30C6\u30C3\u30AB\u30FC\u8868\u793A",
    value: tweaks.showStickers ? "on" : "off",
    options: [{
      value: "on",
      label: "ON"
    }, {
      value: "off",
      label: "OFF"
    }],
    onChange: v => setTweak('showStickers', v === "on")
  })));
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
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Hero, {
    tweaks: tweaks
  }), /*#__PURE__*/React.createElement(Marquee, null), /*#__PURE__*/React.createElement(About, null), /*#__PURE__*/React.createElement(HeartSection, null), /*#__PURE__*/React.createElement(Story, null), /*#__PURE__*/React.createElement(Calendar, null), /*#__PURE__*/React.createElement(Voices, null), /*#__PURE__*/React.createElement(Join, null), /*#__PURE__*/React.createElement(Footer, null), /*#__PURE__*/React.createElement(TweaksPanel, {
    title: "Tweaks"
  }, /*#__PURE__*/React.createElement(TweaksContent, {
    tweaks: tweaks,
    setTweak: setTweak
  })));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));