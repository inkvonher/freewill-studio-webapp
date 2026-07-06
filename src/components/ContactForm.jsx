import { ArrowRight, ClipboardList, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Magnetic from './Magnetic.jsx';
import { openPrivacy } from './PrivacyNotice.jsx';
import { useLang } from '../i18n.jsx';
import { fadeUp } from '../motion.js';

const whatsappNumber = '529841820414';
const waText = encodeURIComponent('Hola FREEWILL.STUDIO, quiero cotizar una web app.');
const waLink = `https://wa.me/${whatsappNumber}?text=${waText}`;

export default function ContactForm() {
  const { t } = useLang();
  return (
    <motion.section id="contacto" className="section-shell pb-24" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.22 }}>
      <div className="mx-auto max-w-4xl text-center">
        <span className="eyebrow">{t.contact.eyebrow}</span>
        <h2 className="mt-4 font-condensed text-4xl font-black uppercase leading-none text-ink sm:text-6xl">
          {t.contact.h2}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-ink/[0.62]">
          {t.contact.p}
        </p>
      </div>

      <motion.div
        className="premium-border relative mx-auto mt-10 max-w-3xl overflow-hidden border border-ink bg-white p-8 text-center shadow-ink sm:p-12"
        whileHover={{ scale: 1.006 }}
        transition={{ type: 'spring', stiffness: 180, damping: 26 }}
      >
        <div className="absolute inset-x-8 top-0 h-px bg-gold" />
        <span className="mx-auto flex h-16 w-16 items-center justify-center border border-ink bg-gold text-ink">
          <ClipboardList size={30} />
        </span>
        <h3 className="mt-6 font-condensed text-3xl font-black uppercase leading-none text-ink sm:text-4xl">
          {t.contact.cardTitle}
        </h3>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-ink/[0.6]">
          {t.contact.cardDesc}
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Magnetic strength={0.4}>
            <a href="/cuestionario" className="btn-primary px-7 py-4 text-base">
              {t.contact.btn1}
              <ArrowRight size={18} />
            </a>
          </Magnetic>
          <Magnetic strength={0.4}>
            <a href={waLink} target="_blank" rel="noreferrer" className="btn-secondary px-7 py-4 text-base">
              {t.contact.btn2}
              <MessageCircle size={18} />
            </a>
          </Magnetic>
        </div>

        <p className="mt-6 text-xs leading-5 text-ink/[0.5]">
          {t.contact.privacyPre}{' '}
          <button type="button" onClick={openPrivacy} data-cursor className="font-semibold text-gold underline-offset-2 hover:underline">
            {t.contact.privacyLink}
          </button>
          .
        </p>
      </motion.div>
    </motion.section>
  );
}
