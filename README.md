# Rozvrh+

Moderní česká školní PWA pro rozvrh, úkoly, kalendář a materiály.

## Spuštění

```bash
npm install
npm run dev
```

Potom otevři `http://localhost:3000`.

## Nasazení

Repozitář je propojený s Vercel projektem `rozvrh_plus`. Push do větve `main` automaticky vytvoří produkční deployment.

## PWA / iPhone

Aplikace obsahuje web manifest, service worker a vlastní instalační průvodce. Na iPhonu zjistí, zda neběží z plochy. Pokud ne, zobrazí návod:

1. Sdílet
2. Přidat na plochu
3. Přidat

Po spuštění z plochy se instalační průvodce nezobrazuje.

## Funkce

- Domovská obrazovka s aktuální a další hodinou
- Týdenní rozvrh
- Přidávání a úpravy hodin
- Úkoly a priority
- Kalendář
- Studijní materiály
- Světlý a tmavý režim
- Volitelná hlavní barva
- Lokální uložení dat
- Supabase přihlášení z původní aplikace
- PWA a částečná offline podpora
