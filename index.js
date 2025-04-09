const express=require("express")
const cookieParser=require("cookie-parser")
require("dotenv").config()
const dbConfig=require("./config/db")
const userRoute=require("./route/userRoute")
const app=express()
// cread form data
app.use(cookieParser())
app.use(express.json())
// route define here
app.use("/api/user",userRoute)
const PORT=process.env.PORT || 4003
app.listen(PORT,()=>{
    dbConfig
    console.log(`App is running on Port ${PORT}`)
})