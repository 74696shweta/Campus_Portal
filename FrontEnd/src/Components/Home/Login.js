import axios from "axios";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export function Login(){
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
    useEffect(()=>{
        axios.get('http://localhost:9800/student/student-session')
        .then(res => {
            console.log(res)
            if(res.data.valid){
                navigate('/')
            } else {
                //navigate('/login')
            }
        }).catch(err=> console.log(err))
    },[]);

    useEffect(()=>{
      axios.get('http://localhost:9800/student/staff-session')
      .then(res => {
          console.log(res)
          if(res.data.valid){
              navigate('/')
          } else {
              //navigate('/login')
          }
      }).catch(err=> console.log(err))
  },[]);
    return(
        <>
            <br /><br /><br /><br /><br /><br /><br /><br />
                    <div className="card" style={{width: "18rem",border: "1px solid black",display: "inline-block", padding: "5px",marginBottom:"10px",textAlign: "center", marginLeft: "350px"}}>
                        <img className="card-img-top" src="https://static.vecteezy.com/system/resources/previews/024/781/753/original/cartoon-graduate-students-icon-free-png.png" height="200px" alt="Card image cap" />
                        <div className="card-body">
                          <h5 className="card-title">Student Login</h5>
                          <NavLink to="/studentlogin" className="btn btn-primary">Click Here to Login</NavLink>
                        </div>
                      </div>
                    <div className="card" style={{width: "18rem",border: "1px solid black",display: "inline-block", padding: "5px",marginBottom:"10px",textAlign: "center", marginLeft: "200px"}}>
                        <img className="card-img-top" src="https://cdn.iconscout.com/icon/premium/png-256-thumb/faculty-4441214-3680580.png" height="200px" alt="Card image cap" />
                        <div className="card-body">
                          <h5 className="card-title">Staff Login</h5>
                          <NavLink to="/stafflogin" className="btn btn-primary">Click Here to Login</NavLink>
                        </div>
                      </div>
        </>
    )
}