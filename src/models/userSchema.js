import mongoose  from "mongoose";
import AuthRoles from "../utils/AuthRoles.js";
import bcrypt from "bcrypt"
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is required"],
        trim:true,
        maxLength:[25,"name should not exceed 25 characters"]
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true,
    },
    password:{
        type:String,
        minlength:[8,"atleast contain 8 character"],
        select:false,
    },
    phone:{
        type:String,
        maxlength:[120,"do not exceed 120 characters"],
        trim:true,
        required:[true,"adress is required"],
    },
    role:{
        type:String,
        enum:Object.values.AuthRoles,
        default:AuthRoles.USER,
    }
},{timestamps:true})
//mongoose hooks:pre()//
userSchema.pre("save",async function(next){
    if(!this. isModified("password"))return next()
        this.password=await bcrypt.hash(this.password,10)
})

//schema Methods
userSchema.methods={
    comparePassword: async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password)

 }
}

export default mongoose.model("Users",userSchema)