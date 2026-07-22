import { useState } from 'react';
import { ArrowUpRight, Bitcoin, CalendarClock, Globe2, LayoutDashboard, PanelsTopLeft, Rocket, ShoppingCart, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DecodeHeading from './DecodeHeading.jsx';
import { useLang } from '../i18n.jsx';
import { fadeUp, staggerContainer } from '../motion.js';

const ICONS = [PanelsTopLeft, Globe2, CalendarClock, ShoppingCart, LayoutDashboard, Rocket];
// Precio y moneda por servicio. Cambia 'MXN' por 'USD' en los que apliquen.
const PRICING = [
  { price: '$5,000 - $20,000', currency: 'MXN' },
  { price: '$15,000 - $60,000', currency: 'MXN' },
  { price: '$40,000 - $180,000', currency: 'MXN' },
  { price: '$40,000 - $180,000', currency: 'MXN' },
  { price: '$50,000 - $250,000', currency: 'MXN' },
  { price: '$150,000+', currency: 'MXN' },
];

export default function Services() {
  const { t } = useLang();
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <motion.section id="servicios" className="section-shell" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
      <div className="section-heading">
        <span className="eyebrow">{t.services.eyebrow}</span>
        <h2>{t.services.h2}</h2>
        <div className="mt-4 inline-flex items-center gap-2 border border-gold/[0.5] bg-gold/[0.08] px-3 py-1.5">
          <Bitcoin size={20} className="text-gold" />
          <span className="font-condensed text-sm font-black uppercase tracking-[0.14em] text-gold">{t.services.crypto}</span>
        </div>
        <p>{t.services.p}</p>
      </div>

      <motion.div className="cyber-panel overflow-hidden bg-white" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }}>
        {t.services.items.map(([title, description], index) => {
          const Icon = ICONS[index];
          const { price, currency } = PRICING[index];
          const isExpanded = expandedIndex === index;

          return (
            <motion.article 
              key={title} 
              variants={fadeUp} 
              className="group border-b border-dashed border-ink/[0.45] last:border-b-0"
            >
              {/* Encabezado clicable */}
              <div 
                onClick={() => toggleExpand(index)}
                className="flex cursor-pointer items-center justify-between p-5 hover:bg-paper transition duration-200"
              >
                <div className="flex items-center gap-5">
                  <span className="font-condensed text-xs font-black uppercase tracking-[0.18em] text-ink/[0.32]">
                    FW-{String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="text-ink transition group-hover:text-gold">
                    <Icon size={34} strokeWidth={1.55} />
                  </div>
                  <h3 className="font-condensed text-2xl font-black uppercase leading-none text-ink sm:text-3xl">
                    {title}
                  </h3>
                </div>
                <div className="flex items-center gap-3">
                  <span className="hidden font-condensed text-xs font-black uppercase tracking-[0.12em] text-gold sm:inline">
                    {isExpanded ? 'Ocultar precio' : 'Ver precio e info'}
                  </span>
                  {isExpanded ? (
                    <ChevronUp size={20} className="text-gold" />
                  ) : (
                    <ChevronDown size={20} className="text-ink/[0.5] group-hover:text-gold" />
                  )}
                </div>
              </div>

              {/* Contenido expandible */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden bg-paper/30"
                  >
                    <div className="border-t border-dashed border-ink/[0.15] p-5">
                      <div className="grid gap-6 md:grid-cols-[1fr_15rem_auto] md:items-center md:gap-10">
                        <p className="text-sm leading-6 text-ink/[0.58]">{description}</p>
                        
                        <div>
                          <p className="font-condensed text-xs font-black uppercase tracking-[0.14em] text-ink/[0.4] mb-1">
                            Inversión Estimada
                          </p>
                          <DecodeHeading
                            as="p"
                            startOnView={false}
                            text={`${price} ${currency}`}
                            className="font-condensed text-3xl font-black uppercase leading-none text-gold"
                          />
                        </div>

                        <a 
                          href="#contacto" 
                          className="shine-button relative isolate inline-flex items-center gap-2 overflow-hidden border border-ink bg-ink px-4 py-2.5 font-condensed text-sm font-black uppercase tracking-[0.12em] text-paper transition hover:border-gold hover:bg-gold hover:text-white"
                        >
                          {t.services.cta}
                          <ArrowUpRight size={16} />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.article>
          );
        })}
      </motion.div>
    </motion.section>
  );
}
