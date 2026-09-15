import mongoose, { Schema, models, model } from "mongoose";

const UserSchema = new Schema({
  name:{type:String,required:true},
  email:{type:String,required:true,unique:true,lowercase:true},
  passwordHash:{type:String,required:true},
  cycleLength:{type:Number,default:28},
  periodLength:{type:Number,default:5},
  reminderEnabled:{type:Boolean,default:false},
  reminderEmail:{type:String,default:""},
},{timestamps:true});

const PeriodSchema = new Schema({
  userId:{type:Schema.Types.ObjectId,ref:"User",required:true,index:true},
  startDate:{type:Date,required:true},
  endDate:{type:Date},
  flow:{type:String,enum:["light","medium","heavy"],default:"medium"},
  notes:{type:String,default:""},
},{timestamps:true});

const SymptomSchema = new Schema({
  userId:{type:Schema.Types.ObjectId,ref:"User",required:true,index:true},
  date:{type:Date,required:true},
  symptoms:[{type:String}],
  mood:{type:String,default:""},
  notes:{type:String,default:""},
},{timestamps:true});

export const User = models.User || model("User",UserSchema);
export const Period = models.Period || model("Period",PeriodSchema);
export const Symptom = models.Symptom || model("Symptom",SymptomSchema);
