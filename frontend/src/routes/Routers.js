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
import RoomDetail from '../pages/user/Rooms/RoomDetail'
import BookingForm from '../components/Bookings/BookingForm'
import BookingPage from '../pages/user/Bookings/BookingPage'
import BookingList from '../pages/admin/Booking/BookingList'
import RoomFeatureList from '../pages/admin/Features/RoomFeatureList'
import BookingHistory from '../pages/admin/Booking/AdminBookingStatusChange'
import RoomFilter from '../pages/user/Rooms/RoomFilter';
import BookingSuccessPage from '../pages/user/Bookings/BookingSuccessPage'
import MyBookingsPage from '../pages/user/Profile/MyBookings'
import CancelMyBooking from '../pages/user/Profile/CancelMyBooking'
import AvailableRoomsPage from '../pages/user/Bookings/AvailableRoomsPage'
import ReviewForm from '../pages/user/Review/ReviewForm'
import ReviewList from '../pages/user/Review/ReviewList'
import ResetPassword from '../pages/user/ResetPassword'










// import CategoryCreate from '../pages/admin/RoomCategories/CreateCategory'
// import AddCategory from '../pages/admin/RoomCategories/AddCategory'
// import EditCategory from '../pages/admin/RoomCategories/EditCategory'
// import RoomListUser from '../pages/user/Rooms/RoomListUser'
// import AddRoom from '../pages/admin/RoomCategories/AddRoom'




const Routers = () => {
  return (

    
  
    <Routes>

         {/* <------- User Routes -------> */} 
        
         
      <Route path='/signup' element={<Register />} />
      <Route path='/login' element={<Login/>} />
      <Route path='' element={<RouteUser/>} >
        <Route path="/" element={<HomePage/>}/>
         
        <Route path='/user/user-profile' element={<UserProfile/>} />
        
        <Route path='/logout' element={<Logout/>} />
        <Route path='/reset-password' element={<ResetPassword/>} />

         {/* <-----------Rooms------------> */}

        <Route path='/categorylist' element={<CategoryList/>} />
        <Route path='/roomlistuser' element={<RoomListUser/>} />
        <Route path='/services' element={<Services/>} /> 
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/room-detail/:id' element={<RoomDetail/>} />
        <Route path='/room-filter' element={<RoomFilter/>} />
  

        
        


        {/* <-----------Booking------------> */}


        <Route path='/get-available-rooms' element={<AvailableRoomsPage/>} />
        <Route path='/add-roombooking' element={<BookingForm/>} />
        <Route path='/roombooking-page/:id' element={<BookingPage/>} />
        <Route path='/booking-success' element={<BookingSuccessPage/>} />
        <Route path='/my-bookings/:userId' element={<MyBookingsPage/>} />
        <Route path='/add-reviews' element={<ReviewForm/>} />
        <Route path='/reviews' element={<ReviewList/>} />
        <Route path='/roombooking-page/:bookingId/cancel-booking' element={<CancelMyBooking/>} />
        
        
        {/* <Route path='/my-bookings' element={<MyBookings/>}/> */}


        
        



    

        
    
    </Route>
      



       

        {/* <------- Admin Routes -------> */}
        
        
    
      
      
      
    
      <Route path="/admin" element={<AdminLogin/>} />
      <Route path="" element={<RouteAdmin />} >
      <Route path="/admin/ad-logout" element={<AdminLogout />} /> 
      
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path='/admin/usermanagement' element={<UserManagement />} />
        <Route path='/admin/room-category' element={<RoomCategory/>} />
        <Route path='/admin/room-list' element={<RoomList/>} />
        <Route path='/admin/room-feature' element={<RoomFeatureList/>} />
      

        <Route path='/admin/booking-list' element= {<BookingList/>} />
        <Route path='/admin/booking-history'element= {<BookingHistory/>} />


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