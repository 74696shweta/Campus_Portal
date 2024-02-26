import React,{ useEffect,useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios";
import { Layout } from "./Layout";

var BASE_URL = "http://localhost:9800/admin"
  

export function Gallery(){
    const [data, setData] = useState([]);
    const navigate  = useNavigate()
  
      // Function to fetch data using Axios
      function getimage(){
          axios.get(BASE_URL + '/image').then((res)=>{
              setData(res.data.data)
              
          }).catch((err)=>{
              console.log("Something went wrong")
          })
      }
  
  
      useEffect(()=>{
  
          getimage()
  
      },[])  
    
    return(
        <>
        <div><Layout/></div>
        <br/><br /><br /><br />
        <br/><br /><br /><br />
        <div className="container" style={{marginLeft: "180px",padding: "10px",width: "80%"}}>
            {data.map((e,i) => (
                <div className="card" style={{width: "350px",display:"inline-block", padding: "5px"}}>
                <img src= {e.image} className="card-img-top" height={200} width={200} style={{cursor: "pointer"}}/>
                <p>{e.description}</p>
              </div>
            
                ))}

            </div>
        
        
        </>
    )
}