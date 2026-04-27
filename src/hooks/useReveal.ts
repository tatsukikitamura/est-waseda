import { useEffect } from 'react';

export function useReveal(key?: string) {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.reveal');
    els.forEach((el) => el.classList.remove('in'));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0, rootMargin: '0px 0px -10% 0px' },
    );
    els.forEach((el) => io.observe(el));

    const t = window.setTimeout(() => {
      document
        .querySelectorAll<HTMLElement>('.reveal:not(.in)')
        .forEach((el) => el.classList.add('in'));
    }, 2500);

    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, [key]);
}
