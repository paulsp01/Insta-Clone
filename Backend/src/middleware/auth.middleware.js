import jwt from "jsonwebtoken"

export const authenticate = (req, res, next) => {
   try {
      const token=req.cookies.token
    
        if(!token){
            return res.status(401).json({
                message:"Token is not found"
            })
        }
    
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
         if(!decoded){
            return res.status(401).json({
                message:"User not authorized"
            })
        }
     
        req.user=decoded
       next()
    
   } catch (error) {
    
   }
}
