import React from 'react'
import { useContext } from 'react';
import Notecontext from '../context/notes/Notecontext'
export default function NoteItem(props) {
    const {note,updatenote}=props;
    const context=useContext(Notecontext)
    const {showalert,deletenote}=context;
    const handledelete=(id)=>{
        deletenote(id)
      showalert("Note Deleted Successfully","success")
    }
  return (
    <div className="col-md-3 my-3">
       <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            {note.title}
          </h5>
          <p className="card-text">
           {note.description}
          </p>
          <img src="https://cdn.hugeicons.com/icons/delete-01-stroke-rounded.svg" onClick={()=>{handledelete(note._id)}} className='mx-3 icon' alt="delete-01" width="24" height="24" />
          <img src="https://cdn.hugeicons.com/icons/pencil-edit-02-stroke-rounded.svg" onClick={()=>{updatenote(note)}} className='mx-3 icon' alt="pencil-edit-02" width="24" height="24" />
        </div>
      </div>
    </div>
  )
}
