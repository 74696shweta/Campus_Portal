
import './App.css';
import './Style/Layout.css';
import './Style/style.css';
import { Home } from '../src/Components/Home/Home';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import { EventNotice } from './Components/Home/EventNotice';
import { Login } from './Components/Home/Login';
import { Dashboard } from './Components/Admin/Dashboard';
import { NoticeBoard } from './Components/Admin/NoticeBoard';
import { AddStudent } from './Components/Admin/Student/AddStudent';
import { StudentsDetails } from './Components/Admin/Student/StudentsDetails';
import { UpdateStudent } from './Components/Admin/Student/UpdateStudent';
import ViewStudent from './Components/Admin/Student/ViewStudent';
import { StaffDetails } from './Components/Admin/Faculty/StaffDetails';
import { AddStaff } from './Components/Admin/Faculty/AddStaff';
import ViewStaff from './Components/Admin/Faculty/ViewStaff';
import { UpdateStaff } from './Components/Admin/Faculty/UpdateStaff';
import { StudentLogin } from './Components/Authentication/StudentLogin';
import { StaffLogin } from './Components/Authentication/StaffLogin';
import { StaffDashboard } from './Components/Staff/StaffDashboard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { UploadImage } from './Components/Staff/UploadImage';
import { ShowImage } from './Components/Staff/ShowImage';
import { Gallery } from './Components/Home/Gallery';
import { ResetPassword } from './Components/Authentication/ResetPassword';
import { StaffResetPassword } from './Components/Authentication/StaffResetPassword';
import { PublishNotice } from './Components/Admin/PublishNotice';
import { UpdateNotice } from './Components/Admin/UpdateNotice';
import { StaffNoticeBoard } from './Components/Staff/StaffNoticeBoard';
import { StaffPublishNotice } from './Components/Staff/StaffPublishNotice';
import { StaffUpdateNotice } from './Components/Staff/StaffUpdateNotice';
import { ViewFullNotice } from './Components/Home/ViewFullNotice';
import { Admins } from './Components/Admin/Admins';
import { AdminProfile } from './Components/Admin/AdminProfile';
import { UpdatePassword } from './Components/Admin/UpdatePassword';
import { StaffProfile } from './Components/Staff/StaffProfile';
import { Profile } from './Components/Home/Profile';
import { ContactUs } from './Components/Home/ContactUs';
import { StudentUploadImage } from './Components/Home/StudentUploadImage';
import { PageNotFound } from './Components/Home/PageNotFound';
import { DashContent } from './Components/Admin/DashContent';
import { StaffProfileUpdate } from './Components/Staff/StaffProfileUpdate';
import { AdminProfileUpdate } from './Components/Admin/UpdateAdminProfile';
import { StudentProfileUpdate } from './Components/Home/StudentProfileUpdate';
import { ShowTempImage } from './Components/Staff/ShowTempImage';
import { ApproveImage } from './Components/Staff/ApproveImage';

function App() {
  // const [isLoggedIn , setIsLoggedIn] = useState(false);
  // const [role, setRole] = useState('')
  // axios.defaults.withCredentials = true;
  //   useEffect(()=>{
  //       axios.get('http://localhost:9800/student/staff-session')
  //       .then(res => {
  //           console.log(res)
  //           if(res.data.valid){
  //             if(res.data.role === "Admin"){
  //               setRole(res.data.role)
  //               console.log(role)
  //             } else {
  //               setRole(res.data.role)
  //               console.log(role)
  //             }
  //               setIsLoggedIn(true);
  //           } 
  //       }).catch(err=> console.log(err))
  //   },[]);
  return (
    <>
    <Router>
      <Routes>
        
        <Route path = "/" element={<Home/>} />
        <Route path = "*" element={<PageNotFound/>} />
        <Route path = "/home" element={<Home/>} />
        {/* { !isLoggedIn ? */}
          <>
          <Route path ="/studentlogin"element={<StudentLogin/>} />
          <Route path='/login' element={<Login/>} />
          <Route path = "/stafflogin" element={<StaffLogin/>} /> 
          <Route path='/reset-password' element={<ResetPassword/>} />
        <Route path='/reset-password-staff' element={<StaffResetPassword/>} />
          </> 
        {/* : 
          role === "Admin" ? */}
          <Route path = "/dashboard" element={<Dashboard/>} /> 
          <Route path = "/staff" element={<StaffDashboard/>} /> 
         {/* }  */}
        <Route path='/contactus' element={<ContactUs/>} />
        <Route path='/uploadImage' element={<StudentUploadImage/>} />

        <Route path='/eventnotices' element={<EventNotice/>} />
        
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/dashcontent' element={<DashContent/>} />
        
        <Route path='/viewnotice/:id' element={<ViewFullNotice/>} />
        <Route path='/admin/adminside' element={<Admins/>} />
        <Route path='/admin/adminprofile' element={<AdminProfile/>} />
        <Route path='/admin/staffprofile' element={<StaffProfile/>} />
        <Route path='/staff/updatestaffprofile/:id' element={<StaffProfileUpdate/>} />
        <Route path='/admin/updatestaffprofile/:id' element={<AdminProfileUpdate/>} />
        <Route path='/admin/updatepassword' element={<UpdatePassword/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/updatestudentprofile/:id' element={<StudentProfileUpdate/>} />


        {/* Admin Routes */}
        <Route path='/admin' element={<Dashboard/>} />
        <Route path='/admin/noticeboard' element={<NoticeBoard/>} />
        <Route path='/admin/addnotice' element={<PublishNotice/>} />
        <Route path='/admin/updatenotice/:id' element={<UpdateNotice/>} />
        <Route path='/admin/students/' element={<StudentsDetails/>} />
        <Route path='/admin/viewstudents/:id' element={<ViewStudent/>} />
        <Route path='/admin/addstudent' element={<AddStudent/>} />
        <Route path='/admin/updatestudent/:id' element={<UpdateStudent/>} />
        <Route path='/admin/staff' element={<StaffDetails/>} />
        <Route path='/admin/addstaff' element={<AddStaff/>} />
        <Route path='/admin/viewstaff/:id' element={<ViewStaff/>} />
        <Route path='/admin/updatestaff/:id' element={<UpdateStaff/>} />
        
        {/* Staff Routes */}
        <Route path='/staff' element={<StaffDashboard/>} />
        <Route path='/staff/approveImage/:id' element={<ApproveImage/>} />
        
        <Route path='/staff/uploadimage' element={<UploadImage/>} />
        <Route path='/staff/tempimage' element={<ShowTempImage/>} />
        <Route path='/staff/showimage' element={<ShowImage/>} />
        <Route path='/gallery' element={<Gallery/>} />

        {/* Notice Board Routes */}

        <Route path='/staff/notice' element={<StaffNoticeBoard/>} />
        <Route path='/staff/addnotice' element={<StaffPublishNotice/>} />
        <Route path='/staff/updatenotice/:id' element={<StaffUpdateNotice/>} />
        
      </Routes>
    </Router>
    </>
  );
}

export default App;
