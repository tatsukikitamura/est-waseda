import { Link } from 'react-router-dom';
import Decor from '../ui/Decor';
import { SunSVG, StarSVG, WaveSVG, PalmSVG } from '../ui/svgs';

type StatProps = { num: string; unit: string; label: string };

function Stat({ num, unit, label }: StatProps) {
  return (
    <div>
      <div className="flex items-baseline gap-1">
        <span className="stat-num text-forest text-[56px]">{num}</span>
        <span className="text-forest text-sm font-semibold">{unit}</span>
      </div>
      <div className="text-[12px] text-forest opacity-75 font-medium tracking-wider">
        {label}
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] px-6 pt-10 pb-20 overflow-hidden">
      <Decor top="40px" right="8%" rot={-8} size={70}>
        <SunSVG />
      </Decor>
      <Decor top="200px" left="5%" rot={12} delay={1} size={36}>
        <StarSVG />
      </Decor>
      <Decor bottom="180px" right="12%" rot={6} delay={2} size={50}>
        <StarSVG color="#3A4D39" />
      </Decor>
      <Decor bottom="40px" right="4%" rot={0} delay={0.5} size={90}>
        <PalmSVG />
      </Decor>
      <Decor top="50%" right="3%" rot={0} delay={1.5} size={80}>
        <WaveSVG />
      </Decor>

      <div className="max-w-[1100px] mx-auto relative z-[2]">
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <span className="sticker">2026 新メンバー募集中</span>
          <span className="font-mono text-[13px] text-forest opacity-80">
            ⌖ 早稲田大学 / フィリピン・パンダノン島
          </span>
        </div>

        <h1
          className="font-display font-extrabold text-forest m-0 mb-7"
          style={{ fontSize: 'clamp(40px, 11vw, 156px)', lineHeight: 0.88, letterSpacing: '-0.04em' }}
        >
          <span className="block">心の</span>
          <span className="block text-terra">ボランティア、</span>
          <span className="block">はじめよう。</span>
        </h1>

        <p
          className="font-maru max-w-[580px] text-ink m-0 mb-10 font-medium"
          style={{ fontSize: 'clamp(16px, 2vw, 20px)', lineHeight: 1.9 }}
        >
          電気もガスもない、政府から見捨てられた島。<br />
          僕らに資金は出せない。だけど、<br />
          <span className="squiggle">学生にできる支援が、ここにある。</span>
        </p>

        <div className="flex gap-4 flex-wrap items-center">
          <Link to="/join" className="btn-primary">
            <span>サークルに参加する</span>
            <span className="text-[22px]">→</span>
          </Link>
          <Link
            to="/story"
            className="text-forest underline underline-offset-[6px] decoration-2 font-semibold text-[15px]"
          >
            まずは活動を見る
          </Link>
        </div>

        <div
          className="mt-20 grid gap-6 pt-8 border-t-2 border-forest max-w-[800px]"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))' }}
        >
          <Stat num="10" unit="日間" label="夏のフィリピン渡航" />
          <Stat num="12" unit="人" label="現役メンバー" />
          <Stat num="23" unit="期" label="続いてきた歴史" />
          <Stat num="2" unit="回/年" label="春・夏に渡航" />
        </div>
      </div>
    </section>
  );
}
