

import Home from './Component/Home.js';
import Navbar from './Component/Navbar.js'
import About from './Component/About.js';
import { RouterProvider,createBrowserRouter } from 'react-router-dom';
import Notestate from './context/notes/Notestate.js';
import Alert from './Component/Alert.js';
import Login from './Component/Login.js';
import Signup from './Component/Signup.js';
const router=createBrowserRouter([
  {
    path:"/home",
    element:<><Navbar/><Alert/><Home/></>
  },
  {
    path:"/about",
    element:<><Navbar/><About/></>
  },
  {
    path:"/navbar",
    element:<><Navbar/></>
  },
  {
    path:"/login",
    element:<><Navbar/><Alert/><Login/></>
  },
  {
    path:"/signup",
    element:<><Navbar/><Alert/><Signup/></>
  }
]
)

function App() {
  
  
 
  return (
    <>
    <Notestate>
    <RouterProvider router={router}/>
    </Notestate>
    </>
  );
}

export default App;
