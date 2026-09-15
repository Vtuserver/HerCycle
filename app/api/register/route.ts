import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/lib/models";
import bcrypt from "bcryptjs";
export async function POST(req:Request){
  try{
    const body=await req.json();
    const name=String(body.name||"").trim(), email=String(body.email||"").trim().toLowerCase(), password=String(body.password||"");
    if(name.length<2 || !email.includes("@") || password.length<6) return NextResponse.json({error:"Enter a valid name, email and password of at least 6 characters."},{status:400});
    await connectDB();
    if(await User.findOne({email})) return NextResponse.json({error:"An account with this email already exists."},{status:409});
    const passwordHash=await bcrypt.hash(password,12);
    const user=await User.create({name,email,passwordHash});
    return NextResponse.json({id:String(user._id)});
  // }catch(e){return NextResponse.json({error:"Could not create account."},{status:500})}
  }catch(error){
    console.error("REGISTRATION ERROR:", error);
    return NextResponse.json(
      {error:"Could not create account"},
      {status: 500}
    );
  }
}
