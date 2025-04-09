const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const Schema=mongoose.Schema
const UserSchedema=new Schema({
  name:{
    type:String,
    required:true
     },
  email:{
    type:String,
    required:true,
    unique:true
     },
  phone:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true,
     }
  })
 // Hash password before saving
 UserSchedema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  })


module.exports=mongoose.model("User",UserSchedema)
