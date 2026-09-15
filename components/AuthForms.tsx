"use client";
import {useState} from "react"; import {signIn} from "next-auth/react"; import {useRouter} from "next/navigation";
export function RegisterForm(){
 const [f,setF]=useState({name:"",email:"",password:""});const [err,setErr]=useState("");const [busy,setBusy]=useState(false);const r=useRouter();
 async function submit(e:any){e.preventDefault();setBusy(true);setErr("");const x=await fetch("/api/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(f)});const d=await x.json();if(!x.ok){setErr(d.error||"Registration failed");setBusy(false);return}const res=await signIn("credentials",{email:f.email,password:f.password,redirect:false});if(res?.error){setErr("Account created. Please log in.");r.push("/login")}else r.push("/dashboard")}
 return <form className="stack" onSubmit={submit}><div><label>Name</label><input required value={f.name} onChange={e=>setF({...f,name:e.target.value})}/></div><div><label>Email</label><input required type="email" value={f.email} onChange={e=>setF({...f,email:e.target.value})}/></div><div><label>Password</label><input required minLength={6} type="password" value={f.password} onChange={e=>setF({...f,password:e.target.value})}/></div>{err&&<div className="error">{err}</div>}<button className="btn btn-primary" disabled={busy}>{busy?"Creating...":"Create account"}</button></form>
}
export function LoginForm(){
 const [email,setEmail]=useState(""),[password,setPassword]=useState(""),[err,setErr]=useState(""),[busy,setBusy]=useState(false);const r=useRouter();
 async function submit(e:any){e.preventDefault();setBusy(true);setErr("");const res=await signIn("credentials",{email,password,redirect:false});if(res?.error){setErr("Invalid email or password.");setBusy(false)}else r.push("/dashboard")}
 return <form className="stack" onSubmit={submit}><div><label>Email</label><input required type="email" value={email} onChange={e=>setEmail(e.target.value)}/></div><div><label>Password</label><input required type="password" value={password} onChange={e=>setPassword(e.target.value)}/></div>{err&&<div className="error">{err}</div>}<button className="btn btn-primary" disabled={busy}>{busy?"Signing in...":"Log in"}</button></form>
}
