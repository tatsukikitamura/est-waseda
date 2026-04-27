import Decor from '../ui/Decor';
import { SunSVG, StarSVG } from '../ui/svgs';

type Pillar = { n: string; t: string; d: string };

const pillars: Pillar[] = [
  { n: '01', t: 'ホームステイ型', d: '現地の家族と暮らす。地域に深く入る。' },
  { n: '02', t: '知恵を残す', d: 'モノじゃなく、伝わる習慣をつくる。' },
  { n: '03', t: '夢を応援する', d: '胸を張って夢を追える子を、増やしたい。' },
];

export default function HeartSection() {
  return (
    <section className="bg-forest text-cream py-[140px] px-6 relative overflow-hidden">
      <Decor top="40px" right="6%" rot={15} size={70}>
        <SunSVG />
      </Decor>
      <Decor bottom="60px" left="6%" rot={-10} delay={1.2} size={50}>
        <StarSVG color="#E8B04B" />
      </Decor>

      <div className="reveal max-w-[1000px] mx-auto relative z-[2]">
        <span className="font-mono text-[13px] text-mustard tracking-[0.15em] font-semibold">
          02 — OUR PHILOSOPHY
        </span>

        <p
          className="font-display italic font-semibold my-10"
          style={{ fontSize: 'clamp(32px, 5.5vw, 68px)', lineHeight: 1.25, letterSpacing: '-0.02em' }}
        >
          資金じゃなく、<br />
          <span className="text-mustard">「心」を、</span><br />
          置いてくる。
        </p>

        <div
          className="grid gap-8 mt-16"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}
        >
          <div>
            <p className="font-maru text-[17px] leading-loose font-medium">
              僕らは、お金を渡しに行くわけじゃない。<br />
              <span className="text-mustard">大学生だからできる、ちいさなボランティア</span>
              を、大事にしてます。
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

        <div
          className="grid gap-6 mt-20"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}
        >
          {pillars.map((p) => (
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
