const express=require('express')
const router=express.Router()
const Notes=require('../models/Notes')
const {body}=require('express-validator')
const {query,validationResult} =require('express-validator')
const fetchuser=require('../Middleware/fetchuser')
const { findByIdAndDelete } = require('../models/User')
router.get('/fetchnotes',fetchuser,async(req,res)=>{
    try {
        const notes=await Notes.find({user:req.user.id})
        res.send(notes)
    } catch (error) {
        console.log(err.message)
        res.status(500).send("Internal error occured");
    }
   
})
router.post('/addnotes',[
    body('title','enter the tile name').isLength({min:3}),
    body('description','enter the description name').isLength({min:5}),
    body('author','enter a author name').isLength({min:3})
],fetchuser,async(req,res)=>{
    try {
        const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    const notes=await Notes.create({
        title:req.body.title,
        description:req.body.description,
        author:req.body.author,
        user:req.user.id
    })
    res.send(notes)
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal error occured");
    }
})  
router.put('/updatenotes/:id',fetchuser,async(req,res)=>{
    try {
    const {title,description,author,user}=req.body
    //create a newnote object
    const newnote={}
    if(title){
        newnote.title=title; 
    } 
    if(description){
        newnote.description=description; 
    }
    if(author){
        newnote.author=author
    }
    //find the notes to be updated and update it
    let note=await Notes.findById(req.params.id);
    if(!note){
        res.status(404).send("Not found");
    }
 
    if(note.user.toString()!==req.user.id){

        res.status(401).send("Authenication Failure");
    }
    note=await Notes.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true})

    res.json({note})
    } 
    
    catch (error) {
        console.log(error.message)
        res.status(500).send("Internal error occured");
    }
    
}) 
router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
    try {
        const {title,description,author,user}=req.body
        let note=await Notes.findById(req.params.id); 
        if(!note){ 
            res.status(404).send("Not found"); 
        }
     
        if(note.user.toString()!==req.user.id){
            res.status(401).send("Authenication Failure");
        
        }
        note=await Notes.findByIdAndDelete(req.params.id)
        res.json("Sucessfully deleted the note")
    } 
    catch (error) {
        console.log(error.message)
        res.status(500).send("Internal error occured");
    }
   

})
module.exports=router 