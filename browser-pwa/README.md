# Rozvrh+

Moderní česká školní PWA pro rozvrh, úkoly, zkoušky, kalendář, materiály, poznámky a statistiky.

## Co aplikace umí

- upravovat týdenní rozvrh,
- spravovat úkoly a zkoušky,
- zobrazit měsíční kalendář a exportovat jej do Apple/Google Kalendáře,
- ukládat soubory přímo v zařízení,
- tvořit poznámky a sledovat statistiky,
- měnit barvu i světlý/tmavý režim,
- fungovat offline,
- rozpoznat iPhone a zobrazit návod pro přidání na plochu.

## Lokální spuštění

Obsah složky dist je statická aplikace. Spusť ji přes libovolný lokální HTTP server, například příkazem npx serve dist.

Service worker a instalace PWA fungují na HTTPS nebo na localhost.

## Nasazení a omezení

Nahraj obsah dist do kořene samostatné HTTPS domény. Aplikace používá kořenové cesty, ne podsložku. Tato nezávislá verze nemění původní Next.js aplikaci ani její přihlášení.

Úvodní rozvrh a úkoly jsou ukázková data, nikoli ověřený rozvrh školy. Data jsou lokální: nepřenášejí se automaticky mezi doménami ani zařízeními. Není zde přihlášení, cloudová synchronizace ani systémové připomínky. Kalendář podporuje jednorázový export ICS, ne synchronizaci účtu. Materiály se ukládají v IndexedDB a lze je stáhnout; není zde vlastní PDF čtečka.

Detekce iPhonu rozlišuje otevření v prohlížeči od standalone režimu. Nemůže ověřit samotnou existenci ikony na ploše. Návod lze zavřít na sedm dní a znovu otevřít v nastavení.
