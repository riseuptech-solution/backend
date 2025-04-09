const express=require("express")

const {createCtr,todos,todo,updateTodo,deleteTodo}=require("../controller/todoController/todoCtr")
const {authMiddleware}=require("../middlewares/authMiddleware")
const todoRoute=express.Router()


todoRoute.post("/create",authMiddleware,createCtr)
todoRoute.get("/all",authMiddleware,todos)
todoRoute.get("/:id",authMiddleware,todo)
todoRoute.put("/:id",authMiddleware,updateTodo)
todoRoute.delete("/:id",authMiddleware,deleteTodo)
module.exports={todoRoute}