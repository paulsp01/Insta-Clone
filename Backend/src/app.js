import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import path from "path"
import { fileURLToPath } from "url"

import connectToDB from "./config/db.js"
import { authRouter } from "./routes/auth.route.js"
import { postRouter } from "./routes/post.route.js"
import { userRouter } from "./routes/user.route.js"

dotenv.config({path:"./.env"})


const app=express()
app.use(express.json())

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
// Serve React frontend
app.use(express.static(path.join(__dirname, "dist")))

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

app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"))
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


export default app;