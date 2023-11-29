import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useResetPasswordMutation } from "../../redux/slices/userslices/userApiSlice";

function ResetPassword(){
let [password,setPassword]=useState('')
let [confirmPassword,setConfirmPassword]=useState('')
const navigate=useNavigate()
let {state}=useLocation()

let [ResetPassword]=useResetPasswordMutation()

const passwordPattern=/^(?=.*[A-Za-z])(?=.*\d)(?!\s).{6,}$/;

const resetPassword=async(e)=>{
e.preventDefault()
try{
    if(passwordPattern.test(password)){
        if(password===confirmPassword){
let res=await ResetPassword({state,password}).unwrap()
toast('Password successfully changed')
navigate('/login')
        }else{
toast.error('Please check the confirm error')

        }
    }else{
        toast.error('Please create a strong password')
}

}catch(error){
    toast.error(error.data)
}
}

return (
  <div className='login template d-flex justify-content-center align-items-center vh-100' style={{ backgroundColor: 'rgb(255 204 0)' }}>
  <div className='form_container p-5 rounded bg-white'>
    <form onSubmit={resetPassword}>
      <h3 className='text-center'>Reset Password</h3>
      <div className='mb-3'>
      <input
  type="password"
  name="password"
  placeholder="Enter password"
  className="form-control"
  
  onChange={(e) => setPassword(e.target.value)}
  
  />
  
      </div>
      <div className='mb-3'>
        <input type="password" name="password" placeholder='Re Enter Password' className='form-control' onChange={(e) => setConfirmPassword(e.target.value)}  />
      </div>
      <div className='d-grid'>
        <button type="submit" className='btn btn-primary mb-3' >
        Reset Password
        </button>
      </div>
     
    </form>
  </div>
  
  </div>

)


}

export default ResetPassword;