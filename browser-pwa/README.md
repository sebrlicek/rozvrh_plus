# Rozvrh+

Moderní česká školní PWA pro rozvrh, úkoly, zkoušky, kalendář, materiály, poznámky a statistiky.

## Co aplikace umí

- upravovat týdenní rozvrh,
- nastavit vlastní časová rozmezí vyučování a vybírat je u jednotlivých hodin,
- nastavit vlastní profilovou fotku,
- synchronizovat rozvrh, úkoly, zkoušky, poznámky, nastavení a profilovku přes Supabase mezi zařízeními,
- spravovat úkoly a zkoušky,
- zobrazit měsíční kalendář a exportovat jej do Apple/Google Kalendáře,
- ukládat soubory přímo v zařízení,
- tvořit poznámky a sledovat statistiky,
- měnit barvu i světlý/tmavý režim,
- vytvořit účet, přihlásit se, odhlásit se a obnovit heslo přes Supabase Auth,
- fungovat offline,
- rozpoznat iPhone a zobrazit návod pro přidání na plochu.

## Lokální spuštění

Obsah složky dist je statická aplikace. Spusť ji přes libovolný lokální HTTP server, například příkazem npx serve dist.

Service worker a instalace PWA fungují na HTTPS nebo na localhost.

## Nasazení a omezení

Nahraj obsah dist do kořene samostatné HTTPS domény. Aplikace používá kořenové cesty, ne podsložku. Přihlášení a registrace používají Supabase Auth projektu nastaveného v `dist/app.js`. Pro potvrzení e-mailu a obnovu hesla přidej veřejnou adresu aplikace do Supabase Authentication → URL Configuration → Redirect URLs.

Úvodní rozvrh a úkoly jsou ukázková data, nikoli ověřený rozvrh školy. Strukturovaná data aplikace a profilovka se po vytvoření tabulky z `supabase/cloud-sync.sql` synchronizují přes Supabase; lokální kopie umožňuje práci při krátkém výpadku internetu. Kalendář podporuje jednorázový export ICS, ne přímou synchronizaci účtu Apple nebo Google. Nahrané materiály zatím zůstávají v IndexedDB konkrétního zařízení a nejsou součástí cloudové synchronizace.

Detekce iPhonu rozlišuje otevření v prohlížeči od standalone režimu. Nemůže ověřit samotnou existenci ikony na ploše. Návod lze zavřít na sedm dní a znovu otevřít v nastavení.
