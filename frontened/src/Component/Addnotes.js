import React, { useContext, useState } from "react";
import Notecontext from "../context/notes/Notecontext";

export default function Addnotes() {
    const context=useContext(Notecontext)
    const {addnote}=context
    const [note,setnote]=useState({title:"",description:"",author:""})
    const handleclick=(e)=>{
        e.preventDefault();
        addnote(note.title,note.description,note.author)
        console.log("Note added:", note);
        setnote({title:"",description:"",author:""})
       
    
    }

    const handleonchange=(e)=>{
        setnote({...note,[e.target.name]:e.target.value})
        console.log(e.target.name,e.target.value)
    }
  return (
    <div className="container my-3">
      <h1>Add Notes</h1>
      <form>
        <div className="mb-4">
          <label htmlFor="title"  className="form-label">
            Title
          </label>
          <input className="form-control" type="text" name="title" id="title" value={note.title} aria-label="default input example" onChange={handleonchange} minLength={3} required/>
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input className="form-control" type="text" name="description" id="description" value={note.description} aria-label="default input example" onChange={handleonchange} minLength={5} required/>
        </div>
        <div className="mb-4">
          <label htmlFor="author" className="form-label">
            Author
          </label>
          <input className="form-control" type="text" name="author" id="author" value={note.author} aria-label="default input example" onChange={handleonchange} required/>
        </div>
        
        <button disabled={note.title.length<3||note.description.length<5} type="submit" className="btn btn-primary" onClick={handleclick}>
          Add notes
        </button>
      </form>
      <h1>Your Notes</h1>
     
    </div>
  );
}
