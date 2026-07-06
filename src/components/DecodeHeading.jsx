import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&/<>[]{}*';
const GOLD = '#b87905';

// Titular con efecto "decode": cada letra se descifra desde caracteres aleatorios.
// Cada palabra es una unidad indivisible (nunca se parte a la mitad).
// startOnView: si es true, la animación arranca al entrar en pantalla. Respeta reduced-motion.
export default function DecodeHeading({ text, goldWord, as = 'h1', className = '', frameMs = 34, perChar = 0.55, startOnView = false }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const Tag = as;

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    el.innerHTML = '';
    const words = String(text).split(' ');
    const spans = [];

    words.forEach((w, wi) => {
      const wordEl = document.createElement('span');
      wordEl.style.display = 'inline-block';
      wordEl.style.whiteSpace = 'nowrap';
      const isGold = goldWord && w.toLowerCase() === goldWord.toLowerCase();
      [...w].forEach((ch) => {
        const s = document.createElement('span');
        s.style.display = 'inline-block';
        s.dataset.final = ch;
        if (isGold) s.dataset.gold = '1';
        s.textContent = ch;
        wordEl.appendChild(s);
        spans.push(s);
      });
      el.appendChild(wordEl);
      if (wi < words.length - 1) el.appendChild(document.createTextNode(' '));
    });

    const showFinal = () => spans.forEach((s) => { s.textContent = s.dataset.final; if (s.dataset.gold) s.style.color = GOLD; });

    if (reduce) { showFinal(); return undefined; }

    const intervals = [];
    const run = () => {
      el.style.visibility = 'visible';
      spans.forEach((s, i) => {
        const fin = s.dataset.final;
        const frames = 7 + Math.floor(i * perChar);
        let f = 0;
        const iv = setInterval(() => {
          if (f >= frames) {
            s.textContent = fin;
            if (s.dataset.gold) s.style.color = GOLD;
            clearInterval(iv);
            return;
          }
          s.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          f += 1;
        }, frameMs);
        intervals.push(iv);
      });
    };

    let observer;
    if (startOnView) {
      el.style.visibility = 'hidden';
      observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) { observer.disconnect(); run(); }
      }, { threshold: 0.5 });
      observer.observe(el);
    } else {
      run();
    }

    return () => {
      intervals.forEach(clearInterval);
      if (observer) observer.disconnect();
    };
  }, [text, goldWord, reduce, frameMs, perChar, startOnView]);

  return <Tag ref={ref} className={className} aria-label={text} />;
}
