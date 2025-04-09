const UserSchema=require("../../models/UserModel")
const createUser=async(req,res)=>{
try {
const {name,email,phone,phassword}=req.body
const user=await UserSchema.findOne({
    $or:[
        {email:email},
        {phone:phone}
      ]
  })
if(user){
    return res.status(400).json({error:"user already register"})
   }
const newUser=await UserSchema.create(req.body)
    return res.status(200).json({message:"user  registered"})
} catch (error) {
    return res.status(500).json({error:"some error"+error.message})    
}
}

// 1  delete user 
// 2 update user
// 3 locked user


module.exports={createUser}