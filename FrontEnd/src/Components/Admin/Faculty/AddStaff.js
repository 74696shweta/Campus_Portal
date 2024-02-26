import { Dashboard } from "../Dashboard";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";
var BASE_URL = "http://localhost:9800/admin"


export function AddStaff(){
  const [mobile, setMobile] = useState('');
  const navigate  = useNavigate()
    const [values , setValues ]  = useState({
        staffid: "", 
        fullname: "", 
        email: "" , 
        mobile: "" ,
        gender: "" , 
        dob: "" , 
        education: "", 
        password: "" ,  
        department: "" , 
        role: "",
        image:"",
        temp_image: ""

    })
    const handleForm  = (e) =>{
      
        setValues({...values , [e.target.name]  :e.target.value})
    }
    
    const handleSubmit = (e) => {

    e.preventDefault();
    let fd =  new FormData()
        fd.append('staffid' , values.staffid)
        fd.append('fullname' , values.fullname)
        fd.append('email' , values.email)
        fd.append('mobile' , mobile)
        fd.append('gender' , values.gender)
        fd.append('dob' , values.dob)
        fd.append('education' , values.education)
        fd.append('password' , values.password)
        fd.append('department' , values.department)
        fd.append('role' , values.role)
        fd.append('image' , values.image)

        const mobileRegex = /^\d{10}$/;

        // Check if the mobile number matches the pattern
        if (! mobileRegex.test(mobile)) {
            // Valid mobile number
            alert('Please enter a valid 10-digit mobile number.');
            // You can proceed with form submission or any other action
        }

        let email_reg  = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        console.log(values.password == "" && values.password.length < 4 ?  true : false)
        if(values.staffid == ""){
          document.getElementById("staffid").innerHTML= "Please Enter Staff Id**";
        } else {
          document.getElementById("staffid").style.display = "none";
        } 
        if(values.fullname == ""){
          document.getElementById("fname").innerHTML = "Please Enter Staff FullName**";
        } else {
          document.getElementById("fname").style.display = "none";
        }
        if(values.email == ""){
          document.getElementById("em").innerHTML = "Please Enter Staff Valid Email**";
        } else {
          document.getElementById("em").style.display = "none";
        }
        if(mobile == ""){
           document.getElementById("mob").innerHTML = "Please Enter valid 10-digit mobile number**";
        } else {
          document.getElementById("mob").style.display = "none";
        }
        if(values.gender == ""){
          document.getElementById("gen").innerHTML = "Please select Gender**";
        } else{
          document.getElementById("gen").style.display = "none";
        }
        if(values.dob == ""){
          document.getElementById("date").innerHTML = "Please select Date of Birth**";
        } else {
          document.getElementById("date").style.display = "none";
        }
        if(values.education == ""){
          document.getElementById("edu").innerHTML = "Please select Education**";
        } else{
          document.getElementById("edu").style.display = "none";
        }
        if(values.password == ""){
          document.getElementById("pass").innerHTML = "Please Enter Password**";
        } else {
          document.getElementById("pass").style.display = "none";
        }
        if(values.department == ""){
          document.getElementById("dept").innerHTML = "Please select department**";
        } else {
          document.getElementById("dept").style.display = "none";
        }
        if(values.role == ""){
          document.getElementById("rl").innerHTML = "Please select Role**";
        } else {
          document.getElementById("rl").style.display = "none";
        }
        if(values.temp_image == ""){
          document.getElementById("img").innerHTML = "Please Select Photo**";
        } else {
          document.getElementById("img").style.display = "none";
        }

      if(! email_reg.test(values.email) )
      {
         document.getElementById("em").innerHTML ="Please Enter Valid Email"
      }
      else if(values.password.length < 3){
        document.getElementById("pass").innerHTML  = "Please Enter At least 6 Character Password"
          }
          else{
        axios.post(BASE_URL + "/add-staff", fd)
          .then((response) => {
            console.log(response);
            navigate('/admin/staff')
          })
          .catch((error) => {
            if (error.response) {
              console.log(error);
              console.log(error.response)
              console.log("server responded");
            } else if (error.request) {
              console.log("network error");
            } else {
              console.log(error);
            }
          });
    }

  };

  const hanldeImages = (e) =>{
    setValues({...values , ['image'] : e.target.files[0] ,  ['temp_image'] : URL.createObjectURL(e.target.files[0]) })
    console.log(values.image)

  }  
  axios.defaults.withCredentials = true;

    return(
        <>
        <Dashboard/>
        <br />
        <br />
      
<section className="vh-100" style={{backgroundColor: "#2779e2;",marginLeft: "200px"}}>
    <h3 style={{textAlign: "center",marginTop: "70px",marginLeft: "60px"}}>Register New Staff</h3>
  <div className="container h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-xl-9">
        <form method="POST" onSubmit={handleSubmit} name="contact-form" encType="multipart/form-data">
        <div className="card" style={{borderRadius:"15px;"}}>
          <div className="card-body">

          <div className="row align-items-center">
              <div className="col-md-3 ps-5 mt-2">

                <h6 className="mb-0">Staff ID</h6>

              </div>
              <div className="col-md-9 pe-5">

                <input type="text" value={values.staffid} onChange={handleForm} name="staffid" className="form-control form-control-lg" placeholder="Staff ID - Department-01"/>
                <i id="staffid" style={{color: "red"}}></i>
              </div>
            </div>

            <hr className="mx-n3" />

            <div className="row align-items-center pt-4 pb-3">
              <div className="col-md-3 ps-5">

                <h6 className="mb-0">Full name</h6>

              </div>
              <div className="col-md-9 pe-5">

                <input type="text" value={values.fullname} onChange={handleForm} name="fullname" className="form-control form-control-lg" placeholder="Firstname Middlename Surname"/>
                <i id="fname" style={{color: "red"}}></i>
              </div>
            </div>

            <hr className="mx-n3" />

            <div className="row align-items-center py-3">
              <div className="col-md-3 ps-5">

                <h6 className="mb-0">Email address</h6>

              </div>
              <div className="col-md-9 pe-5">

                <input type="email" value={values.email} onChange={handleForm} name="email" className="form-control form-control-lg" placeholder="example@example.com" />
                <i id="em" style={{color: "red"}}></i>
              </div>
            </div>

            <hr className="mx-n3" />
            <div className="row align-items-center py-3">
              <div className="col-md-3 ps-5">

                <h6 className="mb-0">Mobile Number</h6>

              </div>
              <div className="col-md-9 pe-5">

              <input
                type="text"
                className="form-control form-control-lg"
                id="mobile"
                name="mobile"
                value={mobile}
                placeholder="+91 - 98XXXXX"
                onChange={(e) => {
                    setMobile(e.target.value);
                    console.log('Mobile state:', e.target.value);
                }}
                required
            />
                <i id="mob" style={{color: "red"}}></i>
              </div>
            </div>
            <hr className="mx-n3" />

            <div className="row align-items-center pt-4 pb-3">
              <div className="col-md-3 ps-5">

                <h6 className="mb-0">Gender</h6>

              </div>
              <div className="col-md-9 pe-5">
              <select name="gender" type="text" value={values.gender} onChange={handleForm} className="form-control form-control-lg"  >
                <option value="">-Select Gender-</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
                {/* <input type="text" value={values.gender} onChange={handleForm} name="gender" className="form-control form-control-lg" placeholder="Male or Female"/> */}
                <i id="gen" style={{color: "red"}}></i>
              </div>
            </div>

            <hr className="mx-n3" />
            <div className="row align-items-center pt-4 pb-3">
              <div className="col-md-3 ps-5">

                <h6 className="mb-0">Date Of Birth</h6>

              </div>
              <div className="col-md-9 pe-5">

                <input type="date" value={values.dob} onChange={handleForm} name="dob" className="form-control form-control-lg" />
                <i id="date" style={{color: "red"}}></i>
              </div>
            </div>

            <hr className="mx-n3" />
            <div className="row align-items-center pt-4 pb-3">
              <div className="col-md-3 ps-5">

                <h6 className="mb-0">Eductaion of Member</h6>

              </div>
              <div className="col-md-9 pe-5">

                <input type="text" value={values.education} onChange={handleForm} name="education" className="form-control form-control-lg" placeholder="Total Education Compeltion of member.."/>
                <i id="edu" style={{color: "red"}}></i>
              </div>
            </div>

            <hr className="mx-n3" />


            <div className="row align-items-center py-3">
              <div className="col-md-3 ps-5">

                <h6 className="mb-0">Password</h6>

              </div>
              <div className="col-md-9 pe-5">

                <input type="password" value={values.password} onChange={handleForm} name="password" className="form-control form-control-lg" placeholder="Password with atleast 6 character long with Special Symbols " />
                <i id="pass" style={{color: "red"}}></i>
              </div>
            </div>

            <hr className="mx-n3" />

            <div className="row align-items-center py-3">
              <div className="col-md-3 ps-5">

                <h6 className="mb-0">Department</h6>

              </div>
              <div className="col-md-9 pe-5">

              <select name="department" type="text" value={values.department} onChange={handleForm} className="form-control form-control-lg"  >
                <option value="">-Select Department-</option>
                <option value="Mechanical">Mechanical</option>
                <option value="Civil">Civil</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Electrical">Electrical</option>
                <option value="IT">IT</option>
                <option value="Automobile">Automobile</option>
            </select>
              {/* <input type="text" value={values.department} onChange={handleForm} name="department" className="form-control form-control-lg" placeholder="B.E. , MCA etc..." /> */}
              <i id="dept" style={{color: "red"}}></i>
              </div>
            </div>

            <hr className="mx-n3" />

            <div className="row align-items-center py-3">
              <div className="col-md-3 ps-5">

                <h6 className="mb-0">Role</h6>

              </div>
              <div className="col-md-9 pe-5">
              <select name="role" type="text" value={values.role} onChange={handleForm} className="form-control form-control-lg"  >
                <option value="">-Select Role-</option>
                <option value="Admin">Admin</option>
                <option value="Professor">Professor</option>
                <option value="HOD">HOD</option>
                <option value="Lab Assistant">Lab Assistant</option>
                
              </select>
              <i id="rl" style={{color: "red"}}></i>
              {/* <input type="text" value={values.role} onChange={handleForm} name="role" className="form-control form-control-lg" placeholder="Admin or Other" /> */}

              </div>
            </div>
            

            <hr className="mx-n3" />

            <div className="row align-items-center py-3">
              <div className="col-md-3 ps-5">

                <h6 className="mb-0">Upload Image</h6>

              </div>
              <div className="col-md-9 pe-5">

              <input type="file" onChange={hanldeImages} name="image" className="form-control form-control-lg" />
              <img src={values.temp_image}  width='100px'  height='100px' />    
              <i id="img" style={{color: "red"}}></i>      
              </div>
            </div>
            

            <hr className="mx-n3" />

            <div className="px-5 py-4 mb-4">
              <button type="submit" className="btn btn-primary btn-lg">Register Staff</button>
            </div>

          </div>
        </div>
        </form>        


      </div>
    </div>
  </div>
</section>
        
        </>
    )
}