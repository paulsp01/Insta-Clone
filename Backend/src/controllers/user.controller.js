import { followModel } from "../models/follow.model.js";


export const followController=async (req,res)=>{
try {
    const followerusername=req.user.username
const followeeusername=req.params.username

const isFolloweeExist=await followModel.findOne({
  username:followeeusername
})

if(!isFolloweeExist){
    return res.status(409).json({message:`user with this username does not exist `})
}

const isAlreadyFollowing=await followModel.findOne({
    follower:followerusername,
    followee:followeeusername
})

if(isAlreadyFollowing){
    return res.status(409).json({message:`ÿou are already following ${followeeusername} `,follow:isAlreadyFollowing})
}

if(followerusername===followeeusername){
    return res.status(403).json({message:"you can not following yourself"})
}
const followRecord=await followModel.create({
    follower:followerusername,
    followee:followeeusername
})


res.status(201).json({message:`you are now following ${followeeusername}`,follow:followRecord})
} catch (error) {
     return res.status(500).json({message:"Internal server error"})
}
}



export const unfollowUser=async (req,res)=>{
try {
      const followerusername=req.user.username
     const followeeusername=req.params.username


   const isUserFollowing=await followModel.findOne({
    follower:followerusername,
    followee:followeeusername
})


if(!isUserFollowing){
    return res.status(200).json({message:`you are not following user ${followeeusername}`})
}

await followModel.findByIdAndDelete(isUserFollowing._id)
return res.status(200).json({message:`you have unfolloed ${followeeusername}`})



    
} catch (error) {
     return res.status(500).json({message:"Internal server error"})
}
}