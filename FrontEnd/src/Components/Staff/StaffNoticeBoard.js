import React,{ useEffect,useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import axios from "axios";
import { StaffDashboard } from "./StaffDashboard";

var BASE_URL = "http://localhost:9800/admin"

export function StaffNoticeBoard() {

  const [data, setData] = useState([]);
  const navigate  = useNavigate()
  axios.defaults.withCredentials = true;  
    // Function to fetch data using Axios
    function getNotice(){
        axios.get(BASE_URL + '/get-notice').then((res)=>{
            setData(res.data.data)
        }).catch((err)=>{
            console.log("Something went wrong")
        })
    }

    useEffect(()=>{

        getNotice()

    },[])

    const handleEdit = (el) => {    
        navigate('/staff/updatenotice/' + el._id , {state  : el})
    };
  
    const handleDelete = (el) => {    
      let uc  =  window.confirm("Do you really want to delete this Notice ? ")
            if(uc == true)
            {
                axios.post(BASE_URL + '/delete-notice', {id : el._id}).then((res)=>{
                    getNotice()
                }).catch((err)=>{
                  console.log(err);
                })
            }
    };


    return(
        <>
        <br /><br />
        <div>
        <StaffDashboard/></div>
<div className="container" style={{marginLeft:"250px",marginTop:"50px"}}>
<button type="button" className="btn btn-primary btn-lg" style={{borderRadius: "5px",marginTop: "20px"}}><NavLink to="/staff/addnotice">Publish Notice</NavLink></button> <br /><br />
{data.map((e,i) => (
<div className="card" style={{width: "320px" ,display: "inline-block",textAlign: "justify",margin: "10px"}}>
  <img src={e.image} width={200} height={200} className="card-img-top"  />
  <div className="card-body">
    <h5 className="card-title">Title : {e.topic}</h5>
  </div>
  <ul className="list-group list-group-flush">
    <li className="list-group-item">Description : {e.description}</li>
    <li className="list-group-item">Date : {e.eventdate}</li>
    <li className="list-group-item">Conatct Details : {e.contact}</li>
  </ul>
  <div className="card-body">
    <button type="button" className="btn btn-success" onClick={() => handleEdit(e)} style={{marginRight: "10px"}}><i className="fas fa-edit"></i></button>
    <button type="button" className="btn btn-danger" onClick={() => handleDelete(e)}><i className="far fa-trash-alt"></i></button>
  </div>
</div>
))}
</div>

        
        </>
    )
}