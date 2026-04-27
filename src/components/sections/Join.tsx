import Decor from '../ui/Decor';
import { SunSVG, StarSVG, WaveSVG } from '../ui/svgs';

type ContactRowProps = {
  k: string;
  v: string;
  sub?: string;
  link?: string;
  last?: boolean;
};

function ContactRow({ k, v, sub, link, last }: ContactRowProps) {
  const inner = (
    <>
      <span className="text-[12px] text-forest opacity-70 font-semibold font-mono min-w-[110px]">
        {k}
      </span>
      <span className="flex-1 text-sm font-semibold">
        {v}
        {sub && <span className="block text-[12px] font-normal opacity-70 mt-0.5">{sub}</span>}
      </span>
      {link && <span className="text-terra text-sm">↗</span>}
    </>
  );
  const cls = `flex items-baseline gap-3 py-3 no-underline text-ink ${
    last ? '' : 'border-b border-dashed'
  }`;
  const style = last ? undefined : { borderColor: 'rgba(58,77,57,0.25)' };

  return link ? (
    <a href={link} target="_blank" rel="noopener noreferrer" className={cls} style={style}>
      {inner}
    </a>
  ) : (
    <div className={cls} style={style}>
      {inner}
    </div>
  );
}

export default function Join() {
  return (
    <section
      id="join"
      className="bg-terra text-paper py-[140px] px-6 relative overflow-hidden"
    >
      <Decor top="40px" left="6%" rot={-12} size={60}>
        <SunSVG />
      </Decor>
      <Decor bottom="60px" right="8%" rot={20} delay={1} size={50}>
        <StarSVG color="#E8B04B" />
      </Decor>
      <Decor top="50%" right="5%" rot={0} size={70}>
        <WaveSVG color="#E8B04B" />
      </Decor>

      <div className="reveal max-w-[900px] mx-auto relative z-[2] text-center">
        <span className="font-mono text-[13px] text-mustard tracking-[0.15em] font-semibold inline-block mb-6">
          06 — JOIN US
        </span>

        <h2
          className="font-display font-extrabold m-0 mb-8"
          style={{ fontSize: 'clamp(48px, 9vw, 120px)', lineHeight: 1.1, letterSpacing: '-0.04em' }}
        >
          一緒に、<br />
          <span className="text-mustard">島へ。</span>
        </h2>

        <p className="font-maru text-lg leading-loose font-medium max-w-[580px] mx-auto mb-12">
          学年・学部、関係なし。<br />
          まずはInstagramのDMから、お気軽に声をかけてください。<br />
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
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
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

        <div
          className="bg-paper text-ink py-8 px-7 max-w-[560px] mx-auto text-left rounded-[4px]"
          style={{ boxShadow: '6px 6px 0 #1F2A1E' }}
        >
          <div className="font-mono text-[11px] text-terra tracking-[0.15em] font-semibold mb-4">
            CONTACT
          </div>
          <ContactRow k="代表" v="柴田 拓郎" sub="早稲田大学 教育学部 3年" />
          <ContactRow
            k="メール"
            v="est.2019.16th@gmail.com"
            link="mailto:est.2019.16th@gmail.com"
          />
          <ContactRow k="Instagram" v="@est_waseda" link="https://www.instagram.com/est_waseda/" />
          <ContactRow k="X (Twitter)" v="@EST_ngo" link="https://twitter.com/EST_ngo" />
          <ContactRow k="Facebook" v="ngoest" link="https://ja-jp.facebook.com/ngoest/" />
          <ContactRow k="HP" v="pando.life/EST_ngo" link="https://pando.life/EST_ngo" last />
        </div>
      </div>
    </section>
  );
}
