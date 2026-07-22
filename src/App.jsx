import { ArrowRight, Eye, MessageSquare, MousePointerClick, RefreshCcw, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedHeading from './components/AnimatedHeading.jsx';
import ContactForm from './components/ContactForm.jsx';
import Faq from './components/Faq.jsx';
import FloatingWhatsApp from './components/FloatingWhatsApp.jsx';
import Footer from './components/Footer.jsx';
import GlobalPacman from './components/GlobalPacman.jsx';
import Hero from './components/Hero.jsx';
import Magnetic from './components/Magnetic.jsx';
import Navbar from './components/Navbar.jsx';
import PrivacyNotice from './components/PrivacyNotice.jsx';
import Process from './components/Process.jsx';
import Projects from './components/Projects.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';
import Services from './components/Services.jsx';
import Stats from './components/Stats.jsx';
import Testimonials from './components/Testimonials.jsx';
import { useEffect } from 'react';
import useSmoothScroll from './lib/useSmoothScroll.js';
import { trackPageview } from './lib/track.js';
import { useLang } from './i18n.jsx';
import { cardHover, fadeUp, staggerContainer } from './motion.js';

const conversionIcons = [Eye, MessageSquare, MousePointerClick, RefreshCcw, TrendingUp];

export default function App() {
  const { t, lang } = useLang();
  useSmoothScroll();

  useEffect(() => {
    trackPageview();
  }, []);

  // Metadatos dinámicos SEO y Open Graph de la Landing Page
  useEffect(() => {
    if (t.seo) {
      document.title = t.seo.title;

      // Meta descripción
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = 'description';
        document.head.appendChild(metaDesc);
      }
      metaDesc.content = t.seo.description;

      // Meta keywords
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.name = 'keywords';
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.content = t.seo.keywords;

      // OpenGraph Title
      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (!ogTitle) {
        ogTitle = document.createElement('meta');
        ogTitle.setAttribute('property', 'og:title');
        document.head.appendChild(ogTitle);
      }
      ogTitle.content = t.seo.title;

      // OpenGraph Description
      let ogDesc = document.querySelector('meta[property="og:description"]');
      if (!ogDesc) {
        ogDesc = document.createElement('meta');
        ogDesc.setAttribute('property', 'og:description');
        document.head.appendChild(ogDesc);
      }
      ogDesc.content = t.seo.description;

      // OpenGraph Locale
      let ogLocale = document.querySelector('meta[property="og:locale"]');
      if (!ogLocale) {
        ogLocale = document.createElement('meta');
        ogLocale.setAttribute('property', 'og:locale');
        document.head.appendChild(ogLocale);
      }
      ogLocale.content = lang === 'es' ? 'es_MX' : 'en_US';
    }
  }, [t, lang]);

  return (
    <div className="studio-page min-h-screen overflow-hidden text-ink">
      <ScrollProgress />
      <Navbar />
      <FloatingWhatsApp />
      <PrivacyNotice />
      <div className="tech-lines pointer-events-none fixed inset-0 z-0" />
      <GlobalPacman />
      <div className="ink-splatter -left-20 top-64 z-0 hidden lg:block" />
      <div className="relative z-10">
        <Hero />

        <div className="overflow-hidden border-y border-ink bg-gold py-2 text-ink">
          <div className="ticker-track flex w-max gap-6 font-condensed text-sm font-black uppercase tracking-[0.2em]">
            {Array.from({ length: 2 }).map((_, group) => (
              <div key={group} className="flex gap-6">
                {['FREEWILL.STUDIO', 'WEB APPS', 'AUTOMATIZACIÓN', 'DISEÑO CONSCIENTE', 'TECNOLOGÍA CON PROPÓSITO'].map((item) => (
                  <span key={`${group}-${item}`}>{item}</span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <motion.section id="beneficios" className="section-shell" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.22 }}>
          <div className="section-heading">
            <span className="eyebrow">{t.benefitsSection.eyebrow}</span>
            <AnimatedHeading
              as="h2"
              text={t.benefitsSection.h2}
              className="mt-4 font-condensed text-4xl font-black uppercase leading-none tracking-normal text-ink sm:text-6xl"
            />
            <p>{t.benefitsSection.p}</p>
          </div>

          <motion.div className="grid gap-px overflow-hidden border border-ink/[0.70] bg-ink/[0.70] sm:grid-cols-2 lg:grid-cols-3" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
            {t.benefits.map((benefit, index) => (
              <motion.article key={benefit} variants={fadeUp} whileHover={cardHover} className="group bg-paper p-5 transition hover:bg-white hover:shadow-[0_0_28px_rgba(184,121,5,0.14)]" style={{ animationDelay: `${index * 80}ms` }}>
                <div className="mb-7 h-px w-full border-t border-dashed border-ink/[0.35]" />
                <p className="font-condensed text-2xl font-black uppercase leading-none tracking-normal text-ink group-hover:text-gold">
                  {benefit}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </motion.section>

        <Stats />

        <Services />

        <motion.section className="section-shell py-10" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
          <div className="mx-auto max-w-5xl text-center">
            <p className="font-condensed text-3xl font-black uppercase leading-tight text-ink sm:text-5xl">
              {t.techLine.p1}
              <br />
              {t.techLine.p2} <span className="text-gold">{t.techLine.gold}</span> {t.techLine.p3}
            </p>
            <motion.div className="mt-10 grid gap-5 sm:grid-cols-5" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
              {t.conversion.map((label, index) => {
                const Icon = conversionIcons[index];
                return (
                  <motion.div key={label} variants={fadeUp} whileHover={{ y: -3, color: '#b87905' }} transition={{ type: 'spring', stiffness: 190, damping: 24 }} className="flex items-center justify-center gap-4 sm:block">
                    <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 6.5, repeat: Infinity, delay: index * 0.45, ease: 'easeInOut' }}>
                      <Icon className="mx-auto text-ink" size={38} strokeWidth={1.6} />
                    </motion.div>
                    <p className="mt-3 font-condensed text-sm font-black uppercase tracking-[0.18em]">{label}</p>
                    {index < t.conversion.length - 1 && <ArrowRight className="hidden sm:mx-auto sm:mt-5 sm:block" size={22} />}
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.section>

        <Projects />
        <Process />
        <Testimonials />
        <Faq />

        <motion.section className="section-shell py-20" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
          <motion.div className="premium-border relative overflow-hidden border border-ink bg-white p-7 shadow-ink md:p-12" whileHover={{ scale: 1.006 }} transition={{ type: 'spring', stiffness: 180, damping: 26 }}>
            <div className="absolute inset-x-8 top-0 h-px bg-gold" />
            <AnimatedHeading
              as="p"
              text={t.ctaBand.text}
              className="max-w-5xl font-condensed text-4xl font-black uppercase leading-none text-ink md:text-6xl"
            />
            <Magnetic strength={0.4} className="mt-8 inline-block">
              <a href="#contacto" className="btn-primary">
                {t.ctaBand.button}
                <ArrowRight size={18} />
              </a>
            </Magnetic>
          </motion.div>
        </motion.section>

        <ContactForm />
        <Footer />
      </div>
    </div>
  );
}
