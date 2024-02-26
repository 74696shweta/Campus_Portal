
import axios from 'axios';
import '../../Style/AdminDash.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function Dashboard() {
  const [name, setName] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [id,setID] = useState('');
  const navigate = useNavigate();
  const [dashData , setDashData] = useState({})
   
  function getDashboard(){

    axios.get('http://localhost:9800/admin/dashboard-data').then((result)=>{
        setDashData(result.data.data)
    }).catch((err)=>{
        console.log(err)
    })
}
  
  useEffect(()=>{
        axios.get('http://localhost:9800/student/staff-session')
        .then(res => {
            console.log(res)
              if(res.data.valid){
                setName(res.data.username)
                setIsLoggedIn(true);
                setID(res.data._id)
              } else {
                navigate("/login")
              }
        }).catch(err=> console.log(err))
    },[]);
  axios.defaults.withCredentials = true;  
  const Logout = () => {
    //axios.get('http://localhost:9800/student/logout',{withCredentials : true}).then(res => {
        const response = axios.get('http://localhost:9800/student/logout',{withCredentials: true})
        if (response.ok) {
          console.log("user logged out..")
          setIsLoggedIn(false);
          window.location.href = '/';
        } else {
            console.error('Logout failed');
        }
        
        //navigate("/")
   // });
  
}
const handleViewmore=  (el) =>{

  navigate('/admin/viewstudents/' + el._id , {state: el})


}
  return(
        <>

            {/* <!--Main Navigation--> */}
<header>
  {/* <!-- Sidebar --> */}
  <nav id="sidebarMenu" className="collapse d-lg-block sidebar collapse" >
    <div className="position-sticky">
      <div className="list-group list-group-flush mx-3 mt-4">
        <NavLink to="/dashboard" className="list-group-item list-group-item-action" style={{backgroundColor: "white",color: "black",marginTop: "10px"}}>
          <i className="fas fa-tachometer-alt fa-fw me-3"></i><span>Main dashboard</span>
        </NavLink>
        <NavLink to="/admin/noticeboard" className="list-group-item list-group-item-action py-2 ripple"><i className="fas fa-flag" style={{marginRight: "15px"}}></i>
        <span><b>Notice Board</b></span>
        </NavLink>
        <NavLink to="/admin/students" className="list-group-item list-group-item-action py-2 ripple"><i className="fa-solid fa-graduation-cap" style={{marginRight: "10px"}}></i><span>Students</span></NavLink>

        <NavLink to="/admin/staff" className="list-group-item list-group-item-action py-2 ripple"><i className="fas fa-chalkboard-teacher" style={{marginRight: "10px"}}></i><span>Faculty</span></NavLink>

        <NavLink to="/admin/adminside" className="list-group-item list-group-item-action py-2 ripple">
        <i className="fa-solid fa-building-columns" style={{marginRight: "10px"}}></i><span>Admin</span>
        </NavLink>

        {/* <NavLink to="/admin/gallery" className="list-group-item list-group-item-action py-2 ripple">
        <i className="fa-solid fa-building-columns" style={{marginRight: "10px"}}></i><span>Gallery</span>
        </NavLink> */}
        
        <NavLink to='/admin/adminprofile' className='list-group-item list-group-item-action py-2 ripple' style={{borderRadius: "10px",fontWeight:"bold"}}><i className="fa-regular fa-user" style={{marginRight: "12px"}}></i>Profile</NavLink>
          <NavLink to="/" onClick={() => Logout()} className='list-group-item list-group-item-action py-2 ripple'> <i className="fas fa-sign-out-alt pe-2"></i>Logout</NavLink>
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
        aria-controls="sidebarMenu" aria-expanded="true" aria-label="Toggle navigation">
        <i className="fas fa-bars"></i>
      </button>

      {/* <!-- Brand --> */}
      <div className="navbar-brand" href="#" style={{marginLeft: "20px",display:"inline"}}>
        <img src="https://static.vecteezy.com/system/resources/previews/009/636/683/original/admin-3d-illustration-icon-png.png" height="60" alt="Logo" onClick="/dashboard"
          loading="lazy" style={{marginRight: "15px"}} />
          <i style={{color: "white"}}>{isLoggedIn == true ? `Welcome, ${name}` : " "}</i>
      </div>
    </div>

  </nav>

</header>

        </>
    )
}