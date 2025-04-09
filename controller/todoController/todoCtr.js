const mongoose=require("mongoose")
const TodoSchema=require("../../models/TodoModel")
// create todo
const createCtr=async(req,res)=>{
const userId=req.id
try {
    const {title,description}=req.body
    const todo=await TodoSchema.findOne({title,user:userId})
    if(todo){
        return res.status(400).json({error:"Todo already exist"})
       }
const newTodo=await TodoSchema.create({title,description,user:userId})
return res.status(201).json({message:"Todo registered",newTodo})
} catch (error) {
    return res.status(500).json({error:"some error"+error.message})
}
}

// get all personal todo list
const todos=async(req,res)=>{
    const userId=req.id
  try {
    const myToods=await TodoSchema.find({user:userId})
    return res.status(200).json({todos:myToods})
  } catch (error) {
    return res.status(500).json({error:"some error"+error.message})
  }
}
// get single todo
const todo=async(req,res)=>{
   try {
    const {id}=req.params
    // validate mongodb id
    if(!mongoose.Types.ObjectId.isValid(id))
     return res.status(404).json({error:"Please use valid id"})
    // if valid move to next step
    const userId=req.id
    const todo=await TodoSchema.findOne({_id:id,user:userId})
    if(!todo){
    return res.status(404).json({error:"todo not found"})
    }
    return res.status(200).json({todo:todo})
   } catch (error) {
    return res.status(500).json({error:"some error"+error.message})
   }
}

const updateTodo=async(req,res)=>{
            try {
                const {id}=req.params
                const userId=req.id
                // validate mongodb id
                if(!mongoose.Types.ObjectId.isValid(id))
                 return res.status(404).json({error:"Please use valid id"})
                const todo=await TodoSchema.findOne({_id:id,user:userId})
                if(!todo){
                    return res.status(404).json({error:"todo not found"})
                    }
            const updateTodo=await TodoSchema.findOneAndUpdate({_id:id},req.body,{new:true})
            return res.status(200).json({updatedTodo:updateTodo})
        } catch (error) {
            return res.status(500).json({error:"some error"+error.message})
        }
}

const deleteTodo=async(req,res)=>{
    try {
        const {id}=req.params
        const userId=req.id
        // validate mongodb id
        if(!mongoose.Types.ObjectId.isValid(id))
         return res.status(404).json({error:"Please use valid id"})
        const todo=await TodoSchema.findOne({_id:id,user:userId})
        if(!todo){
            return res.status(404).json({error:"todo not found"})
            }
    const deleteTodo=await TodoSchema.findOneAndDelete({_id:id})
    return res.status(200).json({message:"todo deleted"})
} catch (error) {
    return res.status(500).json({error:"some error"+error.message})
}
}

module.exports={createCtr,todos,todo,updateTodo,deleteTodo}