const bcrypt=require("bcrypt")
const UserSchema=require("../../models/UserModel")
const genToken=require("../../utils/jwt")
// login controller
const login=async(req,res)=>{
try {
    const {email,password}=req.body
    const user=await UserSchema.findOne({email:email})
    if(!user)
     {
    return res.status(401).json({error:"Invalid email or password"})
    }
    // check password is correct or not if user email exist
const isMach=await bcrypt.compare(password,user.password)
if(!isMach)
    {
   return res.status(401).json({error:"Invalid email or password"})
   }
   const id=user._id
   
const token=genToken(id)
res.cookie("token",token,{httpOnly:true, maxAge: 24*60*60*1000})
return res.status(200).json({message:"authenticated user ",token})
} catch (error) {
    return res.status(500).json({error:"some error"+error.message})
}
}

// logout controller
const logout=async(req,res)=>{
    try {
        const token = req.cookies['token'];
        if (!token) {
            return res.status(401).json({erro:"user not authenticated"}); // Unauthorized
           }

        const decoded=jwt.verify(token,process.env.SECRET_KEY)
        const user=await UserSchema.findByPk(decoded.id,{logging: false})

        if(!user)
            {
            return res.status(401).json({erro:"Unauthorized user"});
             }
             res.clearCookie('token', {
                httpOnly: true,
            });
            return res.json({ message: 'Logout successful' });
       
    } catch (err) {
            return res.status(500).json({ error: "Internal server error" });
    }
}
module.exports={login,logout}