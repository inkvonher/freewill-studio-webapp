import { Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { fadeUp } from '../motion.js';

const initialForm = {
  name: '',
  business: '',
  whatsapp: '',
  projectType: 'Landing Page',
  budget: '$5,000 - $10,000 MXN',
  message: '',
};

const whatsappNumber = '529981234567';

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const message = [
      'Hola FREEWILL.STUDIO, quiero cotizar una web app.',
      '',
      `Nombre: ${form.name}`,
      `Negocio: ${form.business}`,
      `WhatsApp: ${form.whatsapp}`,
      `Tipo de proyecto: ${form.projectType}`,
      `Presupuesto aproximado: ${form.budget}`,
      `Mensaje: ${form.message}`,
    ].join('\n');

    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noreferrer');
  };

  return (
    <motion.section id="contacto" className="section-shell pb-24" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.22 }}>
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div>
          <span className="eyebrow">Contacto</span>
          <h2 className="mt-4 font-condensed text-4xl font-black uppercase leading-none sm:text-6xl">Cuéntanos qué herramienta necesita tu negocio.</h2>
          <p className="mt-5 text-lg leading-8 text-ink/[0.62]">
            Completa el formulario y envíanos los detalles por WhatsApp para preparar una cotización clara.
          </p>
        </div>

        <motion.form onSubmit={handleSubmit} className="paper-card premium-border grid gap-4 p-5 sm:grid-cols-2 sm:p-7" whileHover={{ y: -3 }} transition={{ type: 'spring', stiffness: 180, damping: 26 }}>
          <label className="form-field">
            <span>Nombre</span>
            <input required name="name" value={form.name} onChange={updateField} placeholder="Tu nombre" />
          </label>
          <label className="form-field">
            <span>Negocio</span>
            <input required name="business" value={form.business} onChange={updateField} placeholder="Nombre del negocio" />
          </label>
          <label className="form-field">
            <span>WhatsApp</span>
            <input required name="whatsapp" value={form.whatsapp} onChange={updateField} placeholder="+52..." />
          </label>
          <label className="form-field">
            <span>Tipo de proyecto</span>
            <select name="projectType" value={form.projectType} onChange={updateField}>
              <option>Landing Page</option>
              <option>Página Web Profesional</option>
              <option>Web App con Reservas</option>
              <option>Ecommerce</option>
              <option>Sistema Interno</option>
              <option>App Web Personalizada</option>
            </select>
          </label>
          <label className="form-field sm:col-span-2">
            <span>Presupuesto aproximado</span>
            <select name="budget" value={form.budget} onChange={updateField}>
              <option>$5,000 - $10,000 MXN</option>
              <option>$10,000 - $20,000 MXN</option>
              <option>$20,000 - $40,000 MXN</option>
              <option>$40,000+ MXN</option>
            </select>
          </label>
          <label className="form-field sm:col-span-2">
            <span>Mensaje</span>
            <textarea required name="message" rows="5" value={form.message} onChange={updateField} placeholder="Cuéntanos qué quieres crear, vender o automatizar." />
          </label>
          <button type="submit" className="btn-primary sm:col-span-2">
            Enviar por WhatsApp
            <Send size={18} />
          </button>
        </motion.form>
      </div>
    </motion.section>
  );
}
