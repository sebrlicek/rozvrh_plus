'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'

const OPTIONS = [
  ['7 dní', 7],
  ['14 dní', 14],
  ['30 dní', 30],
  ['1 rok', 365],
]

export default function Ucet() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) router.replace('/prihlaseni')
      else setUser(data.user)
      setLoading(false)
    })
  }, [router])

  const logout = async (text = 'Byl jsi odhlášen.') => {
    setMessage('Odhlášení…')
    await supabase.auth.signOut()
    if (typeof window !== 'undefined') localStorage.removeItem('rozvrh-plus')
    router.replace('/prihlaseni')
  }

  if (loading || !user) return <main className="authPage"><div className="authCard">Načítám účet…</div></main>

  return (
    <main className="authPage">
      <div className="authCard">
        <div className="authBrand"><div className="authLogo">R<span>+</span></div><small>ROZVRH+</small><h1>Můj účet</h1></div>
        <p className="authMuted">{user.email}</p>

        <h2>Odhlášení</h2>
        <p className="authMuted">Pozastavení v Rozvrh+ funguje jednoduše: vybraná možnost tě okamžitě odhlásí. Účet ani data se nemažou.</p>
        <div style={{display:'grid',gap:10}}>
          {OPTIONS.map(([label]) => (
            <button key={label} className="authPrimary" type="button" onClick={() => logout(`Odhlášení na ${label}`)}>
              Pozastavit na {label}
            </button>
          ))}
        </div>

        <button type="button" className="authSwitch" onClick={() => logout()}>Odhlásit se</button>
        {message && <div className="authMuted">{message}</div>}
        <button type="button" className="authSwitch" onClick={() => router.push('/')}>Zpět do Rozvrh+</button>
      </div>
    </main>
  )
}
