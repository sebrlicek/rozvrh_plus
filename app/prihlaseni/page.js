'use client';

import {useEffect,useState} from 'react';
import {useRouter} from 'next/navigation';
import {supabase} from '../../lib/supabase';

export default function Prihlaseni(){
  const router=useRouter(); const[identifier,setIdentifier]=useState(''); const[password,setPassword]=useState(''); const[error,setError]=useState(''); const[loading,setLoading]=useState(false); const[ready,setReady]=useState(false);
  useEffect(()=>{supabase.auth.getSession().then(({data})=>{if(data.session)router.replace('/');else setReady(true);});},[router]);
  const submit=async e=>{e.preventDefault();setError('');setLoading(true);try{
    let email=identifier.trim().toLowerCase();
    if(!email.includes('@')){
      const {data,error:qError}=await supabase.from('profiles').select('email').eq('telefon',identifier.trim()).maybeSingle();
      if(qError)throw qError;if(!data?.email)throw new Error('NO_USER');email=data.email;
    }
    const {error:authError}=await supabase.auth.signInWithPassword({email,password});if(authError)throw authError;router.replace('/');
  }catch(err){setError(err.message==='NO_USER'?'Účet s tímto telefonním číslem nebyl nalezen.':'Nesprávný e-mail, telefonní číslo nebo heslo.');}finally{setLoading(false);}};
  if(!ready)return null;
  return <main className="authPage"><div className="authCard">
    <div className="authBrand"><div className="authLogo">R<span>+</span></div><small>ŠKOLNÍ ORGANIZÉR</small><h1>Rozvrh<span>+</span></h1></div>
    <h2>Přihlášení</h2><p className="authMuted">Přihlas se ke svému účtu Rozvrh+.</p>
    <form onSubmit={submit}><label>E-mail nebo telefon<input value={identifier} onChange={e=>setIdentifier(e.target.value)} placeholder="E-mail nebo telefonní číslo" autoComplete="username" required/></label><label>Heslo<input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Tvoje heslo" autoComplete="current-password" required/></label>
    {error&&<div className="authError">{error}</div>}<button className="authPrimary" type="submit" disabled={loading}>{loading?'Přihlašuji…':'Přihlásit se'}</button></form>
    <div className="authSwitch">Nemáš účet? <button type="button" onClick={()=>router.push('/registrace')}>Vytvořit účet</button></div>
  </div></main>;
}
