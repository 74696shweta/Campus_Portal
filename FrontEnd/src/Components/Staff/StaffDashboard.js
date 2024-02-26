import axios from "axios";
import '../../Style/AdminDash.css';
import React, { useContext, useEffect, useState } from "react";
import {NavLink, useNavigate} from 'react-router-dom'

export function StaffDashboard(){
    const [name, setName] = useState('')
    const [role, setRole] = useState('')
    
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    useEffect(()=>{
        axios.get('http://localhost:9800/student/staff-session')
        .then(res => {
            console.log(res)
            if(res.data.valid){
                setRole(res.data.role)
                setName(res.data.username)
                setIsLoggedIn(true);
                // if(role == "Admin") {
                //   navigate("/dashboard")
                // }
            } else {
              navigate("/stafflogin")
            }
        }).catch(err=> console.log(err))
    },[]);
    const Logout = () => {
      axios.get('http://localhost:9800/student/logout').then(res => {
          console.log("user logged out..")
          setIsLoggedIn(false);
          navigate("/")
      });
    }
    return(
        <>
            <header>
  {/* <!-- Sidebar --> */}
  <nav id="sidebarMenu" className="collapse d-lg-block sidebar collapse">
    <div className="position-sticky">
      <div className="list-group list-group-flush mx-3 mt-4">
        <br />
        <NavLink to="/staff" className="list-group-item list-group-item-action" style={{backgroundColor: "white",color: "black",marginTop: "10px"}}>
          <i className="fas fa-tachometer-alt fa-fw me-3"></i><span>Main dashboard</span>
        </NavLink>
        <NavLink to="/staff/notice" className="list-group-item list-group-item-action py-2 ripple " >
        <i className="fas fa-flag" style={{marginRight: "15px"}}></i>
        <span>Notice Board</span>
        </NavLink>
        <NavLink to="/staff/tempimage" className="list-group-item list-group-item-action py-2 ripple " >
        <i className="fas fa-flag" style={{marginRight: "15px"}}></i>
        <span>Approve Images</span>
        </NavLink>
       

        <NavLink to="/staff/showimage" className="list-group-item list-group-item-action py-2 ripple"><i className="fas fa-images" style={{marginRight: "15px"}}>
          </i><span>Gallary</span></NavLink>
        
        <NavLink to='/admin/staffprofile' className='list-group-item list-group-item-action py-2 ripple' style={{marginBottom: "0px",borderRadius: "10px",fontWeight:"bolder"}}><i className="fa-regular fa-user" style={{marginRight: "15px"}}></i>Profile</NavLink>
          <NavLink to="/" onClick={Logout} className='list-group-item list-group-item-action py-2 ripple'> <i className="fas fa-sign-out-alt pe-2" style={{marginRight: "15px"}}></i>Logout</NavLink>
      </div>
     
    </div>
  </nav>
  {/* <!-- Sidebar --> */}

  {/* <!-- Navbar --> */}
  <nav id="main-navbar" className="navbar navbar-expand-lg fixed-top" style={{backgroundColor: "#223d50"}}>
    {/* <!-- Container wrapper --> */}
    <div className="container-fluid">
      {/* <!-- Toggle button --> */}
      <button className="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#sidebarMenu"
        aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
        <i className="fas fa-bars"></i>
      </button>

      {/* <!-- Brand --> */}
      <NavLink className="navbar-brand" to="#" style={{marginLeft: "20px",display:"inline"}}>
        <img src="https://p1.hiclipart.com/preview/213/1021/220/google-logo-background-teacher-school-education-student-world-teachers-day-learning-teacher-education-png-clipart-thumbnail.jpg" height="70" alt="Logo" style={{borderRadius: "50px"}} />
          <i style={{color: "white",marginLeft: "20px"}}>{isLoggedIn == true ? `Welcome, ${name}` : " "}</i>
      </NavLink>
      
     
     </div>

  </nav>

</header>

<main style={{marginTop: "58px;"}}>
  <div className="container pt-4"></div>
</main>
        </>
    )
}