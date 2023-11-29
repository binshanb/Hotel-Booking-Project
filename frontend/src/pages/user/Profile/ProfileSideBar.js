import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { Box, VStack, Text, Divider } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { baseUrl } from '../../../utils/constants';

const MyProfileSideBar = () => {
  const { userInfo } = useSelector((state) => state.auth.userInfo);
  const [decodedUserInfo, setDecodedUserInfo] = useState({});
  const user = localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null
console.log(user,'local storage')
  useEffect(() => {
    if (user) {
      const decodedInfo = jwtDecode(user.access);
      
      setDecodedUserInfo(decodedInfo);
      console.log(decodedInfo, 'Decoded User Info');
    }
  }, []);

  console.log(decodedUserInfo, 'Updated');

  return (
    <Box w="250px" h="100vh" bg="gray.200" p="4">
      <VStack align="flex-start" spacing="4">
        <Link to="/user-profile">
          <Text fontSize="lg" fontWeight="bold">
            My Profile
          </Text>
        </Link>
        <Divider />
        <Link to="/edit-profile">
          <Text fontSize="lg" fontWeight="bold">
            Edit Profile
          </Text>
        </Link>
        <Divider />
  
          <Link to={`/my-bookings/${decodedUserInfo.id}`}>
            <Text fontSize="lg" fontWeight="bold">
              My Bookings
            </Text>
          </Link>
     
        <Divider />
      </VStack>
    </Box>
  );
};

export default MyProfileSideBar;

