import { useState } from 'react';
import { Archive, Download, FileJson, FileText, FolderPlus, Loader2, Package, Trash2, MessageCircle, UserPlus, ChevronDown } from 'lucide-react';
import useCollection from '../useCollection.js';
import { Badge, Modal } from '../ui.jsx';
import {
  BRIEF_STATUS,
  clean,
  questionRows,
  briefToMarkdown,
  proposalToHtml,
  downloadBriefMarkdown,
  downloadProposal,
  downloadClientKit,
  downloadBriefsCsv,
  downloadBriefsJson,
  downloadBriefsZip
} from '../utils/briefUtils.js';

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
  const { insert: insertLead } = useCollection('leads');
  const [open, setOpen] = useState(null);
  const [activeTab, setActiveTab] = useState('brief');
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

  const createLeadFromBrief = async (brief) => {
    const business = clean(brief.business) || clean(brief.contact_name) || 'Prospecto sin nombre';
    if (!window.confirm(`¿Crear prospecto para ${business}?`)) return;

    setBusyId(brief.id);
    const err = await insertLead({
      business,
      type: 'Otro',
      phone: clean(brief.whatsapp) || null,
      instagram: clean((brief.data || {}).instagram) || null,
      status: 'respondio',
      last_contact: new Date().toISOString().slice(0, 10),
      notes: [
        `Creado desde cuestionario: ${brief.page_type || 'Sin tipo'}`,
        '',
        briefToMarkdown(brief),
      ].join('\n'),
    });

    if (!err) {
      if (brief.status === 'nuevo') await update(brief.id, { status: 'revisado' });
      setOpen(null);
    } else {
      window.alert(`No se pudo crear el prospecto: ${err.message}`);
    }
    setBusyId('');
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
                      <button onClick={() => createLeadFromBrief(b)} disabled={busyId === b.id} className="p-1.5 text-ink/[0.55] hover:text-gold disabled:opacity-40" title="Crear prospecto"><UserPlus size={15} /></button>
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
        <Modal title={open.business || 'Cuestionario'} className="max-w-3xl" onClose={() => { setOpen(null); setActiveTab('brief'); }}>
          <div className="mb-3"><Badge map={BRIEF_STATUS} value={open.status} /></div>

          {/* Tabs para alternar entre respuestas y propuesta comercial en vivo */}
          <div className="mb-4 flex border-b border-ink/[0.12]">
            <button
              onClick={() => setActiveTab('brief')}
              className={`pb-2 pr-4 font-condensed text-sm font-black uppercase tracking-[0.12em] transition ${
                activeTab === 'brief' ? 'border-b-2 border-gold text-gold' : 'text-ink/[0.45] hover:text-ink'
              }`}
            >
              Respuestas
            </button>
            <button
              onClick={() => setActiveTab('proposal')}
              className={`pb-2 px-4 font-condensed text-sm font-black uppercase tracking-[0.12em] transition ${
                activeTab === 'proposal' ? 'border-b-2 border-gold text-gold' : 'text-ink/[0.45] hover:text-ink'
              }`}
            >
              Vista Previa Propuesta
            </button>
          </div>

          {activeTab === 'brief' ? (
            <Detail brief={open} />
          ) : (
            <div className="border border-ink bg-white p-1">
              <iframe
                title="Propuesta comercial"
                srcDoc={proposalToHtml(open)}
                className="w-full border-0"
                style={{ height: '480px' }}
              />
            </div>
          )}

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
            <button onClick={() => createLeadFromBrief(open)} disabled={busyId === open.id} className="inline-flex items-center gap-2 border border-ink/[0.25] bg-white px-4 py-2.5 font-condensed text-sm font-black uppercase tracking-[0.12em] text-ink hover:border-gold hover:text-gold disabled:opacity-40">
              {busyId === open.id ? <Loader2 size={16} className="animate-spin" /> : <UserPlus size={16} />} Crear prospecto
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
