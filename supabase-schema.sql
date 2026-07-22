-- ============================================================
-- FREEWILL.STUDIO · Esquema del Dashboard
-- Pégalo en Supabase → SQL Editor → New query → Run.
-- ============================================================

-- ---------- PROYECTOS ----------
create table if not exists public.projects (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  client      text,
  type        text,                         -- Landing, Web Profesional, Web App, Ecommerce, etc.
  status      text not null default 'espera', -- espera | proceso | entregado
  price       numeric default 0,
  currency    text default 'MXN',
  url         text,
  notes       text,
  started_at  date,
  delivered_at date,
  created_at  timestamptz default now()
);

-- ---------- PROSPECTOS / LEADS ----------
create table if not exists public.leads (
  id           uuid primary key default gen_random_uuid(),
  business     text not null,
  type         text,                          -- Barbería | Estudio de tatuajes | Otro
  phone        text,
  instagram    text,
  status       text not null default 'pendiente', -- pendiente | enviado | respondio | negociacion | cliente | no
  notes        text,
  last_contact date,
  created_at   timestamptz default now()
);

-- ---------- PAGOS (FINANZAS) ----------
create table if not exists public.payments (
  id          uuid primary key default gen_random_uuid(),
  project_id  uuid references public.projects(id) on delete set null,
  concept     text,
  amount      numeric not null default 0,
  currency    text default 'MXN',
  paid_at     date default now(),
  created_at  timestamptz default now()
);

-- ---------- VISITAS (ANALÍTICA) ----------
create table if not exists public.pageviews (
  id          bigint generated always as identity primary key,
  path        text,
  referrer    text,
  created_at  timestamptz default now()
);

-- ============================================================
-- SEGURIDAD (Row Level Security)
-- ============================================================
alter table public.projects  enable row level security;
alter table public.leads     enable row level security;
alter table public.payments  enable row level security;
alter table public.pageviews enable row level security;

-- Solo usuarios autenticados (tú) pueden leer/escribir el negocio.
create policy "auth full projects" on public.projects
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "auth full leads" on public.leads
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "auth full payments" on public.payments
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Las visitas: cualquiera (sitio público) puede INSERTAR; solo tú puedes LEER.
create policy "anyone insert pageviews" on public.pageviews
  for insert with check (true);
create policy "auth read pageviews" on public.pageviews
  for select using (auth.role() = 'authenticated');

-- ---------- ÍNDICES DE RENDIMIENTO ----------
create index if not exists idx_pageviews_created_at on public.pageviews(created_at desc);
create index if not exists idx_payments_paid_at on public.payments(paid_at desc);
create index if not exists idx_projects_status on public.projects(status);
create index if not exists idx_leads_status on public.leads(status);
