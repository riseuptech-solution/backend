const express=require("express")
const {login,logout}=require("../controller/userCtroller/authCt")
const {createUser}=require("../controller/userCtroller/register")

const userRoute=express.Router()


userRoute.post("/login",login)
userRoute.post("/logout",logout)
userRoute.post("/create",createUser)
module.exports={userRoute}