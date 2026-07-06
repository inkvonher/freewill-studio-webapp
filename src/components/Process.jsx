import { motion } from 'framer-motion';
import { useLang } from '../i18n.jsx';
import { fadeUp, staggerContainer } from '../motion.js';

export default function Process() {
  const { t } = useLang();

  return (
    <motion.section id="proceso" className="section-shell" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.24 }}>
      <div className="section-heading">
        <span className="eyebrow">{t.process.eyebrow}</span>
        <h2>{t.process.h2}</h2>
        <p>{t.process.p}</p>
      </div>

      <motion.div className="relative grid gap-px overflow-hidden border border-ink bg-ink lg:grid-cols-4" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.22 }}>
        <motion.span className="process-line hidden lg:block" initial={{ scaleX: 0, transformOrigin: 'left' }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.45, ease: [0.16, 1, 0.3, 1] }} />
        {t.process.steps.map(([title, description], i) => (
          <motion.article key={title} variants={fadeUp} whileHover={{ y: -4, scale: 1.012 }} transition={{ type: 'spring', stiffness: 190, damping: 24 }} className="relative bg-paper p-6 transition hover:bg-white hover:shadow-[0_0_28px_rgba(184,121,5,0.13)]">
            <span className="font-condensed text-4xl font-black uppercase leading-none text-gold">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="mt-10 font-condensed text-3xl font-black uppercase leading-none text-ink">{title}</h3>
            <p className="mt-4 text-sm leading-7 text-ink/[0.58]">{description}</p>
          </motion.article>
        ))}
      </motion.div>
    </motion.section>
  );
}
