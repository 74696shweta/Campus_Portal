import { useEffect, useState } from 'react'
import {NavLink, useNavigate} from 'react-router-dom'

import axios from 'axios';
var BASE_URL = "http://localhost:9800/student";

export function StaffLogin(){
    const navigate = useNavigate()
    const [values, setValues ] =  useState({
        email   :"",
        password : ""
    })
    axios.defaults.withCredentials = true;
    const [role, setRole] = useState('')
   


    const handleLogin = async () => {
      // Destructure email and password from the 'values' object
      const { email, password } = values;
    
      let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
      // Validation checks
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
  
        try {
          const result = await axios.post(BASE_URL + '/staff-login', values);
    
          if (result.data.data.valid) {
            const sessionResult = await axios.get('http://localhost:9800/student/staff-session');
    
            if (sessionResult.data.valid) {
              setRole(sessionResult.data.role);
    
              if (sessionResult.data.role === "Admin") {
                window.alert("Login Successfully...");
                navigate('/admin');
              } else {
                window.alert("Login Successfully...");
                navigate('/staff');
              }
            } else {
              navigate("/stafflogin");
            }
          } else {
            window.alert("Invalid email or password. Please check your credentials.");
            navigate("/stafflogin");
          }
        } catch (error) {
          window.alert("An error occurred. Please check your Email and password are valid or not...");
          console.error(error);
        }
      }
    };
    

    // const handleLogin = () =>{

    //     let email_reg  = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    //         console.log(values.password == "" && values.password.length < 4 ?  true : false)
    //         if(! email_reg.test(values.email) )
    //         {
    //           console.log("Please Enter Valid Email")
    //         }
    //       else if(values.password ==  "")
    //       {
    //         console.log("Please Enter Password")
    //       }
    //       else if(values.password.length < 3){
    //         console.log("Please Enter At least 6 Digit Password")
    //           }
    //           else{
    //               axios.post(BASE_URL + '/staff-login' ,  values).then((result)=>{
                    
    //                 if(result.data.data.valid)
    //                 {
    //                   axios.get('http://localhost:9800/student/staff-session')
    //                   .then(res => {
    //                       console.log(res)
    //                       if(result.data.valid){
    //                           setRole(res.data.role)
    //                           console.log(res.data.role)
    //                           if(res.data.role === "Admin"){
    //                             window.alert("Login Successfully...")
    //                             navigate('/admin')
    //                           } else {
    //                             window.alert("Login Successfully...")
    //                             navigate('/staff')
    //                           }
    //                       }else {
    //                         navigate("/stafflogin")
    //                       }
    //                   }).catch(err=> console.log(err))
    //                   console.log(result)
    //                   console.log(role)
                      
                        
    //                 }else {
    //                   window.alert("Invalid email or password. Please check your credentials.");
    //                   navigate("/stafflogin")
    //                 }

    //               }).catch((err)=>{
    //                 window.alert("An error occurred. Please check your Email and password are valid or not...");
    //                 console.log(err);
    //               })


    //             }
    // }
    useEffect(() => {
      axios.get(BASE_URL + '/staff-session').then(res => {
        if(res.data.valid){
          if(res.data.role === "Admin"){
            setRole(res.data.role)
            navigate('/admin')
          } else {
              navigate('/staff')
          }
        } else {
          navigate('/stafflogin')
        }
      }).catch(err => console.log(err))
    })

   
    
    const handleInputs  = (e) =>{
        setValues({...values ,  [e.target.name] : e.target.value})
    }

    return(
        <>
<section className="vh-100">
  <div className="container-fluid h-custom">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-md-9 col-lg-6 col-xl-5">
        <img src="https://5.imimg.com/data5/SELLER/Default/2023/5/307075433/XS/CD/VM/30662261/college-software-500x500.png"
          className="img-fluid" alt="Sample image" />
      </div>
      <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        <h1 style={{marginBottom: "50px", color: "#223d50"}}>Staff Login Page</h1>
          {/* <!-- Email input --> */}
          <div className="form-outline mb-4">
            <label className="form-label" for="form3Example3" style={{color: "#223d50", fontSize: "18px"}}>Email address</label>
            <input type="email" name='email' value={values.email} onChange={handleInputs} id="form3Example3" className="form-control form-control-lg"
              placeholder="Enter a valid email address" />
              <i id='em' style={{color: "red"}}></i>
          </div>

          {/* <!-- Password input --> */}
          <div className="form-outline mb-3">
              <label className="form-label" for="form3Example4" style={{color: "#223d50", fontSize: "18px"}}>Password</label>
            <input type="password" name='password' value={values.password} onChange={handleInputs} id="form3Example4" className="form-control form-control-lg" placeholder="Enter password" />
            <i id='pass' style={{color: "red"}}></i>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            {/* <!-- Checkbox --> */}
            <div className="form-check mb-0">
              <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
              <label className="form-check-label" for="form2Example3">
                Remember me
              </label>
            </div>
            
          </div>
          <button className="btn btn-success" onClick={handleLogin} style={{marginTop: "80px", width: "100%"}}>Login</button>
          <span  style={{marginTop : "20px"  , fontWeight : "bold" ,  textAlign  :"right" ,  float  :"right"}}>Forgot Your Password ? <NavLink to= "/reset-password-staff"  onClick={()=> navigate('/reset-password-staff')} style={{color:"blue" , cursor : "pointer"}}  >  <u>Reset Here</u> </NavLink></span>
      </div>
    </div>
  </div>
</section>
        
        </>
    )
}