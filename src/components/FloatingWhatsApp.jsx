import { useEffect, useState } from 'react';
import { Phone } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const whatsappNumber = '529841820414';
const prefilled = 'Hola FREEWILL.STUDIO, quiero cotizar una web app.';
const href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(prefilled)}`;

export default function FloatingWhatsApp() {
  const [show, setShow] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 420);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Animación de "timbre": balanceo periódico con pausa entre repeticiones.
  const ringAnim = reduce
    ? {}
    : {
        rotate: [0, -14, 12, -10, 9, -6, 0],
        transition: { duration: 0.9, ease: 'easeInOut', repeat: Infinity, repeatDelay: 2.2 },
      };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed bottom-5 right-5 z-40 sm:bottom-7 sm:right-7"
          initial={{ opacity: 0, y: 24, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        >
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label="Llámanos o escríbenos por WhatsApp"
            data-cursor
            className="relative flex h-14 w-14 items-center justify-center rounded-full border border-ink bg-gold text-ink shadow-[0_16px_38px_rgba(17,17,17,0.32)] transition-transform duration-300 ease-out hover:scale-110 sm:h-16 sm:w-16"
          >
            {/* anillos de pulso */}
            {!reduce && (
              <>
                <span className="pointer-events-none absolute inset-0 animate-ping rounded-full border-2 border-ink/[0.45] [animation-duration:2.4s]" />
                <span className="pointer-events-none absolute -inset-2 animate-ping rounded-full border border-gold/[0.4] [animation-duration:3.2s]" />
              </>
            )}
            <motion.span animate={ringAnim} style={{ originY: 0.8 }} className="relative z-10">
              <Phone size={26} strokeWidth={2.4} fill="currentColor" />
            </motion.span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
