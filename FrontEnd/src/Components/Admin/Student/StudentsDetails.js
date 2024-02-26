import { Dashboard } from "../Dashboard";
import React,{ useEffect,useState } from "react"
import { useNavigate,NavLink } from "react-router-dom"
import axios from "axios";

var BASE_URL = "http://localhost:9800/admin"

export function StudentsDetails(){

  const [data, setData] = useState([]);
  const navigate  = useNavigate()
  const [isblock, setBlock] = useState(false);
    // Function to fetch data using Axios
    function getStudents(){
        axios.get(BASE_URL + '/get-student').then((res)=>{
            setData(res.data.data)
        }).catch((err)=>{
            console.log("Something went wrong")
        })
    }

    useEffect(()=>{

        getStudents()

    },[])
    axios.defaults.withCredentials = true;

    const handleViewmore=  (el) =>{
      navigate('/admin/viewstudents/' + el._id , {state  : el})
    }

    const handleBlock = (el) => {    
      axios.post(BASE_URL + '/block-student', {id : el._id}).then((res)=>{
        // axios.post(BASE_URL + '/checkblocked-student').then((res) => {
        //   setBlock(true);
        // }).catch((err) => {console.log(err)})
        getStudents()
    }).catch((err)=>{
      console.log(err);
    })
    };

    const handleUnBlock = (el) => {    
      axios.post(BASE_URL + '/unblock-student', {id : el._id}).then((res)=>{
        //setBlock(false);
        getStudents()
    }).catch((err)=>{
      console.log(err);
    })
    };

  
    const handleDelete = (el) => {    
      let uc  =  window.confirm("Do you really want to remove the Student Data ? ")
            if(uc == true)
            {
                axios.post(BASE_URL + '/delete-student', {id : el._id}).then((res)=>{
                   
                    getStudents()
                }).catch((err)=>{
                  console.log(err);
                  
                })
            }
    };

    return(

        <>
           <Dashboard/>
<br /><br /><br />
 
<div className="container" style={{marginLeft: "270px",marginTop: "50px"}}>
<button type="button" className="btn btn-primary btn-lg" style={{borderRadius: "5px",marginTop: "20px"}}><NavLink to="/admin/addstudent">Add Student</NavLink></button> <br /><br />
  <div className="row">
    <div className="col-12">
    {data.map((e,i) => (
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Enrollment Id</th>
            <th scope="col">Full Name</th>
            <th scope="col">Email</th>
            <th scope="col">Mobile No.</th>
            <th scope="col">Gender</th>
            <th scope="col">Date Of Birth</th>
            <th scope="col">Acadamic Year</th>
            <th scope="col">Department</th>
            <th scope="col">Class</th>
            <th scope="col">Image</th>
            {/* <th scope="col">Blocked</th> */}
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
          
            <th scope="row">{e.enrollid}</th>
            <td>{e.fullname}</td>
            <td>{e.email}</td>
            <td>{e.mobile}</td>
            <td>{e.gender}</td>
            <td>{e.dob}</td>
            <td>{e.acadamicyear}</td>
            <td>{e.department}</td>
            <td>{e.clas}</td>
            <td><img src={e.image} width='100px' height='100px' /></td>
            {/* <td>{e.block}</td> */}
            <td>
              <button type="button" style={{height: "40px",width: "50px"}} className="btn btn-primary" onClick={() => handleViewmore(e)}><i className="far fa-eye"></i></button>
              {/* { !isblock ?  
              // <button type="button" style={{height: "40px",width: "50px"}} className="btn btn-success" onClick={() => handleBlock(e)}>
                // <i class="fa-regular fa-circle"></i></button> 
              // {/* :  */}
              {/* <button type="button" style={{height: "40px",width: "50px"}} className="btn btn-success" onClick={() => handleUnBlock(e)}>
                <i className="fa-solid fa-ban"></i></button>  */}
              {/* } */}
            <button type="button" style={{height: "40px",width: "50px"}} className="btn btn-danger" onClick={() => handleDelete(e)}><i className="far fa-trash-alt"></i></button>
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