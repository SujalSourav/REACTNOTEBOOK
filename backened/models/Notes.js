const mongoose=require('mongoose')
const notesschema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
       
    }
    ,
    author:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})
const Notes=mongoose.model('Notes',notesschema)
module.exports=Notes