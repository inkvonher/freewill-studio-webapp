import { ArrowUpRight, CalendarClock, Globe2, LayoutDashboard, PanelsTopLeft, Rocket, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { cardHover, fadeUp, staggerContainer } from '../motion.js';

const services = [
  {
    title: 'Landing Page',
    description: 'Oferta clara, una sola intención y flujo directo a contacto o compra.',
    price: '$5,000 - $20,000',
    icon: PanelsTopLeft,
  },
  {
    title: 'Página Web Profesional',
    description: 'Presencia completa para marca, servicios, autoridad y generación de confianza.',
    price: '$15,000 - $60,000',
    icon: Globe2,
  },
  {
    title: 'Web App con Reservas',
    description: 'Agenda digital para servicios, citas, disponibilidad y seguimiento por WhatsApp.',
    price: '$40,000 - $180,000',
    icon: CalendarClock,
  },
  {
    title: 'Ecommerce',
    description: 'Catálogo, pedidos y pagos para vender productos o servicios en línea.',
    price: '$40,000 - $180,000',
    icon: ShoppingCart,
  },
  {
    title: 'Sistema Interno',
    description: 'Panel privado para ordenar clientes, solicitudes, inventario o procesos.',
    price: '$50,000 - $250,000',
    icon: LayoutDashboard,
  },
  {
    title: 'App Web Personalizada',
    description: 'Producto digital a medida para una operación, comunidad o modelo de negocio.',
    price: '$150,000+',
    icon: Rocket,
  },
];

export default function Services() {
  return (
    <motion.section id="servicios" className="section-shell" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
      <div className="section-heading">
        <span className="eyebrow">Servicios</span>
        <h2>¿Cuánto cuesta una app web?</h2>
        <p>Rangos de inversión orientativos. La cotización final depende del flujo, integraciones y alcance real.</p>
      </div>

      <motion.div className="cyber-panel overflow-hidden bg-white" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }}>
        {services.map(({ title, description, price, icon: Icon }, index) => (
          <motion.article key={title} variants={fadeUp} whileHover={cardHover} className="group relative grid gap-5 border-b border-dashed border-ink/[0.45] p-5 last:border-b-0 hover:bg-paper md:grid-cols-[5rem_1fr_14rem_auto] md:items-center">
            <span className="absolute right-4 top-4 hidden font-condensed text-xs font-black uppercase tracking-[0.18em] text-ink/[0.32] md:block">FW-{String(index + 1).padStart(2, '0')}</span>
            <motion.div whileHover={{ rotate: -2, scale: 1.045 }} transition={{ type: 'spring', stiffness: 190, damping: 22 }}>
              <Icon size={42} strokeWidth={1.55} className="text-ink transition group-hover:text-gold" />
            </motion.div>
            <div>
              <h3 className="font-condensed text-3xl font-black uppercase leading-none text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink/[0.58]">{description}</p>
            </div>
            <p className="font-condensed text-3xl font-black uppercase leading-none text-ink">{price}</p>
            <a href="#contacto" className="shine-button relative isolate inline-flex items-center gap-2 overflow-hidden border border-transparent px-3 py-2 font-condensed text-base font-black uppercase tracking-[0.14em] text-gold transition hover:border-gold hover:text-ink hover:shadow-[0_0_24px_rgba(184,121,5,0.2)]">
              Cotizar
              <ArrowUpRight size={17} />
            </a>
          </motion.article>
        ))}
      </motion.div>
    </motion.section>
  );
}
