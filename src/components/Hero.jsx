import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import studioLogo from '../assets/freewill-studio-logo.png';
import HeroVideo from './HeroVideo.jsx';
import DecodeHeading from './DecodeHeading.jsx';
import Magnetic from './Magnetic.jsx';
import LangToggle from './LangToggle.jsx';
import { useLang } from '../i18n.jsx';
import { fadeUp, staggerContainer } from '../motion.js';

export default function Hero() {
  const { t } = useLang();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const panelY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <header ref={ref} className="relative min-h-screen px-4 py-5 sm:px-6">
      <motion.div className="hero-glow pointer-events-none" style={{ y: glowY }} />
      <div className="techwear-grid" />
      <div className="slow-particle right-[18%] top-28" />
      <div className="slow-particle right-[7%] top-52 [animation-delay:2.4s]" />
      <nav className="mx-auto flex max-w-7xl items-start justify-between border-b border-ink/[0.20] pb-5">
        <a href="#" className="studio-brand">
          <span className="studio-logo-mark">
            <img src={studioLogo} alt="FREEWILL.STUDIO" />
          </span>
        </a>
        <div className="flex items-start gap-5">
          <div className="hidden text-right font-condensed text-sm font-black uppercase tracking-[0.28em] text-ink/[0.70] sm:block">
            {t.hero.values.map((v) => <p key={v}>{v}</p>)}
          </div>
          <LangToggle />
        </div>
      </nav>

      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.section variants={staggerContainer} initial="hidden" animate="visible" style={{ y: contentY, opacity: fade }}>
          <motion.p variants={fadeUp} className="font-condensed text-sm font-black uppercase tracking-[0.42em] text-ink/[0.70]">
            {t.hero.tagline}
          </motion.p>
          <DecodeHeading
            as="h1"
            text={t.hero.title}
            goldWord={t.hero.goldWord}
            className="mt-8 max-w-5xl font-condensed text-6xl font-black uppercase leading-[0.86] tracking-normal text-ink sm:text-8xl lg:text-[8rem]"
          />
          <motion.p variants={fadeUp} className="mt-7 max-w-2xl font-condensed text-2xl font-black uppercase leading-tight tracking-[0.04em] text-gold sm:text-3xl">
            {t.hero.subtitle}
          </motion.p>
          <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-lg leading-8 text-ink/[0.62]">
            {t.hero.desc}
          </motion.p>
          <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Magnetic strength={0.4}>
              <a href="#contacto" className="btn-primary">
                {t.hero.cta1}
                <ArrowRight size={18} />
              </a>
            </Magnetic>
            <Magnetic strength={0.4}>
              <a href="#proyectos" className="btn-secondary">
                {t.hero.cta2}
              </a>
            </Magnetic>
          </motion.div>
        </motion.section>

        <motion.section
          className="relative flex items-center justify-center lg:justify-end"
          style={{ y: panelY }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.28, duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
        >
          <HeroVideo />
        </motion.section>
      </div>
    </header>
  );
}


