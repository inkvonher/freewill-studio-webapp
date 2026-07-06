import { ArrowUpRight, Bitcoin, CalendarClock, Globe2, LayoutDashboard, PanelsTopLeft, Rocket, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import DecodeHeading from './DecodeHeading.jsx';
import { useLang } from '../i18n.jsx';
import { cardHover, fadeUp, staggerContainer } from '../motion.js';

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
          return (
            <motion.article key={title} variants={fadeUp} whileHover={cardHover} className="group relative grid gap-5 border-b border-dashed border-ink/[0.45] p-5 last:border-b-0 hover:bg-paper md:grid-cols-[5rem_1fr_14rem_auto] md:items-center">
              <span className="absolute right-4 top-4 hidden font-condensed text-xs font-black uppercase tracking-[0.18em] text-ink/[0.32] md:block">FW-{String(index + 1).padStart(2, '0')}</span>
              <motion.div whileHover={{ rotate: -2, scale: 1.045 }} transition={{ type: 'spring', stiffness: 190, damping: 22 }}>
                <Icon size={42} strokeWidth={1.55} className="text-ink transition group-hover:text-gold" />
              </motion.div>
              <div>
                <h3 className="font-condensed text-3xl font-black uppercase leading-none text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink/[0.58]">{description}</p>
              </div>
              <DecodeHeading
                as="p"
                startOnView
                text={`${price} ${currency}`}
                className="font-condensed text-3xl font-black uppercase leading-none text-ink"
              />
              <a href="#contacto" className="shine-button relative isolate inline-flex items-center gap-2 overflow-hidden border border-transparent px-3 py-2 font-condensed text-base font-black uppercase tracking-[0.14em] text-gold transition hover:border-gold hover:text-ink hover:shadow-[0_0_24px_rgba(184,121,5,0.2)]">
                {t.services.cta}
                <ArrowUpRight size={17} />
              </a>
            </motion.article>
          );
        })}
      </motion.div>
    </motion.section>
  );
}
