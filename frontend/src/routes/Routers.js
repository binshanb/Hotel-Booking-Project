import React from 'react'

import {Routes,Route} from 'react-router-dom'
import AdminDashboard from '../pages/admin/AdminDashBoard'
import HomePage from '../pages/user/Home/HomePage'
import RouteUser from '../utils/RouteUser'
import RouteAdmin from  '../utils/RouteAdmin'
import Login from '../pages/user/Login'
import Register from '../pages/user/Register'
import AdminLogin from '../pages/admin/AdminLogin'
import UserManagement from '../pages/admin/UserManagement'
import Logout from '../pages/user/Logout'
import AdminLogout from '../pages/admin/AdminLogout'
import UserProfile from '../pages/user/Profile/UserProfile'
import CategoryList from '../pages/user/Rooms/CategoryList'
import Services from '../pages/user/Services/Services'
import About from '../pages/user/About/About'
import Contact from '../pages/user/Contact/Contact'
import RoomCategory from '../pages/admin/RoomCategories/RoomCategory'
import RoomList from '../pages/admin/RoomCategories/RoomList'
import RoomListUser from '../pages/user/Rooms/RoomListUser'
import AmenitiesList from '../pages/admin/Amenities/AmenitiesList'
// import AddCategory from '../pages/admin/RoomCategories/AddCategory'
// import EditCategory from '../pages/admin/RoomCategories/EditCategory'
// import RoomListUser from '../pages/user/Rooms/RoomListUser'
// import AddRoom from '../pages/admin/RoomCategories/AddRoom'


import RoomDetail from '../pages/user/Rooms/RoomDetail'



// import CategoryCreate from '../pages/admin/RoomCategories/CreateCategory'



const Routers = () => {
  return (

  
    <Routes>

         {/* <------- User Routes -------> */} 
        
         
      <Route path='/signup' element={<Register />} />
      <Route path='/login' element={<Login/>} />
      <Route path='' element={<RouteUser/>} >
        <Route path="/" element={<HomePage/>}/>
         
        <Route path='/user-profile' element={<UserProfile/>} />
        
        <Route path='/logout' element={<Logout/>} />
        <Route path='/categorylist' element={<CategoryList/>} />
        <Route path='/roomlistuser' element={<RoomListUser/>} />
        <Route path='/services' element={<Services/>} /> 
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/room-detail/:id' element={<RoomDetail/>} />
        
    
    </Route>
      



       

        {/* <------- Admin Routes -------> */}
        
        
    
      
      
      
    
      <Route path="/admin" element={<AdminLogin/>} />
      <Route path="" element={<RouteAdmin />} >
      <Route path="/admin/ad-logout" element={<AdminLogout />} /> 
      
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path='/admin/usermanagement' element={<UserManagement />} />
        <Route path='/admin/room-category' element={<RoomCategory/>} />
        <Route path='/admin/room-list' element={<RoomList/>} />
        <Route path='/admin/room-amenities' element={<AmenitiesList/>} />
      </Route>
      

        {/* <Route path='/admin/addcategory' element={< AddCategory/>}/>
        <Route path='/admin/deletecategory/:category_id' element={< AddCategory/>}/>
        <Route path='/admin/editcategory/:category_id' element={<EditCategory/>}/> */}
        {/* <Route path='/admin/roomlist' element={<RoomList/>} />
        <Route path='/admin/addroom' element={< AddRoom/>}/> */}
        
        
       

        
      
    </Routes>
   
  )
}

export default Routers;