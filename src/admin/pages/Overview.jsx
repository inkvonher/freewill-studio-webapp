import { useMemo } from 'react';
import { FolderKanban, Users, Wallet, Eye } from 'lucide-react';
import useCollection from '../useCollection.js';
import { Card, Stat, Badge, PROJECT_STATUS, LEAD_STATUS, money } from '../ui.jsx';

export default function Overview() {
  const { rows: projects } = useCollection('projects');
  const { rows: leads } = useCollection('leads');
  const { rows: payments } = useCollection('payments', { column: 'paid_at', ascending: false });

  const byStatus = (s) => projects.filter((p) => p.status === s).length;
  const totalCobrado = useMemo(() => payments.reduce((s, r) => s + (Number(r.amount) || 0), 0), [payments]);
  const pipeline = useMemo(() => projects.filter((p) => p.status !== 'entregado').reduce((s, p) => s + (Number(p.price) || 0), 0), [projects]);
  const clientes = leads.filter((l) => l.status === 'cliente').length;

  const leadStatusCounts = Object.keys(LEAD_STATUS).map((k) => ({ k, n: leads.filter((l) => l.status === k).length }));
  const maxLead = Math.max(1, ...leadStatusCounts.map((x) => x.n));

  return (
    <div>
      <h1 className="mb-5 font-condensed text-3xl font-black uppercase leading-none text-ink">Resumen</h1>

      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Proyectos activos" value={byStatus('espera') + byStatus('proceso')} sub={`${byStatus('entregado')} entregados`} />
        <Stat label="Prospectos" value={leads.length} sub={`${clientes} convertidos`} />
        <Stat label="Total cobrado" value={money(totalCobrado)} accent />
        <Stat label="Pipeline" value={money(pipeline)} sub="Por cerrar" />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <p className="mb-4 font-condensed text-sm font-black uppercase tracking-[0.14em] text-ink/[0.55]">Proyectos por estado</p>
          <div className="grid grid-cols-3 gap-3">
            {Object.entries(PROJECT_STATUS).map(([k, v]) => (
              <div key={k} className="border border-ink/[0.1] p-4 text-center">
                <p className="font-condensed text-4xl font-black leading-none" style={{ color: v.color }}>{byStatus(k)}</p>
                <p className="mt-2 text-xs text-ink/[0.55]">{v.label}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <p className="mb-4 font-condensed text-sm font-black uppercase tracking-[0.14em] text-ink/[0.55]">Embudo de prospectos</p>
          <div className="grid gap-2">
            {leadStatusCounts.map(({ k, n }) => (
              <div key={k} className="flex items-center gap-3">
                <span className="w-28 shrink-0 text-xs text-ink/[0.6]">{LEAD_STATUS[k].label}</span>
                <div className="h-4 flex-1 bg-ink/[0.06]">
                  <div className="h-full" style={{ width: `${(n / maxLead) * 100}%`, background: LEAD_STATUS[k].color, minWidth: n ? '4px' : 0 }} />
                </div>
                <span className="w-6 text-right text-xs font-semibold tabular-nums">{n}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="mt-5">
        <p className="mb-3 font-condensed text-sm font-black uppercase tracking-[0.14em] text-ink/[0.55]">Proyectos recientes</p>
        {projects.length === 0 ? (
          <p className="text-sm text-ink/[0.45]">Aún no hay proyectos. Agrégalos en la sección Proyectos.</p>
        ) : (
          <div className="divide-y divide-ink/[0.07]">
            {projects.slice(0, 5).map((p) => (
              <div key={p.id} className="flex items-center justify-between py-2.5 text-sm">
                <span className="font-semibold">{p.name}<span className="ml-2 font-normal text-ink/[0.45]">{p.client}</span></span>
                <span className="flex items-center gap-3"><span className="tabular-nums text-ink/[0.6]">{money(p.price, p.currency)}</span><Badge map={PROJECT_STATUS} value={p.status} /></span>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
