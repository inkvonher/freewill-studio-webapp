import { useEffect, useMemo, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { supabase, supabaseReady } from '../../lib/supabase.js';
import { Stat, Card, BarChart, BarLabels } from '../ui.jsx';

const DAYS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

export default function Analytics() {
  const [views, setViews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabaseReady) { setLoading(false); return; }
    const since = new Date(Date.now() - 30 * 864e5).toISOString();
    supabase.from('pageviews').select('*').gte('created_at', since).order('created_at', { ascending: false }).limit(5000)
      .then(({ data }) => { setViews(data || []); setLoading(false); });
  }, []);

  const total = views.length;
  const last7 = useMemo(() => views.filter((v) => new Date(v.created_at) >= new Date(Date.now() - 7 * 864e5)).length, [views]);

  const daily = useMemo(() => {
    const out = [];
    for (let i = 13; i >= 0; i -= 1) {
      const d = new Date(Date.now() - i * 864e5);
      const key = d.toISOString().slice(0, 10);
      const v = views.filter((x) => x.created_at.slice(0, 10) === key).length;
      out.push({ label: i % 2 === 0 ? `${d.getDate()}` : '', value: v });
    }
    return out;
  }, [views]);

  const topPaths = useMemo(() => {
    const m = {};
    views.forEach((v) => { const p = v.path || '/'; m[p] = (m[p] || 0) + 1; });
    return Object.entries(m).sort((a, b) => b[1] - a[1]).slice(0, 6);
  }, [views]);

  const topRef = useMemo(() => {
    const m = {};
    views.forEach((v) => {
      let r = v.referrer || 'Directo';
      try { if (r !== 'Directo') r = new URL(r).hostname.replace('www.', ''); } catch { /* noop */ }
      m[r] = (m[r] || 0) + 1;
    });
    return Object.entries(m).sort((a, b) => b[1] - a[1]).slice(0, 6);
  }, [views]);

  if (loading) return <div className="flex justify-center py-16 text-ink/[0.4]"><Loader2 className="animate-spin" /></div>;

  return (
    <div>
      <h1 className="mb-1 font-condensed text-3xl font-black uppercase leading-none text-ink">Analítica</h1>
      <p className="mb-5 text-sm text-ink/[0.55]">Visitas a freewillstudiotech.com · últimos 30 días</p>

      <div className="mb-5 grid gap-3 sm:grid-cols-3">
        <Stat label="Visitas (30 días)" value={total.toLocaleString('es-MX')} accent />
        <Stat label="Últimos 7 días" value={last7.toLocaleString('es-MX')} />
        <Stat label="Promedio diario" value={Math.round(total / 30).toLocaleString('es-MX')} />
      </div>

      <Card className="mb-5">
        <p className="mb-3 font-condensed text-sm font-black uppercase tracking-[0.14em] text-ink/[0.55]">Visitas por día · últimos 14 días</p>
        <BarChart data={daily} suffix=" visitas" />
        <BarLabels data={daily} />
      </Card>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <p className="mb-3 font-condensed text-sm font-black uppercase tracking-[0.14em] text-ink/[0.55]">Páginas más vistas</p>
          {topPaths.length === 0 ? <p className="text-sm text-ink/[0.45]">Sin datos aún.</p> : topPaths.map(([p, n]) => (
            <div key={p} className="flex items-center justify-between border-b border-ink/[0.07] py-2 text-sm last:border-0">
              <span className="truncate text-ink/[0.75]">{p}</span><span className="font-semibold tabular-nums">{n}</span>
            </div>
          ))}
        </Card>
        <Card>
          <p className="mb-3 font-condensed text-sm font-black uppercase tracking-[0.14em] text-ink/[0.55]">De dónde llegan</p>
          {topRef.length === 0 ? <p className="text-sm text-ink/[0.45]">Sin datos aún.</p> : topRef.map(([r, n]) => (
            <div key={r} className="flex items-center justify-between border-b border-ink/[0.07] py-2 text-sm last:border-0">
              <span className="truncate text-ink/[0.75]">{r}</span><span className="font-semibold tabular-nums">{n}</span>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
