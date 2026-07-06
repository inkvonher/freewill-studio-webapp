import { motion } from 'framer-motion';
import CountUp from './CountUp.jsx';
import { useLang } from '../i18n.jsx';
import { fadeUp, staggerContainer } from '../motion.js';

const VALUES = [24, 100, 3, 14];

export default function Stats() {
  const { t } = useLang();

  return (
    <motion.section className="section-shell py-12" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
      <div className="grid gap-px overflow-hidden border border-ink bg-ink sm:grid-cols-2 lg:grid-cols-4">
        {t.stats.map((stat, i) => (
          <motion.div key={stat.label} variants={fadeUp} className="bg-paper p-7 transition hover:bg-white">
            <p className="font-condensed text-6xl font-black uppercase leading-none text-ink">
              <CountUp to={VALUES[i]} suffix={stat.suffix} />
            </p>
            <p className="mt-4 text-sm leading-6 text-ink/[0.58]">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
