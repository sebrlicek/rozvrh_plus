-- Rozvrh+ – oprava registrace uživatelů
-- Spusť tento skript v Supabase -> SQL Editor.
-- Řeší chybu: Database error saving new user.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  jmeno text,
  prijmeni text,
  prostredni_jmeno text,
  telefon text,
  datum_narozeni date,
  email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles add column if not exists jmeno text;
alter table public.profiles add column if not exists prijmeni text;
alter table public.profiles add column if not exists prostredni_jmeno text;
alter table public.profiles add column if not exists telefon text;
alter table public.profiles add column if not exists datum_narozeni date;
alter table public.profiles add column if not exists email text;
alter table public.profiles add column if not exists created_at timestamptz not null default now();
alter table public.profiles add column if not exists updated_at timestamptz not null default now();

-- Funkce běží jako vlastník databáze, takže vytvoření profilu při signup
-- nespadne na oprávnění role supabase_auth_admin.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (
    id,
    jmeno,
    prijmeni,
    prostredni_jmeno,
    telefon,
    datum_narozeni,
    email
  )
  values (
    new.id,
    nullif(new.raw_user_meta_data ->> 'jmeno', ''),
    nullif(new.raw_user_meta_data ->> 'prijmeni', ''),
    nullif(new.raw_user_meta_data ->> 'prostredni_jmeno', ''),
    nullif(new.raw_user_meta_data ->> 'telefon', ''),
    case
      when nullif(new.raw_user_meta_data ->> 'datum_narozeni', '') is null then null
      else (new.raw_user_meta_data ->> 'datum_narozeni')::date
    end,
    new.email
  )
  on conflict (id) do update set
    jmeno = excluded.jmeno,
    prijmeni = excluded.prijmeni,
    prostredni_jmeno = excluded.prostredni_jmeno,
    telefon = excluded.telefon,
    datum_narozeni = excluded.datum_narozeni,
    email = excluded.email,
    updated_at = now();

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
drop trigger if exists insert_profile_on_signup on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

alter table public.profiles enable row level security;

drop policy if exists "Uživatel může zobrazit svůj profil" on public.profiles;
drop policy if exists "Uživatel může upravit svůj profil" on public.profiles;
drop policy if exists "Uživatel může vytvořit svůj profil" on public.profiles;

create policy "Uživatel může zobrazit svůj profil"
  on public.profiles for select
  to authenticated
  using (auth.uid() = id);

create policy "Uživatel může upravit svůj profil"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "Uživatel může vytvořit svůj profil"
  on public.profiles for insert
  to authenticated
  with check (auth.uid() = id);
