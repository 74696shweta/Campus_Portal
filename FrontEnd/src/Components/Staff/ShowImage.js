import React,{ useEffect,useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import axios from "axios";
import { StaffDashboard } from "./StaffDashboard";

var BASE_URL = "http://localhost:9800/admin"

export function ShowImage(){

  const [data, setData] = useState([]);
  const navigate  = useNavigate()

    // Function to fetch data using Axios
    function getimage(){
        axios.get(BASE_URL + '/image').then((res)=>{
            setData(res.data.data)
            
        }).catch((err)=>{
            console.log("Something went wrong")
        })
    }
    const imageUrl = data.image;
    const openImageInNewTab = () => {
      window.open(imageUrl, '_blank');
    };


    useEffect(()=>{

        getimage()

    },[])

   

  
    const handleDelete = (el) => {    
      let uc  =  window.confirm("Do you really want to delete this Image ? ")
            if(uc == true)
            {
                axios.post(BASE_URL + '/delete-image', {id : el._id}).then((res)=>{
                    //toast.success(res.data.message)
                    getimage()
                }).catch((err)=>{
                  console.log(err);
                    //toast.error(err.response.data.message)
                })
            }
    };

    return(

        <>
           
          <StaffDashboard/><br /><br />
 
<div className="container" style={{marginLeft: "300px",marginTop: "50px"}}>
<button type="button" className="btn btn-primary btn-lg" style={{borderRadius: "5px",marginTop: "20px"}}><NavLink to="/staff/uploadimage">Upload Image</NavLink></button> <br /><br />
  <div className="row">
    <div className="col-12">
    {data.map((e,i) => (
      <div className="card" style={{width: "18rem",display: "inline-block", padding: "8px",marginLeft: "18px",marginBottom:"10px",borderRadius:"10px solid gray"}}>
      <img className="card-img-top" src={e.image} height={"200px"} width={"200px"} onClick={openImageInNewTab} style={{cursor: "pointer"}}/>
      
      <p style={{fontSize: "15px",fontFamily: "serif"}}>{e.description}</p>
      
      <button type="button" style={{marginLeft: "220px",fontSize: "13px",width: "40px"}} className="btn btn-danger" onClick={() => handleDelete(e)}><i className="far fa-trash-alt"></i></button>
      </div>     

      
         ))}

    </div>
  </div>
</div>
        
        </>
    )
}