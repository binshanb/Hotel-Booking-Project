import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import instance from '../../../utils/Axios';
import { baseUrl } from '../../../utils/constants';

const OtpLogin = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  console.log(phoneNumber,"phone");
  const [error, setError] = useState('');

  const handlePhoneChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleProceed = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await instance.post(`${baseUrl}/api/send-otp/`, { phone_number: phoneNumber },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );
      if (response.status === 200) {
       navigate('/otp-verify');
      } else {
        setError('Error sending OTP. Please try again.');
      }
    } catch (error) {
      setError('Error sending OTP. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="max-w-md w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-2xl mb-4">Enter Your Phone Number</h1>
        <input
          type="text"
          placeholder="Enter Phone Number"
          value={phoneNumber}
          onChange={handlePhoneChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 mb-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <button
          onClick={handleProceed}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Proceed
        </button>
        <p className="text-red-500 mt-2">{error}</p>
      </div>
    </div>
  );
};

export default OtpLogin;








// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import instance from "../../../utils/Axios";
// // import secureAxios from "../src/Config/secureAxios/secureAxios"

// export default function GetNumber(props) {
//   const [inputNumber, setInputNumber] = useState("");

//   const navigate = useNavigate();

//   localStorage.setItem("number", inputNumber);

//   const SendOtp = () => {
//     instance({
//       method: "POST",
//       url: "http://127.0.0.1:8000/api/sendOTP/",
//       data: {
//         number: inputNumber,
//       },
//     })
//       .then((res) => {
//         if (res.data.OTPSent === true) {
//           navigate("/CheckOTP");
//         } else {
//           alert("OTP Was Not sent");
//         }
//       })
//       .catch((e) => console.log(e));
//     console.log("This is Input Number", inputNumber);
//   };

//   return (
//     <div className="d-flex justify-content-center align-items-center container">
//       <div className="col form-signin card py-5 px-3">
//         <h1 className="h3 mb-3 fw-normal">Enter Mobile Number</h1>

//         <div className="form-floating">
//           <input
//             type="text"
//             name="Number"
//             className="form-control"
//             id="floatingInput"
//             onChange={(e) => {
//               setInputNumber(e.target.value);
//             }}
//             // {...register("Number", { pattern: /^[0-9]{10}$/ })}
//           />

//           <label for="floatingInput">Enter Your Mobile Number</label>
//         </div>

//         {/* <div style={{ marginTop: "5%" }}>
//             {errors.Number && <span style={style.error}>Invalid Number</span>}
//           </div> */}

//         <button
//           className="btn btn-lg btn-outline-primary  my-4 mx-5"
//           type="submit"
//           onClick={() => {
//             SendOtp();
//           }}
//         >
//           Get OTP
//         </button>
//       </div>
//     </div>
//   );
// }