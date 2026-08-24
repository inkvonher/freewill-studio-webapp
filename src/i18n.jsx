import { createContext, useContext, useEffect, useState } from 'react';

const STR = {
  es: {
    seo: {
      title: 'FREEWILL.STUDIO · Páginas Web & Web Apps Premium',
      description: 'Diseño consciente. Tecnología con propósito. Desarrollamos páginas web, web apps, reservas automatizadas y sistemas digitales premium que escalan tu negocio.',
      keywords: 'diseño web, desarrollo web, web app, programacion, automatizacion, chatbot, ecommerce, veracruz, mexico, premium',
    },
    nav: { servicios: 'Servicios', y: 'y', proyectos: 'Proyectos', proceso: 'Proceso', faq: 'FAQ', contacto: 'Contacto', cta: 'Cotizar' },
    hero: {
      tagline: 'Libre albedrío crea tu realidad.',
      title: 'Web apps que trabajan por tu negocio',
      goldWord: 'negocio',
      subtitle: 'Inversión real, resultados reales.',
      desc: 'Diseñamos páginas web y aplicaciones digitales que atraen clientes, automatizan procesos y elevan tu marca.',
      cta1: 'Solicitar proyecto',
      cta2: 'Ver proyectos',
      values: ['Unidad', 'Consciencia', 'Propósito'],
      panelTitle: 'Ruta de conversión',
      clicToClient: 'del clic al cliente',
      entry: 'entrada',
      conversion: 'conversión',
      presence: 'presencia activa',
      steps3: ['Atrae', 'Conecta', 'Convierte'],
      included: [
        ['Desarrollo', 'Tecnología a tu medida.'],
        ['Diseño', 'Experiencia que conecta.'],
        ['Automatización', 'Menos trabajo, más eficiencia.'],
        ['Estrategia', 'Presencia que genera clientes.'],
        ['Propiedad total', 'Sin rentas, sin dependencias.'],
      ],
    },
    benefitsSection: {
      eyebrow: '¿Para qué sirve una web app?',
      h2: 'No es un gasto, es una inversión que trabaja 24/7.',
      p: 'Una web app funciona como presencia, sistema y vendedor digital. Ordena tu oferta, responde mejor y convierte cada visita en una oportunidad real.',
    },
    benefits: ['Atrae clientes', 'Automatiza reservas', 'Vende productos o servicios', 'Mejora la presencia digital', 'Conecta WhatsApp, pagos y formularios', 'Convierte visitantes en clientes'],
    stats: [
      { suffix: '/7', label: 'Presencia activa' },
      { suffix: '%', label: 'Propiedad de tu proyecto' },
      { suffix: 'x', label: 'Más conversión vs. una página estática' },
      { suffix: ' días', label: 'Lanzamiento promedio' },
    ],
    services: {
      eyebrow: 'Servicios',
      h2: '¿Cuánto cuesta una app web?',
      p: 'Rangos de inversión orientativos. La cotización final depende del flujo, integraciones y alcance real.',
      cta: 'Cotizar',
      crypto: 'Aceptamos criptomonedas',
      items: [
        ['Landing Page', 'Oferta clara, una sola intención y flujo directo a contacto o compra.'],
        ['Página Web Profesional', 'Presencia completa para marca, servicios, autoridad y generación de confianza.'],
        ['Web App con Reservas', 'Agenda digital para servicios, citas, disponibilidad y seguimiento por WhatsApp.'],
        ['Ecommerce', 'Catálogo, pedidos y pagos para vender productos o servicios en línea.'],
        ['Sistema Interno', 'Panel privado para ordenar clientes, solicitudes, inventario o procesos.'],
        ['App Web Personalizada', 'Producto digital a medida para una operación, comunidad o modelo de negocio.'],
      ],
    },
    techLine: { p1: 'La tecnología es la herramienta,', gold: 'libre albedrío', p2: 'tú tienes el', p3: 'de usarla.' },
    conversion: ['Atrae', 'Conecta', 'Convierte', 'Retiene', 'Escala'],
    projects: {
      eyebrow: 'Proyectos creados',
      h2: 'Portafolio vivo para organizar las web apps de clientes.',
      p: 'Una selección inicial de proyectos publicados. Iremos integrando nuevos casos conforme estén listos.',
      viewWeb: 'Ver web',
      muted: ['FREEWILL.STUDIO', 'WEB APPS EN MOVIMIENTO'],
    },
    process: {
      eyebrow: 'Proceso',
      h2: 'Una decisión con propósito en cuatro pasos.',
      p: 'Un flujo simple para avanzar con claridad, estructura y foco comercial.',
      steps: [
        ['Diagnóstico', 'Entendemos tu negocio, oferta, cliente ideal y objetivo principal.'],
        ['Diseño', 'Creamos una experiencia visual clara, consciente y orientada a conversión.'],
        ['Desarrollo', 'Construimos la web app responsive, rápida y lista para integraciones.'],
        ['Lanzamiento', 'Publicamos, revisamos detalles finales y dejamos la base lista para crecer.'],
      ],
    },
    testimonials: {
      eyebrow: 'Testimonios',
      h2: 'Lo que dicen los negocios que ya trabajan con nosotros.',
      p: 'Marcas reales que convirtieron su presencia digital en una herramienta que vende.',
    },
    faq: {
      eyebrow: 'Preguntas frecuentes',
      h2: 'Resolvemos las dudas antes de empezar.',
      p: 'Y si te queda cualquier otra, escríbenos por WhatsApp y con gusto te explicamos.',
      items: [
        ['¿Cuánto tarda en estar lista mi web?', 'Depende del tipo de proyecto: una landing suele tomar 1 a 2 semanas, y una web app con reservas o ecommerce de 3 a 6 semanas. Al cotizar te damos una fecha clara.'],
        ['¿Cómo son los pagos?', 'Normalmente trabajamos con 50% de anticipo para arrancar y 50% al entregar. Aceptamos transferencia, tarjeta, criptomonedas y otros medios.'],
        ['¿Qué incluye el precio?', 'Diseño, desarrollo, versión móvil (responsive), conexión con WhatsApp y formularios, y la publicación de tu sitio. Antes de empezar te decimos exactamente qué incluye tu paquete.'],
        ['¿El sitio es mío?', 'Sí, totalmente. La web y su contenido son 100% tuyos, sin rentas obligatorias ni dependencias. Tú eres dueño de tu proyecto.'],
        ['¿Incluye dominio y hosting?', 'El dominio es gratis por un año y el hosting está incluido.'],
        ['¿Puedo pedir cambios durante el proceso?', 'Claro. Incluimos rondas de ajustes durante el desarrollo para dejar la web justo a tu gusto antes de publicarla.'],
        ['¿Dan mantenimiento después?', 'Sí, ofrecemos soporte y mantenimiento opcional si quieres que sigamos al pendiente, actualicemos contenido o agreguemos nuevas funciones más adelante.'],
      ],
    },
    ctaBand: { text: 'Tu negocio no necesita solo una página. Necesita una herramienta digital que trabaje por ti.', button: 'Cotizar mi web app' },
    contact: {
      eyebrow: 'Contacto',
      h2: 'Cuéntanos qué necesita tu negocio.',
      p: 'Llena el cuestionario y prepararemos una propuesta a tu medida. Toma unos minutos y nos da todo lo necesario para cotizar con claridad.',
      cardTitle: 'Cuestionario de proyecto',
      cardDesc: 'Elige el tipo de página que necesitas y responde unas preguntas rápidas. Lo recibimos al instante y te contactamos para afinar tu propuesta.',
      btn1: 'Llenar cuestionario',
      btn2: 'Escríbenos por WhatsApp',
      privacyPre: 'Al enviar aceptas nuestro',
      privacyLink: 'Aviso de Privacidad',
    },
    footer: { tagline: 'DISEÑO CONSCIENTE. TECNOLOGÍA CON PROPÓSITO', rights: 'Todos los derechos reservados.', privacy: 'Aviso de Privacidad' },
  },

  en: {
    seo: {
      title: 'FREEWILL.STUDIO · Premium Websites & Web Apps',
      description: 'Conscious design. Purpose-driven technology. We develop premium websites, web apps, automated booking systems, and custom digital systems to scale your business.',
      keywords: 'web design, web development, web app, programming, automation, chatbot, ecommerce, premium, mexico',
    },
    nav: { servicios: 'Services', y: 'and', proyectos: 'Proyectos', proceso: 'Process', faq: 'FAQ', contacto: 'Contact', cta: 'Get a quote' },
    hero: {
      tagline: 'Free will creates your reality.',
      title: 'Web apps that work for your business',
      goldWord: 'business',
      subtitle: 'Real investment, real results.',
      desc: 'We design websites and digital apps that attract clients, automate processes, and elevate your brand.',
      cta1: 'Start a project',
      cta2: 'View projects',
      values: ['Unity', 'Consciousness', 'Purpose'],
      panelTitle: 'Conversion path',
      clicToClient: 'from click to client',
      entry: 'entry',
      conversion: 'conversion',
      presence: 'active presence',
      steps3: ['Attract', 'Connect', 'Convert'],
      included: [
        ['Development', 'Technology built for you.'],
        ['Design', 'An experience that connects.'],
        ['Automation', 'Less work, more efficiency.'],
        ['Strategy', 'A presence that generates clients.'],
        ['Full ownership', 'No rentals, no dependencies.'],
      ],
    },
    benefitsSection: {
      eyebrow: 'What is a web app for?',
      h2: "It's not an expense, it's an investment that works 24/7.",
      p: 'A web app works as your presence, system, and digital salesperson. It organizes your offer, responds better, and turns every visit into a real opportunity.',
    },
    benefits: ['Attracts clients', 'Automates bookings', 'Sells products or services', 'Improves digital presence', 'Connects WhatsApp, payments and forms', 'Turns visitors into clients'],
    stats: [
      { suffix: '/7', label: 'Active presence' },
      { suffix: '%', label: 'Ownership of your project' },
      { suffix: 'x', label: 'More conversion vs. a static page' },
      { suffix: ' days', label: 'Average launch time' },
    ],
    services: {
      eyebrow: 'Services',
      h2: 'How much does a web app cost?',
      p: 'Reference investment ranges. The final quote depends on the flow, integrations, and actual scope.',
      cta: 'Get a quote',
      crypto: 'We accept cryptocurrency',
      items: [
        ['Landing Page', 'A clear offer, a single intent, and a direct path to contact or purchase.'],
        ['Professional Website', 'A complete presence for brand, services, authority, and building trust.'],
        ['Booking Web App', 'Digital scheduling for services, appointments, availability, and WhatsApp follow-up.'],
        ['Ecommerce', 'Catalog, orders, and payments to sell products or services online.'],
        ['Internal System', 'A private panel to organize clients, requests, inventory, or processes.'],
        ['Custom Web App', 'A tailor-made digital product for an operation, community, or business model.'],
      ],
    },
    techLine: { p1: 'Technology is the tool,', gold: 'free will', p2: 'you have the', p3: 'to use it.' },
    conversion: ['Attract', 'Connect', 'Convert', 'Retain', 'Scale'],
    projects: {
      eyebrow: 'Projects created',
      h2: 'A living portfolio of client web apps.',
      p: 'An initial selection of published projects. We keep adding new cases as they go live.',
      viewWeb: 'View site',
      muted: ['FREEWILL.STUDIO', 'WEB APPS IN MOTION'],
    },
    process: {
      eyebrow: 'Process',
      h2: 'A purposeful decision in four steps.',
      p: 'A simple flow to move forward with clarity, structure, and commercial focus.',
      steps: [
        ['Discovery', 'We understand your business, offer, ideal client, and main goal.'],
        ['Design', 'We craft a clear, conscious visual experience focused on conversion.'],
        ['Development', 'We build the web app: responsive, fast, and ready for integrations.'],
        ['Launch', 'We publish, review final details, and leave the base ready to grow.'],
      ],
    },
    testimonials: {
      eyebrow: 'Testimonials',
      h2: 'What the businesses already working with us say.',
      p: 'Real brands that turned their digital presence into a tool that sells.',
    },
    faq: {
      eyebrow: 'Frequently asked questions',
      h2: 'We clear up doubts before we start.',
      p: 'And if you have any other question, message us on WhatsApp and we’ll gladly explain.',
      items: [
        ['How long until my site is ready?', 'It depends on the project: a landing usually takes 1 to 2 weeks, and a booking web app or ecommerce 3 to 6 weeks. We give you a clear date when we quote.'],
        ['How do payments work?', 'We usually work with 50% upfront to start and 50% on delivery. We accept bank transfer, card, cryptocurrency, and other methods.'],
        ['What does the price include?', 'Design, development, mobile (responsive) version, WhatsApp and form integration, and publishing your site. Before we start we tell you exactly what your package includes.'],
        ['Is the site mine?', 'Yes, completely. The site and its content are 100% yours, with no mandatory rentals or dependencies. You own your project.'],
        ['Does it include domain and hosting?', 'The domain is free for one year and hosting is included.'],
        ['Can I request changes during the process?', 'Of course. We include rounds of adjustments during development to leave the site exactly to your liking before publishing.'],
        ['Do you offer maintenance afterward?', 'Yes, we offer optional support and maintenance if you want us to keep an eye on it, update content, or add new features later.'],
      ],
    },
    ctaBand: { text: 'Your business doesn’t just need a page. It needs a digital tool that works for you.', button: 'Quote my web app' },
    contact: {
      eyebrow: 'Contact',
      h2: 'Tell us what your business needs.',
      p: 'Fill out the questionnaire and we’ll prepare a tailored proposal. It takes a few minutes and gives us everything we need to quote clearly.',
      cardTitle: 'Project questionnaire',
      cardDesc: 'Choose the type of page you need and answer a few quick questions. We receive it instantly and reach out to refine your proposal.',
      btn1: 'Fill out the questionnaire',
      btn2: 'Message us on WhatsApp',
      privacyPre: 'By submitting you accept our',
      privacyLink: 'Privacy Notice',
    },
    footer: { tagline: 'CONSCIOUS DESIGN. TECHNOLOGY WITH PURPOSE', rights: 'All rights reserved.', privacy: 'Privacy Notice' },
  },
};

const LangCtx = createContext({ lang: 'es', t: STR.es, toggle: () => {}, setLang: () => {} });

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window === 'undefined') return 'es';
    return localStorage.getItem('fw_lang') || 'es';
  });

  useEffect(() => {
    localStorage.setItem('fw_lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const toggle = () => setLang((l) => (l === 'es' ? 'en' : 'es'));

  return <LangCtx.Provider value={{ lang, t: STR[lang], toggle, setLang }}>{children}</LangCtx.Provider>;
}

export const useLang = () => useContext(LangCtx);
