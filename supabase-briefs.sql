-- ============================================================
-- FREEWILL.STUDIO · Tabla de Cuestionarios (briefs del sitio)
-- Pégalo en Supabase → SQL Editor → New query → Run.
-- ============================================================

create table if not exists public.briefs (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz default now(),
  status       text not null default 'nuevo',  -- nuevo | revisado | cotizado | archivado
  page_type    text,
  business     text,
  contact_name text,
  whatsapp     text,
  email        text,
  budget       text,
  data         jsonb            -- todas las respuestas (generales + específicas)
);

alter table public.briefs enable row level security;

-- Cualquiera (cliente en el sitio) puede ENVIAR el formulario.
create policy "anyone insert briefs" on public.briefs
  for insert with check (true);

-- Solo tú (autenticado) puedes leer, actualizar y borrar.
create policy "auth read briefs" on public.briefs
  for select using (auth.role() = 'authenticated');
create policy "auth update briefs" on public.briefs
  for update using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "auth delete briefs" on public.briefs
  for delete using (auth.role() = 'authenticated');

-- ---------- ÍNDICES DE RENDIMIENTO ----------
create index if not exists idx_briefs_status on public.briefs(status);
create index if not exists idx_briefs_created_at on public.briefs(created_at desc);
