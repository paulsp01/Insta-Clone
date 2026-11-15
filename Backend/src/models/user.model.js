import mongoose from "mongoose"


const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Username is required"],
         unique:[true,"username already exists"]
      },
      fullname:{
         type:String,
        required:[true,"Fullname is required"],
        
      },

      email:{
        type:String,
        required:[true,"Email is required"],
        unique:[true,"Email already exists"]
      },
      password:{
        type:String,
        required:[true,"Password is required"],
      },
      bio:String,
      profileImage:{
        type:String,
        default:"https://res.cloudinary.com/j9gyeuac/image/upload/v1794681423/user.png"
      }
      

})


const userModel=mongoose.model("users",userSchema)
export default userModel