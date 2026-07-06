import { Quote, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { testimonials } from '../data/testimonials.js';
import { useLang } from '../i18n.jsx';
import { cardHover, fadeUp, staggerContainer } from '../motion.js';

export default function Testimonials() {
  const { t } = useLang();
  return (
    <motion.section id="testimonios" className="section-shell" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
      <div className="section-heading">
        <span className="eyebrow">{t.testimonials.eyebrow}</span>
        <h2>{t.testimonials.h2}</h2>
        <p>{t.testimonials.p}</p>
      </div>

      <motion.div className="grid gap-px overflow-hidden border border-ink bg-ink sm:grid-cols-2 lg:grid-cols-3" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        {testimonials.map((t) => (
          <motion.article key={t.name} variants={fadeUp} whileHover={cardHover} className="group flex flex-col bg-paper p-6 transition hover:bg-white">
            <Quote className="text-gold" size={30} strokeWidth={1.6} />
            <div className="mt-3 flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} className="text-gold" fill="currentColor" strokeWidth={0} />)}
            </div>
            <p className="mt-4 flex-1 text-sm leading-7 text-ink/[0.78]">“{t.quote}”</p>
            <div className="mt-6 border-t border-dashed border-ink/[0.3] pt-4">
              <p className="font-condensed text-xl font-black uppercase leading-none text-ink">{t.name}</p>
              <p className="mt-1.5 text-xs text-ink/[0.55]">{t.role}</p>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </motion.section>
  );
}
