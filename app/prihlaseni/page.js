'use client';

import {useEffect,useState} from 'react';
import {useRouter} from 'next/navigation';

export default function Prihlaseni(){
  const router=useRouter();
  const [identifier,setIdentifier]=useState('');
  const [password,setPassword]=useState('');
  const [error,setError]=useState('');
  const [ready,setReady]=useState(false);

  useEffect(()=>{
    try{if(localStorage.getItem('rozvrh-auth')==='1') router.replace('/');}catch(e){}
    setReady(true);
  },[router]);

  const submit=e=>{
    e.preventDefault();
    setError('');
    try{
      const users=JSON.parse(localStorage.getItem('rozvrh-users')||'[]');
      const user=users.find(u=>(u.email||'').toLowerCase()===identifier.trim().toLowerCase() || u.phone===identifier.trim());
      if(!user || user.password!==password){setError('Nesprávný e-mail, telefonní číslo nebo heslo.');return;}
      localStorage.setItem('rozvrh-auth','1');
      localStorage.setItem('rozvrh-current-user',user.email||user.phone);
      router.replace('/');
    }catch(e){setError('Přihlášení se nepodařilo. Zkus to prosím znovu.');}
  };

  if(!ready)return null;
  return <main className="authPage"><div className="authCard">
    <div className="authBrand"><div className="authLogo">R<span>+</span></div><small>ŠKOLNÍ ORGANIZÉR</small><h1>Rozvrh<span>+</span></h1></div>
    <h2>Přihlášení</h2><p className="authMuted">Přihlas se ke svému účtu Rozvrh+.</p>
    <form onSubmit={submit}>
      <label>E-mail nebo telefon<input value={identifier} onChange={e=>setIdentifier(e.target.value)} placeholder="E-mail nebo telefonní číslo" autoComplete="username" required/></label>
      <label>Heslo<input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Tvoje heslo" autoComplete="current-password" required/></label>
      {error&&<div className="authError">{error}</div>}
      <button className="authPrimary" type="submit">Přihlásit se</button>
    </form>
    <div className="authSwitch">Nemáš účet? <button onClick={()=>router.push('/registrace')}>Vytvořit účet</button></div>
  </div></main>;
}
