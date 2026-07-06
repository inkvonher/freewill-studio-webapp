export const PAGE_TYPES = [
  'Landing Page',
  'Página Web Profesional',
  'Web App con Reservas',
  'Ecommerce',
  'Sistema Interno',
  'App Web Personalizada',
];

export const BUDGETS = [
  'Aún no lo sé',
  '$5,000 - $20,000 MXN',
  '$20,000 - $60,000 MXN',
  '$60,000 - $180,000 MXN',
  '$180,000+ MXN',
];

// Preguntas generales (para todos). key = campo en data.
export const GENERAL = [
  { key: 'about', label: '¿A qué se dedican? (1 o 2 frases)', type: 'textarea' },
  { key: 'ideal_client', label: '¿Quién es su cliente ideal?', type: 'text' },
  { key: 'goal', label: '¿Cuál es el objetivo principal de la web?', type: 'text', placeholder: 'Atraer clientes, recibir reservas, vender…' },
  { key: 'differentiator', label: '¿Qué los diferencia de la competencia?', type: 'text' },
  { key: 'brand', label: '¿Ya tienen logo y colores de marca?', type: 'text', placeholder: 'Sí / No / En proceso' },
  { key: 'references', label: 'Menciona 1 o 2 páginas web que te gusten (referencia).', type: 'text' },
  { key: 'domain', label: '¿Tienen dominio? Si no, ¿cuál les gustaría?', type: 'text' },
  { key: 'content', label: '¿Tienen textos y fotos, o necesitan apoyo con el contenido?', type: 'text' },
];

// Preguntas específicas por tipo de página.
export const TYPE_QUESTIONS = {
  'Landing Page': [
    '¿Cuál es la única acción que quieres que haga el visitante? (WhatsApp, comprar, registrarse, agendar…)',
    '¿Qué oferta o mensaje principal quieres destacar?',
    '¿La usarás con anuncios (Facebook, Instagram, Google)?',
    '¿Tienes algún gancho o promoción? (descuento, regalo, demo…)',
  ],
  'Página Web Profesional': [
    '¿Qué secciones quieres? (Inicio, Servicios, Sobre nosotros, Galería, Testimonios, Blog, Contacto…)',
    'Lista los servicios o productos que quieres mostrar.',
    '¿Quieres mostrar tu ubicación con mapa?',
    '¿Tienes testimonios o reseñas para incluir?',
    '¿En qué idiomas? (solo español, español e inglés…)',
  ],
  'Web App con Reservas': [
    'Lista tus servicios con duración y precio aproximado.',
    'Horarios y días de atención.',
    '¿Cuántas personas o agendas se manejan? (barberos, tatuadores…)',
    '¿Cobras anticipo para reservar? ¿De cuánto?',
    '¿Qué métodos de pago aceptas?',
    '¿Quieres recordatorios automáticos por WhatsApp?',
  ],
  Ecommerce: [
    '¿Cuántos productos aprox? ¿Qué categorías?',
    '¿Los productos tienen variantes? (tallas, colores…)',
    '¿Qué métodos de pago quieres?',
    '¿Manejas envíos? ¿A qué zonas y costo? ¿O recoger en tienda?',
    '¿Necesitas control de inventario y/o facturación?',
  ],
  'Sistema Interno': [
    '¿Qué proceso quieres ordenar? (clientes, citas, inventario, pedidos…)',
    '¿Qué usas hoy para eso? (Excel, papel, otra app…)',
    '¿Cuántas personas lo usarán? ¿Roles distintos?',
    '¿Qué reportes necesitas ver?',
    '¿Necesitas acceso desde el celular?',
  ],
  'App Web Personalizada': [
    'Describe tu idea o producto en un párrafo.',
    '¿Quiénes la usarán y para qué?',
    'Lista las 3 a 5 funciones más importantes.',
    '¿Necesita cuentas de usuario / inicio de sesión?',
    '¿Qué integraciones requiere? (pagos, WhatsApp, mapas, IA…)',
  ],
};
