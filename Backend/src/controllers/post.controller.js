
import postModel from "../models/post.model.js"
import userModel from "../models/user.model.js"
import { likeModel } from "../models/like.model.js"
import { uploadImage } from "../config/cloudinary.js"
import fs from "node:fs/promises"
import jwt from "jsonwebtoken"


export const createPost = async (req, res) => {

    let imagePath

    try {

        const { caption } = req.body
        const user = req.user.id
        const file = req.file

        if (!file) {
            return res.status(400).json({
                message: "Image is required"
            })
        }

        imagePath = file.path

        // Upload image to Cloudinary
        const image = await uploadImage(file.path)

        // Save post in MongoDB
        const post = await postModel.create({
            caption,
            user,
            image: image.secure_url
        })

        return res.status(201).json({
            message: "Post created successfully",
            post
        })

    } catch (error) {

        console.log("Cloudinary Error:", error.message);
    console.log("Status Code:", error.http_code);
    console.log("Error Name:", error.name);
    console.log("Detailed Error:", error.error);
    console.log("Response:", error.response);

    return res.status(500).json({
        message: "Failed to create post"
    });

    } finally {

        // Delete temporary image
        if (imagePath) {
            await fs.unlink(imagePath).catch(console.log)
        }

    }
}
export const getPostController=async(req,res)=>{
    try {
        const posts=await postModel.find().populate("user","username profileImage").sort({createdAt:-1})
        return res.status(200).json({message:"posts fetched successfully",posts})
    }catch (error) {
        return res.status(500).json({message:"Internal server error"})
    }
}

export const getPostDetails=async(req,res)=>{   
    try {
        const postId=req.params.postId
        const post=await postModel.findById(postId).populate("user","username profileImage")
        if(!post){
            return res.status(404).json({message:"post not found"})
        }
        return res.status(200).json({message:"post details fetched successfully",post})
    }catch (error) {
        return res.status(500).json({message:"Internal server error"})
    }
}

export const likePostController = async (req, res) => {
    try {
        const postId = req.params.postId

        if (!postId) {
            return res.status(400).json({
                message: "Post id is required"
            })
        }

        const user = await userModel.findById(req.user.id).select("username")
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        const post = await postModel.findById(postId)

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            })
        }

        const existingLike = await likeModel.findOne({
            post: postId,
            user: user.username
        })

        if (existingLike) {
            return res.status(400).json({
                message: "Post already liked"
            })
        }

        const like = await likeModel.create({
            post: postId,
            user: user.username
        })

        return res.status(201).json({
            message: "Post liked successfully",
            like
        })

    } catch (error) {
        console.error("Like error:", error)

        return res.status(500).json({
            message: "Internal server error"
        })
    }
}



export const unLikePostController = async (req, res) => {
    try {
        const postId = req.params.postId
        const user = await userModel.findById(req.user.id).select("username")

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        const isLiked = await likeModel.findOne({
            post: postId,
            user: user.username
        })

        if (!isLiked) {
            return res.status(400).json({
                message: "Post didn't like"
            })
        }

        await likeModel.findOneAndDelete({ _id: isLiked._id })

        return res.status(200).json({
            message: "post un liked successfully."
        })
    } catch (error) {
        console.error("Unlike error:", error)

        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const getFeedController=async(req,res)=>{
    try {
        const user=await userModel.findById(req.user.id).select("username").lean()
        if(!user){
            return res.status(404).json({message:"User not found"})
        }

        const posts=await postModel.find().populate("user").lean()
        const feed=await Promise.all(posts.map(async (post)=>{
            const isLiked=await likeModel.exists({
                user:user.username,
                post:post._id
            })
             const likesCount = await likeModel.countDocuments({
            post: post._id
        })

            return {...post,isLiked:!!isLiked, likesCount }
        }))

        return res.status(200).json({message:"feed fetched successfully",posts:feed})
    }catch (error) {
        console.error("Get feed error:",error)
        return res.status(500).json({message:"Internal server error"})
    }   }