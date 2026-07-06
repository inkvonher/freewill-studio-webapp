import { useState } from 'react';
import JSZip from 'jszip';
import { Archive, Download, FileJson, FileText, FolderPlus, Loader2, Package, Trash2, MessageCircle, ChevronDown } from 'lucide-react';
import useCollection from '../useCollection.js';
import { Badge, Modal } from '../ui.jsx';
import { GENERAL } from '../../lib/briefQuestions.js';

const BRIEF_STATUS = {
  nuevo: { label: 'Nuevo', color: '#185fa5', bg: '#e6f1fb' },
  revisado: { label: 'Revisado', color: '#b87905', bg: '#faf0d9' },
  cotizado: { label: 'Cotizado', color: '#7a4ab7', bg: '#efeafe' },
  archivado: { label: 'Archivado', color: '#6b6b6b', bg: '#eeeeea' },
};

const GENERAL_LABELS = Object.fromEntries(GENERAL.map((q) => [q.key, q.label]));

const clean = (value) => String(value || '').trim();

const escapeHtml = (value) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

const formatDate = (value) => {
  if (!value) return '';
  return new Date(value).toLocaleString('es-MX', { dateStyle: 'medium', timeStyle: 'short' });
};

const slugify = (value) =>
  clean(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 70) || 'cuestionario';

const downloadFile = (filename, content, type) => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

const questionRows = (brief) => {
  const d = brief.data || {};
  return [
    ['Tipo de página', brief.page_type],
    ['Negocio', brief.business],
    ['Contacto', brief.contact_name],
    ['WhatsApp', brief.whatsapp],
    ['Correo', brief.email],
    ['Instagram', d.instagram],
    ['Ciudad', d.city],
    ['Presupuesto', brief.budget],
    ['Fecha deseada', d.deadline],
    ...Object.entries(d.general || {}).map(([key, value]) => [GENERAL_LABELS[key] || key, value]),
    ...Object.entries(d.specifics || {}),
    ['Comentarios', d.extra],
  ].filter(([, value]) => clean(value));
};

const briefToMarkdown = (brief) => {
  const status = BRIEF_STATUS[brief.status]?.label || brief.status || 'Sin estado';
  const rows = questionRows(brief);
  return [
    `# Cuestionario - ${clean(brief.business) || 'Sin negocio'}`,
    '',
    `- Estado: ${status}`,
    `- Recibido: ${formatDate(brief.created_at) || 'Sin fecha'}`,
    `- ID: ${brief.id}`,
    '',
    '## Respuestas',
    '',
    ...rows.flatMap(([question, answer]) => [`### ${question}`, '', clean(answer), '']),
  ].join('\n');
};

const proposalDefaults = {
  'Landing Page': {
    title: 'Landing page de conversión',
    timeline: '2 a 3 semanas',
    objective: 'convertir visitas en contactos, registros o ventas con una experiencia clara y rápida.',
    deliverables: [
      'Estructura estratégica de la landing page',
      'Diseño responsive para celular y escritorio',
      'Secciones orientadas a conversión',
      'Integración con WhatsApp, formulario o CTA principal',
      'Optimización básica de velocidad y SEO técnico',
      'Publicación en dominio final',
    ],
  },
  'Página Web Profesional': {
    title: 'Página web profesional',
    timeline: '3 a 5 semanas',
    objective: 'presentar la marca con claridad, generar confianza y facilitar nuevos contactos.',
    deliverables: [
      'Arquitectura de secciones principales',
      'Diseño visual alineado a la marca',
      'Páginas responsive para servicios, información y contacto',
      'Formulario o enlace directo a WhatsApp',
      'SEO técnico base y configuración de metadata',
      'Publicación y revisión final en producción',
    ],
  },
  'Web App con Reservas': {
    title: 'Web app con reservas',
    timeline: '5 a 8 semanas',
    objective: 'automatizar reservas, ordenar disponibilidad y reducir coordinación manual.',
    deliverables: [
      'Flujo de reserva para clientes',
      'Panel básico de administración',
      'Configuración de servicios, horarios y disponibilidad',
      'Notificaciones o contacto por WhatsApp según alcance',
      'Base de datos para reservas y clientes',
      'Publicación, pruebas y acompañamiento inicial',
    ],
  },
  Ecommerce: {
    title: 'Ecommerce',
    timeline: '6 a 10 semanas',
    objective: 'crear una tienda clara, confiable y preparada para recibir pedidos o pagos.',
    deliverables: [
      'Catálogo de productos y categorías',
      'Vista de producto responsive',
      'Carrito y flujo de compra',
      'Configuración de pagos/envíos según alcance',
      'Panel básico para administración de productos',
      'Publicación, pruebas de compra y capacitación inicial',
    ],
  },
  'Sistema Interno': {
    title: 'Sistema interno',
    timeline: '6 a 12 semanas',
    objective: 'ordenar procesos internos y centralizar información operativa.',
    deliverables: [
      'Análisis del proceso actual',
      'Diseño de flujos y roles de usuario',
      'Panel interno responsive',
      'Base de datos para operación diaria',
      'Reportes o vistas de seguimiento según alcance',
      'Pruebas, ajustes y documentación de uso',
    ],
  },
  'App Web Personalizada': {
    title: 'App web personalizada',
    timeline: '6 a 12 semanas',
    objective: 'convertir la idea en una aplicación web funcional, escalable y usable.',
    deliverables: [
      'Definición de alcance y MVP',
      'Diseño de experiencia y pantallas clave',
      'Desarrollo frontend responsive',
      'Backend/base de datos según funcionalidades',
      'Integraciones requeridas según alcance',
      'Pruebas, publicación y soporte inicial',
    ],
  },
};

const budgetCopy = (budget) => {
  if (!budget || budget === 'Aún no lo sé') return 'Inversión por definir después de validar alcance, prioridad y funcionalidades exactas.';
  return `Rango de inversión declarado por el cliente: ${budget}. La cotización final se ajusta al alcance aprobado.`;
};

const getProposalData = (brief) => {
  const d = brief.data || {};
  const general = d.general || {};
  const specificAnswers = Object.entries(d.specifics || {}).filter(([, value]) => clean(value));
  const type = brief.page_type || 'App Web Personalizada';
  const defaults = proposalDefaults[type] || proposalDefaults['App Web Personalizada'];
  const projectName = clean(brief.business) || 'Proyecto web';
  const mainGoal = clean(general.goal) || defaults.objective;
  const clientAbout = clean(general.about);

  return {
    type,
    title: defaults.title,
    projectName,
    contact: clean(brief.contact_name),
    date: new Date().toLocaleDateString('es-MX', { dateStyle: 'long' }),
    city: clean(d.city),
    mainGoal,
    clientAbout,
    timeline: clean(d.deadline) ? `${defaults.timeline}. Fecha deseada por cliente: ${clean(d.deadline)}.` : defaults.timeline,
    investment: budgetCopy(brief.budget),
    deliverables: defaults.deliverables,
    differentiator: clean(general.differentiator),
    idealClient: clean(general.ideal_client),
    brand: clean(general.brand),
    references: clean(general.references),
    domain: clean(general.domain),
    content: clean(general.content),
    extra: clean(d.extra),
    specificAnswers,
  };
};

const proposalToMarkdown = (brief) => {
  const p = getProposalData(brief);
  const context = [
    p.clientAbout && `- Sobre el negocio: ${p.clientAbout}`,
    p.idealClient && `- Cliente ideal: ${p.idealClient}`,
    p.differentiator && `- Diferenciador: ${p.differentiator}`,
    p.brand && `- Marca: ${p.brand}`,
    p.references && `- Referencias: ${p.references}`,
    p.domain && `- Dominio: ${p.domain}`,
    p.content && `- Contenido: ${p.content}`,
    p.extra && `- Comentarios adicionales: ${p.extra}`,
  ].filter(Boolean);

  return [
    `# Propuesta comercial - ${p.projectName}`,
    '',
    `FREEWILL.STUDIO · ${p.date}`,
    '',
    `## Proyecto`,
    '',
    `Propuesta para desarrollar una ${p.title.toLowerCase()} para ${p.projectName}.`,
    '',
    `## Objetivo`,
    '',
    p.mainGoal,
    '',
    `## Alcance propuesto`,
    '',
    ...p.deliverables.map((item) => `- ${item}`),
    '',
    ...(context.length ? ['## Contexto recibido', '', ...context, ''] : []),
    ...(p.specificAnswers.length ? ['## Respuestas clave', '', ...p.specificAnswers.map(([q, a]) => `- ${q}: ${a}`), ''] : []),
    `## Tiempo estimado`,
    '',
    p.timeline,
    '',
    `## Inversión`,
    '',
    p.investment,
    '',
    `## Forma de trabajo`,
    '',
    '- Inicio con definición de alcance y estructura.',
    '- Diseño de experiencia visual y revisión contigo.',
    '- Desarrollo, pruebas y ajustes.',
    '- Publicación final y acompañamiento inicial.',
    '',
    `## Próximo paso`,
    '',
    'Confirmar alcance, prioridad y fecha de inicio para preparar la cotización final y calendario de trabajo.',
  ].join('\n');
};

const proposalToHtml = (brief) => {
  const p = getProposalData(brief);
  const list = (items) => items.map((item) => `<li>${escapeHtml(item)}</li>`).join('');
  const context = [
    ['Sobre el negocio', p.clientAbout],
    ['Cliente ideal', p.idealClient],
    ['Diferenciador', p.differentiator],
    ['Marca', p.brand],
    ['Referencias', p.references],
    ['Dominio', p.domain],
    ['Contenido', p.content],
    ['Comentarios adicionales', p.extra],
  ].filter(([, value]) => clean(value));

  return `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Propuesta - ${escapeHtml(p.projectName)}</title>
  <style>
    :root { color: #111; background: #f4f1ea; font-family: Inter, Arial, sans-serif; }
    body { margin: 0; padding: 36px; }
    main { max-width: 860px; margin: 0 auto; background: #fff; border: 1px solid #111; }
    header { padding: 44px; border-bottom: 1px solid #111; background: #111; color: #f4f1ea; }
    section { padding: 28px 44px; border-bottom: 1px solid rgba(17,17,17,.12); }
    h1, h2, p { margin: 0; }
    h1 { font-size: 42px; line-height: .95; text-transform: uppercase; letter-spacing: 0; }
    h2 { margin-bottom: 14px; font-size: 14px; text-transform: uppercase; letter-spacing: .12em; color: #b87905; }
    p, li { font-size: 15px; line-height: 1.7; }
    ul { margin: 0; padding-left: 20px; }
    .meta { margin-top: 18px; color: rgba(244,241,234,.72); font-size: 13px; }
    .grid { display: grid; gap: 16px; grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .box { border: 1px solid rgba(17,17,17,.18); padding: 16px; }
    .label { margin-bottom: 5px; font-size: 11px; text-transform: uppercase; letter-spacing: .12em; color: rgba(17,17,17,.52); font-weight: 700; }
    .footer { color: rgba(17,17,17,.58); }
    @media print { body { padding: 0; background: #fff; } main { border: 0; } }
    @media (max-width: 720px) { body { padding: 14px; } header, section { padding: 24px; } h1 { font-size: 31px; } .grid { grid-template-columns: 1fr; } }
  </style>
</head>
<body>
  <main>
    <header>
      <p>FREEWILL.STUDIO</p>
      <h1>Propuesta para ${escapeHtml(p.projectName)}</h1>
      <p class="meta">${escapeHtml(p.title)} · ${escapeHtml(p.date)}${p.contact ? ` · Contacto: ${escapeHtml(p.contact)}` : ''}</p>
    </header>
    <section>
      <h2>Objetivo</h2>
      <p>${escapeHtml(p.mainGoal)}</p>
    </section>
    <section>
      <h2>Alcance propuesto</h2>
      <ul>${list(p.deliverables)}</ul>
    </section>
    <section>
      <div class="grid">
        <div class="box"><p class="label">Tiempo estimado</p><p>${escapeHtml(p.timeline)}</p></div>
        <div class="box"><p class="label">Inversión</p><p>${escapeHtml(p.investment)}</p></div>
      </div>
    </section>
    ${context.length ? `<section><h2>Contexto recibido</h2><div class="grid">${context.map(([label, value]) => `<div class="box"><p class="label">${escapeHtml(label)}</p><p>${escapeHtml(value)}</p></div>`).join('')}</div></section>` : ''}
    ${p.specificAnswers.length ? `<section><h2>Respuestas clave</h2><ul>${p.specificAnswers.map(([q, a]) => `<li><strong>${escapeHtml(q)}:</strong> ${escapeHtml(a)}</li>`).join('')}</ul></section>` : ''}
    <section>
      <h2>Forma de trabajo</h2>
      <ul>
        <li>Definición de alcance y estructura.</li>
        <li>Diseño de experiencia visual y revisión contigo.</li>
        <li>Desarrollo, pruebas y ajustes.</li>
        <li>Publicación final y acompañamiento inicial.</li>
      </ul>
    </section>
    <section>
      <h2>Próximo paso</h2>
      <p>Confirmar alcance, prioridad y fecha de inicio para preparar la cotización final y calendario de trabajo.</p>
    </section>
    <section class="footer">
      <p>Esta propuesta se genera a partir del cuestionario recibido. La cotización final puede ajustarse si cambia el alcance, integraciones, contenido o tiempos de entrega.</p>
    </section>
  </main>
</body>
</html>`;
};

const recommendedStack = (type) => {
  if (type === 'Landing Page' || type === 'Página Web Profesional') {
    return ['Vite + React', 'Tailwind CSS', 'Vercel', 'Formulario/WhatsApp', 'SEO técnico base'];
  }
  if (type === 'Web App con Reservas') {
    return ['Vite + React', 'Tailwind CSS', 'Supabase Auth/DB', 'Reservas y disponibilidad', 'Vercel'];
  }
  if (type === 'Ecommerce') {
    return ['Vite + React', 'Tailwind CSS', 'Supabase o Shopify según inventario', 'Pagos online', 'Vercel'];
  }
  if (type === 'Sistema Interno') {
    return ['Vite + React', 'Tailwind CSS', 'Supabase Auth/DB', 'Roles/permisos', 'Panel administrativo'];
  }
  return ['Vite + React', 'Tailwind CSS', 'Supabase Auth/DB', 'Integraciones según alcance', 'Vercel'];
};

const projectPlanToMarkdown = (brief) => {
  const p = getProposalData(brief);
  const stack = recommendedStack(p.type);
  return [
    `# Plan de proyecto - ${p.projectName}`,
    '',
    `## Objetivo`,
    '',
    p.mainGoal,
    '',
    `## Alcance inicial`,
    '',
    ...p.deliverables.map((item) => `- ${item}`),
    '',
    `## Stack recomendado`,
    '',
    ...stack.map((item) => `- ${item}`),
    '',
    `## Fases`,
    '',
    '1. Descubrimiento y confirmación de alcance',
    '2. Estructura de contenido y arquitectura',
    '3. Diseño visual responsive',
    '4. Desarrollo de pantallas y flujos principales',
    '5. Integraciones, formularios, datos o automatizaciones',
    '6. Pruebas en desktop/mobile',
    '7. Publicación y handoff',
    '',
    `## Checklist de inicio`,
    '',
    '- Confirmar dominio y hosting',
    '- Reunir logo, colores, fotos y textos existentes',
    '- Confirmar WhatsApp/correo de contacto',
    '- Confirmar páginas o pantallas necesarias',
    '- Confirmar integraciones obligatorias',
    '- Definir fecha realista de entrega',
    '- Validar anticipo y forma de pago',
    '',
    `## Riesgos a validar`,
    '',
    '- Contenido incompleto o fotos faltantes',
    '- Cambios de alcance después de cotizar',
    '- Integraciones de pago, reservas o terceros no confirmadas',
    '- Dominio o accesos no disponibles',
  ].join('\n');
};

const copyDraftToMarkdown = (brief) => {
  const p = getProposalData(brief);
  const cta = p.type === 'Ecommerce' ? 'Comprar ahora' : p.type === 'Web App con Reservas' ? 'Reservar ahora' : 'Contactar por WhatsApp';
  return [
    `# Copy inicial - ${p.projectName}`,
    '',
    `## Hero`,
    '',
    `### Headline`,
    `${p.projectName}: ${p.mainGoal}`,
    '',
    `### Subheadline`,
    p.clientAbout || `Una experiencia digital clara, rápida y diseñada para convertir visitantes en clientes.`,
    '',
    `### CTA principal`,
    cta,
    '',
    `## Secciones sugeridas`,
    '',
    '- Inicio',
    '- Beneficios',
    '- Servicios o funciones principales',
    '- Proceso',
    '- Testimonios o prueba social',
    '- Preguntas frecuentes',
    '- Contacto',
    '',
    `## Mensajes clave`,
    '',
    ...(p.differentiator ? [`- Diferenciador: ${p.differentiator}`] : ['- Comunicar el valor principal de forma directa.']),
    ...(p.idealClient ? [`- Cliente ideal: ${p.idealClient}`] : ['- Hablarle a un cliente con intención clara de compra/contacto.']),
    ...(p.city ? [`- Ubicación/mercado: ${p.city}`] : []),
    '',
    `## Pendiente de cliente`,
    '',
    '- Logo en alta calidad',
    '- Colores o manual de marca',
    '- Fotos reales',
    '- Textos aprobados',
    '- Links de redes sociales',
    '- Políticas, términos o avisos si aplican',
  ].join('\n');
};

const technicalBriefToMarkdown = (brief) => {
  const p = getProposalData(brief);
  const stack = recommendedStack(p.type);
  return [
    `# Brief técnico - ${p.projectName}`,
    '',
    `## Tipo`,
    '',
    p.type,
    '',
    `## Stack base`,
    '',
    ...stack.map((item) => `- ${item}`),
    '',
    `## Datos del cliente`,
    '',
    `- Contacto: ${p.contact || 'Pendiente'}`,
    `- Ciudad: ${p.city || 'Pendiente'}`,
    `- Presupuesto: ${brief.budget || 'Pendiente'}`,
    `- Tiempo deseado: ${(brief.data || {}).deadline || 'Pendiente'}`,
    '',
    `## Funcionalidades esperadas`,
    '',
    ...p.deliverables.map((item) => `- ${item}`),
    '',
    ...(p.specificAnswers.length ? ['## Respuestas funcionales', '', ...p.specificAnswers.map(([q, a]) => `### ${q}\n\n${a}\n`)] : []),
    '',
    `## Criterios de aceptación`,
    '',
    '- La experiencia funciona correctamente en mobile y desktop',
    '- Los CTAs/contactos funcionan',
    '- El sitio o app carga sin errores en producción',
    '- El contenido principal queda editable o documentado según alcance',
    '- El cliente recibe instrucciones básicas de uso',
  ].join('\n');
};

const readmeToMarkdown = (brief) => {
  const p = getProposalData(brief);
  return [
    `# ${p.projectName}`,
    '',
    `Kit inicial generado desde FREEWILL.STUDIO para construir: ${p.title}.`,
    '',
    `## Archivos`,
    '',
    '- `01-brief.md`: respuestas completas del cuestionario',
    '- `02-propuesta.html`: propuesta comercial lista para PDF',
    '- `02-propuesta.md`: propuesta editable en Markdown',
    '- `03-plan-de-proyecto.md`: fases, stack y checklist',
    '- `04-copy-inicial.md`: textos iniciales y secciones sugeridas',
    '- `05-brief-tecnico.md`: guía técnica para desarrollo',
    '- `data/cuestionario.json`: datos originales del formulario',
    '',
    `## Siguiente paso`,
    '',
    'Revisar alcance, confirmar inversión y crear el repositorio/proyecto base del cliente.',
  ].join('\n');
};

const csvEscape = (value) => `"${String(value ?? '').replace(/"/g, '""')}"`;

const flattenBrief = (brief) => {
  const d = brief.data || {};
  const base = {
    id: brief.id,
    created_at: brief.created_at,
    status: BRIEF_STATUS[brief.status]?.label || brief.status || '',
    page_type: brief.page_type || '',
    business: brief.business || '',
    contact_name: brief.contact_name || '',
    whatsapp: brief.whatsapp || '',
    email: brief.email || '',
    instagram: d.instagram || '',
    city: d.city || '',
    budget: brief.budget || '',
    deadline: d.deadline || '',
    extra: d.extra || '',
  };
  Object.entries(d.general || {}).forEach(([key, value]) => { base[`general_${key}`] = value; });
  Object.entries(d.specifics || {}).forEach(([key, value]) => { base[`specific_${key}`] = value; });
  return base;
};

const downloadBriefMarkdown = (brief) => {
  const date = brief.created_at ? new Date(brief.created_at).toISOString().slice(0, 10) : 'sin-fecha';
  downloadFile(`${date}-${slugify(brief.business)}.md`, briefToMarkdown(brief), 'text/markdown;charset=utf-8');
};

const downloadProposal = (brief) => {
  const date = new Date().toISOString().slice(0, 10);
  downloadFile(`propuesta-${date}-${slugify(brief.business)}.html`, proposalToHtml(brief), 'text/html;charset=utf-8');
};

const buildClientKitZip = (zip, brief) => {
  const slug = slugify(brief.business);
  const folder = zip.folder(slug);
  folder.file('README.md', readmeToMarkdown(brief));
  folder.file('01-brief.md', briefToMarkdown(brief));
  folder.file('02-propuesta.html', proposalToHtml(brief));
  folder.file('02-propuesta.md', proposalToMarkdown(brief));
  folder.file('03-plan-de-proyecto.md', projectPlanToMarkdown(brief));
  folder.file('04-copy-inicial.md', copyDraftToMarkdown(brief));
  folder.file('05-brief-tecnico.md', technicalBriefToMarkdown(brief));
  folder.folder('data').file('cuestionario.json', JSON.stringify(brief, null, 2));
  return folder;
};

const downloadClientKit = async (brief) => {
  const zip = new JSZip();
  buildClientKitZip(zip, brief);
  const blob = await zip.generateAsync({ type: 'blob' });
  const date = new Date().toISOString().slice(0, 10);
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `kit-app-${date}-${slugify(brief.business)}.zip`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

const downloadBriefsJson = (rows) => {
  const date = new Date().toISOString().slice(0, 10);
  downloadFile(`cuestionarios-freewill-${date}.json`, JSON.stringify(rows, null, 2), 'application/json;charset=utf-8');
};

const downloadBriefsZip = async (rows) => {
  const zip = new JSZip();
  rows.forEach((brief) => {
    const date = brief.created_at ? new Date(brief.created_at).toISOString().slice(0, 10) : 'sin-fecha';
    zip.file(`${date}-${slugify(brief.business)}.md`, briefToMarkdown(brief));
    zip.file(`propuesta-${date}-${slugify(brief.business)}.md`, proposalToMarkdown(brief));
    zip.file(`propuesta-${date}-${slugify(brief.business)}.html`, proposalToHtml(brief));
    buildClientKitZip(zip.folder('kits'), brief);
  });
  zip.file('cuestionarios.json', JSON.stringify(rows, null, 2));
  const blob = await zip.generateAsync({ type: 'blob' });
  const date = new Date().toISOString().slice(0, 10);
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `cuestionarios-freewill-${date}.zip`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

const downloadBriefsCsv = (rows) => {
  const flatRows = rows.map(flattenBrief);
  const headers = Array.from(new Set(flatRows.flatMap((row) => Object.keys(row))));
  const csv = [
    headers.map(csvEscape).join(','),
    ...flatRows.map((row) => headers.map((header) => csvEscape(row[header])).join(',')),
  ].join('\n');
  const date = new Date().toISOString().slice(0, 10);
  downloadFile(`cuestionarios-freewill-${date}.csv`, csv, 'text/csv;charset=utf-8');
};

function Detail({ brief }) {
  const Row = ({ q, a }) => a ? (
    <div className="border-b border-ink/[0.08] py-2 last:border-0">
      <p className="text-xs font-semibold text-ink/[0.55]">{q}</p>
      <p className="mt-0.5 text-sm text-ink/[0.85] whitespace-pre-wrap">{a}</p>
    </div>
  ) : null;

  return (
    <div>
      {questionRows(brief).map(([question, answer]) => <Row key={question} q={question} a={answer} />)}
    </div>
  );
}

export default function Briefs() {
  const { rows, loading, update, remove } = useCollection('briefs');
  const { insert: insertProject } = useCollection('projects');
  const [open, setOpen] = useState(null);
  const [busyId, setBusyId] = useState('');

  const generateProposalFromBrief = async (brief) => {
    downloadProposal(brief);
    if (brief.status !== 'cotizado') {
      await update(brief.id, { status: 'cotizado' });
    }
  };

  const generateClientKitFromBrief = async (brief) => {
    await downloadClientKit(brief);
    if (brief.status === 'nuevo') {
      await update(brief.id, { status: 'revisado' });
    }
  };

  const createProjectFromBrief = async (brief) => {
    const projectName = clean(brief.business) || `Proyecto ${clean(brief.page_type) || 'web'}`;
    if (!window.confirm(`¿Crear proyecto para ${projectName}?`)) return;

    setBusyId(brief.id);
    const err = await insertProject({
      name: projectName,
      client: clean(brief.contact_name) || null,
      type: brief.page_type || 'App Web Personalizada',
      status: 'espera',
      price: 0,
      currency: 'MXN',
      url: null,
      started_at: null,
      delivered_at: null,
      notes: briefToMarkdown(brief),
    });

    if (!err) {
      await update(brief.id, { status: 'revisado' });
      setOpen(null);
    } else {
      window.alert(`No se pudo crear el proyecto: ${err.message}`);
    }
    setBusyId('');
  };

  return (
    <div>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-condensed text-3xl font-black uppercase leading-none text-ink">Cuestionarios</h1>
          <p className="mt-1 text-sm text-ink/[0.55]">{rows.length} recibidos · llegan desde freewillstudiotech.com/cuestionario</p>
        </div>
        {rows.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <button onClick={() => downloadBriefsCsv(rows)} className="inline-flex items-center gap-2 border border-ink bg-ink px-3 py-2 font-condensed text-xs font-black uppercase tracking-[0.12em] text-paper hover:bg-gold hover:text-white">
              <Download size={15} /> CSV
            </button>
            <button onClick={() => downloadBriefsJson(rows)} className="inline-flex items-center gap-2 border border-ink/[0.25] bg-white px-3 py-2 font-condensed text-xs font-black uppercase tracking-[0.12em] text-ink hover:border-gold hover:text-gold">
              <FileJson size={15} /> JSON
            </button>
            <button onClick={() => downloadBriefsZip(rows)} className="inline-flex items-center gap-2 border border-ink/[0.25] bg-white px-3 py-2 font-condensed text-xs font-black uppercase tracking-[0.12em] text-ink hover:border-gold hover:text-gold">
              <Archive size={15} /> ZIP
            </button>
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center py-16 text-ink/[0.4]"><Loader2 className="animate-spin" /></div>
      ) : rows.length === 0 ? (
        <p className="border border-dashed border-ink/[0.25] bg-white p-8 text-center text-sm text-ink/[0.5]">Aún no hay cuestionarios. Comparte el link /cuestionario con tus prospectos.</p>
      ) : (
        <div className="overflow-x-auto border border-ink/[0.12] bg-white">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-ink/[0.12] text-left font-condensed text-xs font-black uppercase tracking-[0.12em] text-ink/[0.5]">
                <th className="p-3">Negocio</th><th className="p-3">Tipo</th><th className="p-3">Presupuesto</th><th className="p-3">Estado</th><th className="p-3">Fecha</th><th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((b) => (
                <tr key={b.id} className="border-b border-ink/[0.07] last:border-0 hover:bg-paper">
                  <td className="p-3 font-semibold">{b.business}<div className="text-xs font-normal text-ink/[0.45]">{b.contact_name}</div></td>
                  <td className="p-3 text-ink/[0.7]">{b.page_type}</td>
                  <td className="p-3 text-ink/[0.7]">{b.budget || '—'}</td>
                  <td className="p-3">
                    <select value={b.status} onChange={(e) => update(b.id, { status: e.target.value })} className="border border-ink/[0.25] bg-white px-2 py-1 text-xs">
                      {Object.entries(BRIEF_STATUS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                    </select>
                  </td>
                  <td className="p-3 tabular-nums text-ink/[0.6]">{new Date(b.created_at).toLocaleDateString('es-MX')}</td>
                  <td className="p-3">
                    <div className="flex justify-end gap-1">
                      <button onClick={() => setOpen(b)} className="p-1.5 text-ink/[0.55] hover:text-gold" title="Ver"><ChevronDown size={16} /></button>
                      <button onClick={() => downloadBriefMarkdown(b)} className="p-1.5 text-ink/[0.55] hover:text-gold" title="Descargar brief"><Download size={15} /></button>
                      <button onClick={() => generateProposalFromBrief(b)} className="p-1.5 text-ink/[0.55] hover:text-gold" title="Generar propuesta"><FileText size={15} /></button>
                      <button onClick={() => generateClientKitFromBrief(b)} className="p-1.5 text-ink/[0.55] hover:text-gold" title="Kit inicial de app"><Package size={15} /></button>
                      <button onClick={() => createProjectFromBrief(b)} disabled={busyId === b.id} className="p-1.5 text-ink/[0.55] hover:text-gold disabled:opacity-40" title="Crear proyecto"><FolderPlus size={15} /></button>
                      {b.whatsapp && <a href={`https://wa.me/${b.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="p-1.5 text-ink/[0.55] hover:text-green-600"><MessageCircle size={15} /></a>}
                      <button onClick={() => window.confirm('¿Eliminar este cuestionario?') && remove(b.id)} className="p-1.5 text-ink/[0.55] hover:text-red-600"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {open && (
        <Modal title={open.business || 'Cuestionario'} onClose={() => setOpen(null)}>
          <div className="mb-3"><Badge map={BRIEF_STATUS} value={open.status} /></div>
          <Detail brief={open} />
          <div className="mt-5 flex flex-wrap gap-2">
            <button onClick={() => downloadBriefMarkdown(open)} className="inline-flex items-center gap-2 border border-ink bg-ink px-4 py-2.5 font-condensed text-sm font-black uppercase tracking-[0.12em] text-paper hover:bg-gold hover:text-white">
              <Download size={16} /> Descargar brief
            </button>
            <button onClick={() => generateProposalFromBrief(open)} className="inline-flex items-center gap-2 border border-ink/[0.25] bg-white px-4 py-2.5 font-condensed text-sm font-black uppercase tracking-[0.12em] text-ink hover:border-gold hover:text-gold">
              <FileText size={16} /> Propuesta
            </button>
            <button onClick={() => generateClientKitFromBrief(open)} className="inline-flex items-center gap-2 border border-ink/[0.25] bg-white px-4 py-2.5 font-condensed text-sm font-black uppercase tracking-[0.12em] text-ink hover:border-gold hover:text-gold">
              <Package size={16} /> Kit app
            </button>
            <button onClick={() => createProjectFromBrief(open)} disabled={busyId === open.id} className="inline-flex items-center gap-2 border border-ink/[0.25] bg-white px-4 py-2.5 font-condensed text-sm font-black uppercase tracking-[0.12em] text-ink hover:border-gold hover:text-gold disabled:opacity-40">
              {busyId === open.id ? <Loader2 size={16} className="animate-spin" /> : <FolderPlus size={16} />} Crear proyecto
            </button>
            {open.whatsapp && (
              <a href={`https://wa.me/${open.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-ink/[0.25] bg-white px-4 py-2.5 font-condensed text-sm font-black uppercase tracking-[0.12em] text-ink hover:border-gold hover:text-gold">
                <MessageCircle size={16} /> Contactar
              </a>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}
