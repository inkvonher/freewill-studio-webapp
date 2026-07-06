import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAuth } from './AuthContext.jsx';
import { supabaseReady } from '../lib/supabase.js';
import logoOjo from '../assets/logo-ojo.png';

export default function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (!supabaseReady) {
      setError('Falta configurar Supabase (.env). Revisa el archivo .env.example.');
      return;
    }
    setBusy(true);
    const { error: err } = await signIn(email.trim(), password);
    setBusy(false);
    if (err) {
      setError('Correo o contraseña incorrectos.');
      return;
    }
    navigate('/admin');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-4">
      <div className="w-full max-w-sm border border-gold/[0.4] bg-paper p-8 shadow-2xl">
        <div className="mb-6 flex items-center gap-3">
          <img src={logoOjo} alt="FREEWILL.STUDIO" className="h-12 w-12 object-contain" />
          <div>
            <p className="font-condensed text-xs font-black uppercase tracking-[0.2em] text-gold">FREEWILL.STUDIO</p>
            <h1 className="font-condensed text-2xl font-black uppercase leading-none text-ink">Panel privado</h1>
          </div>
        </div>

        <form onSubmit={submit} className="grid gap-4">
          <label className="grid gap-1.5">
            <span className="font-condensed text-xs font-black uppercase tracking-[0.16em] text-ink/[0.6]">Correo</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-ink/[0.5] bg-white px-3 py-2.5 text-sm outline-none focus:border-gold"
              placeholder="tu@correo.com"
            />
          </label>
          <label className="grid gap-1.5">
            <span className="font-condensed text-xs font-black uppercase tracking-[0.16em] text-ink/[0.6]">Contraseña</span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-ink/[0.5] bg-white px-3 py-2.5 text-sm outline-none focus:border-gold"
              placeholder="••••••••"
            />
          </label>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={busy}
            className="mt-1 inline-flex items-center justify-center gap-2 border border-ink bg-ink px-4 py-3 font-condensed text-sm font-black uppercase tracking-[0.14em] text-paper transition hover:bg-gold hover:text-white disabled:opacity-60"
          >
            {busy ? <Loader2 size={16} className="animate-spin" /> : null}
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
