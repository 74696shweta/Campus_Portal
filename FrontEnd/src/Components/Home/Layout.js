import  styles from '../../Style/Navbar.module.css';
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {useNavigate,  NavLink} from 'react-router-dom'
export function Layout() {
    const [name, setName] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    useEffect(()=>{
        axios.get('http://localhost:9800/student/student-session')
        .then(res => {
            console.log(res)
            if(res.data.valid){
                setName(res.data.username)
                console.log(name)
                setIsLoggedIn(true);
            } 
        }).catch(err=> console.log(err))
    },[]);

    const Logout = () => {
        axios.get('http://localhost:9800/student/logout').then(res => {
            console.log("user logged out..")
            setIsLoggedIn(false);
            navigate("/")
        });
    }
    function alertMsg() {
        window.alert("Please login first for further accessibility...")
    }

    // function navActive(){
    //     document.getElementById("contact").style.backgroundColor = "black";
    //     document.getElementById("contact").style.color = "white";
    // }

    return(
        <>
    <header style={{position: "fixed"}}>
        <div className="header-top">
            <div className="container">
                <div className="row">
                    <div className="col-lg-7 col-md-12 left-item">
                        <ul>
                            <li><i className="fas fa-envelope-square"></i> educ@tionforall.com</li>
                            <li><i className="fas fa-phone-square"></i> +123 987 887 765</li>
                            <li><i className=""></i> {isLoggedIn == true ? `Welcome, ${name}` : " "}</li>
                            
                        </ul>
                    </div>
                    <div className="col-lg-5 d-none d-lg-block right-item">
                        <ul>
                            <li><NavLink><i className="fab fa-github" style={{color: "white"}}></i></NavLink></li>
                            <li><NavLink><i className="fab fa-google-plus-g" style={{color: "white"}}></i></NavLink></li>
                            <li> <NavLink><i className="fab fa-pinterest-p" style={{color: "white"}}></i></NavLink></li>
                            <li><NavLink><i className="fab fa-twitter" style={{color: "white"}}></i></NavLink></li>
                            <li> <NavLink><i className="fab fa-facebook-f" style={{color: "white"}}></i></NavLink></li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    <nav className="navbar navbar-expand-lg" style={{color: "white"}}>
    <div className="container-fluid">
        <NavLink to="#" className="navbar-brand">
            <img src="https://png.pngtree.com/png-vector/20230306/ourmid/pngtree-scool-college-logo-victor-vector-png-image_6634445.png" height="110" style={{color: "white",marginLeft: "250px", marginRight: "40px"}} alt="Education logo" />
        </NavLink>
        <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav" style={{fontSize: "18px", color: "#223d50" , fontWeight: "bolder"}}>

                <NavLink style={({isActive}) => {return {backgroundColor: isActive ? "#223d50" : "white" , color: isActive ? "white" : "#223d50" ,marginRight: "25px", borderRadius: "5px",opacity: "90%"} }} to="/" id='home' className="nav-item nav-link active">Home</NavLink>

                <NavLink to= {isLoggedIn ? "/eventnotices" : "/"} id = "enotice" style={({isActive}) => {return {backgroundColor: isLoggedIn ? isActive ? "#223d50" : "white" :  "white", color: isLoggedIn ? isActive ? "white" : "#223d50" : "#223d50",marginRight: "25px", borderRadius: "5px",opacity: "90%"} }} className="nav-item nav-link" onClick={isLoggedIn ? "" : alertMsg}>Event Notice</NavLink>
                
                <NavLink to={isLoggedIn ? "/gallery" : "/"} id='gallery' style={({isActive}) => {return {backgroundColor: isLoggedIn ? isActive ? "#223d50" : "white" :  "white", color: isLoggedIn ? isActive ? "white" : "#223d50" : "#223d50",marginRight: "25px", borderRadius: "5px",opacity: "90%"} }} className="nav-item nav-link" onClick={isLoggedIn ? "" : alertMsg}>Gallery</NavLink>
               

                <NavLink to="/contactus" style={({isActive}) => {return {backgroundColor: isActive ? "#223d50" : "white" , color: isActive ? "white" : "#223d50" ,marginRight: "25px", borderRadius: "5px",opacity: "90%"} }}  id='contact' className="nav-item nav-link">Contact Us</NavLink>
                
                {isLoggedIn ? (
                    <>
                                <NavLink to="/uploadImage" style={({isActive}) => {return {backgroundColor: isActive ? "#223d50" : "white" , color: isActive ? "white" : "#223d50" ,marginRight: "25px", borderRadius: "5px",opacity: "90%"} }} className='nav-item nav-link'>Upload Image</NavLink>

                                <NavLink to="/profile" id='profile' style={({isActive}) => {return {backgroundColor: isActive ? "#223d50" : "white" , color: isActive ? "white" : "#223d50" ,marginRight: "25px", borderRadius: "5px",opacity: "90%"} }}className='nav-item nav-link'>Profile</NavLink>

                                <a href="/home" id='logout' style={{color: "#223d50",marginRight: "25px"}} className='nav-item nav-link' onClick={Logout}>Logout</a>
                    </>
                            ) : (
                                <NavLink to="/login" id='login' style={{color: "#223d50",marginRight: "25px"}} className='nav-item nav-link'>Login</NavLink>
                            )}

                    
            </div>
            
        </div>
    </div>
</nav>
    </header>
    
    
    
    </>
    )
}