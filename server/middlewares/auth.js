import  jwt  from "jsonwebtoken";

// Middleware function to decode jwt token to get clerkId
const authUser = async (req,res, next)=>{
    try {
       const {token} = req.headers 

       if(!token){
        res.status(401).json({success:false, message:"Not Authorized login again!"})
       }

       const token_decode = jwt.decode(token)
       console.log(token_decode);
       
       //    req.body.clerkId = 'user_2nqyPylJ84G1Xzw8XlwBDxkALeJ'
       req.body.clerkId = token_decode.clerkId
       next()
    } catch (error) {
        console.log(error)
        res.status(403).json({success:false,message:error.message})
    }
}

export default authUser;