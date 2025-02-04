const mongoose=require('mongoose')
let url="mongodb+srv://19winsujal:RgOGbINgWBOCkWzF@cluster0.ptxtx.mongodb.net/inotebook"
const connecttomongoose=async () => {
    try{
        let URL=await mongoose.connect(url)
    console.log("connection established")
    }
    catch(e){
        console.log("failed",e);
        
    }
    
}
module.exports=connecttomongoose;