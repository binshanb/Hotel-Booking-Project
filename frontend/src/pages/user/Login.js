import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/slices/userslices/userApiSlice";
import { setCredentials } from "../../redux/slices/userslices/authSlice";
import { ToastContainer,toast  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth || {});
    const showToast = (message, type = 'error') => {
    toast[type](message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000, // 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  useEffect(() => {
    if (Object.keys(formErrors).length === 0) {
      console.log();
    }
  }, [formErrors]);
  const submitHandler = async (e) => {
    e.preventDefault();
    setFormErrors(validate(email, password));

    try {
      const res = await login({ email, password }).unwrap();
      console.log("res", res);
      dispatch(setCredentials({ ...res }));
      if (res.status===200){
        showToast("Login successful");
        navigate("/");
      
    }else{
      console.error('Login failed:');
      showToast('Login failed: ');
      navigate("/login");
    }
    } catch (err) {
      toast.error(err?.data || err?.error);
    }
  };

  const validate = (email, password) => {
    const errors = {};
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email) {
      errors.email = "Email is required";
    } else if (!regex.test(email)) {
      errors.email = "This is an invalid email";
    }
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Invalid Password";
    } else if (password.length > 10) {
      errors.password = "Invalid Password";
    }
    return errors;
  };
  return (
    <div
      className="login template d-flex justify-content-center align-items-center vh-100 bg-blue-200"
  
    >
      <div className="form_container p-5 rounded bg-white">
        <form onSubmit={submitHandler}>
          <h3 className="text-center">Sign In</h3>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              placeholder="Enter Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="form-control"
            />
            {formErrors.email && (
              <p style={{ color: "red" }}>{formErrors.email}</p>
            )}
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              placeholder="Enter password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="form-control"
            />
            <p style={{ color: "red" }}>{formErrors.password}</p>
          </div>

          <div className="d-grid mt-4">
            <button className="btn btn-primary mb-3">
              Sign In
            </button>
          </div>
          <div className="text-end mt-2">
            <p className="link">
              <Link
                style={{ color: "black", textDecoration: "none" }}
                to="/forgotPassword"
              >
                Forgot Password ?
              </Link>{" "}
              |
              <Link
                style={{ color: "black", textDecoration: "none" }}
                to="/signup"
                className="ms-2"
              >
                Sign up
              </Link>
            </p>
          </div>
        </form>
        <ToastContainer />
        <div className="links-container text-end mt-2">
          <p>
            <Link
              style={{ color: "black", textDecoration: "none" }}
              to="/otpLoginEmail"
              className="ms-2"
            >
              Otp Login
            </Link>
          </p>
          <p></p>
        </div>
      </div>
    
    </div>
  );
}

export default UserLogin;


































































































// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { UserLogin } from "../../redux/features/reducer/UserAuthSlice";
// import { Link, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import './Login.css'

// export const Login = () => {
//   const loading = useSelector((s) => s.user?.loading);
//   const error = useSelector((s) => s.user?.error);
//   const data = useSelector((s) => s.user?.data);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [credentials, setCredentials] = useState({
//     email: "",
//     password: "",
//   });

//   const handleOnSubmit = async () => {
//     try {
//       const response = await dispatch(UserLogin(credentials));
//       console.log(response);
//       if (response.error) {
//         throw new Error("Invalid credentials");
//       }

   

//       // Display success message
//       Swal.fire({
//         icon: "success",
//         title: "Successfully logged in",
//         showConfirmButton: false,
//         timer: 1500,
//       });

//       // Navigate to another page
//       navigate("/");
//     } catch (error) {
//       console.error(error);

//       // Display error message
//       Swal.fire({
//         icon: "error",
//         title: "Login failed",
//         text: "Please check your credentials and try again.",
//       });
//     }
//   };

//   if (loading) {
//     return <h1>Loading</h1>;
//   }


//   return (
//       <div className="container mt-5 ml-5">
//           <h1>Sign In</h1><br/>
//           <p>Sign into your Account</p><br/>
//               <input
                
//                 id="email"
//                 onChange={(e) =>
//                   setCredentials((s) => ({ ...s, email: e.target.value }))
//                 }
//                 value={credentials.email}
//                 name="email"
//                 type="email"
//                 placeholder="Email"
//                 required
                
//                 className="block px-3 py-2 placeholder-gray-47wQbNPTDJp9hMYdvogK2hAUiHsGeiybwaWe36bwtRQ3UTpYV7YuZ8FV5j9nauFCWwcjM6dTzpL5s2N79Rp5unwdMvc8ZKUborder-indigo-500 sm:text-sm"
//               /><br/>
//               <input
                
//                 id="password"
//                 onChange={(e) =>
//                   setCredentials((s) => ({ ...s, password: e.target.value }))
//                 }
//                 value={credentials.password}
//                 name="password"
//                 type="password"
//                 placeholder="Password"
//                 required
                
//                 className="block  px-3 py-2 placeholder-gray-47wQbNPTDJp9hMYdvogK2hAUiHsGeiybwaWe36bwtRQ3UTpYV7YuZ8FV5j9nauFCWwcjM6dTzpL5s2N79Rp5unwdMvc8ZKUborder-indigo-500 sm:text-sm"
//               /><br/>
//             <button
//               onClick={handleOnSubmit}
//               className="block px-4 py-2  font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500 sm:text-sm"
//             >
//               Login
//             </button><br/>
//            <Link to="/" className="mr-3">
//               Cancel
//               </Link>
           
//             <br/>

//       <Link to="/signup" className="mt-3">
//       <p> You are a new user ?</p> SignUp
//           </Link>
//         </div>
//   );
// };