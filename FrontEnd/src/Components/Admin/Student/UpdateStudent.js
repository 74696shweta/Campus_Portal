import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,useLocation } from 'react-router-dom';
import { Dashboard } from '../Dashboard';
var BASE_URL = "http://localhost:9800/admin"


export function UpdateStudent(){
  
  const {state}  = useLocation()
  const navigate = useNavigate()

  const [values , setValues ]  = useState({
          enrollid : state.enrollid,
          fullname: state.fullname,
          email: state.email,
          mobile: state.mobile,
          gender: state.gender,
          dob: state.dob,
          acadamicyear: state.acadamicyear,
          department: state.department,
          clas: state.clas,
          image: state.image,
          sid :  state._id
  })

  const handleForm  = (e) =>{

      setValues({...values , [e.target.name]  :e.target.value})

  }

  const handleSubmit  = () =>{

      axios.post(BASE_URL + '/update-student' ,  values).then((res)=>{
          console.log("Success")
          console.log(res)
          navigate('/admin/students')
      }).catch((err)=>{
          console.log(err)
          console.log("Something went wrong")
      })
  }
  const handleImages  =  (e) =>{

    console.log(e.target.files)

    let fd =  new FormData()
    fd.append('sid' , values.sid)
    fd.append('image' , e.target.files[0] )

    setValues({...values  , ['temp_image'] :  URL.createObjectURL(e.target.files[0])})

    // setLoading(true)
    axios.post(BASE_URL  +'/update-student-image' , fd).then((res)=>{
      
      setValues({...values , ['temp_image'] :  res.data.data.image  })
    }).catch((err)=>{
       console.log(err.response.data.message)
    })


  }
  axios.defaults.withCredentials = true;

    return(
        <>
            <Dashboard/>
            <br /><br />
<section className="vh-100" style={{backgroundColor: "#2779e2;",marginLeft: "200px"}}>
    <h3 style={{textAlign: "center",marginTop: "70px",marginLeft: "60px"}}>Update Student</h3>
  <div className="container h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-xl-9">
        <div className="card" style={{borderRadius:"15px;"}}>
          <div className="card-body">
          <input type="hidden" name='sid' value={values.sid} onChange={handleForm} />
          <div className="row align-items-center">
              <div className="col-md-3 ps-5 mt-2">

                <h6 className="mb-0">Enrollment No</h6>

              </div>
              <div className="col-md-9 pe-5">

                <input type="text" onChange={handleForm}  value={values.enrollid} name="enrollid" className="form-control form-control-lg" placeholder="Enrollment no"/>

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

                <input type="number" onChange={handleForm}  value={values.mobile} name="mobile" className="form-control form-control-lg" placeholder="+91 - 98XXXXX" maxLength={10} required/>

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

                <h6 className="mb-0">Acadamic Year</h6>

              </div>
              <div className="col-md-9 pe-5">
              <select name="acadamicyear" type="text" value={values.acadamicyear} onChange={handleForm} className="form-control form-control-lg" >
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
                {/* <input type="text" value={values.acadamicyear} onChange={handleForm} name="acadamicyear" className="form-control form-control-lg" placeholder="Acadamic Year 2021.."/> */}

              </div>
            </div>

            <hr className="mx-n3" />

            <div className="row align-items-center py-3">
              <div className="col-md-3 ps-5">

                <h6 className="mb-0">Department</h6>

              </div>
              <div className="col-md-9 pe-5">
              <select name="department" type="text" value={values.department} onChange={handleForm} className="form-control form-control-lg" >
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
              {/* <input type="text" onChange={handleForm}  value={values.clas} name="clas" className="form-control form-control-lg" placeholder="Year and Semester" /> */}

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
              <button type="submit" className="btn btn-primary btn-lg" onClick={handleSubmit}>Update Student</button>
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