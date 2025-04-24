import User from "../models/UserSchema.js"
import JWT from "jsonwebtoken"
import config from "../config/config.js"

export const cookieOptions= {
     expires: new Date(Date.now()+3*24*60*60*1000),httpOnly:true
    
    
    }
 /*
    * signUP
    * route : http://localhost:4000/api/v1/auth/signup
    * discription : User signup controller to create new user
    */



export const signUp = async(req,res)=>{
   
   try{

   // get info from the front-end

   const {name,email,password,phone,address} = req.body

   // validate info

   if(!name || !email || !password || !phone || !address)
    res.status(400).json({
    success : false,
    message : mandatory
   })

   // check if the user already exist in database

   const existingUser = await User.findOne({email})

   // check if the user already exist in database send a response

   if(existingUser){
    res.status(200).json({
        success : false,
        message : "user already signed up please login"
    })
   }

   // check if the user doesn't exist create a new user

const user = await User.create({
    name,
    email,
    password,
    phone,
    address
})
user.password = undefined // for password safety

   // send a success message to the user

   res.status(200).json({
    success : true,
    message : "user successfully signed up ",
    user
   })

   }catch(error){
    console.log(error);
    res.status(500).json({
        success : false,
        message :` Error in signing up ${error}` ,
        error
    })
   }
}


 /*
    * login
    * route : http://localhost:4000/api/v1/auth/login
    * discription : User login controller to login 
    */



export const login =async(req,res)=>{
    try{
        //get info from the font-end
        const {email,password,} = req.body
         // validate info

   if(!email || !password ){
    return res.status(400).json({
        success : false,
        message : "invalid email or password"
   
  
   })
}

   // check if the user already exist in database

   const user = await User.findOne({email}).select("+password")
    

    

       //if user  doesn't exist send response

       if(!user){
        res.status(404).json({
            success:false,
            message:"no user found "
        })
       }


        //if user exisist compare password
        const isPasswordMatched=await user.comparePassword(password)

        //if password doesn't match
        if(!isPasswordMatched){
            res.status(400).json({
                sucsess:false,
                message:"invalid password"
            })
        }

       //if password match  GENERATE JWTtoken
     const token=JWT.sign({id:user._id,role:user.role},config.JWT_SECRET,{expiresIn:config.JWT_EXPIRY})
         

     //fleshoutpassword
     user.password=undefined

       //setup cookie
       res.cookie("token",token,cookieOptions)

       //send success message to the sender
        res.status(200).json({
            success:true,
            message:"successfully loggedIn",
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
                role:user.role,

            },
            token
        })


    }catch(error){
        console.log(error)
        res.status(500).json({
            success:false,
            message:`error in login ${error}`,
            error
        })
    }

}

 