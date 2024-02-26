import { useEffect, useState } from "react";
import { Layout } from "./Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
var BASE_URL = "http://localhost:9800/admin"
export function EventNotice(){
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    const [data, setData] = useState([]);
    // Function to fetch data
    
    function getNotice(){
        axios.get(BASE_URL + '/get-notice').then((res)=>{
            setData(res.data.data)
        }).catch((err)=>{
            console.log("Something went wrong")
        })
    }
    
    const ViewNotice=  (el) =>{
        
        navigate('/viewnotice/' + el._id , {state  : el})   
    }
    axios.defaults.withCredentials = true;  
    useEffect(()=>{

        getNotice()

    },[])

    return(
        <>
        <div> <Layout/> </div>

        <br />
        <br/>
        <br/>
        <br/><br /><br /><br /><br />
    <div className="our-blog">
    <div className="container">
         <div className="session-title row">
            <h2>New Notices</h2>
        </div>
        {data.map((e,i) => (
        <div className="row-blog row">
            <div className="col-md-10 vbf mx-auto">
                <div className="blog-card row">
                
                        <div className="col-2">
                           <div className="date-box">
                                <img src={e.image} height={150} width={150}/>
                           </div>
                           
                        </div>
                        <div className="col-7 setv">
                            <h4>Title : {e.topic}</h4>
                            <ul>
                                <li>Date : {e.eventdate}</li>
                                <li>Contact : {e.contact}</li>
                            </ul>
                        </div>
                        <button type="button" className="btn btn-primary" onClick={() => ViewNotice(e)}><i className="far fa-eye"></i></button>
                    </div> 
            </div>
        </div>
        ))}
    </div>
</div>
        </>
    )
}