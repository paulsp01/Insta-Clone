import mongoose from "mongoose"


const postSchema=new mongoose.Schema({
    caption:{
        type:String,
       default:""
      },

      image:{
        type:String,
        required:[true,"imageurl is required for create a post"],
       
      },
      user:{
        ref:"users",
        type:mongoose.Schema.Types.ObjectId,
        required:[true, "user id is required for creating post"]
      }

})

const postModel=mongoose.model("posts",postSchema)
export default postModel