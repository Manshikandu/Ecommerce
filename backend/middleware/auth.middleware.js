import Jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req,res,next) => {
    try {
       const accessToken = req.cookies.accessToken;
       
       if(!accessToken){
        return res.status(401).json({ message: "unauthored - no access token provided"})
       } 
       try {
       const decoded = Jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET)
       const user = await User.findById(decoded.userId).select("-password")
       if(!user){
        return res.status(401).json({message : "User not found"})
       }

       req.user = user;
       next();
       } catch (error) {
        
        if(error.name === "TokenExpiredError"){
            return res.status(401).json({message: "Unauthorized - Access token expired"})
        }
        throw error;
       }
       
    } catch (error) {
        console.log("Error in  protectRoute middleware",error.message);
        return res.status(401).json({ message : "unauthoried - Invalid access token"})
    }
}

export const adminRoute = (req,res,next) => {
    if(req.user && req.user.role === "admin"){
        next()
    }
    else{
        return res.status(403).json({ message : "Access denied - Admin only"})
    }

}
//     export const customerRoute = (req,res,next) => {
//         if(req.user && req.user.role === "customer"){
//             next()
//         }
//         else{
//             return res.status(403).json({ message : "Access denied - Admin only"})
//         }
    

// }
