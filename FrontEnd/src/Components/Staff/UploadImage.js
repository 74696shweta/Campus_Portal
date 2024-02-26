import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios";
import { StaffDashboard } from "./StaffDashboard";

var BASE_URL = "http://localhost:9800/admin"


export function UploadImage() {
  const navigate = useNavigate();
  const [values, setValues] = useState({

    image: "",
    temp_image: "",
    description: ""

  })
  const handleForm = (e) => {

    setValues({ ...values, [e.target.name]: e.target.value })

  }
  const handleSubmit = (e) => {

    e.preventDefault();
    let fd = new FormData()
    fd.append('image', values.image)
    fd.append('description', values.description)

    axios.post(BASE_URL + "/add-staff-image", fd)
      .then((response) => {
        console.log(response);
        navigate('/staff/showimage')
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

  return (
    <>
      <StaffDashboard />
      <section className="vh-100" style={{ backgroundColor: "#2779e2;", marginLeft: "200px" }}>

        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-9">
              <form method="POST" onSubmit={handleSubmit} name="contact-form" encType="multipart/form-data">
                <div className="card" style={{ borderRadius: "15px;" }}>
                  <div className="card-body">
                    <div className="row align-items-center py-3">
                      <div className="col-md-3 ps-5">

                        <h6 className="mb-0">Upload Image</h6>

                      </div>
                      <div className="col-md-9 pe-5">

                        <input type="file" onChange={hanldeImages} name="image" className="form-control form-control-lg" />
                        <img src={values.temp_image} width='100px' height='100px' />
                      </div>
                    </div>
                    
                    <hr className="mx-n3" />
                    <div className="row align-items-center py-3">
                    <div class="col-md-3 ps-5">
                      <h6 class="mb-0">Description</h6>
                      </div>
                      <div class="col-md-9 pe-5">
                      <input type="text" name="description" onChange={handleForm} class="form-control form-control-lg" />     
                      </div>
                    </div>
                    </div>

                    <hr className="mx-n3" />

                    <div className="px-5 py-4 mb-4">
                      <button type="submit" className="btn btn-primary btn-lg">Upload</button>
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