import { motion } from 'framer-motion';
import studioLogo from '../assets/freewill-studio-logo.png';
import { openPrivacy } from './PrivacyNotice.jsx';
import { fadeUp } from '../motion.js';

export default function Footer() {
  return (
    <motion.footer className="border-t border-ink/[0.25] px-4 py-8 sm:px-6" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }}>
      <div className="mx-auto flex max-w-7xl flex-col gap-6 text-sm text-ink/[0.58]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="studio-brand">
            <span className="studio-logo-mark">
              <img src={studioLogo} alt="FREEWILL.STUDIO" />
            </span>
          </div>
          <p className="font-condensed text-sm font-black uppercase tracking-[0.18em]">
            FREEWILL.STUDIO — Diseño consciente. Tecnología con propósito.
          </p>
        </div>
        <div className="flex flex-col gap-2 border-t border-ink/[0.15] pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ink/[0.5]">
            © {new Date().getFullYear()} FREEWILL.STUDIO. Todos los derechos reservados.
          </p>
          <button
            type="button"
            onClick={openPrivacy}
            data-cursor
            className="self-start font-condensed text-xs font-black uppercase tracking-[0.18em] text-ink/[0.7] transition hover:text-gold sm:self-auto"
          >
            Aviso de Privacidad
          </button>
        </div>
      </div>
    </motion.footer>
  );
}
