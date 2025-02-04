import React, { useEffect } from 'react'
import { NavLink ,Link} from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
export default function Navbar() {
  let location=useLocation()
  const navigate=useNavigate()
  useEffect(() => {
    console.log(location.pathname)
  }, [location])
  const handlelogout=()=>{
    localStorage.removeItem('token')
    navigate('/login')
  }
  return (
    <> 
   <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <NavLink className="navbar-brand " to="/">Inotebook</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className={`nav-link ${location.pathname==='/home'?"active":""}`} aria-current="page" to="/home">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={`nav-link ${location.pathname==='/about'?"active":""}`} to="/about">About</NavLink>
        </li>
        
      </ul>
     {localStorage.getItem('token')===null?<form className='d-flex'>
      <Link className="btn btn-primary mx-2" to="/signup" role="button">Signup</Link>
      <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
      </form>:<button onClick={handlelogout} className="btn btn-primary">Logout</button>}
    </div>
  </div>
</nav>
    </>
      )
}
