import { ArrowRight, Code2, GitBranch, Palette, ShieldCheck, Settings, TrendingUp, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import studioLogo from '../assets/freewill-studio-logo.png';
import { fadeUp, staggerContainer } from '../motion.js';

const included = [
  ['Desarrollo', 'Tecnología a tu medida.', Code2],
  ['Diseño', 'Experiencia que conecta.', Palette],
  ['Automatización', 'Menos trabajo, más eficiencia.', Settings],
  ['Estrategia', 'Presencia que genera clientes.', TrendingUp],
  ['Propiedad total', 'Sin rentas, sin dependencias.', ShieldCheck],
];

const brainNodes = [
  ['Estrategia', '18%', '34%'],
  ['Marca', '35%', '22%'],
  ['Flujos', '64%', '27%'],
  ['Datos', '78%', '48%'],
  ['Ventas', '58%', '72%'],
  ['Soporte', '28%', '66%'],
];

export default function Hero() {
  return (
    <header className="relative min-h-screen px-4 py-5 sm:px-6">
      <div className="hero-glow pointer-events-none" />
      <div className="techwear-grid" />
      <div className="slow-particle right-[18%] top-28" />
      <div className="slow-particle right-[7%] top-52 [animation-delay:2.4s]" />
      <nav className="mx-auto flex max-w-7xl items-start justify-between border-b border-ink/[0.20] pb-5">
        <a href="#" className="studio-brand">
          <span className="studio-logo-mark">
            <img src={studioLogo} alt="FREEWILL.STUDIO" />
          </span>
        </a>
        <div className="hidden text-right font-condensed text-sm font-black uppercase tracking-[0.28em] text-ink/[0.70] sm:block">
          <p>Unidad</p>
          <p>Consciencia</p>
          <p>Propósito</p>
        </div>
      </nav>

      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-10 py-12 lg:grid-cols-[1.02fr_0.98fr]">
        <motion.section variants={staggerContainer} initial="hidden" animate="visible">
          <motion.p variants={fadeUp} className="font-condensed text-sm font-black uppercase tracking-[0.42em] text-ink/[0.70]">
            Libre albedrío crea tu realidad.
          </motion.p>
          <motion.h1 variants={fadeUp} className="mt-8 max-w-5xl font-condensed text-6xl font-black uppercase leading-[0.84] tracking-normal text-ink sm:text-8xl lg:text-[8.8rem]">
            Web apps que trabajan por tu negocio
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-7 max-w-2xl font-condensed text-2xl font-black uppercase leading-tight tracking-[0.04em] text-gold sm:text-3xl">
            Inversión real, resultados reales.
          </motion.p>
          <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-lg leading-8 text-ink/[0.62]">
            Diseñamos páginas web y aplicaciones digitales que atraen clientes, automatizan procesos y elevan tu marca.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#contacto" className="btn-primary">
              Solicitar proyecto
              <ArrowRight size={18} />
            </a>
            <a href="#proyectos" className="btn-secondary">
              Ver proyectos
            </a>
          </motion.div>
        </motion.section>

        <motion.section className="relative" initial={{ opacity: 0, x: 34 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.28, duration: 1.05, ease: [0.16, 1, 0.3, 1] }}>
          <motion.div className="cyber-panel premium-border overflow-hidden p-5 md:p-7" whileHover={{ scale: 1.008, y: -3 }} transition={{ type: 'spring', stiffness: 180, damping: 26 }}>
            <div className="corner-frame" />
            <div className="mb-5 flex items-center justify-between border-b border-gold pb-4">
              <span className="font-condensed text-2xl font-black uppercase tracking-[0.08em]">Ruta de conversión</span>
              <span className="hud-label">FW-MIND 01</span>
            </div>
            <div className="mb-6 grid gap-5 md:grid-cols-[1fr_0.58fr]">
              <div className="maze-stage">
                <div className="system-grid" />
                <div className="maze-frame" aria-hidden="true">
                  <svg className="maze-map" viewBox="0 0 420 420" role="img" aria-label="Laberinto digital que conecta visita, conversación, cotización, reserva y venta">
                    <path className="maze-wall" d="M56 56 H364 V116 H302 V178 H364 V364 H56 V302 H118 V240 H56 Z" />
                    <path className="maze-wall" d="M118 116 H240 V178 H178 V240 H302 V302 H178" />
                    <path className="maze-wall" d="M240 56 V116 M302 178 V240 M118 302 V364" />
                    <path id="maze-main-route" className="maze-route" d="M56 210 H118 V116 H240 V178 H178 V240 H302 V302 H364" />
                    <path className="maze-route maze-route-delay" d="M210 56 V116 H302 V178 H364 V240 H302 V364" />
                    <g className="maze-pacman">
                      <path d="M0 -10 A10 10 0 1 1 0 10 L6 0 Z" />
                      <animateMotion dur="6.8s" repeatCount="indefinite" rotate="auto">
                        <mpath href="#maze-main-route" />
                      </animateMotion>
                    </g>
                  </svg>
                  {brainNodes.map(([label, left, top], index) => (
                    <span
                      key={label}
                      className="maze-node"
                      style={{ left, top, animationDelay: `${index * 0.35}s` }}
                      aria-label={label}
                    >
                      <span />
                    </span>
                  ))}
                </div>
                <div className="maze-status">
                  <GitBranch size={22} strokeWidth={1.5} />
                  <span>del clic al cliente</span>
                </div>
                <div className="maze-label maze-label-start">entrada</div>
                <div className="maze-label maze-label-end">conversión</div>
              </div>
              <div className="grid content-between gap-3">
                {['Atrae', 'Conecta', 'Convierte'].map((item, index) => (
                  <motion.div
                    key={item}
                    className="signal-card border border-ink bg-paper p-3"
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.55 + index * 0.16, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-condensed text-sm font-black uppercase tracking-[0.16em]">{item}</span>
                      <Zap size={15} className="text-gold" />
                    </div>
                    <div className="h-1 bg-ink/[0.15]">
                      <motion.div
                        className="h-full bg-gold"
                        initial={{ width: 0 }}
                        animate={{ width: `${68 + index * 12}%` }}
                        transition={{ delay: 0.75 + index * 0.18, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                  </motion.div>
                ))}
                <div className="border border-gold bg-ink p-4 text-paper">
                  <p className="font-condensed text-5xl font-black uppercase leading-none">24/7</p>
                  <p className="mt-2 font-condensed text-sm font-black uppercase tracking-[0.18em] text-paper/[0.62]">
                    presencia activa
                  </p>
                </div>
              </div>
            </div>
            <motion.div className="grid gap-5" variants={staggerContainer} initial="hidden" animate="visible">
              {included.map(([title, description, Icon]) => (
                <motion.div variants={fadeUp} key={title} className="grid grid-cols-[3.8rem_1fr] items-start gap-4 border-b border-dashed border-ink/[0.25] pb-5 last:border-b-0 last:pb-0">
                  <Icon className="text-gold" size={40} strokeWidth={1.6} />
                  <div>
                    <h2 className="font-condensed text-2xl font-black uppercase leading-none text-ink">{title}</h2>
                    <p className="mt-2 font-condensed text-lg uppercase tracking-[0.08em] text-ink/[0.68]">{description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.section>
      </div>
    </header>
  );
}
