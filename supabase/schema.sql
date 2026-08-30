-- Rozvrh+ – Supabase databáze
-- Spusť celý tento soubor v Supabase SQL Editoru.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  jmeno text not null,
  prijmeni text not null,
  prostredni_jmeno text,
  telefon text unique not null,
  datum_narozeni date not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "Uživatel vidí svůj profil" on public.profiles;
create policy "Uživatel vidí svůj profil" on public.profiles for select using (auth.uid() = id);

drop policy if exists "Uživatel vytvoří svůj profil" on public.profiles;
create policy "Uživatel vytvoří svůj profil" on public.profiles for insert with check (auth.uid() = id);

drop policy if exists "Uživatel upraví svůj profil" on public.profiles;
create policy "Uživatel upraví svůj profil" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);

create or replace function public.find_email_by_phone(phone_input text)
returns text
language sql
security definer
set search_path = public
as $$
  select email from public.profiles where telefon = phone_input limit 1;
$$;

revoke all on function public.find_email_by_phone(text) from public;
grant execute on function public.find_email_by_phone(text) to anon, authenticated;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id,email,jmeno,prijmeni,prostredni_jmeno,telefon,datum_narozeni)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'jmeno',''),
    coalesce(new.raw_user_meta_data->>'prijmeni',''),
    nullif(new.raw_user_meta_data->>'prostredni_jmeno',''),
    coalesce(new.raw_user_meta_data->>'telefon',''),
    nullif(new.raw_user_meta_data->>'datum_narozeni','')::date
  )
  on conflict (id) do update set
    email=excluded.email,
    jmeno=excluded.jmeno,
    prijmeni=excluded.prijmeni,
    prostredni_jmeno=excluded.prostredni_jmeno,
    telefon=excluded.telefon,
    datum_narozeni=excluded.datum_narozeni,
    updated_at=now();
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();
