import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Flex, Grid, Image, Link } from '@chakra-ui/react';
import { adminInstance } from '../../../utils/Axios';
import { baseUrl } from '../../../utils/constants';
import { useParams } from 'react-router-dom';
import RoomFilter from './RoomFilter';

function RoomListUser() {
  const [roomList, setRoomList] = useState([]);
  const {id} = useParams()
  

  useEffect(() => {
    // Fetch the list of rooms and update state
    adminInstance.get(`${baseUrl}/api/booking/roomlistuser/`)
      .then((response) => response.data)
      .then((data) => setRoomList(data))
      .catch((error) => console.error('Error fetching rooms:', error));
  }, []);



  return (
    <Box p={4} className="room-container">
      <RoomFilter />
      <Box textAlign="center" my={5}>
        <Heading as="h1" size="xl" fontWeight="bold" color="gray.800">
          Room List
        </Heading>
        <Box w="16" h="1" bg="blue.500" mx="auto" mt={2}></Box>
      </Box>

      <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={4}>
        {roomList.map((room, index) => (
          <Box key={index} mb={4}>
            <Box p={6} rounded="lg" shadow="md" border="1px" borderColor="gray.300" bg="white" overflow="hidden" pos="relative">
              <Image src={room.cover_image} alt={room.title} mb={4} h="48" w="full" objectFit="cover" roundedTop="lg" />
              <Box p={4}>
                <Heading as="h2" fontSize="lg" fontWeight="semibold" color="black" mb={2}>
                  Name: {room.title}
                </Heading>
                <Text fontSize="lg" fontWeight="semibold" color="black" mb={2}>
                  Price Per Day: ₹ {room.price_per_night}
                </Text>
                <Link
                  href={`/room-detail/${room.id}/`}
                  display="inline-block"
                  px={4}
                  py={2}
                  bg="blue.500"
                  color="white"
                  rounded="md"
                  textAlign="center"
                  transition="all 0.3s"
                  _hover={{ bg: 'blue.600' }}
                >
                  View Details
                </Link>
              </Box>
            </Box>
          </Box>
        ))}
      </Grid>
    </Box>
  );
}

export default RoomListUser;




