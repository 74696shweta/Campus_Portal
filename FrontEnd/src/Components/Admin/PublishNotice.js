import { Dashboard } from "./Dashboard";
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios";

var BASE_URL = "http://localhost:9800/admin"


export function PublishNotice(){
  axios.defaults.withCredentials = true;  
  const [contact, setContact] = useState('');
    const navigate = useNavigate();
    const [values , setValues ]  = useState({ 
        id: "",
        topic: "",
        description: "",
        eventdate: "",
        contact: "",
        image:"",
        temp_image: ""

    })
    const handleForm  = (e) =>{

         setValues({...values , [e.target.name]  :e.target.value})
    }

    const date= new Date(values.eventdate);
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    var datestring = day + '-' + month + '-' + year;
    const handleSubmit = (e) => {

    e.preventDefault();
    let fd =  new FormData()
        fd.append('id' , values.id)
        fd.append('topic' , values.topic)
        fd.append('description' , values.description)
        fd.append('eventdate',datestring)
        fd.append('contact' , contact)
        fd.append('image' , values.image)

        const mobileRegex = /^\d{10}$/;

        // Check if the mobile number matches the pattern
        if (! mobileRegex.test(contact)) {
            // Valid mobile number
            alert('Please enter a valid 10-digit mobile number.');
            // You can proceed with form submission or any other action
        }
    axios.post(BASE_URL + "/add-notice", fd)
      .then((response) => {
        console.log(response);
        navigate('/admin/noticeboard')
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
<section class="vh-100" style={{backgroundColor: "#2779e2;",marginLeft: "200px"}}>
    <h3 style={{textAlign: "center",marginTop: "70px",marginLeft: "60px"}}>Publish Notice</h3>
  <div class="container h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-xl-9">
        <form method="POST" onSubmit={handleSubmit} name="contact-form" encType="multipart/form-data">
        <div class="card" style={{borderRadius:"15px;"}}>
          <div class="card-body">
         
            <div class="row align-items-center pt-4 pb-3">
              <div class="col-md-3 ps-5">

                <h6 class="mb-0">Topic</h6>

              </div>
              <div class="col-md-9 pe-5">

                <input type="text" value={values.topic} onChange={handleForm} name="topic" class="form-control form-control-lg" placeholder="Notice Topic...."/>

              </div>
            </div>

            <hr class="mx-n3" />

            <div class="row align-items-center py-3">
              <div class="col-md-3 ps-5">

                <h6 class="mb-0">Description</h6>

              </div>
              <div class="col-md-9 pe-5">

                <textarea type="text" value={values.description} onChange={handleForm} name="description" class="form-control form-control-lg" cols={20} rows={10} placeholder="Write detail here..." ></textarea>

              </div>
            </div>

            <hr class="mx-n3" />
            <div class="row align-items-center py-3">
              <div class="col-md-3 ps-5">

                <h6 class="mb-0">Event Date</h6>

              </div>
              <div class="col-md-9 pe-5">

                <input type="date"  onChange={handleForm} name="eventdate" class="form-control form-control-lg" required/>

              </div>
            </div> 

            <hr class="mx-n3" />
            <div class="row align-items-center py-3">
              <div class="col-md-3 ps-5">

                <h6 class="mb-0">Contact Info</h6>

              </div>
              <div class="col-md-9 pe-5">

                 <input
                type="text"
                className="form-control form-control-lg"
                id="contact"
                name="contact"
                value={contact}
                placeholder="+91 - 98XXXXX"
                onChange={(e) => {
                    setContact(e.target.value);
                    //console.log('Mobile state:', e.target.value);
                }}
                required
            />

              </div>
            </div> 

            <hr class="mx-n3" />

            <div class="row align-items-center py-3">
              <div class="col-md-3 ps-5">

                <h6 class="mb-0">Upload Image</h6>

              </div>
              <div class="col-md-9 pe-5">

              <input type="file" onChange={hanldeImages} name="image" class="form-control form-control-lg" />
              <img src={values.temp_image}  width='100px'  height='100px' />          
              </div>
            </div>
            

            <hr class="mx-n3" />

            <div class="px-5 py-4 mb-4">
              <button type="submit" class="btn btn-primary btn-lg">Publish Notice</button>
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