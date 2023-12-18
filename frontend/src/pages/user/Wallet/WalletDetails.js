import React, { useState, useEffect } from 'react';
import instance from '../../../utils/Axios';
import { baseUrl } from '../../../utils/constants';
import jwtDecode from 'jwt-decode';
import { useSelector } from 'react-redux';

const WalletDetails = ({ userId }) => {
  const [wallet, setWallet] = useState(null);
  console.log(wallet,);
  const users=useSelector((state) => state.auth.userInfo);
  const [decodeInfo,setDecodeInfo]=useState({});
  console.log(decodeInfo,"iddddddddddd");
  useEffect(() => {
    if (users) {
      // Decode the token and set the user info state
      const decodedInfo = jwtDecode(users.access); // Assuming 'access' contains user details
      console.log(decodedInfo);
      setDecodeInfo(decodedInfo);
      userId = decodeInfo.user_id
      console.log(userId,"kllllllllllll");
    }},[userId]);
  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const response = await instance.get(`${baseUrl}/api/booking/wallet/${userId}/`);
        setWallet(response.data);
      } catch (error) {
        console.error('Error fetching wallet:', error);
      }
    };

    fetchWallet();
  }, [userId]);

  return (
    <div>
      <h2>Wallet Details</h2>
      {wallet && decodeInfo.email && (
        <div>
        
          <p>User: {wallet.user.email}</p>
          <p>Balance: {wallet.balance}</p>

          </div>
          )}
          {!wallet && <p>Loading...</p>} 
       </div>
  );
};

export default WalletDetails;
