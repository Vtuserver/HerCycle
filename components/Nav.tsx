import Link from "next/link";
import { auth } from "@/auth";
export default async function Nav(){
 const session=await auth();
 return <nav className="nav"><div className="container row" style={{width:"100%",justifyContent:"space-between"}}>
  <Link href="/" className="brand">HerCycle</Link>
  {session?.user ? <div className="navlinks">
    <Link className="navlink" href="/dashboard">Dashboard</Link><Link className="navlink" href="/log">Log</Link><Link className="navlink" href="/calendar">Calendar</Link><Link className="navlink" href="/history">History</Link><Link className="navlink" href="/profile">Profile</Link>
  </div> : <div className="row"><Link className="btn btn-soft" href="/login">Log in</Link><Link className="btn btn-primary" href="/register">Get started</Link></div>}
 </div></nav>
}
