import { useState } from "react";
import {useLocation,useNavigate} from "react-router-dom"
import {toast} from "react-toastify"
import userAxiosInstance from '../../utils/userAxiosInstance.js'
import hotelAxiosInstance from "../../utils/hotelAxiosInstance.js"
import adminAxiosInstance from '../../utils/adminAxiosInstance.js';

function OtpLoginEmail(){
    const [email,setEmail]=useState('')
    const location=useLocation()

    const adminRoute=location.pathname.startsWith('/admin')
    const hotelRoute=location.pathname.startsWith('/hotel')
    
    const userType=adminRoute?'admin' : hotelRoute?'hotel':'users'

    const navigate=useNavigate()

    const otpLoginEmailSubmitHandler=async(e)=>{
        e.preventDefault()
        try{
            if(userType==='users'){
                const res=await userAxiosInstance.post('/otpLoginVerifyEmail',{email})
                navigate('/otpLogin',{state:email})
            }else if(userType==='admin'){
                const res=await adminAxiosInstance.post('/otpLoginVerifyEmail',{email})
                navigate('/admin/otpLogin')
            }else{
                const res=await hotelAxiosInstance.post('/otpLoginVerifyEmail',{email})
                navigate('/hotel/otpLogin')
            }

        }catch(error){
            toast.error(error?.response?.data||error.error)
        }
    }
    return(

        <div className="flex justify-center items-center h-screen">
        <div className="login-form">
          <div className="w-96 rounded-lg shadow-lg p-6 ">
            <h1 className="text-3xl font-semibold text-black mb-4 text-center">
              OTP Login with Email
            </h1>
            <form onSubmit={otpLoginEmailSubmitHandler}>
            <div className="mb-4">
              <label htmlFor="Email" className="block text-gray-700">
                Email
              </label>
              <input
                type="email"
                onChange={(e)=>setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
              
            </div>
            <button
    type="submit"
    style={{ backgroundColor: '#ffc0cb', color: 'dark-black', border: 'none', borderRadius: '0.25rem', padding: '0.625rem 1.25rem',  marginTop: '1rem', transition: 'background-color 0.3s ease', }}
    className="btn-send-otp"
  >
    Send OTP
  </button>
            </form>
          </div>
        </div>
      </div>

    )

}

export default OtpLoginEmail