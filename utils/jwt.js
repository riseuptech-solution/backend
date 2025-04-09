var jwt = require("jsonwebtoken")
const genToken=(id)=>{
    try {
        const token=jwt.sign({id:id},process.env.SECRET,{expiresIn:"1h"})
        return token
    } catch (error) {
        return error.message
    }
 
}
module.exports={genToken}