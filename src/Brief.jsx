import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Check, Loader2, Send } from 'lucide-react';
import { supabase, supabaseReady } from './lib/supabase.js';
import { BUDGETS, GENERAL, PAGE_TYPES, TYPE_QUESTIONS } from './lib/briefQuestions.js';

const field = 'w-full border border-ink/[0.4] bg-white px-3 py-2.5 text-sm text-ink outline-none transition focus:border-gold';
const lbl = 'font-condensed text-xs font-black uppercase tracking-[0.14em] text-ink/[0.6]';

export default function Brief() {
  const [pageType, setPageType] = useState('');
  const [base, setBase] = useState({ business: '', contact_name: '', whatsapp: '', email: '', instagram: '', city: '', budget: '', deadline: '', extra: '' });
  const [general, setGeneral] = useState({});
  const [specifics, setSpecifics] = useState({});
  const [honeypot, setHoneypot] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => { document.title = 'Cuestionario de proyecto · FREEWILL.STUDIO'; }, []);

  const typeQs = useMemo(() => (pageType ? TYPE_QUESTIONS[pageType] || [] : []), [pageType]);

  const submit = async (e) => {
    e.preventDefault();
    setError('');

    // Si el honeypot está lleno, simulamos éxito para desviar bots
    if (honeypot) {
      setBusy(true);
      setTimeout(() => {
        setBusy(false);
        setDone(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 600);
      return;
    }

    // Validación y formateo de WhatsApp (limpiar no-dígitos, asumir prefijo +52 si tiene 10 dígitos)
    const rawPhone = base.whatsapp || '';
    const digits = rawPhone.replace(/\D/g, '');
    const cleanedPhone = digits.length === 10 ? '52' + digits : digits;

    if (cleanedPhone.length < 10 || cleanedPhone.length > 15) {
      setError('Por favor ingresa un número de WhatsApp válido (10 dígitos con lada, ej. +52 1...)');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (!supabaseReady) { setError('El formulario no está disponible por ahora. Escríbenos por WhatsApp.'); return; }
    setBusy(true);
    const payload = {
      page_type: pageType, business: base.business, contact_name: base.contact_name,
      whatsapp: cleanedPhone, email: base.email || null, budget: base.budget || null,
      data: {
        instagram: base.instagram, city: base.city, deadline: base.deadline, extra: base.extra,
        general, specifics,
      },
    };
    const { error: err } = await supabase.from('briefs').insert(payload);
    setBusy(false);
    if (err) { setError('No se pudo enviar. Intenta de nuevo o escríbenos por WhatsApp.'); return; }
    setDone(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (done) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper px-4">
        <div className="max-w-md border border-ink bg-white p-10 text-center">
          <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gold text-white"><Check size={28} /></span>
          <h1 className="font-condensed text-3xl font-black uppercase leading-none text-ink">¡Gracias!</h1>
          <p className="mt-4 text-sm leading-7 text-ink/[0.65]">Recibimos tu información. Te contactaremos muy pronto por WhatsApp para preparar tu propuesta.</p>
          <a href="/" className="mt-7 inline-flex items-center gap-2 border border-ink bg-ink px-5 py-3 font-condensed text-sm font-black uppercase tracking-[0.14em] text-paper hover:bg-gold hover:text-white">
            <ArrowLeft size={16} /> Volver al inicio
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="border-b border-ink/[0.12] bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
          <div>
            <p className="font-condensed text-xs font-black uppercase tracking-[0.2em] text-gold">FREEWILL.STUDIO</p>
            <h1 className="font-condensed text-2xl font-black uppercase leading-none text-ink">Cuestionario de proyecto</h1>
          </div>
          <a href="/" className="text-sm text-ink/[0.55] hover:text-gold">Inicio</a>
        </div>
      </header>

      <form onSubmit={submit} className="mx-auto max-w-3xl px-4 py-8">
        {/* Campo honeypot oculto para evitar spam de bots */}
        <div style={{ position: 'absolute', left: '-9999px', opacity: 0, width: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
          <label htmlFor="website_hp">No completar este campo</label>
          <input
            id="website_hp"
            type="text"
            name="website_hp"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex="-1"
            autoComplete="off"
          />
        </div>

        <p className="mb-8 text-sm leading-7 text-ink/[0.6]">
          Cuéntanos sobre tu proyecto y preparamos una propuesta a tu medida. Responde lo que puedas; lo que no sepas, lo vemos juntos.
        </p>

        <fieldset className="mb-8">
          <legend className="mb-3 font-condensed text-lg font-black uppercase text-ink">1 · ¿Qué necesitas?</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {PAGE_TYPES.map((t) => (
              <button type="button" key={t} onClick={() => setPageType(t)}
                className={`border px-4 py-3 text-left font-condensed text-sm font-black uppercase tracking-[0.06em] transition ${pageType === t ? 'border-gold bg-gold text-white' : 'border-ink/[0.3] bg-white text-ink hover:border-gold'}`}>
                {t}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="mb-8">
          <legend className="mb-3 font-condensed text-lg font-black uppercase text-ink">2 · Datos generales</legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5"><span className={lbl}>Nombre de contacto *</span><input required className={field} value={base.contact_name} onChange={(e) => setBase({ ...base, contact_name: e.target.value })} /></label>
            <label className="grid gap-1.5"><span className={lbl}>Negocio / marca *</span><input required className={field} value={base.business} onChange={(e) => setBase({ ...base, business: e.target.value })} /></label>
            <label className="grid gap-1.5"><span className={lbl}>WhatsApp *</span><input required className={field} placeholder="+52…" value={base.whatsapp} onChange={(e) => setBase({ ...base, whatsapp: e.target.value })} /></label>
            <label className="grid gap-1.5"><span className={lbl}>Correo</span><input type="email" className={field} value={base.email} onChange={(e) => setBase({ ...base, email: e.target.value })} /></label>
            <label className="grid gap-1.5"><span className={lbl}>Instagram</span><input className={field} placeholder="@" value={base.instagram} onChange={(e) => setBase({ ...base, instagram: e.target.value })} /></label>
            <label className="grid gap-1.5"><span className={lbl}>Ciudad</span><input className={field} value={base.city} onChange={(e) => setBase({ ...base, city: e.target.value })} /></label>
            {GENERAL.map((q) => (
              <label key={q.key} className="grid gap-1.5 sm:col-span-2">
                <span className={lbl}>{q.label}</span>
                {q.type === 'textarea'
                  ? <textarea rows="2" className={field} placeholder={q.placeholder} value={general[q.key] || ''} onChange={(e) => setGeneral({ ...general, [q.key]: e.target.value })} />
                  : <input className={field} placeholder={q.placeholder} value={general[q.key] || ''} onChange={(e) => setGeneral({ ...general, [q.key]: e.target.value })} />}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="mb-8">
          <legend className="mb-3 font-condensed text-lg font-black uppercase text-ink">3 · Presupuesto y tiempos</legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5"><span className={lbl}>Presupuesto aproximado</span>
              <select className={field} value={base.budget} onChange={(e) => setBase({ ...base, budget: e.target.value })}>
                <option value="">Selecciona…</option>
                {BUDGETS.map((b) => <option key={b}>{b}</option>)}
              </select>
            </label>
            <label className="grid gap-1.5"><span className={lbl}>¿Para cuándo lo necesitas?</span><input className={field} placeholder="Fecha o “lo antes posible”" value={base.deadline} onChange={(e) => setBase({ ...base, deadline: e.target.value })} /></label>
          </div>
        </fieldset>

        {typeQs.length > 0 && (
          <fieldset className="mb-8">
            <legend className="mb-3 font-condensed text-lg font-black uppercase text-ink">4 · Sobre tu {pageType}</legend>
            <div className="grid gap-4">
              {typeQs.map((q, i) => (
                <label key={i} className="grid gap-1.5">
                  <span className={lbl}>{q}</span>
                  <textarea rows="2" className={field} value={specifics[q] || ''} onChange={(e) => setSpecifics({ ...specifics, [q]: e.target.value })} />
                </label>
              ))}
            </div>
          </fieldset>
        )}

        <label className="mb-8 grid gap-1.5">
          <span className={lbl}>¿Algo más que debamos saber?</span>
          <textarea rows="3" className={field} value={base.extra} onChange={(e) => setBase({ ...base, extra: e.target.value })} />
        </label>

        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

        <button type="submit" disabled={busy || !pageType} className="inline-flex w-full items-center justify-center gap-2 border border-ink bg-ink px-6 py-4 font-condensed text-base font-black uppercase tracking-[0.14em] text-paper transition hover:bg-gold hover:text-white disabled:opacity-50 sm:w-auto">
          {busy ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />} Enviar cuestionario
        </button>
        {!pageType && <p className="mt-2 text-xs text-ink/[0.45]">Selecciona primero qué tipo de página necesitas (paso 1).</p>}
      </form>
    </div>
  );
}
