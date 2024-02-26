import { Dashboard } from "../Dashboard";
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios";

var BASE_URL = "http://localhost:9800/admin"


export function AddStudent(){
  const [mobile, setMobile] = useState('');
    const navigate = useNavigate();
    const [values , setValues ]  = useState({
        enrollid: "", 
        fullname: "", 
        email: "" , 
        mobile: "" ,
        gender: "" , 
        dob: "" , 
        acadamicyear: "", 
        password: "" ,  
        department: "" , 
        clas: "",
        image:"",
        temp_image: ""

    })
    const handleForm  = (e) =>{

        setValues({...values , [e.target.name]  :e.target.value})

    }
    const handleSubmit = (e) => {

    e.preventDefault();
    let fd =  new FormData()
        fd.append('enrollid' , values.enrollid)
        fd.append('fullname' , values.fullname)
        fd.append('email' , values.email)
        fd.append('mobile' , mobile)
        fd.append('gender' , values.gender)
        fd.append('dob' , values.dob)
        fd.append('acadamicyear' , values.acadamicyear)
        fd.append('password' , values.password)
        fd.append('department' , values.department)
        fd.append('clas' , values.clas)
        fd.append('image' , values.image)
        
        const mobileRegex = /^\d{10}$/;

        // Check if the mobile number matches the pattern
        if (! mobileRegex.test(mobile)) {
            // Valid mobile number
            alert('Please enter a valid 10-digit mobile number.');
            // You can proceed with form submission or any other action
        }


        let email_reg  = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if(values.enrollid == ""){
          document.getElementById("enroll").innerHTML= "Please Enter Student Enroll Id**";
        } else {
          document.getElementById("enroll").style.display = "none";
        } 
        if(values.fullname == ""){
          document.getElementById("fname").innerHTML = "Please Enter Staff FullName**";
        } else {
          document.getElementById("fname").style.display = "none";
        }
        if(values.email == "" && !email_reg.test(values.email)){
          document.getElementById("em").innerHTML = "Please Enter Valid Email**";
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
        if(values.acadamicyear == ""){
          document.getElementById("edu").innerHTML = "Please select Acadamic Year**";
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
        if(values.clas == ""){
          document.getElementById("class").innerHTML = "Please select Role**";
        } else {
          document.getElementById("class").style.display = "none";
        }
        if(values.temp_image == ""){
          document.getElementById("img").innerHTML = "Please Select Photo**";
        } else {
          document.getElementById("img").style.display = "none";
        }

    axios.defaults.withCredentials = true;
    axios.post(BASE_URL + "/add-student", fd)
      .then((response) => {
        console.log(response);
        alert("Student Registred Successfully....")
        navigate('/admin/students')
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

  };

  const hanldeImages = (e) =>{

    
    setValues({...values , ['image'] : e.target.files[0] ,  ['temp_image'] : URL.createObjectURL(e.target.files[0]) })
    console.log(values.image)

  } 

 

    return(
        <>
        <Dashboard/><br /><br />
<section className="vh-100" style={{backgroundColor: "#2779e2;",marginLeft: "200px"}}>
    <h3 style={{textAlign: "center",marginTop: "70px",marginLeft: "60px"}}>Register New Student</h3>
  <div className="container h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-xl-9">
        <form method="POST" id="myForm" onSubmit={handleSubmit} name="contact-form" encType="multipart/form-data">
        <div className="card" style={{borderRadius:"15px;"}}>
          <div className="card-body">

          <div className="row align-items-center">
              <div className="col-md-3 ps-5 mt-2">

                <h6 className="mb-0">Enrollment No</h6>

              </div>
              <div className="col-md-9 pe-5">

                <input type="text" value={values.enrollid} onChange={handleForm} name="enrollid" className="form-control form-control-lg" placeholder="Enrollment no" required/>
                <i id="enroll" style={{color: "red"}}></i>
              </div>
            </div>

            <hr className="mx-n3" />

            <div className="row align-items-center pt-4 pb-3">
              <div className="col-md-3 ps-5">

                <h6 className="mb-0">Full name</h6>

              </div>
              <div className="col-md-9 pe-5">

                <input type="text" value={values.fullname} onChange={handleForm} name="fullname" className="form-control form-control-lg" placeholder="Firstname Middlename Surname" required/>
                <i id="fname" style={{color: "red"}}></i>
              </div>
            </div>

            <hr className="mx-n3" />

            <div className="row align-items-center py-3">
              <div className="col-md-3 ps-5">

                <h6 className="mb-0">Email address</h6>

              </div>
              <div className="col-md-9 pe-5">

                <input type="email" value={values.email} onChange={handleForm} name="email" className="form-control form-control-lg" placeholder="example@example.com" required />
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
                    //console.log('Mobile state:', e.target.value);
                }}
                required
            />
                {/* <input type="text" value={values.mobile} onChange={handleForm} name="mobile" className="form-control form-control-lg" placeholder="+91 - 98XXXXX" required /> */}
                <i id="mob" style={{color: "red"}}></i>
              </div>
            </div>
            <hr className="mx-n3" />

            <div className="row align-items-center pt-4 pb-3">
              <div className="col-md-3 ps-5">

                <h6 className="mb-0">Gender</h6>

              </div>
              <div className="col-md-9 pe-5">
              <select name="gender" type="text" value={values.gender} onChange={handleForm} className="form-control form-control-lg" required >
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

                <input type="date" value={values.dob} onChange={handleForm} name="dob" className="form-control form-control-lg" required/>
                <i id="date" style={{color: "red"}}></i>
              </div>
            </div>

            <hr className="mx-n3" />
            <div className="row align-items-center pt-4 pb-3">
              <div className="col-md-3 ps-5">

                <h6 className="mb-0">Acadamic Year</h6>

              </div>
              <div className="col-md-9 pe-5">
              <select name="acadamicyear" type="text" value={values.acadamicyear} onChange={handleForm} className="form-control form-control-lg"required >
                <option value="">-Select Acadamic Year-</option>
                <option value="2018">2018</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                
            </select>
            <i id="edu" style={{color: "red"}}></i>
                {/* <input type="text" value={values.acadamicyear} onChange={handleForm} name="acadamicyear" className="form-control form-control-lg" placeholder="Acadamic Year 2021.."/> */}

              </div>
            </div>

            <hr className="mx-n3" />


            <div className="row align-items-center py-3">
              <div className="col-md-3 ps-5">

                <h6 className="mb-0">Password</h6>

              </div>
              <div className="col-md-9 pe-5">

                <input type="password" value={values.password} onChange={handleForm} name="password" className="form-control form-control-lg" placeholder="Password with atleast 6 character long with Special Symbols " required />
                <i id="pass" style={{color: "red"}}></i>
              </div>
            </div>

            <hr className="mx-n3" />

            <div className="row align-items-center py-3">
              <div className="col-md-3 ps-5">

                <h6 className="mb-0">Department</h6>

              </div>
              <div className="col-md-9 pe-5">
              <select name="department" type="text" value={values.department} onChange={handleForm} className="form-control form-control-lg" required>
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

                <h6 className="mb-0">Class</h6>

              </div>
              <div className="col-md-9 pe-5">
              
              <select name="clas" type="text" value={values.clas} onChange={handleForm} className="form-control form-control-lg" >
                <option value="">-Select class-</option>
                <option value="Sem-1 FY">Sem - 1 FY</option>
                <option value="Sem-2 FY">Sem - 2 FY</option>
                <option value="Sem-3 SY">Sem - 3 SY</option>
                <option value="Sem-4 SY">Sem - 4 SY</option>
                <option value="Sem-5 TY">Sem - 5 TY</option>
                <option value="Sem-6 TY">Sem - 6 TY</option>
                
              </select>
              {/* <input type="text" value={values.clas} onChange={handleForm} name="clas" className="form-control form-control-lg" placeholder="Year and Semester" /> */}
              <i id="class" style={{color: "red"}}></i>
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
              <button type="submit" className="btn btn-primary btn-lg">Register Student</button>
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