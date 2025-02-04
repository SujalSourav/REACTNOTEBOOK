import React from "react";
import { useContext } from "react";
import Notecontext from '../context/notes/Notecontext'
export default function Alert(props) {
  const context=useContext(Notecontext)
  const {alert}=context
  return (
    <div style={{height:"50px"}}>
      {alert&&<div className={`alert alert-${alert.type} alert-dismissible fade show `} role="alert">
        <strong>{alert.message}</strong>
      </div>}
      </div>
  );
}

