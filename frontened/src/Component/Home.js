import React from 'react'
// import { useContext } from 'react'
// import notecontext from '../context/notes/Notecontext'
import Notes from './Notes'

export default function Home() {
  // const context=useContext(notecontext)
  // const {notes,setnotes}=context;
  // console.log(notes.title);
  
//   useEffect(() => { 
//     a.update()
//     //eslint-disable-next-line
// },[])

  return (
    <>
      {/* this is home page about {a.state.name} and he studying in {a.state.class} */}
      
      <Notes/>
    </>
  )
}
