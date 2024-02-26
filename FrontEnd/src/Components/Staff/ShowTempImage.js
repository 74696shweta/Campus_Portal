import React,{ useEffect,useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import axios from "axios";
import { StaffDashboard } from "./StaffDashboard";

var BASE_URL = "http://localhost:9800/admin"

export function ShowTempImage(){

  const [data, setData] = useState([]);
  const navigate  = useNavigate()
  const [values, setValues] = useState({

    image: "",
    description: ""

  })
    // Function to fetch data using Axios
    function getimage(){
        axios.get(BASE_URL + '/temp-image').then((res)=>{
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

    const handleForm = (e) => {

        setValues({ ...values, [e.target.name]: e.target.value })
    
      }

   const ApproveImage = (e) => {

    navigate('/staff/approveImage/' + e._id , {state  : e})
    // let fd = new FormData()
    // fd.append('image', e.image)
    // fd.append('description', e.description)

    // axios.post(BASE_URL + "/add-image", fd)
    //   .then((response) => {
    //     console.log(response);
    //     navigate('/staff/showimage')
    //   })
    //   .catch((error) => {
    //     if (error.response) {
    //       console.log(error);
    //       console.log("server responded");
    //     } else if (error.request) {
    //       console.log("network error");
    //     } else {
    //       console.log(error);
    //     }
    //  });

   }

  
    const handleDelete = (el) => {    
      let uc  =  window.confirm("Do you really want to delete this Image ? ")
            if(uc == true)
            {
                axios.post(BASE_URL + '/delete-temp-image', {id : el._id}).then((res)=>{
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

  <div className="row">
    <div className="col-12">
    {data.map((e,i) => (
      <div className="card" style={{width: "18rem",display: "inline-block", padding: "8px",marginLeft: "18px",marginBottom:"10px",borderRadius:"10px solid gray"}}>
      <img className="card-img-top" src={e.image} height={"200px"} width={"200px"} onClick={openImageInNewTab} style={{cursor: "pointer"}}/>
      
      <h5 class="card-text"> Description : </h5><p>{e.description}</p>

      <div style={{display: "inline-block",marginTop: "5px"}}>
      <button type="button" className="btn btn-success" style={{marginRight: "5px"}} onClick={() => ApproveImage(e)}>Approve</button>
       
      <button type="button" className="btn btn-danger" onClick={() => handleDelete(e)}>Delete</button>
        </div>
      </div>     

      
         ))}

    </div>
  </div>
</div>
        
        </>
    )
}