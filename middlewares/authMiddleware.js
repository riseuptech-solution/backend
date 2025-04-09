const jwt=require("jsonwebtoken")
const UserSchema=require("../models/UserModel")

const authMiddleware= async(req,res,next)=>{
    const token=req.cookies['token']
    try {
        if(!token)
       return res.status(404).json({error:"token is required"}) 
    // valid the secret key 
     const isValid= jwt.verify(token,process.env.SECRET)
    //  check if the user is found in db
     const user=await UserSchema.findById(isValid.id,{logging:false})
     if(!user)
       return res.status(404).json({error:"Unauthorized user"}) 
    req.id=isValid.id
    // move to next controller
    next()
    } catch (error) {
       return res.status(400).json({error:error.message}) 
    }
}

module.exports={authMiddleware}