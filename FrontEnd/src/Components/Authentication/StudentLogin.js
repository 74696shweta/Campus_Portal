import { useEffect, useState } from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
var BASE_URL = "http://localhost:9800/student";

export function StudentLogin(){
    const navigate = useNavigate()
    const [values, setValues ] =  useState({
        email   :"",
        password : ""
    })
    axios.defaults.withCredentials = true;
    const handleLogin = async () => {
      try {
        // Validate email format
        let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailRegex.test(values.email)) {
          document.getElementById("em").innerHTML = "Please Enter Valid Email";
          return;
        } else {
          document.getElementById("em").style.display = "none";
        }
    
        // Validate password
        if (values.password === "") {
          document.getElementById("pass").innerHTML = "Please Enter Password";
        } else if (values.password.length < 6) {
          document.getElementById("pass").innerHTML = "Please Enter At Least 6 Digit Password";
        } else {
          document.getElementById("pass").style.display = "none";
    
          // Make the login request
          const result = await axios.post(BASE_URL + '/student-login', values);
    
          if (result.data.data.valid) {
            // Successful login
            window.alert("Login successfully");
            console.log(result);
            navigate('/');
          } else {
            // Unsuccessful login
            window.alert("Invalid email or password. Please check your credentials.");
          }
        }
      } catch (error) {
        window.alert("An error occurred. Please check your Email and password are valid or not...");
        console.error(error);
      }
    };
    
    useEffect(() => {
      axios.get(BASE_URL + '/student-session').then(res => {
        if(res.data.valid){
          navigate('/')
        }else {
          //navigate('/studentlogin')
        }
      }).catch(err => console.log(err))
    })

    const handleInputs  = (e) =>{
        setValues(prev => ({...prev ,  [e.target.name] : e.target.value}))
    }

    return(
        <>
<section className="vh-100">
  <div className="container-fluid h-custom">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-md-9 col-lg-6 col-xl-5">
        <img src="https://as1.ftcdn.net/v2/jpg/03/08/39/90/1000_F_308399062_pxdgweXVxocmqA617fhcmhfl1mbQZ4EF.jpg"
          className="img-fluid" alt="Sample image" />
      </div>
      <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        <h1 style={{marginBottom: "50px", color: "#223d50"}}>Student Login Page</h1>
          {/* <!-- Email input --> */}
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="form3Example3" style={{color: "#223d50", fontSize: "18px"}}>Email address</label>
            <input type="email" name='email' value={values.email}  onChange={handleInputs} id="form3Example3" className="form-control form-control-lg"
              placeholder="Enter a valid email address" />
              <i id='em' style={{color: "red"}}></i>
          </div>

          {/* <!-- Password input --> */}
          <div className="form-outline mb-3">
              <label className="form-label" htmlFor="form3Example4" style={{color: "#223d50", fontSize: "18px"}}>Password</label>
            <input type="password" name='password' value={values.password} onChange={handleInputs} id="form3Example4" className="form-control form-control-lg" placeholder="Enter password" />
            <i id='pass' style={{color: "red"}}></i>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            {/* <!-- Checkbox --> */}
            <div className="form-check mb-0">
              <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
              <label className="form-check-label" htmlFor="form2Example3">
                Remember me
              </label>
            </div>
          
          </div>
          <button className="btn btn-success" onClick={() => handleLogin()} style={{marginTop: "80px", width: "100%"}}>Login</button>
          <span  style={{marginTop : "20px"  , fontWeight : "bold" ,  textAlign  :"right" ,  float  :"right"}}>Forgot Your Password ? <NavLink to="/reset-password" onClick={()=> navigate('/reset-password')} style={{color:"blue" , cursor : "pointer"}}  >  <u>Reset Here</u> </NavLink></span>
      </div>
    </div>
  </div>
</section>
        
        </>
    )
}