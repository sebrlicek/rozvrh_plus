'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';

export default function Registrace() {
  const router = useRouter();
  const [form, setForm] = useState({jmeno:'',prijmeni:'',prostredni:'',phone:'',email:'',birth:'',password:'',password2:''});
  const [error,setError]=useState(''); const [message,setMessage]=useState(''); const [loading,setLoading]=useState(false);
  const upd=(k,v)=>setForm(f=>({...f,[k]:v}));

  const submit=async e=>{
    e.preventDefault(); setError(''); setMessage('');
    const email=form.email.trim().toLowerCase();
    const phone=form.phone.trim();
    const jmeno=form.jmeno.trim(); const prijmeni=form.prijmeni.trim();
    if(!jmeno||!prijmeni)return setError('Vyplň jméno a příjmení.');
    if(form.password.length<8)return setError('Heslo musí mít alespoň 8 znaků.');
    if(form.password!==form.password2)return setError('Hesla se neshodují.');
    if(!form.birth)return setError('Datum narození je povinné.');
    if(!/^\S+@\S+\.\S+$/.test(email))return setError('Zadej platný e-mail.');
    setLoading(true);
    try {
      const {data,error:authError}=await supabase.auth.signUp({
        email,
        password:form.password,
        options:{
          emailRedirectTo:`${window.location.origin}/prihlaseni`,
          data:{jmeno,prijmeni,prostredni_jmeno:form.prostredni.trim()||null,telefon:phone||null,datum_narozeni:form.birth}
        }
      });
      if(authError) throw authError;
      if(!data?.user) throw new Error('Účet se nepodařilo vytvořit.');

      // Profil se zapisuje pouze tehdy, když má klient oprávnění.
      // Pokud má Supabase zapnuté potvrzení e-mailu, session je null,
      // takže RLS může zápis odmítnout. V tom případě profil vytvoří
      // databázový trigger z auth.users.
      if(data.session){
        const {error:profileError}=await supabase.from('profiles').upsert({
          id:data.user.id,jmeno,prijmeni,prostredni_jmeno:form.prostredni.trim()||null,
          telefon:phone||null,datum_narozeni:form.birth,email
        });
        if(profileError) throw profileError;
      }

      setMessage('Účet byl vytvořen. Zkontroluj svou e-mailovou schránku a potvrď registraci.');
      setTimeout(()=>router.replace('/prihlaseni'),3000);
    } catch(err) {
      const msg=String(err?.message||'');
      if(/already registered|user already registered/i.test(msg)) setError('Tento e-mail už je registrovaný.');
      else if(/invalid.*email/i.test(msg)) setError('E-mail není platný.');
      else if(/password/i.test(msg)) setError('Heslo nesplňuje požadavky Supabase.');
      else if(/profiles|row-level security|permission denied/i.test(msg)) setError('Účet byl vytvořen, ale profil se nepodařilo uložit. Zkontroluj RLS pravidla tabulky profiles.');
      else setError(`Registrace se nepodařila: ${msg || 'Neznámá chyba.'}`);
    } finally { setLoading(false); }
  };

  return <main className="authPage"><div className="authCard authRegister">
    <div className="authBrand"><div className="authLogo">R<span>+</span></div><small>ŠKOLNÍ ORGANIZÁTOR</small><h1>Rozvrh<span>+</span></h1></div>
    <h2>Vytvořit účet</h2><p className="authMuted">Vytvoř si bezpečný účet pro Rozvrh+.</p>
    <form onSubmit={submit}>
      <div className="twoAuth"><label>Jméno<input value={form.jmeno} onChange={e=>upd('jmeno',e.target.value)} required/></label><label>Příjmení<input value={form.prijmeni} onChange={e=>upd('prijmeni',e.target.value)} required/></label></div>
      <label>Prostřední jméno <span className="optional">volitelné</span><input value={form.prostredni} onChange={e=>upd('prostredni',e.target.value)}/></label>
      <label>Telefonní číslo <span className="optional">volitelné</span><input type="tel" value={form.phone} onChange={e=>upd('phone',e.target.value)} placeholder="+420 123 456 789" autoComplete="tel"/></label>
      <label>E-mail<input type="email" value={form.email} onChange={e=>upd('email',e.target.value)} autoComplete="email" required/></label>
      <label>Datum narození<input type="date" value={form.birth} onChange={e=>upd('birth',e.target.value)} required/></label>
      <label>Heslo<input type="password" value={form.password} onChange={e=>upd('password',e.target.value)} placeholder="Minimálně 8 znaků" autoComplete="new-password" required/></label>
      <label>Potvrzení hesla<input type="password" value={form.password2} onChange={e=>upd('password2',e.target.value)} autoComplete="new-password" required/></label>
      {error&&<div className="authError">{error}</div>}{message&&<div className="authSuccess">{message}</div>}
      <button className="authPrimary" type="submit" disabled={loading}>{loading?'Vytvářím účet…':'Vytvořit účet'}</button>
    </form>
    <div className="authSwitch">Už účet máš? <button type="button" onClick={()=>router.push('/prihlaseni')}>Přihlásit se</button></div>
  </div></main>;
}
