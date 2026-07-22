import { useMemo, useState } from 'react';
import { Plus, Trash2, Loader2 } from 'lucide-react';
import useCollection from '../useCollection.js';
import { Field, Modal, Stat, Card, LineChart, inputCls, money } from '../ui.jsx';
import { useAuth } from '../AuthContext.jsx';

const empty = { concept: '', amount: '', currency: 'MXN', paid_at: new Date().toISOString().slice(0, 10), project_id: '' };
const MONTHS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

export default function Finance() {
  const { rows, loading, insert, remove } = useCollection('payments', { column: 'paid_at', ascending: false });
  const { rows: projects } = useCollection('projects');
  const { showToast } = useAuth();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(empty);
  const [busy, setBusy] = useState(false);
  const [filterProjectId, setFilterProjectId] = useState('');

  const projectMap = useMemo(() => new Map(projects.map((p) => [p.id, p])), [projects]);

  const filteredRows = useMemo(() => {
    if (!filterProjectId) return rows;
    return rows.filter((r) => r.project_id === filterProjectId);
  }, [rows, filterProjectId]);

  const change = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const save = async (e) => {
    e.preventDefault();
    setBusy(true);
    const err = await insert({ concept: form.concept || null, amount: Number(form.amount) || 0, currency: form.currency, paid_at: form.paid_at, project_id: form.project_id || null });
    if (!err) {
      showToast('Pago registrado con éxito.');
    } else {
      showToast(`Error al registrar pago: ${err.message}`, 'error');
    }
    setBusy(false); setOpen(false); setForm(empty);
  };

  const total = useMemo(() => rows.reduce((s, r) => s + (Number(r.amount) || 0), 0), [rows]);
  const thisMonth = useMemo(() => {
    const now = new Date();
    return rows.filter((r) => { const d = new Date(r.paid_at); return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear(); })
      .reduce((s, r) => s + (Number(r.amount) || 0), 0);
  }, [rows]);
  const pipeline = useMemo(() => projects.filter((p) => p.status !== 'entregado').reduce((s, p) => s + (Number(p.price) || 0), 0), [projects]);

  const chart = useMemo(() => {
    const now = new Date();
    const out = [];
    for (let i = 5; i >= 0; i -= 1) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const v = rows.filter((r) => { const rd = new Date(r.paid_at); return rd.getMonth() === d.getMonth() && rd.getFullYear() === d.getFullYear(); })
        .reduce((s, r) => s + (Number(r.amount) || 0), 0);
      out.push({ label: MONTHS[d.getMonth()], value: v });
    }
    return out;
  }, [rows]);

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h1 className="font-condensed text-3xl font-black uppercase leading-none text-ink">Finanzas</h1>
        <button onClick={() => setOpen(true)} className="inline-flex items-center gap-2 border border-ink bg-ink px-4 py-2.5 font-condensed text-sm font-black uppercase tracking-[0.12em] text-paper hover:bg-gold hover:text-white">
          <Plus size={16} /> Registrar pago
        </button>
      </div>

      <div className="mb-5 grid gap-3 sm:grid-cols-3">
        <Stat label="Total cobrado" value={money(total)} accent />
        <Stat label="Este mes" value={money(thisMonth)} />
        <Stat label="Pipeline (por cerrar)" value={money(pipeline)} sub="Proyectos no entregados" />
      </div>

      <Card className="mb-5">
        <p className="mb-3 font-condensed text-sm font-black uppercase tracking-[0.14em] text-ink/[0.55]">Ingresos · últimos 6 meses</p>
        <LineChart data={chart} prefix="$" suffix=" MXN" />
        <div className="mt-1 flex">{chart.map((c, i) => <span key={i} className="flex-1 text-center text-[10px] text-ink/[0.5]">{c.label}</span>)}</div>
      </Card>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-condensed text-sm font-black uppercase tracking-[0.14em] text-ink/[0.55]">Listado de cobros</p>
        {projects.length > 0 && (
          <label className="flex items-center gap-2 font-condensed text-xs font-black uppercase tracking-[0.12em] text-ink/[0.5]">
            Filtrar por proyecto:
            <select
              value={filterProjectId}
              onChange={(e) => setFilterProjectId(e.target.value)}
              className="border border-ink/[0.25] bg-white px-2 py-1 text-xs outline-none focus:border-gold"
            >
              <option value="">Todos</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </label>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center py-10 text-ink/[0.4]"><Loader2 className="animate-spin" /></div>
      ) : filteredRows.length === 0 ? (
        <p className="border border-dashed border-ink/[0.25] bg-white p-8 text-center text-sm text-ink/[0.5]">
          {rows.length === 0 ? 'Aún no hay pagos registrados.' : 'No hay pagos registrados para este proyecto.'}
        </p>
      ) : (
        <div className="overflow-x-auto border border-ink/[0.12] bg-white">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="border-b border-ink/[0.12] text-left font-condensed text-xs font-black uppercase tracking-[0.12em] text-ink/[0.5]">
                <th className="p-3">Fecha</th><th className="p-3">Concepto / Proyecto</th><th className="p-3 text-right">Monto</th><th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((r) => {
                const p = projectMap.get(r.project_id);
                return (
                  <tr key={r.id} className="border-b border-ink/[0.07] last:border-0 hover:bg-paper">
                    <td className="p-3 tabular-nums text-ink/[0.7]">{r.paid_at}</td>
                    <td className="p-3">
                      <span className="font-semibold text-ink">{r.concept || '—'}</span>
                      {p && (
                        <div className="text-xs font-normal text-gold mt-0.5">
                          {p.name}
                        </div>
                      )}
                    </td>
                    <td className="p-3 text-right font-semibold tabular-nums">{money(r.amount, r.currency)}</td>
                    <td className="p-3 text-right">
                      <button onClick={async () => { if (window.confirm('¿Eliminar pago?')) { const err = await remove(r.id); if (!err) showToast('Pago eliminado.'); else showToast(err.message, 'error'); } }} className="p-1.5 text-ink/[0.55] hover:text-red-600">
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {open && (
        <Modal title="Registrar pago" onClose={() => setOpen(false)}>
          <form onSubmit={save} className="grid gap-3 sm:grid-cols-2">
            <div className="sm:col-span-2"><Field label="Concepto"><input name="concept" value={form.concept} onChange={change} placeholder="Anticipo, entrega final…" className={inputCls} /></Field></div>
            <Field label="Monto"><input required type="number" name="amount" value={form.amount} onChange={change} className={inputCls} /></Field>
            <Field label="Moneda"><select name="currency" value={form.currency} onChange={change} className={inputCls}><option>MXN</option><option>USD</option></select></Field>
            <Field label="Fecha"><input type="date" name="paid_at" value={form.paid_at} onChange={change} className={inputCls} /></Field>
            <Field label="Proyecto (opcional)">
              <select name="project_id" value={form.project_id} onChange={change} className={inputCls}>
                <option value="">—</option>
                {projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </Field>
            <button type="submit" disabled={busy} className="sm:col-span-2 mt-1 inline-flex items-center justify-center gap-2 border border-ink bg-ink px-4 py-3 font-condensed text-sm font-black uppercase tracking-[0.14em] text-paper hover:bg-gold hover:text-white disabled:opacity-60">
              {busy && <Loader2 size={15} className="animate-spin" />} Guardar
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
}
