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
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0.2]);

  return (
    <header ref={ref} className="relative min-h-[90vh] px-4 pt-5 pb-12 sm:px-6 sm:pb-16 lg:min-h-screen lg:pb-20">
      <motion.div className="hero-glow pointer-events-none" style={{ y: glowY }} />
      <div className="techwear-grid" />
      <div className="slow-particle right-[18%] top-28" />
      <div className="slow-particle right-[7%] top-52 [animation-delay:2.4s]" />
      
      <nav className="mx-auto flex max-w-7xl items-start justify-between border-b border-ink/[0.20] pb-5">
        <a href="#" className="studio-brand">
          <span className="studio-logo-mark">
            <img src={studioLogo} alt="FREEWILL.STUDIO" className="h-8 w-auto sm:h-10" />
          </span>
        </a>
        <div className="flex items-start gap-5">
          <div className="hidden text-right font-condensed text-sm font-black uppercase tracking-[0.28em] text-ink/[0.70] sm:block">
            {t.hero.values.map((v) => <p key={v}>{v}</p>)}
          </div>
          <LangToggle />
        </div>
      </nav>

      <div className="mx-auto grid max-w-7xl items-center gap-10 py-8 sm:py-12 lg:min-h-[calc(100vh-8rem)] lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <motion.section variants={staggerContainer} initial="hidden" animate="visible" style={{ opacity: fade }}>
          <motion.p variants={fadeUp} className="font-condensed text-xs sm:text-sm font-black uppercase tracking-[0.3em] sm:tracking-[0.42em] text-ink/[0.70]">
            {t.hero.tagline}
          </motion.p>
          <DecodeHeading
            as="h1"
            text={t.hero.title}
            goldWord={t.hero.goldWord}
            className="mt-6 max-w-5xl font-condensed text-5xl font-black uppercase leading-[0.92] tracking-normal text-ink sm:mt-8 sm:text-7xl lg:text-[7.5rem]"
          />
          <motion.p variants={fadeUp} className="mt-6 max-w-2xl font-condensed text-xl font-black uppercase leading-tight tracking-[0.04em] text-gold sm:mt-7 sm:text-2xl lg:text-3xl">
            {t.hero.subtitle}
          </motion.p>
          <motion.p variants={fadeUp} className="mt-5 max-w-2xl text-base leading-7 text-ink/[0.68] sm:mt-6 sm:text-lg sm:leading-8">
            {t.hero.desc}
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row">
            <Magnetic strength={0.4} className="w-full sm:w-auto">
              <a href="#contacto" className="btn-primary w-full sm:w-auto">
                {t.hero.cta1}
                <ArrowRight size={18} />
              </a>
            </Magnetic>
            <Magnetic strength={0.4} className="w-full sm:w-auto">
              <a href="#proyectos" className="btn-secondary w-full sm:w-auto">
                {t.hero.cta2}
              </a>
            </Magnetic>
          </motion.div>
        </motion.section>

        <motion.section
          className="relative flex items-center justify-center lg:justify-end"
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



