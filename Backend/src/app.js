import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"

import connectToDB from "./config/db.js"
import { authRouter } from "./routes/auth.route.js"
import { postRouter } from "./routes/post.route.js"
import { userRouter } from "./routes/user.route.js"

dotenv.config({path:"./.env"})


const app=express()
app.use(express.json())

app.use(cookieParser())
app.use(cors(
    {
        credentials:true,
        origin:"http://localhost:5173"
    }

))


connectToDB()

app.use('/api/v1/auth',authRouter)
app.use('/api/v1/posts', postRouter)
app.use('/api/v1/user',userRouter)
app.listen(5000,()=>{
    console.log("app listening on running port 5000");
})


export default app;