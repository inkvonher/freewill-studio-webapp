import { Globe } from 'lucide-react';
import { useLang } from '../i18n.jsx';

export default function LangToggle({ className = '' }) {
  const { lang, toggle } = useLang();
  return (
    <button
      type="button"
      onClick={toggle}
      data-cursor
      aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a español'}
      className={`relative z-20 inline-flex items-center gap-1.5 border border-ink/[0.35] bg-paper px-2.5 py-1.5 font-condensed text-xs font-black uppercase tracking-[0.14em] text-ink shadow-[0_0_0_4px_rgba(247,244,237,0.9)] transition hover:border-gold hover:text-gold ${className}`}
    >
      <Globe size={14} />
      {lang === 'es' ? 'EN' : 'ES'}
    </button>
  );
}
