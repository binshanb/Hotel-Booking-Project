import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Typography,Button } from '@mui/material';
import instance from '../../../utils/Axios';
import { Link } from 'react-router-dom';

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await instance.get('/api/booking/reviews/');
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    }
    fetchReviews();
  }, []);

  return (
    <div>
      <Typography variant="h5">Room Reviews</Typography>
      <List>
        {reviews.map((review) => (
          <ListItem key={review.id} sx={{ border: '1px solid #ccc', borderRadius: '5px', marginBottom: '10px' }}>
            <ListItemText>
              <Typography variant="body1">Rating: {review.rating}</Typography>
              <Typography variant="body2">Comment: {review.comment}</Typography>
            </ListItemText>
          </ListItem>
        ))}
      </List>
          {/* Add Review button */}
          <Button variant="contained" color="primary" component={Link} to="/add-reviews">
        Add Review
      </Button>
    </div>
  );
};

export default ReviewList;

