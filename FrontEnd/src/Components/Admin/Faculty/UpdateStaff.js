import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,useLocation, NavLink } from 'react-router-dom';
import { Dashboard } from '../Dashboard';
var BASE_URL = "http://localhost:9800/admin"


export function UpdateStaff(){
  
  const {state}  = useLocation()
  const navigate = useNavigate()

  const [values , setValues ]  = useState({
          staffid : state.staffid,
          fullname: state.fullname,
          email: state.email,
          mobile: state.mobile,
          gender: state.gender,
          dob: state.dob,
          education: state.education,
          department: state.department,
          role: state.role,
          image: state.image,
          sid :  state._id
  })

  const handleForm  = (e) =>{

      setValues({...values , [e.target.name]  :e.target.value})

  }

  const handleSubmit  = () =>{

      axios.post(BASE_URL + '/update-staff' ,  values).then((res)=>{
          console.log("Success")
          navigate('/admin/staff')
          console.log(res)
      }).catch((err)=>{
          console.log(err.res.message)
          console.log("Something went wrong")
      })
  }
  const handleImages  =  (e) =>{

    console.log(e.target.files)

    let fd =  new FormData()
    fd.append('id' , values.sid)
    fd.append('image' , e.target.files[0] )

    setValues({...values  , ['temp_image'] :  URL.createObjectURL(e.target.files[0])})

    axios.post(BASE_URL  +'/update-staff-image' , fd).then((res)=>{
      
      setValues({...values , ['temp_image'] :  res.data.data.image  })
    }).catch((err)=>{
       console.log(err)
    })


  }
  axios.defaults.withCredentials = true;

    return(
        <>
            <Dashboard/><br /><br />
<section className="vh-100" style={{backgroundColor: "#2779e2;",marginLeft: "200px"}}>
    <h3 style={{textAlign: "center",marginTop: "70px",marginLeft: "60px"}}>Update Staff</h3>
  <div className="container h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-xl-9">
      <input type="hidden" name='id' value={values.sid} onChange={handleForm} />
          
        <div className="card" style={{borderRadius:"15px;"}}>
          <div className="card-body">
         <div className="row align-items-center">
              <div className="col-md-3 ps-5 mt-2">

                <h6 className="mb-0">Staff ID</h6>

              </div>
              <div className="col-md-9 pe-5">

                <input type="text" onChange={handleForm}  value={values.staffid} name="staffid" className="form-control form-control-lg" placeholder="Staff ID"/>

              </div>
            </div>

            <hr className="mx-n3" />

            <div className="row align-items-center pt-4 pb-3">
              <div className="col-md-3 ps-5">

                <h6 className="mb-0">Full name</h6>

              </div>
              <div className="col-md-9 pe-5">

                <input type="text" onChange={handleForm}  value={values.fullname} name="fullname" className="form-control form-control-lg" placeholder="Firstname Middlename Surname"/>

              </div>
            </div>

            <hr className="mx-n3" />

            <div className="row align-items-center py-3">
              <div className="col-md-3 ps-5">

                <h6 className="mb-0">Email address</h6>

              </div>
              <div className="col-md-9 pe-5">

                <input type="email" onChange={handleForm}  value={values.email} name="email" className="form-control form-control-lg" placeholder="example@example.com" />

              </div>
            </div>

            <hr className="mx-n3" />
            <div className="row align-items-center py-3">
              <div className="col-md-3 ps-5">

                <h6 className="mb-0">Mobile Number</h6>

              </div>
              <div className="col-md-9 pe-5">

                <input type="number" onChange={handleForm}  value={values.mobile} name="mobile" className="form-control form-control-lg" placeholder="+91 - 98XXXXX" />

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

              </div>
            </div>

            <hr className="mx-n3" />
            <div className="row align-items-center pt-4 pb-3">
              <div className="col-md-3 ps-5">

                <h6 className="mb-0">Date Of Birth</h6>

              </div>
              <div className="col-md-9 pe-5">

                <input type="date" value={values.dob} onChange={handleForm} name="dob" className="form-control form-control-lg" />

              </div>
            </div>

            <hr className="mx-n3" />
            <div className="row align-items-center pt-4 pb-3">
              <div className="col-md-3 ps-5">

                <h6 className="mb-0">Education History</h6>

              </div>
              <div className="col-md-9 pe-5">

                <input type="text" value={values.education} onChange={handleForm} name="education" className="form-control form-control-lg" placeholder="Education history.."/>

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

              {/* <input type="text" onChange={handleForm}  value={values.department} name="department" className="form-control form-control-lg" placeholder="B.E. , MCA etc..." /> */}

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
              {/* <input type="text" onChange={handleForm}  value={values.role} name="role" className="form-control form-control-lg" placeholder="Role.." /> */}

              </div>
            </div>
            

            <hr className="mx-n3" />

            <div className="form-group">
                <img src={values.temp_image} width='100px' height='100px' />
                {/* <button for="h1" className="btn btn-primary" >Change Image</button> */}
                <label for="h1"  className="btn btn-primary">Change Image</label>
                <input  onChange={handleImages} id="h1" type="file"  style={{display : "none"}}  />
              </div>  
              <hr className="mx-n3" />
            <div className="px-5 py-4 mb-4">
              <button type="submit" className="btn btn-primary btn-lg" onClick={handleSubmit}>Update Staff Detail</button>
            </div>

          </div>
        </div>
        

      </div>
    </div>
  </div>
</section>

        </>
    )
}