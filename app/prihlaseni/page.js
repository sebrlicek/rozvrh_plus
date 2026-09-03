'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';

const ACCOUNT_REST_KEY = 'rozvrh-plus-account-rest-until';

function getRestMessage() {
  try {
    const until = Number(localStorage.getItem(ACCOUNT_REST_KEY) || 0);
    if (!until) return '';
    if (until <= Date.now()) {
      localStorage.removeItem(ACCOUNT_REST_KEY);
      return '';
    }
    const remaining = until - Date.now();
    const days = Math.floor(remaining / (24 * 60 * 60 * 1000));
    const hours = Math.ceil((remaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const when = new Date(until).toLocaleString('cs-CZ', { dateStyle: 'medium', timeStyle: 'short' });
    return days > 0
      ? `Účet je v odpočinku ještě ${days} ${days === 1 ? 'den' : days < 5 ? 'dny' : 'dní'}. Přihlásit se můžeš znovu ${when}.`
      : `Účet je v odpočinku ještě ${hours} ${hours === 1 ? 'hodinu' : hours < 5 ? 'hodiny' : 'hodin'}. Přihlásit se můžeš znovu ${when}.`;
  } catch {
    return '';
  }
}

export default function Prihlaseni() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError('');
    const restMessage = getRestMessage();
    if (restMessage) {
      setError(restMessage);
      return;
    }
    setLoading(true);

    try {
      if (!supabase) {
        throw new Error('Přihlášení není nakonfigurované. Zkontroluj NEXT_PUBLIC_SUPABASE_URL a NEXT_PUBLIC_SUPABASE_ANON_KEY ve Vercelu.');
      }

      const { error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (authError) throw authError;

      router.replace('/');
      router.refresh();
    } catch (err) {
      const message = String(err?.message || 'Přihlášení se nepodařilo.');
      const normalized = message.toLowerCase();

      if (normalized.includes('invalid login credentials')) {
        setError('Nesprávný e-mail nebo heslo.');
      } else if (normalized.includes('email not confirmed')) {
        setError('Nejdřív potvrď svůj e-mail pomocí odkazu, který ti přišel e-mailem.');
      } else if (normalized.includes('fetch') || normalized.includes('network')) {
        setError('Nepodařilo se spojit se serverem. Zkontroluj připojení a nastavení Supabase.');
      } else {
        setError(message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="authPage">
      <div className="authCard">
        <div className="authBrand">
          <div className="authLogo">R<span>+</span></div>
          <small>ŠKOLNÍ ORGANIZÁTOR</small>
          <h1>Rozvrh<span>+</span></h1>
        </div>

        <h2>Přihlášení</h2>
        <p className="authMuted">Přihlas se ke svému účtu Rozvrh+.</p>

        <form onSubmit={submit}>
          <label>
            E-mail
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tvuj@email.cz"
              autoComplete="email"
              required
            />
          </label>

          <label>
            Heslo
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Tvoje heslo"
              autoComplete="current-password"
              required
            />
          </label>

          {error && <div className="authError">{error}</div>}

          <button className="authPrimary" type="submit" disabled={loading}>
            {loading ? 'Přihlašuji…' : 'Přihlásit se'}
          </button>
        </form>

        <div className="authSwitch">
          Zapomenuté heslo?{' '}
          <button type="button" onClick={() => router.push('/zapomenute-heslo')}>Obnovit heslo</button>
        </div>

        <div className="authSwitch">
          Nemáš účet?{' '}
          <button type="button" onClick={() => router.push('/registrace')}>Vytvořit účet</button>
        </div>
      </div>
    </main>
  );
}
