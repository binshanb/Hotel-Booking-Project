import React, { useState, useEffect,useContext } from 'react';
import axios from 'axios';  // Import axios for making API requests
import { baseUrl } from '../../../utils/constants'; // Replace with your API URL
import instance from '../../../utils/Axios';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

 
function UserProfile() {
 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [image, setImage] = useState(null);
  const navigate=useNavigate()

  useEffect(() => {
 
    // Fetch user profile data from your API
    instance.get(`${baseUrl}/api/user/user-profile`)
      .then((response) => {
        const userData = response.data;
        setName(userData.name);
        setEmail(userData.email);
        setPhoneNumber(userData.phone_number);
        setAddress(userData.address);
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
      });
  }, []);

  const handleUpdateProfile = () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone_number', phone_number);
    formData.append('image', image);
    formData.append('address', address);

    instance.put(`${baseUrl}/api/user/user-profile/`, formData)
      .then((response) => {
        console.log('User profile updated:', response.data);
        navigate('/user-profile')
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          // Redirect to the login page or display an error message
          navigate('/login');
        } else {
          console.error('Error updating user profile:', error);
        }
        
      });
  };
  const handleAddProfile = () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone_number', phone_number);
    formData.append('image', image);
    formData.append('address', address);
    // Assuming you have an API endpoint for creating a new user profile
    // and a formData object containing the data for the new profile, which you've already defined
    instance
      .post(`${baseUrl}/api/user/user-profile/`, formData)
      .then((response) => {
        // Handle a successful profile creation, e.g., show a success message to the user
        console.log('User profile created:', response.data);
  
        // After creating the profile, you can navigate to the user's profile page
        // Use client-side routing to change the URL
       navigate('/user-profile');
      })
      .catch((error) => {
        // Handle errors, e.g., show an error message to the user
        console.error('Error creating user profile:', error);
      });
  };
  return (
    <div className="bg-gray-100 min-h-screen p-20 text-center">
    <h1 className="text-4xl font-bold">User Profile</h1>
    <div className="w-16 h-1 bg-blue-500 mx-auto mt-2"></div>
    {image && <img src={image} alt="Profile" className="w-40 h-40 mx-auto rounded-full" />}
    <input type="file" onChange={(e) => setImage(e.target.files[0])} className="mt-4 p-2 border border-gray-300 rounded" />
    <input
  type="text"
  value={name}
  onChange={(e) => setName(e.target.value)}
  placeholder="Name"
  className="mt-4 p-2 border border-gray-900 rounded w-full bg-white text-gray-900 focus:outline-none focus:shadow-outline"
/>
<input
  type="text"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="Email"
  className="mt-4 p-2 border border-gray-900 rounded w-full bg-white text-gray-900 focus:outline-none focus:shadow-outline"
/>
<input
  type="text"
  value={address}
  onChange={(e) => setAddress(e.target.value)}
  placeholder="Address"
  className="mt-4 p-2 border border-gray-900 rounded w-full bg-white text-gray-900 focus:outline-none focus:shadow-outline"
/>

<button onClick={handleUpdateProfile} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Edit Profile
      </button>
      <br/>
      <button onClick={handleAddProfile} className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        Add Profile
      </button>
  </div>
);
}


export default UserProfile;






















// import React, { useEffect, useState } from "react";
// import style from "./Profile.module.css";
// import { useDispatch, useSelector } from "react-redux";
// import userImg from "./profile-img.jpg";
// import ProfileView from "../../../components/ProfileView/ProfileView";
// import EditProfile from "../../../components/EditProfile/EditProfile";
// import ChangePassword from "../../../components/ChangePassword/ChangePassword";
// import { useMediaQuery } from "@mui/material";
// import Navbar from "../../../components/Navbar/Navbar";

// export default function Profile() {
//   const {dispatch} = useDispatch();
//   const { mode } = useSelector((state) => state.mode);
//   const [profile, viewProfile] = useState(true);
//   const [editProfile, viewEditProfile] = useState(false);
//   const [changePassword, viewChangePassword] = useState(false);
//   const isMobile = useMediaQuery("(max-width: 450px)");
//   const isXtraSmall = useMediaQuery("(max-width: 300px)");
//   const IsMedium = useMediaQuery("(max-width:1000px)");

//   const { loggedinUser } = useSelector((state) => state.getLoggedInUser);
//   const { user } = loggedinUser;
//   const IsLargee = useMediaQuery("(max-width:1400px)");
//   const IsMediumm = useMediaQuery("(max-width:1000px)");
//   const IsSmalll = useMediaQuery("(max-width:768px)");
//   const IsMobilee = useMediaQuery("(max-width:450px)");

//   return (
//     <>
//       <div>
//         <Navbar />
//       </div>
//       <div className="d-flex">
//         <div className="container-fluid mt-5" style={{ marginTop: "50px" }}>
//           <div
//             className={`rounded ${mode === "dark" ? "bg-dark" :style.bg}`}
//           ></div>
//           <div className="row">
//             <div
//               className="col-md-12 p-3 d-flex "
//               // style={{ marginLeft: "10px" }}
//             >
//               <h1 className={`fs-1 fw-bold ${style.heading} mx-auto `}>
//                 User Profile
//               </h1>
//             </div>

//             <div className="col-md-4 col-sm-12">
//               <div
//                 className={`${
//                   mode === "light" ? "bg-white" : "bg-dark"
//                 } d-flex flex-column align-items-center text-center w-75 mx-auto mt-3 pb-5 rounded-3`}
//               >
//                 <img
//                   style={{ width: "35%" }}
//                   className="mt-5 rounded-circle"
//                   src={user && user.photo ? user.photo : userImg}
//                   alt=""
//                 />
//                 <h2
//                   className={`fw-semibold my-2 text-${
//                     mode === "light" ? "dark" : "light"
//                   }`}
//                 >
//                   {user && user.first_name ? `${user.first_name} ${user.last_name}` : "User Name Not Available"}
//                 </h2>
//                 <span
//                   className={`text-${
//                     mode === "light" ? "black-50" : "white-50"
//                   }`}
//                 >
//                   {user && user.account_type ? user.account_type : "Account Type Not Available"}
//                 </span>
//               </div>
//             </div>

//             <div className="col-md-8 mb-5">
//               <div
//                 className={`pt-2 mt-3 ${
//                   mode === "light" ? "bg-white" : "bg-dark"
//                 } rounded-3 me-2`}
//               >
//                 <div className="row text-center m-1 mt-4">
//                   <div className="col-md-3 col-lg-3 col-4">
//                     <p
//                       className={`${style.portion} ${
//                         isXtraSmall ? "fw-bold small" : "fs-5"
//                       }`}
//                       // style={isXtraSmall && { fontSize: "14px" }}
//                       onClick={() => {
//                         viewProfile(true);
//                         viewEditProfile(false);
//                         viewChangePassword(false);
//                       }}
//                     >
//                       Overview {isMobile && "Profile"}
//                     </p>
//                     {profile && (
//                       <hr className={`${style.hr} mt-2 mb-0 text-primary`} />
//                     )}
//                   </div>
//                   <div className="col-md-4 col-lg-3 col-4">
//                     <p
//                       className={`${style.portion} ${
//                         isXtraSmall ? "fw-bold small" : "fs-5"
//                       } `}
//                       // style={isXtraSmall && { fontSize: "14px" }}
//                       onClick={() => {
//                         viewProfile(false);
//                         viewEditProfile(true);
//                         viewChangePassword(false);
//                       }}
//                     >
//                       Edit Profile
//                     </p>
//                     {editProfile && (
//                       <hr className={`${style.hr} mt-2 mb-0 text-primary`} />
//                     )}
//                   </div>
//                   <div className="col-md-5 col-lg-3 col-4">
//                     <p
//                       className={`${style.portion} ${
//                         isXtraSmall ? "fw-bold small" : "fs-5"
//                       }`}
//                       // style={isXtraSmall && { fontSize: "14px" }}
//                       onClick={() => {
//                         viewProfile(false);
//                         viewEditProfile(false);
//                         viewChangePassword(true);
//                       }}
//                     >
//                       Change Password
//                     </p>
//                     {changePassword && (
//                       <hr className={`${style.hr} mt-2 mb-0 text-primary`} />
//                     )}
//                   </div>

//                   <div className="col-md-12">
//                     <hr className="mt-0" />
//                   </div>
//                 </div>
//                 {profile ? (
//                   <ProfileView profile={loggedinUser} />
//                 ) : editProfile ? (
//                   <EditProfile profile={loggedinUser} />
//                 ) : changePassword ? (
//                   <ChangePassword profile={loggedinUser} />
//                 ) : null}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
































































































































// import {
//   MDBCol,
//   MDBContainer,
//   MDBRow,
//   MDBCard,
//   MDBCardText,
//   MDBCardBody,
//   MDBCardImage,
//   MDBBtn,
//   MDBBreadcrumb,
//   MDBBreadcrumbItem,
//   MDBProgress,
//   MDBProgressBar,
//   MDBIcon,
//   MDBListGroup,
//   MDBListGroupItem,
// } from "mdb-react-ui-kit";

// import axios from "axios";
// import react,{useState,useEffect} from 'react';
// import {BiSolidEdit} from 'react-icons/bi';


// function UserProfile() {

//   const [userProfile, setUserProfile] = useState({});
//   const [image, setImage] = useState(null);
//   const [address, setAddress] = useState('');
  
//       useEffect(() => {
//           axios.get('/api/user-profile/')
//               .then((response) => {
//                   setUserProfile(response.data);
//               })
//               .catch((error) => {
//                   console.error('Error fetching user profile:', error);
//               });
//       }, []);
  
//       const handleUpdateProfile = () => {
//           const formData = new FormData();
//           formData.append('image', image);
//           formData.append('address', address);
  
//           axios.put('/api/user-profile/', formData)
//               .then((response) => {
//                   console.log('User profile updated:', response.data);
//               })
//               .catch((error) => {
//                   console.error('Error updating user profile:', error);
//               });
//       };
//   return (
//     <>
//     <section className="bg-gray-200">
//       <MDBContainer className="py-5">
//         <MDBRow>
//           <MDBCol>
//             <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4 w-100">
//               <MDBBreadcrumbItem>
//                 <a href="/">Home</a>
//               </MDBBreadcrumbItem>
//               <MDBBreadcrumbItem>
//                 <a href="/userprofile">User Profile</a>
//               </MDBBreadcrumbItem>
//             <MDBBreadcrumbItem className="ms-auto" >
//                 <BiSolidEdit />
//               </MDBBreadcrumbItem>
//             </MDBBreadcrumb>
//           </MDBCol>
//         </MDBRow>

//         <MDBRow>
//           <MDBCol lg="4">
//             <MDBCard className="mb-4">
//               <MDBCardBody className="text-center">
//                 <MDBCardImage
//                   src={userProfile.image}
//                   alt="avatar"
//                   className="rounded-circle"
//                   style={{ width: "150px" }}
//                   fluid
//                 />
//                  <p className="text-muted mb-1">Full Stack Developer</p>
//                <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
//                <MDBCard className="mb-4 mb-lg-0">
//               <MDBCardBody className="p-0">
//               <div className="d-flex justify-content-center mb-2">
//                  <MDBBtn>Save</MDBBtn>
//                    <MDBBtn outline className="ms-1">
//                    Edit
//                    </MDBBtn>
//                 </div>
//               </MDBCardBody>
//             </MDBCard>

      
            
//            </MDBCol>
//         </MDBRow>
//     </MDBContainer>
 
          
//               <input
//               type="file"
//               onChange={(e) => setImage(e.target.files[0])}
//               className="mt-4 p-2 border border-gray-300 rounded"
//           />
//           <input
//               type="text"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//               placeholder="Address"
//               className="mt-4 p-2 border border-gray-300 rounded w-full"
//           />
//           <button
//               onClick={handleUpdateProfile}
//               className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//           >
//               Update Profile
//           </button>
          
//           </section>
//     </>
//   )
//  };

//  export default UserProfile;