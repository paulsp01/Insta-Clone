import userModel from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


export const register=async (req,res)=>{
    const {email,username,fullname,password,bio,profileImage}=req.body


    const isUserExist=await userModel.findOne({$or:[{email},{username}]})
   

   if (isUserExist) {
    return res.status(409).json({
        message: isUserExist.email === email
            ? "Email already exists"
            : "Username already exists"
    })
}


    const hash=await bcrypt.hash(password,10)
const user=await userModel.create({
    username,
    fullname,
    email,
    bio,
    profileImage,
    password:hash
})

const token=jwt.sign({
    id:user._id
},
process.env.JWT_SECRET,
{
    expiresIn:"1d"
}
)

res.cookie("token",token)

return res.status(201).json({message:"User created successfully",user:{
    username:user.username,
    fullname:user.fullname,
    email:user.email,
    bio:user.bio,
    profileImage:user.profileImage


}})
}


export const login=async (req,res)=>{
const username=req.body.username?.trim()
const email=req.body.email?.trim()
const {password}=req.body

    if((!username && !email) || !password){
        return res.status(400).json({message:"Username or email and password are required"})
    }

    const userQuery=username && email
        ? {username,email}
        : username
            ? {username}
            : {email}
    const user=await userModel.findOne(userQuery)

    if(!user){
        return res.status(401).json({message:"Invalid username, email, or password"})
    }

    const isPasswordMatch=await bcrypt.compare(password,user.password)

    if(!isPasswordMatch){
        return res.status(401).json({message:"Invalid username, email, or password"})
    }

    const token=jwt.sign({
    id:user._id
},
process.env.JWT_SECRET,
{
    expiresIn:"1d"
}
)

res.cookie("token",token)

return res.status(201).json({message:"User logged in successfully",user:{
    username:user.username,
    email:user.email,
    bio:user.bio,
    profileImage:user.profileImage


}})

}

export const getProfileById=async (req,res)=>{
const userId=req.params.id

const user=await userModel.findById(userId)

if(!user){
    return res.status(409).json({message:"User not found"})
}

return res.status(200).json({message:"user fetched successfully",user})
}