import React, { useState } from 'react';
import instance from '../../../utils/Axios';
import { baseUrl } from '../../../utils/constants';

const OtpVerify = () => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await instance.post(`${baseUrl}/api/verify-otp/`, { otp }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Include authentication token if needed
        },
      });

      if (response.status === 200) {
        setMessage('OTP verified successfully.');
        // Handle successful OTP verification, such as redirecting to another page.
      } else {
        setMessage('Invalid OTP. Please try again.');
      }
    } catch (error) {
      setMessage('Error verifying OTP. Please try again.');
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="max-w-md w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-2xl mb-4">OTP Verification</h1>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={handleOtpChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 mb-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <button
          onClick={handleVerifyOtp}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Verify OTP
        </button>
        <p className="text-red-500 mt-2">{message}</p>
      </div>
    </div>
  );
};

export default OtpVerify;





















// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import instance from "../../../utils/Axios";
// // import secureAxios from "../src/Config/secureAxios/secureAxios"

// export default function CheckOTP(props) {
 
//   const [status, setStatus] = useState(false);
//   const [first, setFirst] = useState("");
//   const [second, setSecond] = useState("");
//   const [third, setThird] = useState("");
//   const [fourth, setFourth] = useState("");
//   let finalOTP = first + second + third + fourth;

//   const navigate = useNavigate();

//   const checkOtp = async () => {
//     await instance({
//       method: "PUT",
//       url: "http://127.0.0.1:8000/api/checkOTP/",
//       data: {
//         number: localStorage.number,
//         otp: finalOTP,
//       },
//     })
//       .then((res) => {
//         setStatus(res.data.status);
//         if (res.data.status === true) {
//           navigate("/signup");
//         } else {
//           alert("Incorrect OTP");
//         }
//       })
//       .catch((e) => console.log(e));
//     console.log("Status: ", status);
//   };

//   return (
//     <div className="h-100 row align-items-center">
//       <div className="d-flex justify-content-center align-items-center container">
//         <div className="card py-5 px-3">
//           <h5 className="m-0">Mobile phone verification</h5>
//           <span className="mobile-text">
//             Enter the code we just send on your mobile phone 
//             <b className="text-danger">+91 {localStorage.number}</b>
//           </span>
//           <div className="d-flex flex-row mt-5">
//             <input
//               type="text"
//               className="form-control"
//               autoFocus=""
//               maxLength="1"
//               onChange={(e) => setFirst(e.target.value)}
//             />
//             <input
//               type="text"
//               className="form-control"
//               maxLength="1"
//               onChange={(e) => setSecond(e.target.value)}
//             />
//             <input
//               type="text"
//               className="form-control"
//               maxLength="1"
//               onChange={(e) => setThird(e.target.value)}
//             />
//             <input
//               type="text"
//               className="form-control"
//               maxLength="1"
//               onChange={(e) => setFourth(e.target.value)}
//             />
//           </div>
//           <button
//             className="btn btn-lg btn-outline-primary  my-4 mx-5"
//             onClick={() => {
//               checkOtp();
//             }}
//           >
//             Submit
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }