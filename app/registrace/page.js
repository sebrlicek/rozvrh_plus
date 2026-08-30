'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';

export default function Registrace(){
  const router=useRouter();
  const [form,setForm]=useState({jmeno:'',prijmeni:'',prostredni:'',email:'',phone:'',birth:'',password:'',password2:''});
  const [error,setError]=useState('');
  const upd=(k,v)=>setForm(f=>({...f,[k]:v}));
  const submit=e=>{
    e.preventDefault();setError('');
    if(form.password.length<8){setError('Heslo musí mít alespoň 8 znaků.');return;}
    if(form.password!==form.password2){setError('Hesla se neshodují.');return;}
    if(!form.birth){setError('Datum narození je povinné.');return;}
    try{
      const users=JSON.parse(localStorage.getItem('rozvrh-users')||'[]');
      if(users.some(u=>(u.email||'').toLowerCase()===form.email.trim().toLowerCase())){setError('Tento e-mail už je registrovaný.');return;}
      if(users.some(u=>u.phone===form.phone.trim())){setError('Toto telefonní číslo už je registrované.');return;}
      const user={...form,email:form.email.trim(),phone:form.phone.trim()};
      delete user.password2;
      localStorage.setItem('rozvrh-users',JSON.stringify([...users,user]));
      localStorage.setItem('rozvrh-auth','1');
      localStorage.setItem('rozvrh-current-user',user.email);
      router.replace('/');
    }catch(e){setError('Registrace se nepodařila. Zkus to prosím znovu.');}
  };
  return <main className="authPage"><div className="authCard authRegister">
    <div className="authBrand"><div className="authLogo">R<span>+</span></div><small>ŠKOLNÍ ORGANIZÉR</small><h1>Rozvrh<span>+</span></h1></div>
    <h2>Vytvořit účet</h2><p className="authMuted">Založ si účet a používej Rozvrh+ na svém zařízení.</p>
    <form onSubmit={submit}>
      <div className="twoAuth"><label>Jméno<input value={form.jmeno} onChange={e=>upd('jmeno',e.target.value)} placeholder="Jméno" required/></label><label>Příjmení<input value={form.prijmeni} onChange={e=>upd('prijmeni',e.target.value)} placeholder="Příjmení" required/></label></div>
      <label>Prostřední jméno <span className="optional">volitelné</span><input value={form.prostredni} onChange={e=>upd('prostredni',e.target.value)} placeholder="Prostřední jméno"/></label>
      <label>E-mail<input type="email" value={form.email} onChange={e=>upd('email',e.target.value)} placeholder="tvuj@email.cz" autoComplete="email" required/></label>
      <label>Telefonní číslo<input type="tel" value={form.phone} onChange={e=>upd('phone',e.target.value)} placeholder="+420 123 456 789" autoComplete="tel" required/></label>
      <label>Datum narození<input type="date" value={form.birth} onChange={e=>upd('birth',e.target.value)} required/></label>
      <label>Heslo<input type="password" value={form.password} onChange={e=>upd('password',e.target.value)} placeholder="Minimálně 8 znaků" autoComplete="new-password" required/></label>
      <label>Potvrzení hesla<input type="password" value={form.password2} onChange={e=>upd('password2',e.target.value)} placeholder="Zopakuj heslo" autoComplete="new-password" required/></label>
      {error&&<div className="authError">{error}</div>}
      <button className="authPrimary" type="submit">Vytvořit účet</button>
    </form>
    <div className="authSwitch">Už účet máš? <button onClick={()=>router.push('/prihlaseni')}>Přihlásit se</button></div>
  </div></main>;
}
