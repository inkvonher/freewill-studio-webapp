import { ExternalLink, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { projects } from '../data/projects.js';
import TiltCard from './TiltCard.jsx';
import { useLang } from '../i18n.jsx';
import { fadeUp, staggerContainer } from '../motion.js';

export default function Projects() {
  const { t } = useLang();
  return (
    <motion.section id="proyectos" className="section-shell" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
      <div className="section-heading">
        <span className="eyebrow">{t.projects.eyebrow}</span>
        <h2>{t.projects.h2}</h2>
        <p>{t.projects.p}</p>
      </div>

      <div className="showreel-strip mb-6" aria-hidden="true">
        <div className="showreel-track">
          {Array.from({ length: 3 }).map((_, group) => (
            <div key={group} className="showreel-group">
              {projects.map((project) => (
                <span key={`${group}-${project.name}`} className="showreel-item">
                  <Play size={18} fill="currentColor" strokeWidth={1.8} />
                  {project.name}
                </span>
              ))}
              <span className="showreel-item showreel-item-muted">{t.projects.muted[0]}</span>
              <span className="showreel-item showreel-item-muted">{t.projects.muted[1]}</span>
            </div>
          ))}
        </div>
      </div>

      <motion.div className="grid gap-5 md:grid-cols-2" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }}>
        {projects.map((project) => (
          <motion.div key={project.name} variants={fadeUp}>
            <TiltCard className="group cyber-panel premium-border overflow-hidden">
            <div className="relative min-h-56 overflow-hidden border-b border-ink bg-paper">
              <div className="corner-frame" />
              <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(17,17,17,0.08),transparent_28%),radial-gradient(circle_at_70%_30%,rgba(184,121,5,0.15),transparent_30%)]" />
              <div className="project-play-badge">
                <Play size={14} fill="currentColor" strokeWidth={2} />
                Play
              </div>
              <motion.div className="absolute inset-5 border border-ink/[0.55] bg-white/[0.45] p-4" whileHover={{ y: -3 }} transition={{ type: 'spring', stiffness: 180, damping: 25 }}>
                <div className="flex items-center justify-between border-b border-dashed border-ink/[0.35] pb-3">
                  <span className="font-condensed text-sm font-black uppercase tracking-[0.18em] text-ink/[0.58]">{project.type}</span>
                  <span className="size-2 rounded-full bg-gold" />
                </div>
                <div className="grid h-full place-items-center pb-8">
                  <motion.span className="font-condensed text-7xl font-black uppercase tracking-normal text-ink" animate={{ y: [0, -3, 0] }} transition={{ duration: 7.2, repeat: Infinity, ease: 'easeInOut' }}>
                    {project.image}
                  </motion.span>
                </div>
              </motion.div>
            </div>

            <div className="p-6">
              <p className="font-condensed text-lg font-black uppercase tracking-[0.1em] text-gold">{project.type}</p>
              <h3 className="mt-2 font-condensed text-4xl font-black uppercase leading-none text-ink">{project.name}</h3>
              <p className="mt-4 text-sm leading-7 text-ink/[0.62]">{project.description}</p>
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="shine-button relative isolate mt-7 inline-flex items-center gap-2 overflow-hidden border border-ink px-4 py-3 font-condensed text-base font-black uppercase tracking-[0.14em] text-ink transition hover:border-gold hover:text-gold hover:shadow-[0_0_24px_rgba(184,121,5,0.24)]"
              >
                {t.projects.viewWeb}
                <ExternalLink size={16} />
              </a>
            </div>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
