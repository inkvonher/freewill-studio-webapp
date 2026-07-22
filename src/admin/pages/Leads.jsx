import { useState } from 'react';
import { Plus, Pencil, Trash2, MessageCircle, FolderPlus, Loader2 } from 'lucide-react';
import useCollection from '../useCollection.js';
import { Badge, Field, Modal, LEAD_STATUS, inputCls } from '../ui.jsx';
import { useAuth } from '../AuthContext.jsx';

const TYPES = ['Barbería', 'Estudio de tatuajes', 'Otro'];
const empty = { business: '', type: TYPES[0], phone: '', instagram: '', status: 'pendiente', last_contact: '', notes: '' };

export default function Leads() {
  const { rows, loading, insert, update, remove } = useCollection('leads');
  const { insert: insertProject } = useCollection('projects');
  const { showToast } = useAuth();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const [busy, setBusy] = useState(false);
  const [busyId, setBusyId] = useState('');

  const createProjectFromLead = async (lead) => {
    const projectName = lead.business || 'Proyecto nuevo';
    if (!window.confirm(`¿Crear proyecto en espera para el prospecto "${projectName}"?`)) return;

    setBusyId(lead.id);
    const err = await insertProject({
      name: projectName,
      client: lead.business,
      type: 'App Web Personalizada',
      status: 'espera',
      price: 0,
      currency: 'MXN',
      url: null,
      started_at: null,
      delivered_at: null,
      notes: lead.notes ? `Creado desde prospecto.\nNotas anteriores:\n${lead.notes}` : 'Creado desde prospecto.',
    });

    if (!err) {
      await update(lead.id, { status: 'cliente' });
      showToast('¡Proyecto creado con éxito! Estado de prospecto actualizado.');
    } else {
      showToast(`No se pudo crear el proyecto: ${err.message}`, 'error');
    }
    setBusyId('');
  };

  const openNew = () => { setForm(empty); setEditing(null); setOpen(true); };
  const openEdit = (l) => { setForm({ ...empty, ...l, last_contact: l.last_contact || '' }); setEditing(l.id); setOpen(true); };
  const change = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const save = async (e) => {
    e.preventDefault();
    setBusy(true);
    const payload = { business: form.business, type: form.type, phone: form.phone || null, instagram: form.instagram || null, status: form.status, last_contact: form.last_contact || null, notes: form.notes || null };
    
    let err;
    if (editing) {
      err = await update(editing, payload);
      if (!err) showToast('Prospecto actualizado con éxito.');
    } else {
      err = await insert(payload);
      if (!err) showToast('Prospecto creado con éxito.');
    }
    if (err) {
      showToast(`Error al guardar: ${err.message}`, 'error');
    }
    setBusy(false); setOpen(false);
  };

  const waLink = (l) => {
    const msg = `Hola ${l.business} 👋 Soy Vony, de FREEWILL.STUDIO. Diseñamos páginas web y web apps que atraen clientes y automatizan reservas, pagos y WhatsApp. ¿Les comparto unos ejemplos? Sin compromiso 🙌`;
    return `https://wa.me/${(l.phone || '').replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="font-condensed text-3xl font-black uppercase leading-none text-ink">Prospectos</h1>
          <p className="mt-1 text-sm text-ink/[0.55]">{rows.length} contactos · pipeline de ventas</p>
        </div>
        <button onClick={openNew} className="inline-flex items-center gap-2 border border-ink bg-ink px-4 py-2.5 font-condensed text-sm font-black uppercase tracking-[0.12em] text-paper hover:bg-gold hover:text-white">
          <Plus size={16} /> Nuevo
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-16 text-ink/[0.4]"><Loader2 className="animate-spin" /></div>
      ) : rows.length === 0 ? (
        <p className="border border-dashed border-ink/[0.25] bg-white p-8 text-center text-sm text-ink/[0.5]">Aún no hay prospectos.</p>
      ) : (
        <div className="overflow-x-auto border border-ink/[0.12] bg-white">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-ink/[0.12] text-left font-condensed text-xs font-black uppercase tracking-[0.12em] text-ink/[0.5]">
                <th className="p-3">Negocio</th><th className="p-3">Tipo</th><th className="p-3">Teléfono</th><th className="p-3">Estado</th><th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((l) => (
                <tr key={l.id} className="border-b border-ink/[0.07] last:border-0 hover:bg-paper">
                  <td className="p-3 font-semibold">{l.business}<div className="text-xs font-normal text-ink/[0.45]">{l.instagram}</div></td>
                  <td className="p-3 text-ink/[0.7]">{l.type}</td>
                  <td className="p-3 tabular-nums text-ink/[0.7]">{l.phone || '—'}</td>
                  <td className="p-3"><Badge map={LEAD_STATUS} value={l.status} /></td>
                  <td className="p-3">
                    <div className="flex justify-end gap-1">
                      {l.phone && <a href={waLink(l)} target="_blank" rel="noreferrer" className="p-1.5 text-ink/[0.55] hover:text-green-600" title="WhatsApp"><MessageCircle size={15} /></a>}
                      {l.status !== 'cliente' && (
                        <button
                          onClick={() => createProjectFromLead(l)}
                          disabled={busyId === l.id}
                          className="p-1.5 text-ink/[0.55] hover:text-gold disabled:opacity-40"
                          title="Convertir en proyecto"
                        >
                          <FolderPlus size={15} />
                        </button>
                      )}
                      <button onClick={() => openEdit(l)} className="p-1.5 text-ink/[0.55] hover:text-gold"><Pencil size={15} /></button>
                      <button onClick={async () => { if (window.confirm('¿Eliminar este prospecto?')) { const err = await remove(l.id); if (!err) showToast('Prospecto eliminado.'); else showToast(err.message, 'error'); } }} className="p-1.5 text-ink/[0.55] hover:text-red-600"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {open && (
        <Modal title={editing ? 'Editar prospecto' : 'Nuevo prospecto'} onClose={() => setOpen(false)}>
          <form onSubmit={save} className="grid gap-3 sm:grid-cols-2">
            <Field label="Negocio"><input required name="business" value={form.business} onChange={change} className={inputCls} /></Field>
            <Field label="Tipo"><select name="type" value={form.type} onChange={change} className={inputCls}>{TYPES.map((t) => <option key={t}>{t}</option>)}</select></Field>
            <Field label="Teléfono (52 + 10 díg.)"><input name="phone" value={form.phone} onChange={change} placeholder="52984..." className={inputCls} /></Field>
            <Field label="Instagram"><input name="instagram" value={form.instagram} onChange={change} placeholder="@" className={inputCls} /></Field>
            <Field label="Estado"><select name="status" value={form.status} onChange={change} className={inputCls}>{Object.entries(LEAD_STATUS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}</select></Field>
            <Field label="Último contacto"><input type="date" name="last_contact" value={form.last_contact} onChange={change} className={inputCls} /></Field>
            <div className="sm:col-span-2"><Field label="Notas"><textarea name="notes" rows="2" value={form.notes} onChange={change} className={inputCls} /></Field></div>
            <button type="submit" disabled={busy} className="sm:col-span-2 mt-1 inline-flex items-center justify-center gap-2 border border-ink bg-ink px-4 py-3 font-condensed text-sm font-black uppercase tracking-[0.14em] text-paper hover:bg-gold hover:text-white disabled:opacity-60">
              {busy && <Loader2 size={15} className="animate-spin" />} Guardar
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
}
