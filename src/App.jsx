import { ArrowRight, Eye, MessageSquare, MousePointerClick, RefreshCcw, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import ContactForm from './components/ContactForm.jsx';
import Footer from './components/Footer.jsx';
import GlobalPacman from './components/GlobalPacman.jsx';
import Hero from './components/Hero.jsx';
import Process from './components/Process.jsx';
import Projects from './components/Projects.jsx';
import Services from './components/Services.jsx';
import { cardHover, fadeUp, staggerContainer } from './motion.js';

const benefits = [
  'Atrae clientes',
  'Automatiza reservas',
  'Vende productos o servicios',
  'Mejora la presencia digital',
  'Conecta WhatsApp, pagos y formularios',
  'Convierte visitantes en clientes',
];

const conversion = [
  ['Atrae', Eye],
  ['Conecta', MessageSquare],
  ['Convierte', MousePointerClick],
  ['Retiene', RefreshCcw],
  ['Escala', TrendingUp],
];

export default function App() {
  return (
    <div className="studio-page min-h-screen overflow-hidden text-ink">
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
            <span className="eyebrow">¿Para qué sirve una web app?</span>
            <h2>No es un gasto, es una inversión que trabaja 24/7.</h2>
            <p>
              Una web app funciona como presencia, sistema y vendedor digital. Ordena tu oferta, responde mejor y
              convierte cada visita en una oportunidad real.
            </p>
          </div>

          <motion.div className="grid gap-px overflow-hidden border border-ink/[0.70] bg-ink/[0.70] sm:grid-cols-2 lg:grid-cols-3" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
            {benefits.map((benefit, index) => (
              <motion.article key={benefit} variants={fadeUp} whileHover={cardHover} className="group bg-paper p-5 transition hover:bg-white hover:shadow-[0_0_28px_rgba(184,121,5,0.14)]" style={{ animationDelay: `${index * 80}ms` }}>
                <div className="mb-7 h-px w-full border-t border-dashed border-ink/[0.35]" />
                <p className="font-condensed text-2xl font-black uppercase leading-none tracking-normal text-ink group-hover:text-gold">
                  {benefit}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </motion.section>

        <Services />

        <motion.section className="section-shell py-10" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
          <div className="mx-auto max-w-5xl text-center">
            <p className="font-condensed text-3xl font-black uppercase leading-tight text-ink sm:text-5xl">
              La tecnología es la herramienta,
              <br />
              tú tienes el <span className="text-gold">libre albedrío</span> de usarla.
            </p>
            <motion.div className="mt-10 grid gap-5 sm:grid-cols-5" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
              {conversion.map(([label, Icon], index) => (
                <motion.div key={label} variants={fadeUp} whileHover={{ y: -3, color: '#b87905' }} transition={{ type: 'spring', stiffness: 190, damping: 24 }} className="flex items-center justify-center gap-4 sm:block">
                  <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 6.5, repeat: Infinity, delay: index * 0.45, ease: 'easeInOut' }}>
                    <Icon className="mx-auto text-ink" size={38} strokeWidth={1.6} />
                  </motion.div>
                  <p className="mt-3 font-condensed text-sm font-black uppercase tracking-[0.18em]">{label}</p>
                  {index < conversion.length - 1 && <ArrowRight className="hidden sm:mx-auto sm:mt-5 sm:block" size={22} />}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        <Projects />
        <Process />

        <motion.section className="section-shell py-20" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
          <motion.div className="premium-border relative overflow-hidden border border-ink bg-white p-7 shadow-ink md:p-12" whileHover={{ scale: 1.006 }} transition={{ type: 'spring', stiffness: 180, damping: 26 }}>
            <div className="absolute inset-x-8 top-0 h-px bg-gold" />
            <p className="max-w-5xl font-condensed text-4xl font-black uppercase leading-none text-ink md:text-6xl">
              Tu negocio no necesita solo una página. Necesita una herramienta digital que trabaje por ti.
            </p>
            <a href="#contacto" className="btn-primary mt-8">
              Cotizar mi web app
            </a>
          </motion.div>
        </motion.section>

        <ContactForm />
        <Footer />
      </div>
    </div>
  );
}
