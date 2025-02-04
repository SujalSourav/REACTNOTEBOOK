
import Notecontext from './Notecontext';
import { useState } from 'react';
const Notestate=(props)=>{
  const url="http://localhost:5000"
    // let [state,setstate]=useState({
    //     "name":"vivek",
    //     "class":"5b"
    // })
    // const update=()=>{
    //     setTimeout(() => {
    //         setstate({
    //             "name":"anish",
    //             "class":"10b" 
    //         })
    //     }, 1000);
        
    // }  
    const [alert,setalert]=useState(null)
    const showalert=(message,type)=>{
      setalert({
        message:message,
        type:type
      })
      setTimeout(() => {
        setalert(null)
      }, 3000);
    }
  //   const noteinitial=[{
  //     "_id": "6652a7bae22ab9a419853e26",
  //     "user": "6652a70b9d2c631472c7ecb7",
  //     "title": "my title name is vivek kumar1jjk yo oy",
  //     "description": "this is a notebook",
  //     "author": "this is written by vivek kumar",
  //     "date": "2024-05-26T03:08:42.823Z",
  //     "__v": 0
  //   },
  //   {
  //     "_id": "6653f08b40e18f17ce64e83b",
  //     "user": "6652a70b9d2c631472c7ecb7",
  //     "title": "my title name is vivek kumar1jjk yo oy",
  //     "description": "this is a notebook",
  //     "author": "this is written by vivek kumar",
  //     "date": "2024-05-27T02:31:39.240Z",
  //     "__v": 0
  //   },
  //   {
  //     "_id": "6653f08b40e18f17ce64e83b1",
  //     "user": "6652a70b9d2c631472c7ecb7",
  //     "title": "my title name is vivek kumar1jjk yo oy",
  //     "description": "this is a notebook",
  //     "author": "this is written by vivek kumar",
  //     "date": "2024-05-27T02:31:39.240Z",
  //     "__v": 0
  //   }
  // ]
    
      const [notes,setnotes]=useState([])

      //fetch all notes
      const fetchnote=async()=>{
        // eslint-disable-next-line
        const response = await fetch(`${url}/notes/fetchnotes`, {
          method: "GET", 
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token')
          },
         // eslint-disable-next-line
         
        });
        
        const json=await response.json()
        console.log(json)
        setnotes(json)
      }

      //Add a notes
      //in order to add a note we require title,description,author
      const addnote=async(title,description,author)=>{
        // eslint-disable-next-line
        const response = await fetch(`${url}/notes/addnotes`, {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token')
          },
         // eslint-disable-next-line
          body: JSON.stringify({title,description,author}),
        });
        
        console.log("notes added")
      const json=await response.json()
      console.log(json)
        setnotes(notes.concat(json));
      }

      //edit a notes
     const editnotes=async(id,title,description,author)=>{
      const response = await fetch(`${url}/notes/updatenotes/${id}`, {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
        },
       
        body: JSON.stringify({title,description,author})
      });
      
      let json =await response.json()
      console.log(json)
      for(let i=0;i<notes.length;i++){
        if(notes[i]._id===id){
          notes[i].title=title;
          notes[i].description=description;
          notes[i].author=author
        }
      }
     }


      //delete a note
      const deletenote=async(id)=>{
        const response = await fetch(`${url}/notes/deletenote/${id}`, {
          method: "DELETE", 
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token')
          },
         // eslint-disable-next-line
          
        });
        console.log("deleting the node with this id"+id)
        const delnote=notes.filter((notes)=>{return notes._id!==id})
        setnotes(delnote);
        console.log("the notes id"+notes._id)
        
      }
    return (
        <Notecontext.Provider value={{notes,setnotes,addnote,deletenote,editnotes,alert,showalert,fetchnote}}>
            {props.children}
        </Notecontext.Provider>
    )
}
export default Notestate;