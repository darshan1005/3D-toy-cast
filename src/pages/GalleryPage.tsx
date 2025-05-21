"use client";
import { ImageGallery } from "react-image-grid-gallery";
import Bike from '../assets/Bike.svg';
import Car from '../assets/Car.svg';
import orangeCar from '../assets/orangeCar.png';
import superCar from '../assets/supercar.png';
import { Box, Button, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const imagesArray = [
  {
    id: 1,
    alt: "Bike",
    caption: "Bike",
    src: Bike,
  },
  {
    id: 2,
    alt: "Car",
    caption: "Yellow car",
    src: Car,
  },
  {
    id: 4,
    alt: "Orange car",
    caption: "Orange Car",
    src: orangeCar,
  },
  {
    id: 5,
    alt: "Super car",
    caption: "Super Car",
    src: superCar,
  },
];

const GridImages = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'red',
        p: 2,
      }}
    >
      <Box
        sx={{
          backgroundColor: 'white',
          padding: 2,
          borderRadius: 3,
        }}>
        <Link to={'/'}>
          <IconButton
            size='small'
            sx={{
              minWidth: 40,
              width: 40,
              height: 40,
              bgcolor: '#3331',
              color: '#000'
            }}>
            <ArrowBackIcon />
          </IconButton>
        </Link>
        <Typography
          variant="h4"
          textAlign={'center'}
          fontWeight={'bold'}
          mb={2}
        >
          Gallery
        </Typography>
        <ImageGallery
          imagesInfoArray={imagesArray}
          columnWidth={230}
          gapSize={14}
        />
      </Box>
    </Box>
  );
};

export default GridImages