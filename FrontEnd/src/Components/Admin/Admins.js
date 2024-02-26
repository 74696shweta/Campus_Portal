import { Dashboard } from "./Dashboard";
import React,{ useEffect,useState } from "react"
import { useNavigate,NavLink } from "react-router-dom"
import axios from "axios";

var BASE_URL = "http://localhost:9800/admin"

export function Admins(){

  const [data, setData] = useState([]);
  const navigate  = useNavigate()

    // Function to fetch data using Axios
    function getStaff(){
        axios.get(BASE_URL + '/admin').then((res)=>{
            setData(res.data.data)
        }).catch((err)=>{
            console.log("Something went wrong")
        })
    }

    useEffect(()=>{

        getStaff()

    },[])

    const handleViewmore=  (el) =>{

      navigate('/admin/viewstaff/' + el._id , {state  : el})


  }

    const handleEdit = (el) => {    
        navigate('/admin/updatestaff/' + el._id , {state  : el})
    };
  
    const handleDelete = (el) => {    
      let uc  =  window.confirm("Do you really want to delete this product ? ")
            if(uc == true)
            {
                axios.post(BASE_URL + '/delete-staff', {id : el._id}).then((res)=>{
                    
                    getStaff()
                }).catch((err)=>{
                  console.log(err);
                   
                })
            }
    };

    return(

        <>
           <Dashboard/>

 <br /><br /><br /><br /><br />
<div className="container" style={{marginLeft: "300px"}}>
<button type="button" className="btn btn-primary btn-lg" style={{borderRadius: "5px",marginTop: "20px"}}><NavLink to="/admin/addstaff">Add Admin</NavLink></button> <br /><br />
  <div className="row">
    <div className="col-12">
    {data.map((e,i) => (
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Admin Id</th>
            <th scope="col">Full Name</th>
            <th scope="col">Email</th>
            <th scope="col">Mobile No.</th>
            <th scope="col">Gender</th>
            <th scope="col">Date Of Birth</th>
            <th scope="col">Eductaion History</th>
            <th scope="col">Department</th>
            <th scope="col">Role</th>
            <th scope="col">Image</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
          
            <th scope="row">{e.staffid}</th>
            <td>{e.fullname}</td>
            <td>{e.email}</td>
            <td>{e.mobile}</td>
            <td>{e.gender}</td>
            <td>{e.dob}</td>
            <td>{e.education}</td>
            <td>{e.department}</td>
            <td>{e.role}</td>
            <td><img src={e.image} width='100px' height='100px' /></td>
            <td>
              <button type="button" className="btn btn-primary" style={{height: "40px" , width: "50px"}} onClick={() => handleViewmore(e)}><i className="far fa-eye"></i></button>
              {/* <button type="button" className="btn btn-success" onClick={() => handleEdit(e)}><i className="fas fa-edit"></i></button> */}
            <button type="button" className="btn btn-danger" style={{height: "40px", width: "50px"}} onClick={() => handleDelete(e)}><i className="far fa-trash-alt"></i></button>
            </td>
          </tr>
       
        </tbody>
      </table>
         ))}
    </div>
  </div>
</div>
        
        </>
    )
}