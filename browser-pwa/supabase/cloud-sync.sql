-- Rozvrh+ – cloudová synchronizace uživatelských dat
-- Spusť celý soubor jednou v Supabase Dashboard → SQL Editor.

create table if not exists public.app_state (
  user_id uuid primary key references auth.users(id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.app_state enable row level security;

create or replace function public.set_app_state_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists app_state_updated_at on public.app_state;
create trigger app_state_updated_at
before insert or update on public.app_state
for each row execute procedure public.set_app_state_updated_at();

drop policy if exists "Uživatel čte vlastní data aplikace" on public.app_state;
create policy "Uživatel čte vlastní data aplikace"
on public.app_state for select
using (auth.uid() = user_id);

drop policy if exists "Uživatel vytvoří vlastní data aplikace" on public.app_state;
create policy "Uživatel vytvoří vlastní data aplikace"
on public.app_state for insert
with check (auth.uid() = user_id);

drop policy if exists "Uživatel upraví vlastní data aplikace" on public.app_state;
create policy "Uživatel upraví vlastní data aplikace"
on public.app_state for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Uživatel smaže vlastní data aplikace" on public.app_state;
create policy "Uživatel smaže vlastní data aplikace"
on public.app_state for delete
using (auth.uid() = user_id);

grant select, insert, update, delete on public.app_state to authenticated;
