import app from "./src/App.js";
import colors from "colors";
import mongoose from "mongoose";
import config from "./src/config/config.js";
(async(req,res)=>{
    try{
        await mongoose.connect(config.MONGODB_URL)
        console.log("succsessfully connected to MONGODB".bgBlack.blue)
}catch(error){
    console.log(`Error in DB Connection ${error}`.bgRed.white)
   
}
})()
const PORT =config.PORT
app.listen(PORT,()=>{
    console.log(`App is running at PORT : ${PORT} Succesfully`.america)
})
