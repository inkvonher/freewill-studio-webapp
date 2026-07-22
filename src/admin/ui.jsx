import { useEffect, useState, useRef } from 'react';
import { X } from 'lucide-react';

export const money = (n, currency = 'MXN') =>
  new Intl.NumberFormat('es-MX', { style: 'currency', currency, maximumFractionDigits: 0 }).format(Number(n) || 0);

export const PROJECT_STATUS = {
  espera: { label: 'En espera', color: '#9a8a55', bg: '#f3eede' },
  proceso: { label: 'En proceso', color: '#b87905', bg: '#faf0d9' },
  entregado: { label: 'Entregado', color: '#1d7d54', bg: '#e2f3ea' },
};

export const LEAD_STATUS = {
  pendiente: { label: 'Pendiente', color: '#6b6b6b', bg: '#eeeeea' },
  enviado: { label: 'Enviado', color: '#185fa5', bg: '#e6f1fb' },
  respondio: { label: 'Respondió', color: '#b87905', bg: '#faf0d9' },
  negociacion: { label: 'En negociación', color: '#7a4ab7', bg: '#efeafe' },
  cliente: { label: 'Cliente', color: '#1d7d54', bg: '#e2f3ea' },
  no: { label: 'No interesado', color: '#a32d2d', bg: '#fcebeb' },
};

export function Badge({ map, value }) {
  const s = map[value] || { label: value, color: '#444', bg: '#eee' };
  return (
    <span className="inline-block whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold" style={{ color: s.color, background: s.bg }}>
      {s.label}
    </span>
  );
}

export function Card({ children, className = '' }) {
  return <div className={`border border-ink/[0.12] bg-white p-5 ${className}`}>{children}</div>;
}

export function Stat({ label, value, sub, accent }) {
  return (
    <div className="border border-ink/[0.12] bg-white p-5">
      <p className="font-condensed text-xs font-black uppercase tracking-[0.16em] text-ink/[0.5]">{label}</p>
      <p className="mt-2 font-condensed text-4xl font-black leading-none text-ink" style={accent ? { color: '#b87905' } : undefined}>
        {value}
      </p>
      {sub && <p className="mt-1 text-xs text-ink/[0.5]">{sub}</p>}
    </div>
  );
}

export function Modal({ title, onClose, children, className = 'max-w-lg' }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink/[0.6]" onClick={onClose} aria-hidden="true" />
      <div className={`relative max-h-[88vh] w-full overflow-y-auto border border-ink bg-paper ${className}`}>
        <div className="flex items-center justify-between border-b border-ink bg-white px-5 py-4">
          <h3 className="font-condensed text-xl font-black uppercase leading-none text-ink">{title}</h3>
          <button onClick={onClose} className="flex h-9 w-9 items-center justify-center border border-ink hover:bg-gold hover:text-white" aria-label="Cerrar">
            <X size={16} />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

export function Field({ label, children }) {
  return (
    <label className="grid gap-1.5">
      <span className="font-condensed text-xs font-black uppercase tracking-[0.14em] text-ink/[0.55]">{label}</span>
      {children}
    </label>
  );
}

export const inputCls = 'w-full border border-ink/[0.4] bg-white px-3 py-2 text-sm outline-none focus:border-gold';

// ---- Gráfica de barras SVG ----
export function BarChart({ data, height = 180, color = '#b87905', prefix = '', suffix = '' }) {
  const [hovered, setHovered] = useState(null);
  const max = Math.max(1, ...data.map((d) => d.value));
  const bw = 100 / (data.length || 1);
  const containerRef = useRef(null);

  const handleMouseMove = (e, d, i, h) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((i * bw + bw * 0.5) / 100) * rect.width;
    const y = ((height / 2 - 8 - h) / (height / 2)) * rect.height - 10;
    setHovered({ label: d.label, value: d.value, x, y });
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <svg viewBox={`0 0 100 ${height / 2}`} preserveAspectRatio="none" className="w-full" style={{ height }}>
        {/* Líneas de cuadrícula sutiles */}
        <line x1="0" y1={height / 2 - 8} x2="100" y2={height / 2 - 8} stroke="rgba(17,17,17,0.12)" strokeWidth="0.25" />
        <line x1="0" y1={(height / 2 - 8) * 0.5} x2="100" y2={(height / 2 - 8) * 0.5} stroke="rgba(17,17,17,0.06)" strokeWidth="0.25" strokeDasharray="1 1" />

        {data.map((d, i) => {
          const h = (d.value / max) * (height / 2 - 14);
          const barHeight = Math.max(h, 0.4);
          const xPos = i * bw + bw * 0.18;
          const yPos = height / 2 - 8 - h;

          return (
            <g key={d.label + i}>
              {/* Zona interactiva transparente */}
              <rect
                x={i * bw}
                y={0}
                width={bw}
                height={height / 2}
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={(e) => handleMouseMove(e, d, i, h)}
                onMouseMove={(e) => handleMouseMove(e, d, i, h)}
                onMouseLeave={() => setHovered(null)}
              />
              {/* Barra de color real */}
              <rect
                x={xPos}
                y={yPos}
                width={bw * 0.64}
                height={barHeight}
                fill={hovered?.label === d.label ? '#111111' : color}
                rx="0.6"
                className="pointer-events-none transition-colors duration-150"
              />
            </g>
          );
        })}
      </svg>

      {/* Tooltip flotante */}
      {hovered && (
        <div
          className="absolute pointer-events-none z-20 border border-ink bg-white px-2 py-1 shadow-ink font-condensed text-[10px] font-black uppercase tracking-wider text-ink -translate-x-1/2 -translate-y-full transition-all duration-75"
          style={{ left: hovered.x, top: hovered.y }}
        >
          <div className="text-gold">{hovered.label}</div>
          <div className="font-semibold text-xs mt-0.5">{prefix}{hovered.value.toLocaleString()}{suffix}</div>
        </div>
      )}
    </div>
  );
}

export function BarLabels({ data }) {
  return (
    <div className="mt-1 flex w-full">
      {data.map((d, i) => (
        <span key={d.label + i} className="flex-1 text-center text-[10px] text-ink/[0.5]">{d.label}</span>
      ))}
    </div>
  );
}

// ---- Gráfica de línea SVG ----
export function LineChart({ data, height = 200, color = '#111111', area = '#b8790522', prefix = '', suffix = '' }) {
  const [hovered, setHovered] = useState(null);
  const max = Math.max(1, ...data.map((d) => d.value));
  const n = data.length;
  const pts = data.map((d, i) => [n <= 1 ? 0 : (i / (n - 1)) * 100, 50 - (d.value / max) * 44]);
  const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(' ');
  const fill = `M0,50 ${pts.map((p) => `L${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(' ')} L100,50 Z`;

  const containerRef = useRef(null);

  const handleMouseMove = (e, d, i, p) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (p[0] / 100) * rect.width;
    const y = (p[1] / 50) * rect.height - 10;
    setHovered({ label: d.label, value: d.value, x, y });
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="w-full" style={{ height }}>
        {/* Líneas de cuadrícula sutiles */}
        <line x1="0" y1={50} x2="100" y2={50} stroke="rgba(17,17,17,0.12)" strokeWidth="0.25" />
        <line x1="0" y1={28} x2="100" y2={28} stroke="rgba(17,17,17,0.06)" strokeWidth="0.25" strokeDasharray="1 1" />
        <line x1="0" y1={6} x2="100" y2={6} stroke="rgba(17,17,17,0.06)" strokeWidth="0.25" strokeDasharray="1 1" />

        <path d={fill} fill={area} />
        <path d={line} fill="none" stroke={color} strokeWidth="0.8" vectorEffect="non-scaling-stroke" />

        {/* Círculos / zonas interactivas */}
        {pts.map((p, i) => {
          const d = data[i];
          return (
            <g key={d.label + i}>
              {/* Círculo indicador en hover */}
              {hovered?.label === d.label && (
                <circle
                  cx={p[0]}
                  cy={p[1]}
                  r="1.2"
                  fill="#b87905"
                  stroke="#111111"
                  strokeWidth="0.3"
                />
              )}
              {/* Zona de hover invisible */}
              <circle
                cx={p[0]}
                cy={p[1]}
                r="6"
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={(e) => handleMouseMove(e, d, i, p)}
                onMouseMove={(e) => handleMouseMove(e, d, i, p)}
                onMouseLeave={() => setHovered(null)}
              />
            </g>
          );
        })}
      </svg>

      {/* Tooltip flotante */}
      {hovered && (
        <div
          className="absolute pointer-events-none z-20 border border-ink bg-white px-2 py-1 shadow-ink font-condensed text-[10px] font-black uppercase tracking-wider text-ink -translate-x-1/2 -translate-y-full transition-all duration-75"
          style={{ left: hovered.x, top: hovered.y }}
        >
          <div className="text-gold">{hovered.label}</div>
          <div className="font-semibold text-xs mt-0.5">{prefix}{hovered.value.toLocaleString()}{suffix}</div>
        </div>
      )}
    </div>
  );
}

// ---- Componente de Notificación Flotante (Toast) ----
export function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3600);
    return () => clearTimeout(timer);
  }, [onClose]);

  const isError = type === 'error';
  const borderCol = isError ? 'border-red-500' : 'border-gold';
  const bgCol = isError ? 'bg-red-50' : 'bg-white';
  const textCol = isError ? 'text-red-950' : 'text-ink';

  return (
    <div className={`fixed bottom-5 right-5 z-[100] flex items-center justify-between gap-5 border border-ink p-4 shadow-ink min-w-[260px] max-w-sm ${bgCol} ${borderCol} ${textCol} transition duration-300`}>
      <span className="font-condensed text-xs font-black uppercase tracking-[0.14em]">{message}</span>
      <button onClick={onClose} className="text-ink/[0.45] hover:text-gold text-sm font-black uppercase" aria-label="Cerrar notificación">×</button>
    </div>
  );
}
