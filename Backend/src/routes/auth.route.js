import express from "express"
import {register,login,getProfileById} from "../controllers/auth.controller.js"

const authRouter=express.Router()


authRouter.post('/register',register)
authRouter.post('/login',login)
authRouter.get('/getProfile/:id',getProfileById)

export {authRouter}