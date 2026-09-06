# Rozvrh+

Moderní česká školní PWA pro rozvrh, úkoly, zkoušky, kalendář, materiály, poznámky a statistiky.

## Co aplikace umí

- upravovat týdenní rozvrh,
- nastavit vlastní časová rozmezí vyučování a vybírat je u jednotlivých hodin,
- nastavit vlastní profilovou fotku uloženou v zařízení,
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

Úvodní rozvrh a úkoly jsou ukázková data, nikoli ověřený rozvrh školy. Účet je uložený v Supabase, ale obsah rozvrhu zůstává lokální a v zařízení je oddělený podle přihlášeného uživatele. Rozvrh se nepřenáší automaticky mezi zařízeními. Není zde cloudová synchronizace ani systémové připomínky. Kalendář podporuje jednorázový export ICS, ne synchronizaci účtu. Materiály se ukládají v IndexedDB a lze je stáhnout; není zde vlastní PDF čtečka.

Detekce iPhonu rozlišuje otevření v prohlížeči od standalone režimu. Nemůže ověřit samotnou existenci ikony na ploše. Návod lze zavřít na sedm dní a znovu otevřít v nastavení.
