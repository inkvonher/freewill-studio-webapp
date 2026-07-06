import { useState } from 'react';
import { Plus, Pencil, Trash2, ExternalLink, Loader2 } from 'lucide-react';
import useCollection from '../useCollection.js';
import { Badge, Field, Modal, PROJECT_STATUS, inputCls, money } from '../ui.jsx';

const TYPES = ['Landing Page', 'Página Web Profesional', 'Web App con Reservas', 'Ecommerce', 'Sistema Interno', 'App Web Personalizada'];
const empty = { name: '', client: '', type: TYPES[0], status: 'espera', price: '', currency: 'MXN', url: '', started_at: '', delivered_at: '', notes: '' };

export default function Projects() {
  const { rows, loading, insert, update, remove } = useCollection('projects');
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const [busy, setBusy] = useState(false);

  const openNew = () => { setForm(empty); setEditing(null); setOpen(true); };
  const openEdit = (p) => {
    setForm({ ...empty, ...p, price: p.price ?? '', started_at: p.started_at || '', delivered_at: p.delivered_at || '' });
    setEditing(p.id); setOpen(true);
  };
  const change = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const save = async (e) => {
    e.preventDefault();
    setBusy(true);
    const payload = {
      name: form.name, client: form.client, type: form.type, status: form.status,
      price: form.price === '' ? 0 : Number(form.price), currency: form.currency, url: form.url || null,
      notes: form.notes || null, started_at: form.started_at || null, delivered_at: form.delivered_at || null,
    };
    if (editing) await update(editing, payload); else await insert(payload);
    setBusy(false); setOpen(false);
  };

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="font-condensed text-3xl font-black uppercase leading-none text-ink">Proyectos</h1>
          <p className="mt-1 text-sm text-ink/[0.55]">{rows.length} en total</p>
        </div>
        <button onClick={openNew} className="inline-flex items-center gap-2 border border-ink bg-ink px-4 py-2.5 font-condensed text-sm font-black uppercase tracking-[0.12em] text-paper hover:bg-gold hover:text-white">
          <Plus size={16} /> Nuevo
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-16 text-ink/[0.4]"><Loader2 className="animate-spin" /></div>
      ) : rows.length === 0 ? (
        <p className="border border-dashed border-ink/[0.25] bg-white p-8 text-center text-sm text-ink/[0.5]">Aún no hay proyectos. Crea el primero con “Nuevo”.</p>
      ) : (
        <div className="overflow-x-auto border border-ink/[0.12] bg-white">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="border-b border-ink/[0.12] text-left font-condensed text-xs font-black uppercase tracking-[0.12em] text-ink/[0.5]">
                <th className="p-3">Proyecto</th><th className="p-3">Cliente</th><th className="p-3">Tipo</th>
                <th className="p-3">Estado</th><th className="p-3 text-right">Precio</th><th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((p) => (
                <tr key={p.id} className="border-b border-ink/[0.07] last:border-0 hover:bg-paper">
                  <td className="p-3 font-semibold">
                    <span className="flex items-center gap-1.5">
                      {p.name}
                      {p.url && <a href={p.url} target="_blank" rel="noreferrer" className="text-gold"><ExternalLink size={13} /></a>}
                    </span>
                  </td>
                  <td className="p-3 text-ink/[0.7]">{p.client || '—'}</td>
                  <td className="p-3 text-ink/[0.7]">{p.type || '—'}</td>
                  <td className="p-3"><Badge map={PROJECT_STATUS} value={p.status} /></td>
                  <td className="p-3 text-right tabular-nums">{money(p.price, p.currency)}</td>
                  <td className="p-3">
                    <div className="flex justify-end gap-1">
                      <button onClick={() => openEdit(p)} className="p-1.5 text-ink/[0.55] hover:text-gold"><Pencil size={15} /></button>
                      <button onClick={() => window.confirm('¿Eliminar este proyecto?') && remove(p.id)} className="p-1.5 text-ink/[0.55] hover:text-red-600"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {open && (
        <Modal title={editing ? 'Editar proyecto' : 'Nuevo proyecto'} onClose={() => setOpen(false)}>
          <form onSubmit={save} className="grid gap-3 sm:grid-cols-2">
            <Field label="Nombre"><input required name="name" value={form.name} onChange={change} className={inputCls} /></Field>
            <Field label="Cliente"><input name="client" value={form.client} onChange={change} className={inputCls} /></Field>
            <Field label="Tipo">
              <select name="type" value={form.type} onChange={change} className={inputCls}>{TYPES.map((t) => <option key={t}>{t}</option>)}</select>
            </Field>
            <Field label="Estado">
              <select name="status" value={form.status} onChange={change} className={inputCls}>
                {Object.entries(PROJECT_STATUS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
              </select>
            </Field>
            <Field label="Precio"><input type="number" name="price" value={form.price} onChange={change} className={inputCls} /></Field>
            <Field label="Moneda">
              <select name="currency" value={form.currency} onChange={change} className={inputCls}><option>MXN</option><option>USD</option></select>
            </Field>
            <Field label="Inicio"><input type="date" name="started_at" value={form.started_at} onChange={change} className={inputCls} /></Field>
            <Field label="Entrega"><input type="date" name="delivered_at" value={form.delivered_at} onChange={change} className={inputCls} /></Field>
            <div className="sm:col-span-2"><Field label="URL"><input name="url" value={form.url} onChange={change} placeholder="https://" className={inputCls} /></Field></div>
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
