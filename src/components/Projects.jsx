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

      <motion.div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }}>
        {projects.map((project) => (
          <motion.div key={project.name} variants={fadeUp} className="h-full">
            <TiltCard className="group cyber-panel premium-border overflow-hidden h-full">
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col h-full text-left focus:outline-none"
              >
                {/* Visual Header */}
                <div className="relative h-44 overflow-hidden border-b border-ink bg-paper">
                  <div className="corner-frame transition-colors duration-300 group-hover:border-gold/70" />
                  <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(17,17,17,0.08),transparent_28%),radial-gradient(circle_at_70%_30%,rgba(184,121,5,0.15),transparent_30%)]" />
                  <div className="project-play-badge">
                    <Play size={12} fill="currentColor" strokeWidth={2} />
                    Play
                  </div>
                  <div className="absolute inset-4 border border-ink/[0.42] bg-white/[0.45] p-3 transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:bg-white group-hover:border-gold/60 group-hover:shadow-[0_8px_16px_rgba(184,121,5,0.08)]">
                    <div className="flex items-center justify-between border-b border-dashed border-ink/[0.25] pb-2">
                      <span className="font-condensed text-[11px] font-black uppercase tracking-[0.18em] text-ink/[0.50]">{project.type}</span>
                      <span className="size-1.5 rounded-full bg-gold" />
                    </div>
                    <div className="grid h-full place-items-center pb-6">
                      <span className="font-condensed text-5xl font-black uppercase tracking-normal text-ink transition-all duration-300 group-hover:scale-110 group-hover:text-gold">
                        {project.image}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Details Section */}
                <div className="flex flex-col flex-1 p-5">
                  <p className="font-condensed text-sm font-black uppercase tracking-[0.1em] text-gold">{project.type}</p>
                  <h3 className="mt-1.5 font-condensed text-2xl font-black uppercase leading-none text-ink tracking-tight transition-colors duration-300 group-hover:text-gold">
                    {project.name}
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-ink/[0.62] flex-1">
                    {project.description}
                  </p>
                  <div className="shine-button relative isolate mt-5 inline-flex items-center justify-center gap-1.5 overflow-hidden border border-ink px-3 py-2 font-condensed text-xs font-black uppercase tracking-[0.12em] text-ink transition-all duration-300 group-hover:border-gold group-hover:text-gold group-hover:shadow-[0_0_16px_rgba(184,121,5,0.18)] self-start">
                    {t.projects.viewWeb}
                    <ExternalLink size={12} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </a>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
