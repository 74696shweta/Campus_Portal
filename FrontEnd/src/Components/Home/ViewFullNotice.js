import React,{ useEffect,useState } from "react"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import axios from "axios";
import { Layout } from "./Layout";

var BASE_URL = "http://localhost:9800/admin"

export function ViewFullNotice() {

    const {state}  = useLocation()
    console.log(state)
    const [image , setImage] = useState(state.image);
    return(
        <>
 <Layout/>

 <br /><br /><br /><br /><br /><br />
<div className="container" style={{marginLeft:"350px",marginTop:"50px"}}>
<div className="card" style={{textAlign: "justify",margin: "10px",width: "700px"}}>
  <img src={image} width={100} className="card-img-top"  />
  <div className="card-body">
    <h5 className="card-title">Title : {state.topic}</h5>
  </div>
  <ul className="list-group list-group-flush">
    <li className="list-group-item">Description : {state.description}</li>
    <li className="list-group-item">Date : {state.eventdate}</li>
    <li className="list-group-item">Conatct Details : {state.contact}</li>
  </ul>
  <div className="card-body">
    <NavLink to="/eventnotices" className="btn btn-success" style={{marginRight: "10px"}}><i className="  fas fa-reply"></i></NavLink>
  </div>
</div>
</div>

        
        </>
    )
}