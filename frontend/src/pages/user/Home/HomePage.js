// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Button from '@mui/material/Button';
// import CameraIcon from '@mui/icons-material/PhotoCamera';
import Typography from '@mui/material/Typography';
// import ComputerIcon from '@mui/icons-material/Computer';
// import WorkIcon from '@mui/icons-material/Work';
// import SchoolIcon from '@mui/icons-material/School';


import Hotel1 from '../../../assets/hotel1.jpg' 
import Hotel2 from '../../../assets/hotel2.png' 
import DateSelectionForm from '../Bookings/DateSelectionForm';
import Hotel3 from '../../../assets/hotel16.jpg' 
import { Carousel } from 'react-responsive-carousel';
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
// import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
// import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import Footer from './home/Footer';
import Banner from './Banner';
import './HomePage.css'
import hotelImage from '../../../assets/hotel10.jpg';
import hotelImage1 from '../../../assets/hotel11.jpg';
import hotelImage2 from '../../../assets/hotel12.jpg';
import hotelImage3 from '../../../assets/hotel13.jpg';
import hotelImage4 from '../../../assets/hotel14.jpg';
import hotelImage5 from '../../../assets/hotel15.jpg';
import ImageCarousel from './Banner';


const rooms = [
  { id: 1, name: "Single Room", price: 1300},
  { id: 2, name: "Double Room", price: 2500},
  { id: 3, name: "Triple Room", price: 3500 },
  { id: 4, name: "Family Room", price: 5000 },

  // Add more room objects as needed
];

const cards = [
  {
    id: 1,
    title: 'Free Wi-Fi Availability',
    description: 'Stay connected with complimentary high-speed Wi-Fi throughout your stay.',
    imageUrl: hotelImage, // Replace with your image URL
  },
  {
    id: 2,
    title: 'Spacious Rooms',
    description: 'Relax in our spacious and well-furnished rooms.',
    imageUrl: hotelImage1, // Replace with your image URL
  },
  {
    id: 3,
    title: 'Gourmet Dining',
    description: 'Savor delectable dishes at our on-site restaurant.',
    imageUrl: hotelImage2, // Replace with your image URL
  },
  {
    id: 4,
    title: 'Room Service',
    description: 'Enjoy the convenience of 24/7 room service.',
    imageUrl: hotelImage3, // Replace with your image URL
  },
  {
    id: 5,
    title: 'Swimming Pool',
    description: 'Take a refreshing dip in our pristine swimming pool.',
    imageUrl: hotelImage4, // Replace with your image URL
  },
  {
    id: 6,
    title: 'Concierge Services',
    description: 'Assist with travel arrangements, provide local recommendations, and help you plan your activities and excursions.',
    imageUrl: hotelImage5, // Replace with your image URL
  },
];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

function HomePage() {

return (
  <ThemeProvider theme={defaultTheme}>
  <CssBaseline />
  <div className="home-background" > {/* Apply the CSS class here */}
  <main>
    {/* Hero unit */}
    <Banner />
    <br/><br/>
 

    <Box
  sx={{
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ADD8E6', 
    padding: 5,
    margin: 17,
    border: '1px solid #ccc',
    borderRadius: '5px',
  }}
>
  <div
    style={{
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'Black',
    }}
  >
       <DateSelectionForm/>
    {/* <div
      style={{
        flex: '1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          padding: 8,
          borderRadius: '10%',
          display: 'inline-block',
        }}
      >
         <Link to="/categorylist"> 
        <img
          src={Hotel3}
          alt="Computer"
          style={{ width: 48, height: 48, marginRight: 8, borderRadius: '10%'}}
        />
        </Link>
      </div>
      <Typography variant="h6">Welcome to Hotel Booking System</Typography>
      <Typography variant="body2">Book now to enjoy our limited-time offer</Typography>
    </div>

    <div
      style={{
        flex: '1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          padding: 8,
          borderRadius: '10%',
          display: 'inline-block',
        }}
      >
         <Link to="/categorylist"> 
        <img
          src={Hotel2}
          alt="Career"
          style={{ width: 48, height: 48, marginRight: 8, borderRadius: '10%' }}
        />
        </Link>
      </div>
      <Typography variant="h6">Feel Good Experience</Typography>
      <Typography variant="body2">Stay longer and save on your accommodation</Typography>
    </div>

    <div
      style={{
        flex: '1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          padding: 8,
          borderRadius: '10%',
          display: 'inline-block',
        }}
      >
        <Link to="/categorylist"> 
        <img
          src={Hotel1}
          alt="Certificate"
          style={{ width: 48, height: 48, marginRight: 8, borderRadius: '10%' }}
        />
        </Link>
      </div>
      <Typography variant="h6">Utilize Our Room Facilities</Typography>
      <Typography variant="body2">Discover the comforts of our in-room amenities</Typography> */}
    {/* </div> */}
  </div>
</Box>

    <Container sx={{ py: 8 }} maxWidth="md" >
      {/* End hero unit */}
      <h2 className="text-4xl font-bold text-gray-800 underline">Features</h2>
      <Grid container spacing={4}>
        {cards.map((card, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card
              sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
             <Link to="/categorylist"> </Link>
              <CardMedia
                component="div"
                sx={{
                  // 16:9
                  pt: '56.25%',
                }}
                image={card.imageUrl}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                {card.title}
                </Typography>
                <Typography>
                {card.description}
                </Typography>
              </CardContent>
             
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  </main>
  </div>

</ThemeProvider>


);
}

export default HomePage