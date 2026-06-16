import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

// Abre el aviso disparando:  window.dispatchEvent(new Event('freewill:privacy'))
export const openPrivacy = () => window.dispatchEvent(new Event('freewill:privacy'));

const updated = 'Junio 2026';

export default function PrivacyNotice() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('freewill:privacy', onOpen);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('freewill:privacy', onOpen);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-ink/[0.72] backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Aviso de Privacidad"
            className="relative flex max-h-[86vh] w-full max-w-2xl flex-col border border-ink bg-paper shadow-ink"
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 220, damping: 26 }}
          >
            <div className="flex items-start justify-between gap-4 border-b border-ink bg-white px-6 py-5">
              <div>
                <span className="font-condensed text-xs font-black uppercase tracking-[0.2em] text-gold">
                  FREEWILL.STUDIO
                </span>
                <h2 className="mt-1 font-condensed text-3xl font-black uppercase leading-none text-ink">
                  Aviso de Privacidad
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Cerrar"
                data-cursor
                className="flex h-10 w-10 shrink-0 items-center justify-center border border-ink text-ink transition hover:border-gold hover:bg-gold hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-5 overflow-y-auto px-6 py-6 text-sm leading-7 text-ink/[0.78]">
              <p className="text-xs uppercase tracking-[0.16em] text-ink/[0.45]">
                Última actualización: {updated}
              </p>

              <p>
                En <strong>FREEWILL.STUDIO</strong> (“el Responsable”) valoramos tu privacidad. Este Aviso describe cómo
                recabamos, usamos y protegemos tus datos personales, conforme a la Ley Federal de Protección de Datos
                Personales en Posesión de los Particulares (LFPDPPP), su Reglamento y demás normativa aplicable en México.
              </p>

              <div>
                <h3 className="font-condensed text-lg font-black uppercase tracking-[0.08em] text-ink">
                  1. Datos que recabamos
                </h3>
                <p className="mt-2">
                  Recabamos los datos que nos proporcionas voluntariamente a través de nuestro formulario de contacto o
                  por WhatsApp: nombre, nombre de tu negocio, número de WhatsApp o teléfono, tipo de proyecto,
                  presupuesto aproximado y el mensaje que decidas compartir.
                </p>
              </div>

              <div>
                <h3 className="font-condensed text-lg font-black uppercase tracking-[0.08em] text-ink">
                  2. Finalidades del tratamiento
                </h3>
                <p className="mt-2">
                  Usamos tus datos para: (i) contactarte y dar seguimiento a tu solicitud; (ii) elaborar cotizaciones y
                  propuestas; (iii) prestar y dar soporte a los servicios contratados; y (iv) enviarte información
                  relacionada con tu proyecto. No utilizamos tus datos para fines distintos sin tu consentimiento.
                </p>
              </div>

              <div>
                <h3 className="font-condensed text-lg font-black uppercase tracking-[0.08em] text-ink">
                  3. Transferencia de datos
                </h3>
                <p className="mt-2">
                  No vendemos ni transferimos tus datos personales a terceros con fines comerciales. Únicamente podrán
                  ser tratados por proveedores tecnológicos que nos ayudan a operar (por ejemplo, servicios de hosting o
                  mensajería como WhatsApp), quienes están obligados a mantener su confidencialidad.
                </p>
              </div>

              <div>
                <h3 className="font-condensed text-lg font-black uppercase tracking-[0.08em] text-ink">
                  4. Derechos ARCO
                </h3>
                <p className="mt-2">
                  Tienes derecho a Acceder, Rectificar y Cancelar tus datos personales, así como a Oponerte a su
                  tratamiento o revocar tu consentimiento. Para ejercer estos derechos, escríbenos a{' '}
                  <a
                    href="mailto:vonynegocios@gmail.com"
                    className="font-semibold text-gold underline-offset-2 hover:underline"
                  >
                    vonynegocios@gmail.com
                  </a>{' '}
                  indicando tu solicitud y un medio de contacto.
                </p>
              </div>

              <div>
                <h3 className="font-condensed text-lg font-black uppercase tracking-[0.08em] text-ink">
                  5. Conservación y seguridad
                </h3>
                <p className="mt-2">
                  Conservamos tus datos solo durante el tiempo necesario para cumplir las finalidades descritas y
                  aplicamos medidas de seguridad razonables para protegerlos contra pérdida, uso indebido o acceso no
                  autorizado.
                </p>
              </div>

              <div>
                <h3 className="font-condensed text-lg font-black uppercase tracking-[0.08em] text-ink">
                  6. Cambios al aviso
                </h3>
                <p className="mt-2">
                  Cualquier modificación a este Aviso de Privacidad se publicará en esta misma página. Te recomendamos
                  revisarlo periódicamente.
                </p>
              </div>

              <div>
                <h3 className="font-condensed text-lg font-black uppercase tracking-[0.08em] text-ink">
                  7. Contacto
                </h3>
                <p className="mt-2">
                  Responsable: FREEWILL.STUDIO · Correo:{' '}
                  <a
                    href="mailto:vonynegocios@gmail.com"
                    className="font-semibold text-gold underline-offset-2 hover:underline"
                  >
                    vonynegocios@gmail.com
                  </a>{' '}
                  · WhatsApp: +52 984 182 0414.
                </p>
              </div>

              <p className="border-t border-ink/[0.15] pt-4 text-xs text-ink/[0.5]">
                Al enviar tus datos a través del formulario o por WhatsApp, manifiestas haber leído y aceptado este
                Aviso de Privacidad.
              </p>
            </div>

            <div className="border-t border-ink bg-white px-6 py-4">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="btn-primary w-full"
              >
                Volver a la página
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
