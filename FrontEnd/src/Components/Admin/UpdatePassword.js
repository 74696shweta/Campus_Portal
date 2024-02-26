import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
var BASE_URL = "http://localhost:9800/admin"

export function UpdatePassword() {
    const navigate  = useNavigate()
    const [values , setValues ]  = useState({
       old_password: "" , 
       new_password: "",
       confirm_pass: "" 
    })
    const handleForm  = (e) =>{
      
        setValues({...values , [e.target.name]  :e.target.value})
    }
    const handleSubmit = (e) => {

        e.preventDefault();
        let fd =  new FormData()
          
            fd.append('password' , values.new_password)
            
            if(values.password == ""){
              document.getElementById("pass").innerHTML = "Please Enter Old Password**";
            } else {
              document.getElementById("pass").style.display = "none";
            }
            if(values.new_password == ""){
                document.getElementById("npass").innerHTML = "Please Enter New Password**";
              } else {
                document.getElementById("npass").style.display = "none";
              }
              if(values.confirm_pass == ""){
                document.getElementById("cpass").innerHTML = "Please Enter Confirm Password**";
              } else {
                document.getElementById("cpass").style.display = "none";
              }
           
            if(values.password.length < 3){
            document.getElementById("newpass").innerHTML  = "Please Enter At least 6 Character Password"
            }
            if(values.new_password !== values.confirm_pass){
                document.getElementById("cpass").innerHTML = "New Passwrd and Confirm Password are not matched.. "
            }
            else{
            axios.post(BASE_URL + "/update-password", fd).then((response) => {
                console.log(response);
                navigate('/admin/')
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
    
    return (

        <>
            <section className="vh-100" style={{ backgroundColor: "#2779e2;", marginLeft: "200px" }}>
                <h3 style={{ textAlign: "center", marginTop: "70px", marginLeft: "60px" }}>Register New Staff</h3>
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-xl-9">
                            <form method="POST" onSubmit={handleSubmit} name="contact-form">
                                <div className="card" style={{ borderRadius: "15px;" }}>
                                    <div className="card-body">

                                        <div className="row align-items-center">
                                            <div className="col-md-3 ps-5 mt-2">

                                                <h6 className="mb-0">Old Password</h6>

                                            </div>
                                            <div className="col-md-9 pe-5">

                                                <input type="password" onChange={handleForm} name="password" className="form-control form-control-lg" placeholder="Enter Old Password" />
                                                <i id="pass" style={{ color: "red" }}></i>
                                            </div>
                                        </div>

                                        <hr className="mx-n3" />

                                        <div className="row align-items-center pt-4 pb-3">
                                            <div className="col-md-3 ps-5">

                                                <h6 className="mb-0">New Password</h6>

                                            </div>
                                            <div className="col-md-9 pe-5">

                                                <input type="password" onChange={handleForm} name="newpass" className="form-control form-control-lg" placeholder="Enter New Password.." />
                                                <i id="npass" style={{ color: "red" }}></i>
                                            </div>
                                        </div>

                                        <hr className="mx-n3" />

                                        <div className="row align-items-center py-3">
                                            <div className="col-md-3 ps-5">

                                                <h6 className="mb-0">Confirm Password</h6>

                                            </div>
                                            <div className="col-md-9 pe-5">

                                                <input type="password" onChange={handleForm} name="confirmpass" className="form-control form-control-lg" placeholder="Confirm Your New Password.." />
                                                <i id="cpass" style={{ color: "red" }}></i>
                                            </div>
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