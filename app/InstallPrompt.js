'use client';

import { useEffect, useState } from 'react';
import { Share, PlusSquare, X, Download, Smartphone, CheckCircle2 } from 'lucide-react';

export default function InstallPrompt() {
  const [visible, setVisible] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }

    const ua = window.navigator.userAgent.toLowerCase();
    const ios = /iphone|ipad|ipod/.test(ua);
    const standalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
    setIsIOS(ios);

    const dismissedAt = Number(localStorage.getItem('rozvrh-plus-install-dismissed') || 0);
    const dismissedRecently = Date.now() - dismissedAt < 1000 * 60 * 60 * 24 * 3;

    if (!standalone && !dismissedRecently) {
      const timer = setTimeout(() => setVisible(true), 900);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handler = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
      setVisible(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const close = () => {
    localStorage.setItem('rozvrh-plus-install-dismissed', String(Date.now()));
    setVisible(false);
  };

  const install = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="installOverlay" role="dialog" aria-modal="true" aria-label="Přidat Rozvrh+ na plochu">
      <div className="installSheet">
        <button className="installClose" onClick={close} aria-label="Zavřít"><X /></button>
        <div className="installIcon"><Smartphone /></div>
        <span className="eyebrow">RYCHLEJŠÍ PŘÍSTUP</span>
        <h2>Přidej si Rozvrh+ na plochu</h2>
        <p className="installLead">Bude se otevírat jako samostatná aplikace přes celou obrazovku a budeš ji mít vždy po ruce.</p>

        {isIOS ? (
          <div className="installSteps">
            <div className="installStep"><b>1</b><span>V Safari klepni dole na <strong>Sdílet</strong>.</span><Share /></div>
            <div className="installStep"><b>2</b><span>V nabídce zvol <strong>Přidat na plochu</strong>.</span><PlusSquare /></div>
            <div className="installStep"><b>3</b><span>Potvrď tlačítkem <strong>Přidat</strong>.</span><CheckCircle2 /></div>
          </div>
        ) : deferredPrompt ? (
          <button className="installPrimary" onClick={install}><Download /> Nainstalovat Rozvrh+</button>
        ) : (
          <div className="installSteps">
            <div className="installStep"><b>1</b><span>Otevři nabídku prohlížeče.</span><Download /></div>
            <div className="installStep"><b>2</b><span>Vyber možnost <strong>Nainstalovat aplikaci</strong> nebo <strong>Přidat na plochu</strong>.</span><PlusSquare /></div>
          </div>
        )}
        <button className="installLater" onClick={close}>Teď ne</button>
      </div>
    </div>
  );
}
