import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Cliente único de Supabase. Las claves se leen de variables de entorno (.env).
export const supabase = url && anonKey ? createClient(url, anonKey) : null;

// true si el proyecto ya tiene configuradas las credenciales.
export const supabaseReady = Boolean(supabase);
