const express=require("express")
const cookieParser=require("cookie-parser")
const cors=require("cors")
require("dotenv").config()
const dbConfig=require("./config/db")

const {userRoute}=require("./route/userRoute")
const {todoRoute}=require("./route/todoRoute")
const app=express()
// cread form data
app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin:"http://localhost:3000",
    methods:["GET","POST","DELETE","PUT"],
    allowedHeaders:["Content-Type"],
    credentials:true
}))
// route define here
app.use("/api/user",userRoute)  // http://localhost:4001/api/user/create
app.use("/api/todo",todoRoute)  // http://localhost:4001/api/todo/
const PORT=process.env.PORT || 4003
app.listen(PORT,()=>{
    dbConfig
    console.log(`App is running on Port ${PORT}`)
})