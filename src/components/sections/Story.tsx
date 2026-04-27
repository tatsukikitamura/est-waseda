import Photo from '../ui/Photo';

export default function Story() {
  return (
    <section id="story" className="py-[120px] px-6 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        <div className="reveal mb-16 max-w-[700px]">
          <span className="font-mono text-[13px] text-terra tracking-[0.15em] font-semibold">
            03 — A STORY FROM THE ISLAND
          </span>
          <h2
            className="font-display font-extrabold text-forest mt-3"
            style={{ fontSize: 'clamp(40px, 6vw, 76px)', lineHeight: 1.1, letterSpacing: '-0.03em' }}
          >
            生まれた場所で、<br />
            <span className="text-terra">夢を、</span>あきらめない。
          </h2>
        </div>

        <div className="reveal grid grid-cols-12 gap-6 mb-20">
          <div
            className="col-span-12 md:col-span-5 polaroid"
            style={{ transform: 'rotate(-2deg)' }}
          >
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
          <div
            className="text-[60px] text-terra font-display mb-2"
            style={{ lineHeight: 0.5 }}
          >
            "
          </div>
          <p
            className="font-display italic font-semibold text-forest m-0"
            style={{ fontSize: 'clamp(22px, 3.2vw, 34px)', lineHeight: 1.6 }}
          >
            「本を読んで、広い世界をみせてあげよう」<br />
            「ゴミは、ゴミ箱に捨てようね」<br />
            <span className="text-terra">そんな小さな一つひとつが、教育支援。</span>
          </p>
        </div>
      </div>
    </section>
  );
}
