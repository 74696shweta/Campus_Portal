import { Layout } from "./Layout";
import { NavLink, useLocation,useNavigate } from "react-router-dom"
import '../../Style/ViewPage.css'
import { useEffect, useState } from "react"
import axios from "axios";
var BASE_URL = "http://localhost:9800/admin"

export function Profile(){
  const [data, setData] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  function getProfile() {
    axios.get(BASE_URL + '/student-profile').then((res) => {
      setData(res.data.data)
    }).catch((err) => {
      console.log("Something went wrong")
    })
  }
  useEffect(() => {

    getProfile()

  }, [])
  const editProfile = (el) => {    
    navigate('/updatestudentprofile/' + el._id , {state  : el})
};
  axios.defaults.withCredentials = true;
    return(
        <>
        <Layout/>
        <br /><br /><br />
        <br /><br />
        <br /><br />
{data.map((e, l) => (
<div className="student-profile py-4" style={{marginLeft: "100px"}}>
  <div className="container">
    <div className="row">

      <h2 style={{marginBottom: "30px"}}>Student Profile</h2>
      <div className="col-lg-4">
        <div className="card shadow-sm">
          <div className="card-header bg-transparent text-center">
            <img className="profile_img" src= {e.image} />
            <h3>{e.fullname}</h3>
          </div>
          <div className="card-body">
            <p className="mb-0"><strong className="pr-1">Student Enroll ID:</strong>{e.enrollid}</p>
            <p className="mb-0"><strong className="pr-1">Class:</strong>{e.clas}</p>
            <p className="mb-0"><strong className="pr-1">Department:</strong>{e.department}</p>
          </div>
        </div>
      </div>
      <div className="col-lg-8">
        <div className="card shadow-sm">
          <div className="card-header bg-transparent border-0">
            <h3 className="mb-0"><i className="far fa-clone pr-1"></i>General Information</h3>
          </div>
          <div className="card-body pt-0">
            <table className="table table-bordered">
              <tr>
                <th width="30%">Email</th>
                <td width="2%">:</td>
                <td>{e.email}</td>
              </tr>
              <tr>
                <th width="30%">Academic Year	</th>
                <td width="2%">:</td>
                <td>{e.acadamicyear}</td>
              </tr>
              <tr>
                <th width="30%">Gender</th>
                <td width="2%">:</td>
                <td>{e.gender}</td>
              </tr>
              <tr>
                <th width="30%">Date of Birth</th>
                <td width="2%">:</td>
                <td>{e.dob}</td>
              </tr>
              <tr>
                <th width="30%">Mobile Number</th>
                <td width="2%">:</td>
                <td>{e.mobile}</td>
              </tr>
            </table>

           
          </div>
        </div>
      </div>
      <br /><br /><br /><br /> 
      <button onClick={() => editProfile(e)} className="btn btn-primary" style={{marginTop: "50px" , width: "20%", borderRadius: "5px", marginLeft: "60px"}}> Edit Profile </button>
    </div>
  </div>
</div>
        
        ))}

        </>
    )
}