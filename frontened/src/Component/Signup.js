import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Notecontext from "../context/notes/Notecontext";
import { useContext } from 'react';
export default function Signup() {
    const navigate=useNavigate()
    const context=useContext(Notecontext);
    const {showalert}=context;
    const url="http://localhost:5000"
    const [credential,setcredential]=useState({name:"",email:"",password:"",address:"",city:""})
    const handleonchange=(e)=>{
        setcredential({...credential,[e.target.name]:e.target.value})
    }
    const handlesubmit=async(e)=>{
        e.preventDefault();
        const response = await fetch(`${url}/auth/createuser`, {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({name:credential.name,email:credential.email,password:credential.password,address:credential.address,city:credential.city}),
          });
          const json=await response.json()
          console.log(json)
          if(json.success){
          localStorage.setItem('token',json.usertoken)
          navigate('/login')
          showalert("Account Created Successfully","success")
          }
          else{
            showalert("Wrong Details","danger");
          }
    }
  return (
    <>
    <div className="container my-3 ">
    <h2 className='my-3'>Signup For Continue To Inotebook</h2>
    <form className="row g-3" onSubmit={handlesubmit}>
  <div className="col-md-4">
  <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" name="name" id="name"  aria-label="name"  onChange={handleonchange} minLength={5} required/>
  </div>
  <div className="col-md-4">
    <label htmlFor="email" className="form-label">Email</label>
    <input type="email" className="form-control" id="email"  name="email" onChange={handleonchange} required/>
  </div>
  <div className="col-md-4">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password"  name="password" onChange={handleonchange} required minLength={5}/>
  </div>
  <div className="col-md-6">
    <label htmlFor="address" className="form-label">Address</label>
    <input type="text" className="form-control" id="address" name="address"onChange={handleonchange} required/>
  </div>
  
  <div className="col-md-6">
    <label htmlFor="city" className="form-label">City</label>
    <input type="text" className="form-control" id="city"  name="city" onChange={handleonchange}/>
  </div>
 
  <div className="col-12">
    <button type="submit" className="btn btn-primary">Sign in</button>
  </div>
</form>
</div>
    </>
  )
}

