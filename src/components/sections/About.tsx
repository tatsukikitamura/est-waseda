type Fact = { icon: string; key: string; value: string };

const facts: Fact[] = [
  { icon: '📍', key: '活動拠点', value: '早稲田大学・教室' },
  { icon: '🌴', key: '支援地', value: 'フィリピン パンダノン島' },
  { icon: '🗓', key: 'ミーティング', value: '毎週火曜 18:30〜' },
  { icon: '✈️', key: '渡航', value: '夏 / 春 の年2回' },
  { icon: '💰', key: '会費', value: '4,000円' },
  { icon: '📚', key: 'カテゴリ', value: '教育・国際ボランティア' },
];

export default function About() {
  return (
    <section id="about" className="py-[120px] px-6 relative">
      <div className="max-w-[1100px] mx-auto">
        <div className="reveal mb-12">
          <span className="font-mono text-[13px] text-terra tracking-[0.15em] font-semibold">
            01 — ABOUT US
          </span>
          <h2
            className="font-display font-extrabold text-forest mt-3"
            style={{ fontSize: 'clamp(40px, 7vw, 88px)', lineHeight: 1.1, letterSpacing: '-0.03em' }}
          >
            学生NGO EST<br />
            <span className="text-terra">って、なに？</span>
          </h2>
        </div>

        <div
          className="reveal grid gap-12 items-start"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}
        >
          <div>
            <p className="font-maru text-lg leading-loose font-medium">
              フィリピンで教育支援をしている、<br />
              早稲田大学のボランティアサークルです。
            </p>
            <p className="text-[15px] leading-loose text-ink mt-6">
              支援地は、セブから船で渡る
              <strong className="text-terra">パンダノン島</strong>。
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
              {facts.map(({ icon, key, value }) => (
                <li key={key} className="flex gap-3.5 items-baseline">
                  <span className="text-lg">{icon}</span>
                  <div
                    className="flex-1 flex justify-between border-b border-dashed pb-2"
                    style={{ borderColor: 'rgba(58,77,57,0.3)' }}
                  >
                    <span className="text-forest font-semibold text-[13px]">{key}</span>
                    <span className="font-semibold text-sm text-right">{value}</span>
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
