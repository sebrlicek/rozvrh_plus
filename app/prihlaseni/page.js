'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
  });
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
    setLoading(true);

    try {
      const supabase = getSupabase();
      if (!supabase) {
        throw new Error('Přihlášení není nakonfigurované. Zkontroluj NEXT_PUBLIC_SUPABASE_URL a NEXT_PUBLIC_SUPABASE_ANON_KEY ve Vercelu.');
      }

      const { error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (authError) throw authError;
      router.push('/');
    } catch (err) {
      const message = String(err?.message || 'Přihlášení se nepodařilo.');
      if (message.toLowerCase().includes('invalid login credentials')) {
        setError('Nesprávný e-mail nebo heslo.');
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
