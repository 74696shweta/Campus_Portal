
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios";
import { StaffDashboard } from "./StaffDashboard";

var BASE_URL = "http://localhost:9800/admin"

export function StaffUpdateNotice() {

  const {state}  = useLocation()
  const navigate = useNavigate()

  const [values , setValues ]  = useState({
          userid : state.userid,
          topic: state.topic,
          description: state.description,
          eventdate: state.eventdate,
          contact: state.contact,
          image: state.image,
          id :  state._id
  })

  const handleForm  = (e) =>{

      setValues({...values , [e.target.name]  :e.target.value})

  }

  const handleSubmit  = () =>{

      axios.post(BASE_URL + '/update-notice' , values).then((res)=>{
          console.log("Success")
          navigate('/admin/notice')
      }).catch((err)=>{
          console.log(err)
          console.log("Something went wrong")
      })
  }
  const handleImages  =  (e) =>{

    console.log(e.target.files)

    let fd =  new FormData()
    fd.append('id' , values.id)
    fd.append('image' , e.target.files[0] )

    setValues({...values  , ['temp_image'] :  URL.createObjectURL(e.target.files[0])})
    axios.post(BASE_URL  +'/update-notice-image' , fd).then((res)=>{
      
      setValues({...values , ['image'] : e.target.files[0] , ['temp_image'] :  res.data.data.image  })
      console.log("Image Set..")
    }).catch((err)=>{
       console.log(err.response.data.message)
    })


  }



    return(

        <>
            <StaffDashboard/>
<section className="vh-100" style={{backgroundColor: "#2779e2;",marginLeft: "200px"}}>
    <h3 style={{textAlign: "center",marginTop: "70px",marginLeft: "60px"}}>Update Notice</h3>
  <div className="container h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-xl-9">
        <form method="POST" onSubmit={handleSubmit} name="contact-form" encType="multipart/form-data">
        <input type="hidden" name='id' value={values.id} onChange={handleForm} />
        {/* <div className="row align-items-center"> */}
              {/* <div className="col-md-3 ps-5 mt-2">

                <h6 className="mb-0">User Id</h6>

              </div>
              <div className="col-md-9 pe-5">

                <input type="text" onChange={handleForm}  value={values.userid} name="userid" className="form-control form-control-lg" disabled/>

              </div>
            </div> */}

        <div className="card" style={{borderRadius:"15px;"}}>
          <div className="card-body">

            <div className="row align-items-center pt-4 pb-3">
              <div className="col-md-3 ps-5">

                <h6 className="mb-0">Topic</h6>

              </div>
              <div className="col-md-9 pe-5">

                <input type="text" value={values.topic} onChange={handleForm} name="topic" className="form-control form-control-lg" placeholder="Notice Topic...."/>

              </div>
            </div>

            <hr className="mx-n3" />

            <div className="row align-items-center py-3">
              <div className="col-md-3 ps-5">

                <h6 className="mb-0">Description</h6>

              </div>
              <div className="col-md-9 pe-5">

                <textarea type="text" value={values.description} onChange={handleForm} name="description" className="form-control form-control-lg" cols={20} rows={10} placeholder="Write detail here..." ></textarea>

              </div>
            </div>

            <hr className="mx-n3" />
            <div className="row align-items-center py-3">
              <div className="col-md-3 ps-5">

                <h6 className="mb-0">Event Date</h6>

              </div>
              <div className="col-md-9 pe-5">

                <input type="date" value={values.eventdate} onChange={handleForm} name="eventdate" className="form-control form-control-lg" required/>

              </div>
            </div> 

            <hr className="mx-n3" />
            <div className="row align-items-center py-3">
              <div className="col-md-3 ps-5">

                <h6 className="mb-0">Contact Info</h6>

              </div>
              <div className="col-md-9 pe-5">

                <input type="number" value={values.contact} onChange={handleForm} name="contact" className="form-control form-control-lg" placeholder="+91 - 98XXXXX" required/>

              </div>
            </div> 

            <hr className="mx-n3" />

            <div className="row align-items-center py-3">
              <div className="col-md-3 ps-5">

                <h6 className="mb-0">Upload Image</h6>

              </div>
              <div className="col-md-9 pe-5">

              <input type="file" onChange={handleImages} name="image" className="form-control form-control-lg" />
              <img src={values.temp_image}  width='100px'  height='100px' />          
              </div>
            </div>
            

            <hr className="mx-n3" />

            <div className="px-5 py-4 mb-4">
              <button type="submit" className="btn btn-primary btn-lg">Update Notice</button>
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