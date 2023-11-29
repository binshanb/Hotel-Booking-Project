// // ReviewFormComponent.js

// import React, { useState } from 'react';
// import instance from '../../../utils/Axios';
// import { useSelector} from 'react-redux';


// const ReviewForm = ({ roomId }) => {
//   const [rating, setRating] = useState('');
//   const [comment, setComment] = useState('');

//   const roomInfo= useSelector((state) => state.room.roomInfo);
//   const userInfos = useSelector((state) => state.auth.userInfo);
//   const [decodedUserInfo, setDecodedUserInfo] = useState({});

//   useEffect(() => {
//     if (userInfos) {
//       // Decode the token and set the user info state
//       const decodedInfo = jwtDecode(userInfos.access); // Assuming 'access' contains user details
//       console.log(decodedInfo);
//       setDecodedUserInfo(decodedInfo);
//     }
//     if (roomId){
//     // Fetch room info and user info when component mounts
//     dispatch(activateRoomInfo(roomId));
//     // dispatch(userInfos());
// }}, [dispatch,roomId]);

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await instance.post('/api/booking/reviews/', {
//         room: roomId,
//         rating: rating,
//         comment: comment,
//       });

//       console.log('Review added:', response.data);
//       // You can add further logic after submitting the review, like updating the UI.
//     } catch (error) {
//       console.error('Error adding review:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Add Review</h2>
//       <form onSubmit={handleFormSubmit}>
//         <label>
//           Rating:
//           <input type="number" min="1" max="5" value={rating} onChange={(e) => setRating(e.target.value)} />
//         </label>
//         <br />
//         <label>
//           Comment:
//           <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
//         </label>
//         <br />
//         <button type="submit">Submit Review</button>
//       </form>
//     </div>
//   );
// };

// export default ReviewForm;



import React, { useState } from 'react';
import { Button, Rating, TextField, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import instance from '../../../utils/Axios'; // Import your Axios instance

const ReviewForm = ({ roomID }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  // Fetch the user ID from Redux state
  const userID = useSelector((state) => state.auth.userInfo.id);

  const handleRatingChange = (event, newRating) => {
    setRating(newRating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await instance.post('/api/booking/add-reviews/', {
        room: roomID,
        customer: userID,
        rating,
        comment,
      });
      console.log('Review submitted:', response.data);
      // Additional logic after successful review submission
    } catch (error) {
      console.error('Error submitting review:', error);
      // Handle error scenario
    }
  };

  return (
    <div>
      <Typography variant="h5">Add Review</Typography>
      <form onSubmit={handleSubmit}>
        <Rating
          name="simple-controlled"
          value={rating}
          onChange={handleRatingChange}
          precision={1}
          size="large"
        />
        <TextField
          label="Comment"
          multiline
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" type="submit">
          Submit Review
        </Button>
      </form>
    </div>
  );
};

export default ReviewForm;




