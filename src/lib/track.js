import { supabase, supabaseReady } from './supabase.js';

let sent = false;

// Registra una visita en Supabase (una sola vez por carga). Silencioso si falla.
export function trackPageview() {
  if (!supabaseReady || sent) return;
  sent = true;
  try {
    supabase
      .from('pageviews')
      .insert({ path: window.location.pathname, referrer: document.referrer || null })
      .then(() => {})
      .catch(() => {});
  } catch {
    /* noop */
  }
}
