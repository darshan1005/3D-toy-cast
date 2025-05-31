import {
  Box,
  Button,
  IconButton,
  keyframes,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import Logo from '../assets/Logo.svg'
import BikeImage from '../assets/Bike.svg'
import CarImage from '../assets/Car.svg'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import { Palette } from '../theme'
import { Link } from 'react-router-dom'
import CollectionsIcon from '@mui/icons-material/Collections'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LazyImage from './custom/LazyImage'

const Hero = () => {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const shake = keyframes`
  0% { transform: rotate(0deg); }
  20% { transform: rotate(-15deg); }
  40% { transform: rotate(15deg); }
  60% { transform: rotate(-10deg); }
  80% { transform: rotate(10deg); }
  100% { transform: rotate(0deg); }
  `

  const navigate = () => {
    document.getElementById('footer')?.scrollIntoView({
      behavior: 'smooth',
    })
  }

  return (
    <>
      <Box
        sx={{
          backgroundColor: Palette.background.paper,
          padding: 2,
          borderRadius: 3,
          height: isSmallScreen ? 'auto' : 670,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
            }}
          >
            <LazyImage
              src={Logo}
              alt='logo-3dtoycast'
              sx={{
                width: isSmallScreen ? '30px' : '40px',
                height: isSmallScreen ? '30px' : '40px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }} />
            <Typography
              variant="h4"
              sx={{
                fontWeight: 600,
                backgroundColor: 'rgb(255, 0, 0)',
                width: 'max-content',
                color: Palette.text.white,
                padding: isSmallScreen ? 0.5 : 1,
                fontSize: isSmallScreen ? '18px' : '20px',
              }}
            >
              3D TOYCAST
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Link to={'/gallery'}>
              {!isSmallScreen ? (
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    color: '#000',
                    border: '1px solid #000',
                  }}
                  startIcon={<CollectionsIcon />}
                >
                  Gallery
                </Button>
              ) : (
                <IconButton>
                  <CollectionsIcon />
                </IconButton>
              )}
            </Link>

            {!isSmallScreen ? (
              <Button
                variant="contained"
                size="small"
                sx={{
                  cursor: 'pointer',
                  backgroundColor: Palette.text.primary,
                  fontSize: '0.85rem',
                }}
                onClick={() => navigate()}
                startIcon={<LocalPhoneIcon />}
              >
                Contact
              </Button>
            ) : (
              <IconButton onClick={() => navigate()}>
                <LocalPhoneIcon />
              </IconButton>
            )}
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
              background: isSmallScreen
                ? 'linear-gradient(to right, black, white)'
                : 'linear-gradient(to bottom, black, white)',
              width: isSmallScreen ? '100%' : '20%',
              height: isSmallScreen ? '100px' : '500px',
              overflow: 'visible',
              mb: isSmallScreen ? 2 : 0,
            }}
          >
            <LazyImage
              src={BikeImage}
              alt='bike image'
              sx={{
                position: 'absolute',
                bottom: isSmallScreen ? '-40px' : '-20px',
                right: isSmallScreen ? '10px' : '-50px',
                zIndex: 1,
                width: isSmallScreen ? '40%' : 'auto',
              }} />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            alignItems="flex-start"
            gap={2}
            sx={{
              width: isSmallScreen ? '100%' : '60%',
              px: isSmallScreen ? 1 : 2,
              height: isSmallScreen ? 'auto' : '500px',
              overflow: 'hidden',
              mb: isSmallScreen ? 2 : 0,
            }}
          >
            <Box display="flex" flexDirection={'column'} gap={1}>
              <Typography
                variant={isSmallScreen ? 'h4' : 'h1'}
                sx={{
                  fontSize: isSmallScreen ? '30px' : '12vh',
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
                Transform your collection with our high-resolution 3D diecast toys and detailed
                model frames.
              </Typography>
            </Box>
            <Button
              size="small"
              startIcon={<ShoppingBagIcon />}
              onClick={() => {
                document.getElementById('selection')?.scrollIntoView({
                  behavior: 'smooth',
                })
              }}
              sx={{
                backgroundColor: 'black',
                color: 'white',
                alignSelf: isSmallScreen ? 'center' : 'flex-end',
                padding: isSmallScreen ? '5px 10px' : '10px 20px',
                fontWeight: 'bold',
                '&:hover': {
                  border: '2px solid black',
                  backgroundColor: 'white',
                  color: 'black',
                },
                animation: `${shake} 0.7s `,
                animationTimingFunction: 'ease-in-out',
              }}
            >
              Order Now !
            </Button>
          </Box>
          <Box
            sx={{
              position: 'relative',
              background: isSmallScreen
                ? 'linear-gradient(to left, red, white)'
                : 'linear-gradient(to bottom, red, white)',
              width: isSmallScreen ? '100%' : '20%',
              height: isSmallScreen ? '180px' : '500px',
              overflow: 'visible',
            }}
          >
            <LazyImage
              src={CarImage}
              alt='car image'
              sx={{
                position: 'absolute',
                bottom: isSmallScreen ? '5px' : '0px',
                top: isSmallScreen ? 'auto' : '40%',
                left: isSmallScreen ? '35px' : '-100px',
                width: isSmallScreen ? '70%' : 'auto',
              }} />
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Hero
