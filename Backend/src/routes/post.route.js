
import express from "express"
import upload from "../middleware/multer.js"
import { authenticate } from "../middleware/auth.middleware.js" 
import { createPost,getPostController,getPostDetails, likePostController,unLikePostController,getFeedController} from "../controllers/post.controller.js"

const postRouter = express.Router()

postRouter.post("/create",authenticate, upload.single("image"),createPost
)

postRouter.get("/",authenticate,  getPostController)
postRouter.get("/details/:postId",authenticate,  getPostDetails)
postRouter.post("/like/:postId",authenticate,  likePostController)
postRouter.post("/unlike/:postId",authenticate,  unLikePostController)
postRouter.get("/feed",authenticate,  getFeedController)
export {postRouter}
