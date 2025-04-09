const mongoose=require("mongoose")
const Schema=mongoose.Schema
const TodoSchedema=new Schema({
  title:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true,
    unique:true
  },
  isCompleted:{
    type:Boolean,
    default:false
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    require:true
  }
},{timestamps:true})

module.exports=mongoose.model("Todo",TodoSchedema)
