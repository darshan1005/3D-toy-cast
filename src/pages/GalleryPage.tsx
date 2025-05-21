"use client";
import { ImageGallery } from "react-image-grid-gallery";
import Bike from '../assets/Bike.svg';
import Car from '../assets/Car.svg';
import orangeCar from '../assets/orangeCar.png';
import superCar from '../assets/supercar.png';
import { Box, Divider, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

interface imagesArrayTypes {
  id: number,
  alt: string,
  caption: string
  src: any
}

const imagesArray: imagesArrayTypes[] = [
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
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

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
          variant={isSmallScreen ? "h5" : "h4"}
          textAlign={'center'}
          fontWeight={'bold'}
          mb={2}
        >
          Gallery
        </Typography>
        {imagesArray.length === 0
          ? <>
            <Divider sx={{ mb: 2 }} />
            <Typography
              textAlign={'center'}
              fontWeight={'bold'}
              variant={isSmallScreen ? "h5" : "h4"}
              color="#3336"
            >
              No Images
            </Typography>
          </>
          : <ImageGallery
            imagesInfoArray={imagesArray}
            columnWidth={isSmallScreen ? '100%' : 230}
            gapSize={14}
            lazy
            lazyFromIndex={imagesArray[0].id}
          />
        }
      </Box>
    </Box>
  );
};

export default GridImages