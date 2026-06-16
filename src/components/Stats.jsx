import { motion } from 'framer-motion';
import CountUp from './CountUp.jsx';
import { fadeUp, staggerContainer } from '../motion.js';

const stats = [
  { to: 24, suffix: '/7', label: 'Presencia activa' },
  { to: 100, suffix: '%', label: 'Propiedad de tu proyecto' },
  { to: 3, suffix: 'x', label: 'Más conversión vs. una página estática' },
  { to: 14, suffix: ' días', label: 'Lanzamiento promedio' },
];

export default function Stats() {
  return (
    <motion.section
      className="section-shell py-12"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="grid gap-px overflow-hidden border border-ink bg-ink sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={fadeUp}
            className="bg-paper p-7 transition hover:bg-white"
          >
            <p className="font-condensed text-6xl font-black uppercase leading-none text-ink">
              <CountUp to={stat.to} suffix={stat.suffix} />
            </p>
            <p className="mt-4 text-sm leading-6 text-ink/[0.58]">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
