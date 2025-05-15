import { Box, Button, IconButton, keyframes, Typography, useMediaQuery, useTheme } from '@mui/material';
import Logo from '../assets/Logo.svg';
import BikeImage from '../assets/Bike.svg';
import CarImage from '../assets/Car.svg';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from 'react';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { Link } from 'react-router-dom';

const likeCount = 0;

const Hero = () => {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(likeCount);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const shake = keyframes`
  0% { transform: rotate(0deg); }
  20% { transform: rotate(-15deg); }
  40% { transform: rotate(15deg); }
  60% { transform: rotate(-10deg); }
  80% { transform: rotate(10deg); }
  100% { transform: rotate(0deg); }
`;

  const handleLikeClick = () => {
    setLiked(!liked);
    setCount(liked ? count - 1 : count + 1);
  };

  return (
    <Box
      sx={{
        backgroundColor: 'red',
        p: 2,
        pb: isSmallScreen ? 0.5 : 1,
      }}
    >
      <Box
        sx={{
          backgroundColor: 'white',
          padding: 2,
          borderRadius: 3,
          height: isSmallScreen ? 'auto' : '640px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: isSmallScreen ? 1 : 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              mb: isSmallScreen ? 1 : 0,
            }}
          >
            <Box
              sx={{
                width: isSmallScreen ? '30px' : '40px',
                height: isSmallScreen ? '30px' : '40px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              component={'img'}
              src={Logo}
            />
            <Typography
              variant="h4"
              sx={{
                fontWeight: 600,
                backgroundColor: 'red',
                width: 'max-content',
                color: 'white',
                padding: isSmallScreen ? 0.5 : 1,
                fontSize: isSmallScreen ? '16px' : '20px',
              }}
            >
              3D TOY CAST
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <IconButton
              sx={{
                cursor: 'pointer',
                animation: `${shake} 0.7s infinite`,
                animationTimingFunction: 'ease-in-out'
              }}
              onClick={() => {
                document.getElementById('footer')?.scrollIntoView({
                  behavior: 'smooth',
                });
              }}><LocalPhoneIcon /></IconButton>
            <FavoriteIcon sx={{ color: liked ? 'red' : 'black', cursor: 'pointer' }} onClick={handleLikeClick} />
            <Typography
              variant={isSmallScreen ? 'body1' : 'h5'}
              color="black"
              fontWeight="bold"
            >
              {count}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            overflow: 'hidden',
            flexDirection: isSmallScreen ? 'column' : 'row',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              background: isSmallScreen ? 'linear-gradient(to right, black, white)' : 'linear-gradient(to bottom, black, white)',
              width: isSmallScreen ? '100%' : '20%',
              height: isSmallScreen ? '100px' : '540px',
              overflow: 'visible',
              mb: isSmallScreen ? 2 : 0,
            }}
          >
            <Box
              component={'img'}
              src={BikeImage}
              alt="bike image"
              sx={{
                position: 'absolute',
                bottom: isSmallScreen ? '-40px' : '-20px',
                right: isSmallScreen ? '10px' : '-50px',
                zIndex: 1,
                width: isSmallScreen ? '40%' : 'auto',
              }}
            />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            alignItems="flex-start"
            sx={{
              width: isSmallScreen ? '100%' : '60%',
              px: isSmallScreen ? 1 : 2,
              height: isSmallScreen ? 'auto' : '450px',
              overflow: 'hidden',
              mb: isSmallScreen ? 2 : 0,
            }}
          >
            <Box>
              <Typography
                variant={isSmallScreen ? 'h4' : 'h1'}
                sx={{
                  fontSize: isSmallScreen ? '30px' : '90px',
                  fontWeight: 600,
                }}
              >
                3D Printed Models & <mark>Collectables</mark>
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  fontSize: isSmallScreen ? '14px' : '20px',
                  fontWeight: 600,
                  color: 'grey',
                  width: '95%',
                }}
              >
                Transform your collection with our high-resolution 3D diecast toys and detailed model frames.
              </Typography>
            </Box>
            <Button
              size="small"
              onClick={() => {
                document.getElementById('selection')?.scrollIntoView({
                  behavior: 'smooth',
                });
              }}
              sx={{
                backgroundColor: 'black',
                color: 'white',
                border: '2px solid black',
                alignSelf: isSmallScreen ? 'center' : 'flex-end',
                padding: isSmallScreen ? '5px 10px' : '10px 20px',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: 'white',
                  color: 'black',
                },
                animation: `${shake} 0.7s `,
                animationTimingFunction: 'ease-in-out'
              }}
            >
              Order Now !
            </Button>
          </Box>
          <Box
            sx={{
              position: 'relative',
              background: isSmallScreen ? 'linear-gradient(to left, red, white)' : 'linear-gradient(to bottom, red, white)',
              width: isSmallScreen ? '100%' : '20%',
              height: isSmallScreen ? '200px' : '540px',
              overflow: 'visible',
            }}
          >
            <Box
              component={'img'}
              src={CarImage}
              alt="car image"
              sx={{
                position: 'absolute',
                bottom: isSmallScreen ? '10px' : '0px',
                top: isSmallScreen ? 'auto' : '40%',
                left: isSmallScreen ? '10px' : '-100px',
                width: isSmallScreen ? '80%' : 'auto',
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;
