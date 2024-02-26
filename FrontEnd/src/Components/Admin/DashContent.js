import axios from "axios";
import { useEffect, useState } from "react";
var BASE_URL = "http://localhost:9800/admin";
export function DashContent() {

  
  const [dashData , setDashData] = useState({})
  function getDashboardData(){
      axios.get(BASE_URL + '/dashboard-data').then((result)=>{
          console.log("Success")
          setDashData(result.data.data)
      }).catch((err)=>{
          console.log(err)
      })
  }

  useEffect(()=>{

      getDashboardData()

  },[])

    return(
        <>
        <main style={{marginTop: "100px;"}}>
<br /><br />
<div class="card" style={{width: "20%",marginLeft: "10px"}}>
 
 <div class="card-body">
   <h5 class="card-title">Total Students <i style={{marginLeft : 10 , color:"red"}} class="fa-solid fa-bag-shopping"></i></h5>
   <p  style={{fontSize: 20 ,  fontWeight : "bold" ,  color : "green"}} class="card-text">{dashData.Student ? dashData.Student : 0 }</p>
 </div>
</div>
</main>
        </>
    )
}