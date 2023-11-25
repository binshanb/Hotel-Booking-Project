

// import hotelImage1 from '../../../assets/hotel11.jpg';
// import hotelImage3 from '../../../assets/singlebed1.jpg';
// import hotelImage4 from '../../../assets/familybed1.jpg';
// import hotelImage5 from '../../../assets/triplebed1.jpg';



// const roomsData = [
//   {
//     title: 'Single Room',
//     imageUrl: hotelImage3,
//     backgroundColor: 'bg-gray-400',
//     price: '550/day',
//     features: [
      
//     ],
//   },
//   {
//     title: 'Double Room',
//     imageUrl: hotelImage1,
//     backgroundColor: 'bg-gray-400',
//     price: '₹ 999/ day',
//     features: [
      
//     ],
//   },
//   {
//     title: 'Tripple Room',
//     imageUrl: hotelImage5,
//     backgroundColor: 'bg-gray-400',
//     price: '₹ 1999/day',
//     features: [
    
//     ],
//   },
//   {
//     title: 'Family Room',
//     imageUrl: hotelImage4,
//     backgroundColor: 'bg-gray-400',
//     price: '₹ 3000/day',
//     features: [
    
//     ],
//   },
// ];





import React, { useState, useEffect } from 'react';
import { Box, Heading, Button, Grid, Image } from '@chakra-ui/react';
import { baseUrl } from '../../../utils/constants';
import { adminInstance } from '../../../utils/Axios';
import { useNavigate } from 'react-router-dom';

function CategoryList() {
  const [categoryList, setCategoryList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the room categories and update state
    adminInstance.get(`${baseUrl}/api/booking/admin/room-category/`)
      .then((response) => response.data)  // Use response.data instead of response.json()
      .then((data) => setCategoryList(data))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);
  const handleRoomList=()=>{
    navigate('/roomlistuser')
  }

  return (
    <Box p={4} className="room-container">
      <Box textAlign="center" my={5}>
        <Heading as="h1" size="xl" fontWeight="bold" color="gray.800">
          Room Categories
        </Heading>
        <Box w="16" h="1" bg="blue.500" mx="auto" mt={2}></Box>
      </Box>
      <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
        {categoryList.map((category, index) => (
          <Box key={index} mb={6}>
            <Box p={6} rounded="lg" shadow="md" border="1px" borderColor="gray.300" bg="white" pos="relative" className={category.backgroundColor}>
              <Image src={category.image} alt={category.category_name} mb={4} h="48" w="full" objectFit="cover" rounded="lg" mx="auto" />
              <Heading as="h2" fontSize="2xl" fontWeight="semibold" color="black" mb={2} textAlign="center">
                {category.category_name}
              </Heading>
              <Button
                onClick={handleRoomList}
                display="inline-block"
                px={6}
                py={3}
                bg="blue.500"
                color="white"
                rounded="md"
                textAlign="center"
                transition="all 0.3s"
                _hover={{ transform: 'scale(1.05)', bg: 'blue.600' }}
                mx="auto"
                d="block"
              >
                Go to Rooms
              </Button>
            </Box>
          </Box>
        ))}
      </Grid>
    </Box>
  );
}

export default CategoryList;













