import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Notecontext from "../context/notes/Notecontext";
import { useContext } from 'react';
export default function Login() {
    const context=useContext(Notecontext);
    const {showalert}=context;
    const navigate = useNavigate();
    const url="http://localhost:5000"
    const [credential,setcredential]=useState({
        email:"",
        password:""
    })
    const handleonchange=(e)=>{
        setcredential({...credential,[e.target.name]:e.target.value})
    }
    const handlesubmit=async(e)=>{
        e.preventDefault();
         // eslint-disable-next-line
        const response = await fetch(`${url}/auth/login`, {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email:credential.email,password:credential.password}),
          });
          const json=await response.json();
          console.log(json);
          if(json.success){
            //save the auth token and redirect
            localStorage.setItem('token',json.usertoken)
            showalert("Logged In Successfully","success")
            navigate('/home')
        }
        else{
            showalert("Wrong Credentials","danger");
           
        }
          
      }
  return (
    <>
    <div className="container my-3 ">
    <h2 className='my-3'>Login To Continue To Inotebook</h2>
    <form onSubmit={handlesubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" value={credential.email} id="email" aria-describedby="emailHelp" name="email" onChange={handleonchange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" value={credential.password} id="password" name="password" onChange={handleonchange}/>
  </div>
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
</div>
</>
  )
}
