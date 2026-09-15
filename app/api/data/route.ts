import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectDB } from "@/lib/mongodb";
import { User,Period,Symptom } from "@/lib/models";

export async function GET(){
  const session=await auth(); if(!session?.user?.id) return NextResponse.json({error:"Unauthorized"},{status:401});
  await connectDB();
  const user=await User.findById(session.user.id).lean();
  const periods=await Period.find({userId:session.user.id}).sort({startDate:-1}).lean();
  const symptoms=await Symptom.find({userId:session.user.id}).sort({date:-1}).lean();
  return NextResponse.json({user,periods,symptoms});
}
export async function POST(req:Request){
  const session=await auth(); if(!session?.user?.id) return NextResponse.json({error:"Unauthorized"},{status:401});
  await connectDB(); const b=await req.json();
  if(b.type==="period"){
    const p=await Period.create({userId:session.user.id,startDate:new Date(b.startDate),endDate:b.endDate?new Date(b.endDate):undefined,flow:b.flow||"medium",notes:b.notes||""});
    return NextResponse.json({item:p});
  }
  if(b.type==="symptom"){
    const s=await Symptom.create({userId:session.user.id,date:new Date(b.date),symptoms:b.symptoms||[],mood:b.mood||"",notes:b.notes||""});
    return NextResponse.json({item:s});
  }
  if(b.type==="profile"){
    const u=await User.findByIdAndUpdate(session.user.id,{name:b.name,cycleLength:Number(b.cycleLength),periodLength:Number(b.periodLength),reminderEnabled:Boolean(b.reminderEnabled),reminderEmail:b.reminderEmail||""},{new:true}).lean();
    return NextResponse.json({user:u});
  }
  return NextResponse.json({error:"Invalid type"},{status:400});
}
export async function DELETE(req:Request){
  const session=await auth(); if(!session?.user?.id) return NextResponse.json({error:"Unauthorized"},{status:401});
  await connectDB(); const b=await req.json();
  const Model=b.type==="period"?Period:b.type==="symptom"?Symptom:null;
  if(!Model) return NextResponse.json({error:"Invalid type"},{status:400});
  await Model.deleteOne({_id:b.id,userId:session.user.id});
  return NextResponse.json({ok:true});
}
