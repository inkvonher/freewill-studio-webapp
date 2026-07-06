import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, Users, Wallet, BarChart3, ClipboardList, LogOut, ExternalLink } from 'lucide-react';
import { useAuth } from './AuthContext.jsx';
import logoOjo from '../assets/logo-ojo.png';

const nav = [
  ['/admin', 'Resumen', LayoutDashboard, true],
  ['/admin/proyectos', 'Proyectos', FolderKanban],
  ['/admin/prospectos', 'Prospectos', Users],
  ['/admin/cuestionarios', 'Cuestionarios', ClipboardList],
  ['/admin/finanzas', 'Finanzas', Wallet],
  ['/admin/analitica', 'Analítica', BarChart3],
];

export default function DashboardLayout() {
  const { signOut, session } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    await signOut();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-paper text-ink lg:flex">
      <aside className="flex flex-col border-b border-ink bg-ink text-paper lg:min-h-screen lg:w-60 lg:border-b-0 lg:border-r">
        <div className="px-5 py-5">
          <p className="font-condensed text-xs font-black uppercase tracking-[0.2em] text-gold">FREEWILL.STUDIO</p>
          <p className="font-condensed text-lg font-black uppercase leading-none">Panel</p>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:gap-0.5 lg:overflow-visible lg:pb-0">
          {nav.map(([to, label, Icon, end]) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 whitespace-nowrap px-4 py-2.5 font-condensed text-sm font-black uppercase tracking-[0.12em] transition ${
                  isActive ? 'bg-gold text-ink' : 'text-paper/[0.7] hover:bg-white/[0.08] hover:text-paper'
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden px-5 py-6 lg:block">
          <img src={logoOjo} alt="FREEWILL.STUDIO" className="w-full object-contain invert mix-blend-screen" />
        </div>
        <div className="mt-auto hidden gap-2 px-3 py-4 lg:grid">
          <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 text-xs text-paper/[0.6] hover:text-gold">
            <ExternalLink size={14} /> Ver sitio
          </a>
          <button onClick={logout} className="flex items-center gap-2 px-4 py-2 text-xs text-paper/[0.6] hover:text-gold">
            <LogOut size={14} /> Salir
          </button>
        </div>
      </aside>

      <main className="flex-1">
        <header className="flex items-center justify-between border-b border-ink/[0.12] bg-white px-5 py-3">
          <p className="text-sm text-ink/[0.55]">{session?.user?.email}</p>
          <button onClick={logout} className="flex items-center gap-2 text-sm text-ink/[0.6] hover:text-gold lg:hidden">
            <LogOut size={15} /> Salir
          </button>
        </header>
        <div className="p-5 lg:p-7">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
