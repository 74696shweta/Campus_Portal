import { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import {useDispatch}  from 'react-redux'
import axios from 'axios';

export function ResetPassword(){
    const navigate = useNavigate()
    const [toggleScreen , setToggleScreen] = useState(false)
    const [loading , setLoading] = useState(false)

    const [values, setValues ] =  useState({
        email   :"",
        new_password : "",
        confirm_password : "",
        otp  :""
    })

    const handleForgotPassword = () =>{
    
        let email_reg  = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    
            console.log(values.password == "" && values.password.length < 6 ?  true : false)
            if(! email_reg.test(values.email) )
            {   
                document.getElementById('err').innerHTML = "Please Enter Valid Email";
            }
            else{
                axios.post('http://localhost:9800/student/forgot-password-student' ,  values).then((result)=>{

                  if(result.data.status == 200)
                  
                  {
                    setToggleScreen(true)
                    handletimer()
                  }
                  
    
                }).catch((err)=>{
                    setLoading(false)
                    console.log(err)
                 
                })
    
    
                }
    
    }



    const handleVerifyPassord  = () =>{
        setLoading(true)
        axios.post('http://localhost:9800/student/verify-password-student' ,  values).then((result)=>{
            console.log(result.data.message)
            setLoading(false)

            if(result.data.status == 200)
            {
                window.alert("Your Password has reset Successfully")
                navigate('/login')
            }
         

          }).catch((err)=>{
            setLoading(false)
            console.log(err)

            if(err.response.data.status == 498)
            {
                setToggleScreen(false);
                setValues({...values, ['email']  :"" , ['otp']  :"" ,  ['new_password'] : ""  , ["confirm_password"] : ""})
            }
          })



    }
    const [time , setTime ]  = useState(90)
    useEffect(()=>{
        if(toggleScreen == true && time > 0)
        {
            setInterval(()=>{
                    setTime(time  - 1)
            },1000)
        }
    },[time , toggleScreen])
    const handletimer  = () =>{

        setInterval(()=>{
            if(time > 0)
            {
                setTime(time  - 1)

            }
        },1000)
    }
    const handleInputs  = (e) =>{    
        setValues({...values ,  [e.target.name] : e.target.value})

    }
    
    return(
        <>
        
{ toggleScreen == false ? 

<div className="box-div" style={{width: "50%",marginLeft: "350px", marginTop: "100px"}}>
<h2 style={{marginBottom: "50px"}}>Reset Password </h2>    
<div className="form-group">
<label for="l1"><b>Email address</b></label>
<input type="text"   name='email' value={values.email}   onChange={handleInputs} style={{width:"100%"  }} className="form-control" id="l1"  placeholder="Enter email" />
<i id='err'></i>
</div>
<button  onClick={handleForgotPassword}  type="submit" style={{width : "100%" , marginTop  :"20px"}} className="btn btn-primary">Submit</button>
</div>
:
<div className="box-div" style={{width: "50%",marginLeft: "350px", marginTop: "100px"}}>
<div className="form-group">
<label for="l1"><b>Email address</b></label>
<input disabled={true} type="email"   name='email' value={values.email}   onChange={handleInputs} style={{width:"100%"  }} className="form-control" id="l1"  placeholder="Enter email" />
</div>
<div className="form-group">
<label for="l1"><b>Enter OTP</b></label>
<input  type="number"   name='otp' value={values.otp}   onChange={handleInputs} style={{width:"100%"  }} className="form-control" id="l1"  placeholder="Enter email" />
</div>


<div className="form-group">
<label for="l2" ><b>New Password</b></label>
<input onChange={handleInputs} value={values.new_password} name='new_password' type="text" style={{borderRadius  :'10px' }} className="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2" />
</div>
<div className="form-group">
<label for="l2" ><b>Confirm Password</b></label>
<input onChange={handleInputs} value={values.confirm_password} name='confirm_password' type="text" style={{borderRadius  :'10px' }} className="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2" />
</div>




<button  onClick={handleVerifyPassord}    type="submit" style={{width : "100%" , marginTop  :"20px"}} className="btn btn-primary">Submit</button>


{/* <span style={{fontWeight  :"bold", color  :"red"}}>OTP Expires in :  {time} Seconds</span> */}



</div>


}

</>


    )
}