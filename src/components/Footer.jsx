import { motion } from 'framer-motion';
import studioLogo from '../assets/freewill-studio-logo.png';
import { fadeUp } from '../motion.js';

export default function Footer() {
  return (
    <motion.footer className="border-t border-ink/[0.25] px-4 py-8 sm:px-6" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }}>
      <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-ink/[0.58] sm:flex-row sm:items-end sm:justify-between">
        <div className="studio-brand">
          <span className="studio-logo-mark">
            <img src={studioLogo} alt="FREEWILL.STUDIO" />
          </span>
        </div>
        <p className="font-condensed text-sm font-black uppercase tracking-[0.18em]">
          FREEWILL.STUDIO — Diseño consciente. Tecnología con propósito.
        </p>
      </div>
    </motion.footer>
  );
}
