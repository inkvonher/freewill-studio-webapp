import { useState } from 'react';
import { Plus } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLang } from '../i18n.jsx';
import { fadeUp } from '../motion.js';

export default function Faq() {
  const { t } = useLang();
  const [open, setOpen] = useState(0);

  return (
    <motion.section id="faq" className="section-shell" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
      <div className="section-heading">
        <span className="eyebrow">{t.faq.eyebrow}</span>
        <h2>{t.faq.h2}</h2>
        <p>{t.faq.p}</p>
      </div>

      <div className="border border-ink bg-white">
        {t.faq.items.map(([q, a], i) => {
          const isOpen = open === i;
          return (
            <div key={q} className="border-b border-ink/[0.12] last:border-0">
              <button
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition hover:bg-paper"
                aria-expanded={isOpen}
              >
                <span className="font-condensed text-lg font-black uppercase leading-tight tracking-[0.02em] text-ink sm:text-xl">{q}</span>
                <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ type: 'spring', stiffness: 300, damping: 22 }} className="shrink-0 text-gold">
                  <Plus size={22} />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-6 text-sm leading-7 text-ink/[0.68] sm:text-base">{a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
}
