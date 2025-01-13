import { redis } from "../lib/redis.js"
import User from "../models/user.model.js"
import jwt from "jsonwebtoken";



const generateTokens = (userId) =>{
const accessToken = jwt.sign({ userId}, process.env.ACCESS_TOKEN_SECRET,{
   expiresIn: "15m",
})

const refreshToken = jwt.sign({ userId}, process.env.REFRESH_TOKEN_SECRET,{
   expiresIn : "7d",
})
return {accessToken,refreshToken};
}

const storerefreshToken = async(userId,refreshToken) => {
   await redis.set(`refresh_token:${userId}`,refreshToken,"EX",7*24*60*60)
}

const setCookies = (res,accessToken,refreshToken) => {
   res.cookie("accessToken",accessToken,{
   httpOnly : true,  //prevent xss attacks,cross site scripting attack
   secure: process.env.NODE_ENV == "production",
   sameSite : "strict", //prevents csrf attack,croos-site request forgery attack
   maxAge: 15 * 60 * 10000,
 })

   res.cookie("refreshToken",refreshToken,{
   httpOnly : true,  //prevent xss attacks,cross site scripting attack
   secure: process.env.NODE_ENV == "production",
   sameSite : "strict", //prevents csrf attack,croos-site request forgery attack
   maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
 })
}
export const signup = async (req,res) =>{
const { name,email,password} = req.body;

try {
    const userExists = await User.findOne({email})

    if(userExists){
    
    return res.status(400).json({ message : "User already exists" })
    
    }
    
    const user = await User.create({name,email,password})

    //authenticate
    const {accessToken,refreshToken} = generateTokens(user._id)
    await storerefreshToken(user._id,refreshToken)

    setCookies(res,accessToken,refreshToken)
    
    res.status(201).json({user: {
      _id : user._id,
      name : user.name,
      email : user.email,
      role : user.role,
    },
    message : "User created sucessfully",
   });
    
 }   

 catch (error) {
   res.status(500).json({message: error.message});
}
}
export const login = async (req,res) =>{
res.send("signup");
            
}

export const logout = async (req,res) =>{
res.send("signup");
 }



