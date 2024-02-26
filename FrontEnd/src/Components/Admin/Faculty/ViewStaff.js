import { useLocation, NavLink } from "react-router-dom"
import { Dashboard } from "../Dashboard"
import '../../../Style/ViewPage.css'
import { useState } from "react"

function ViewStaff(){

   

    const {state}  = useLocation()
    console.log(state)
    const [Image , setImage] = useState(state.image);
    return(


        <>
 <Dashboard/>

<div className="student-profile py-4" style={{marginTop: "90px",marginLeft: "100px"}}>
  <div className="container">
    <div className="row">

      <h2 style={{marginBottom: "50px"}}>Staff Detail</h2>
      <div className="col-lg-4">
        <div className="card shadow-sm">
          <div className="card-header bg-transparent text-center">
            <img className="profile_img" src= {Image} />
            <h3>{state.fullname}</h3>
          </div>
          <div className="card-body">
            <p className="mb-0"><strong className="pr-1">Staff ID : </strong>{state.staffid}</p>
            <p className="mb-0"><strong className="pr-1">Position : </strong>{state.role}</p>
            <p className="mb-0"><strong className="pr-1">Department : </strong>{state.department}</p>
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
                <td>{state.email}</td>
              </tr>
              <tr>
                <th width="30%">Education	</th>
                <td width="2%">:</td>
                <td>{state.education}</td>
              </tr>
              <tr>
                <th width="30%">Gender</th>
                <td width="2%">:</td>
                <td>{state.gender}</td>
              </tr>
              <tr>
                <th width="30%">Date of Birth</th>
                <td width="2%">:</td>
                <td>{state.dob}</td>
              </tr>
              <tr>
                <th width="30%">Mobile Number</th>
                <td width="2%">:</td>
                <td>{state.mobile}</td>
              </tr>
            </table>

           
          </div>
        </div>
      </div>
      <br /><br /><br /><br /> 
      <NavLink to="/admin/staff" className="btn btn-primary" style={{marginTop: "50px" , width: "20%", borderRadius: "5px", marginLeft: "60px"}}> BACK </NavLink>
    </div>
  </div>
</div>
        
        
        </>



    )



}

export default ViewStaff