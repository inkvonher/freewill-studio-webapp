import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import studioLogo from '../assets/freewill-studio-logo.png';
import Magnetic from './Magnetic.jsx';

const links = [
  ['Servicios', '#servicios'],
  ['Proyectos', '#proyectos'],
  ['Proceso', '#proceso'],
  ['Contacto', '#contacto'],
];

export default function Navbar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 560);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.header
          initial={{ y: -90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -90, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 30 }}
          className="fixed inset-x-0 top-0 z-50 border-b border-ink/[0.12] bg-paper/[0.82] backdrop-blur-md"
        >
          <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
            <a href="#" className="flex items-center" aria-label="FREEWILL.STUDIO inicio">
              <img src={studioLogo} alt="FREEWILL.STUDIO" className="h-7 w-auto sm:h-8" />
            </a>

            <div className="hidden items-center gap-7 md:flex">
              {links.map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  className="group relative font-condensed text-sm font-black uppercase tracking-[0.16em] text-ink/[0.75] transition hover:text-ink"
                >
                  {label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            <Magnetic strength={0.4}>
              <a
                href="#contacto"
                className="btn-primary min-h-10 px-4 py-2 text-sm"
              >
                Cotizar
                <ArrowUpRight size={16} />
              </a>
            </Magnetic>
          </nav>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
