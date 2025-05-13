import { Box, Button, Typography } from '@mui/material'
import Logo from '../assets/Logo.svg'
import BikeImage from '../assets/Bike.svg'
import CarImage from '../assets/Car.svg'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from 'react';

const likeCount = 700;

const Hero = () => {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(likeCount);

  const handleLikeClick = () => {
    setLiked(!liked);
    setCount(liked ? count - 1 : count + 1);
  };

  return (
    <Box
      sx={{
        backgroundColor: 'red',
        p: 2,
        pb: 1,
      }}>
      <Box sx={{
        backgroundColor: 'white',
        padding: 2,
        borderRadius: 3,
        height: '640px'
      }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2
          }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }} >
            <Box
              sx={{
                width: '40px',
                height: '40px',
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
                padding: 1,
                fontSize: '20px',
              }} >
              3D TOY CAST
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              cursor: 'pointer',
            }}
            onClick={handleLikeClick}
          >
            <FavoriteIcon sx={{ color: liked ? 'red' : 'black' }} />
            <Typography variant='h5' color='black' fontWeight={'bold'}>{count}</Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            overflow: 'hidden'
          }}
        >
          <Box
            sx={{
              position: 'relative',
              background: 'linear-gradient(to bottom, black, white)',
              width: '20%',
              height: '540px',
              overflow: 'visible',
            }}
          >
            <Box
              component={'img'}
              src={BikeImage} alt="bike image"
              sx={{
                position: 'absolute',
                bottom: '-20px',
                right: '-50px',
                zIndex: 1,
              }} />
          </Box>
          <Box
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'space-between'}
            alignItems={'flex-start'}

            sx={{
              width: '60%',
              px: 2,
              height: '500px',
              overflow: 'hidden'
            }}
          >
            <Box>
              <Typography
                variant='h1'
                sx={{
                  fontSize: '90px',
                  fontWeight: 600,
                }}
              >
                3D Printed Models & <mark>Collectables</mark>
              </Typography>
              <Typography
                variant='subtitle1'
                sx={{
                  fontSize: '20px',
                  fontWeight: 600,
                  color: 'grey',
                  width: '95%'
                }}
              >
                Transform your collection with our high-resolution 3D diecast toys and detailed model frames.
              </Typography>
            </Box>
            <Button
              size='small'
              onClick={() => {
                document.getElementById('selection')?.scrollIntoView({
                  behavior: 'smooth'
                });
              }}
              sx={{
                backgroundColor: 'black',
                color: 'white',
                border: '2px solid black',
                alignSelf: 'flex-end',
                padding: '10px 20px',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: 'white',
                  color: 'black',
                },
              }}
            >
              Order Now !
            </Button>
          </Box>
          <Box
            sx={{
              position: 'relative',
              background: 'linear-gradient(to bottom, red, white)',
              width: '20%',
              height: '540px',
              overflow: 'visible',
            }}>
            <Box
              component={'img'}
              src={CarImage} alt="car image"
              sx={{
                position: 'absolute',
                bottom: '0px',
                top: '40%',
                left: '-100px',
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box >
  )
}

export default Hero
