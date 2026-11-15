import express from "express"

import { followController,unfollowUser } from "../controllers/user.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";



const userRouter = express.Router()

userRouter.post("/follow/:username",authenticate,followController)

userRouter.post("/unfollow/:username",authenticate,unfollowUser)


export {userRouter}
