import React from "react";
import { useContext } from "react";
import { useState } from "react";
import Notecontext from "../context/notes/Notecontext";
import NoteItem from "./NoteItem";
import { useEffect,useRef } from "react";
import Addnotes from "./Addnotes";
import { useNavigate } from "react-router-dom";
export default function Notes() {
  const context = useContext(Notecontext);
  const { notes, fetchnote,showalert,editnotes } = context;
  const navigate=useNavigate()
  useEffect(() => {
    if(localStorage.getItem('token')===null){
      navigate('/login')
     
    }
    else{
      fetchnote();
    }
   
    // eslint-disable-next-line
  }, []);
const ref = useRef(null)
const cref=useRef(null)
const [note,setnote]=useState({id:"",etitle:"",edescription:"",eauthor:""})
const updatenote=(note)=>{
  ref.current.click();
  setnote({id:note._id,etitle:note.title,edescription:note.description,eauthor:note.author})
  
}
const handleclick=(e)=>{
  console.log("updated note is ",note);
  cref.current.click();
  showalert("Note Updated Sucessfully","primary")
  editnotes(note.id,note.etitle,note.edescription,note.eauthor)



}

const handleonchange=(e)=>{
  setnote({...note,[e.target.name]:e.target.value})
  console.log(e.target.name,e.target.value)
 
  
}
  return (
    <>
      <Addnotes />
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Modal title
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
            <form>
        <div className="mb-4">
          <label htmlFor="etitle"  className="form-label">
            Title
          </label>
          <input className="form-control" type="text" name="etitle" id="etitle" value={note.etitle} aria-label="default input example" onChange={handleonchange} minLength={3} required/>
        </div>
        <div className="mb-4">

          <label htmlFor="edescription" className="form-label">
            Description
          </label>
          <input className="form-control" type="text" name="edescription" id="edescription" value={note.edescription} aria-label="default input example" onChange={handleonchange} minLength={5} required/>
        </div>
        <div className="mb-4">
          <label htmlFor="author" className="form-label">
            Author
          </label>
          <input className="form-control" type="text" name="eauthor" id="eauthor" value={note.eauthor} aria-label="default input example" onChange={handleonchange} required/>
        </div>
      </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={cref}
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleclick}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row my-3 mx-1">
          {notes.length===0&&'No Notes to display'}
          {notes.map((note) => {
            return <NoteItem note={note} key={note._id} updatenote={updatenote}/>;
          })}
        </div>
      </div>
    </>
  );
}
