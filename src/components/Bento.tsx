import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import f1 from '../assets/f-1.svg';
import superCar from '../assets/supercar.png';

const styles = {
  textGradient: {
    background: 'linear-gradient(90deg,rgb(255, 255, 255),rgb(27, 27, 27))',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    color: 'transparent',
    display: 'inline-block'
  },
  textGradientTwo: {
    background: 'linear-gradient(rgb(255, 255, 255),rgb(0, 0, 0))',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    color: 'transparent',
    display: 'inline-block'
  }
};

const Bento = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{ backgroundColor: 'red', p: 2 }}
    >
      <Box
        sx={{
          backgroundColor: 'white',
          padding: 2,
          borderRadius: 3,
          display: 'flex',
          flexDirection: isSmallScreen ? 'column' : 'row',
          gap: isSmallScreen ? 1 : 2,
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: isSmallScreen ? 1 : 2,
          }}
        >
          <Box
            display="flex"
            flexDirection={isSmallScreen ? 'column' : 'row'}
            gap={isSmallScreen ? 1 : 2}
          >
            <Box
              display="flex"
              flexDirection="column"
              gap={isSmallScreen ? 1 : 2}
              flex={2}
            >
              <Box
                sx={{
                  flex: 1,
                  borderRadius: isSmallScreen ? '10px' : '20px',
                  display: 'flex',
                  alignItems: 'start',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  minHeight: isSmallScreen ? '120px' : '175px',
                  backgroundColor: 'black',
                  px: isSmallScreen ? 2 : 4,
                }}
              >
                <Typography
                  variant={isSmallScreen ? 'h5' : 'h4'}
                  sx={{ color: 'white', fontWeight: 600 }}
                >
                  3D Printed Frames
                </Typography>
                <Typography
                  sx={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: isSmallScreen ? '1rem' : '1.5rem',
                    fontWeight: 400,
                  }}
                >
                  Custom printed frames with multiple design variants
                  <Box
                    component="span"
                    sx={{
                      display: isSmallScreen ? 'none' : 'block',
                      mt: 1,
                      fontSize: isSmallScreen ? '0.8rem' : '1rem',
                      opacity: 0.7,
                      transition: 'opacity 0.2s ease',
                      '&:hover': {
                        opacity: 1,
                      },
                    }}
                  >
                    Quality materials • 8 Multiple variants available
                  </Box>
                </Typography>
              </Box>
              <Box
                sx={{
                  flex: 1,
                  borderRadius: isSmallScreen ? '10px' : '20px',
                  display: 'flex',
                  alignItems: 'start',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  minHeight: isSmallScreen ? '120px' : '175px',
                  backgroundColor: 'red',
                  px: isSmallScreen ? 2 : 4,
                }}
              >
                <Typography
                  variant={isSmallScreen ? 'h5' : 'h4'}
                  sx={{ color: 'white', fontWeight: 600 }}
                >
                  Die-Cast Collection
                </Typography>
                <Typography
                  sx={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: isSmallScreen ? '1rem' : '1.5rem',
                    fontWeight: 400,
                  }}
                >
                  Detailed diecast metal toys with precision engineering
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                flex: 1,
                borderRadius: isSmallScreen ? '10px' : '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                minHeight: isSmallScreen ? '150px' : '208px',
                backgroundColor: 'black',
              }}
            >
              {/* <Typography
                variant={isSmallScreen ? 'h3' : 'h2'}
                sx={{
                  fontWeight: 700,
                  ...styles.textGradient,
                }}
              >
                700+
              </Typography> */}
              <Typography
                variant={isSmallScreen ? 'h5' : 'h4'}
                sx={{
                  ...styles.textGradient,
                  fontWeight: 600,
                  width: '70%',
                  textAlign: 'center',
                }}
              >
                Make your first Order's now
              </Typography>
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection={isSmallScreen ? 'column' : 'row'}
            gap={isSmallScreen ? 1 : 2}
          >
            <Box
              sx={{
                position: 'relative',
                flex: 1,
                borderRadius: isSmallScreen ? '10px' : '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                minHeight: isSmallScreen ? '120px' : '175px',
                backgroundColor: 'black',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: `URL(${superCar})`,
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  opacity: 0.5,
                },
              }}
            >
              <Typography
                variant={isSmallScreen ? 'h6' : 'h5'}
                sx={{
                  color: 'white',
                  fontWeight: 600,
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                Fast & Secure Delivery
              </Typography>
            </Box>
            <Box
              sx={{
                flex: 2,
                borderRadius: isSmallScreen ? '10px' : '20px',
                display: 'flex',
                alignItems: 'start',
                justifyContent: 'center',
                flexDirection: 'column',
                minHeight: isSmallScreen ? '120px' : '175px',
                backgroundColor: 'red',
                px: isSmallScreen ? 2 : 4,
              }}
            >
              <Typography
                sx={{
                  color: 'rgb(255, 255, 255)',
                  fontSize: isSmallScreen ? '1rem' : '1.5rem',
                  fontWeight: 400,
                }}
              >
                "Even after placing your order, we're here to help! Feel free to reach out if you'd like to discuss or customize any part of your order — your satisfaction is our priority."
                <Box
                  component="span"
                  sx={{
                    display: isSmallScreen ? 'none' : 'block',
                    mt: 1,
                    fontSize: isSmallScreen ? '0.8rem' : '1rem',
                    opacity: 0.7,
                    transition: 'opacity 0.2s ease',
                    '&:hover': {
                      opacity: 1,
                    },
                  }}
                >
                  Key chain • Race map outline • Backgrounds • Toy • Backgrounds
                </Box>
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            width: isSmallScreen ? '100%' : '20%',
            borderRadius: isSmallScreen ? '10px' : '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            backgroundColor: 'black',
            position: 'relative',
            overflow: 'hidden',
            minHeight: isSmallScreen ? '150px' : 'auto',
          }}
        >
          <Typography
            variant={isSmallScreen ? 'h5' : 'h2'}
            sx={{
              fontWeight: 600,
              transform: isSmallScreen ? 'none' : 'rotate(-90deg)',
              transformOrigin: 'center',
              width: 'max-content',
              ...styles.textGradientTwo,
              position: 'absolute',
              zIndex: 1,
              opacity: 0.8,
              fontSize: isSmallScreen ? '2.5rem' : '4rem',
            }}
          >
            3D TOY CAST
          </Typography>
          <Box
            component="img"
            src={f1}
            alt="f-1"
            sx={{
              display: isSmallScreen ? 'none' : 'block',
              position: 'absolute',
              zIndex: 2,
              left: isSmallScreen ? '50%' : '67%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: isSmallScreen ? '50%' : 'auto',
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Bento;