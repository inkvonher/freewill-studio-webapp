import { supabase, supabaseReady } from './supabase.js';

let sent = false;

// Registra una visita en Supabase (una sola vez por carga). Silencioso si falla.
export function trackPageview() {
  if (!supabaseReady || sent) return;

  // Evitar registrar visitas de bots/rastreadores comunes
  const isBot =
    /bot|googlebot|crawler|spider|robot|crawling|lighthouse/i.test(navigator.userAgent) ||
    navigator.webdriver;
  if (isBot) return;

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
