import { motion } from 'framer-motion';

// Titular que revela palabra por palabra con un efecto de máscara hacia arriba.
// Pasa `as` para elegir el tag (h1, h2, p...). El resto de props pasan al contenedor.
const container = {
  hidden: {},
  visible: (stagger = 0.08) => ({
    transition: { staggerChildren: stagger, delayChildren: 0.05 },
  }),
};

const word = {
  hidden: { y: '110%' },
  visible: { y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function AnimatedHeading({ text, as = 'h2', className = '', stagger = 0.08, immediate = false }) {
  const MotionTag = motion[as] ?? motion.h2;
  const words = text.split(' ');

  return (
    <MotionTag
      className={className}
      variants={container}
      custom={stagger}
      initial="hidden"
      {...(immediate
        ? { animate: 'visible' }
        : { whileInView: 'visible', viewport: { once: true, amount: 0.4 } })}
    >
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="inline-block overflow-hidden align-bottom">
          <motion.span variants={word} className="inline-block">
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
