import { useState } from "react";
import { useForgotPasswordMutation } from "../../slices/usersApiSlice.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";



function ForgotPassword(){
    const [email,setEmail]=useState('')

    let [forgotPassword]=useForgotPasswordMutation()
   
    const navigate=useNavigate()
    
    const forgotSubmitHandler=async(e)=>{
        e.preventDefault()

        try{
            const res=await forgotPassword({email}).unwrap()

navigate('/verifyOtp',{state:email})
        }catch(error){
            toast.error(error?.data||error.error)
        }
    }

    return (


<div className='login template d-flex justify-content-center align-items-center vh-100' style={{ backgroundColor: 'rgb(255 204 0)' }}>
<div className='form_container p-5 rounded bg-white'>
  <form onSubmit={forgotSubmitHandler}>
    <h3 className='text-center'>Forgot Password</h3>
    <div className='mb-3'>
      <input type="email" name="email" placeholder='Enter Email' className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} />
    </div>
   
    <div className='d-grid'>
      <button type="submit" className='btn btn-primary mb-3' >
       Sent Otp
      </button>
    </div>
   
  </form>
</div>

</div>

    )

}

export default ForgotPassword