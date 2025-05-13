import { Box, Typography } from "@mui/material";
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
}

const Bento = () => {
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
        display: 'flex',
        flexDirection: 'row',
        gap: 2
      }}>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box display={'flex'} flexDirection='row' gap={2}>
            <Box display={'flex'} flexDirection='column' gap={2} flex={2}>
              <Box
                sx={{
                  flex: 1,
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'start',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  minHeight: '175px',
                  backgroundColor: 'black',
                  px: 4,
                }}
              >
                <Typography variant="h3" sx={{ color: 'white', fontWeight: 600 }}>
                  3D Printed Frames
                </Typography>
                <Typography
                  sx={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: '1.5rem',
                    fontWeight: 400
                  }}
                >
                  Custom printed frames with multiple design variants
                  <Box
                    component="span"
                    sx={{
                      display: 'block',
                      mt: 1,
                      fontSize: '1rem',
                      opacity: 0.7,
                      transition: 'opacity 0.2s ease',
                      '&:hover': {
                        opacity: 1
                      }
                    }}
                  >
                    High-quality materials • Multiple sizes available • Custom color options • UV-resistant coating
                  </Box>
                </Typography>
              </Box>
              <Box
                sx={{
                  flex: 1,
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'start',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  minHeight: '175px',
                  backgroundColor: 'red',
                  px: 4,
                }}
              >
                <Typography variant="h3" sx={{ color: 'white', fontWeight: 600 }}>
                  Die-Cast Collection
                </Typography>
                <Typography
                  sx={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: '1.5rem',
                    fontWeight: 400
                  }}
                >
                  Detailed diecast metal toys with precision engineering
                  <Box
                    component="span"
                    sx={{
                      display: 'block',
                      mt: 1,
                      fontSize: '1rem',
                      opacity: 0.7,
                      transition: 'opacity 0.2s ease',
                      '&:hover': {
                        opacity: 1
                      }
                    }}
                  >
                    1:18 & 1:24 scale • Opening parts • Premium detailing • Limited editions
                  </Box>
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                flex: 1,
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                minHeight: '208px',
                backgroundColor: 'black',
              }}
            >
              <Typography variant="h2"
                sx={{
                  fontWeight: 700,
                  ...styles.textGradient,
                }}>
                700+
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  ...styles.textGradient,
                  fontWeight: 600,
                  width: '70%',
                  textAlign: 'center'
                }}
              >
                Order's Completed
              </Typography>
            </Box>
          </Box>
          <Box display={'flex'} flexDirection='row' gap={2}>
            <Box
              sx={{
                position: 'relative',
                flex: 1,
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                minHeight: '175px',
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
                }
              }}
            >
              <Typography variant="h5" sx={{
                color: 'white',
                fontWeight: 600,
                position: 'relative',
                zIndex: 1
              }}>
                Fast & Secure Delivery
              </Typography>
            </Box>
            <Box
              sx={{
                flex: 2,
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'start',
                justifyContent: 'center',
                flexDirection: 'column',
                minHeight: '175px',
                backgroundColor: 'red',
                px: 4,
              }}
            >
              <Typography variant="h3" sx={{ color: 'white', fontWeight: 600 }}>
                Custom Displays
              </Typography>
              <Typography
                sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '1.5rem',
                  fontWeight: 400
                }}
              >
                Personalized display environments designed for your models
                <Box
                  component="span"
                  sx={{
                    display: 'block',
                    mt: 1,
                    fontSize: '1rem',
                    opacity: 0.7,
                    transition: 'opacity 0.2s ease',
                    '&:hover': {
                      opacity: 1
                    }
                  }}
                >
                  LED lighting • Dust protection • Modular design • Custom backgrounds
                </Box>
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            width: '20%',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            backgroundColor: 'black',
            position: 'relative',
            overflow: 'hidden'
          }}>
          <Typography variant="h2"
            sx={{
              fontWeight: 600,
              transform: 'rotate(-90deg)',
              transformOrigin: 'center',
              width: 'max-content',
              ...styles.textGradientTwo,
              position: 'absolute',
              zIndex: 1,
              opacity: 0.8,
              fontSize: '4rem'
            }}>
            3D TOY CAST
          </Typography>
          <Box
            component={'img'}
            src={f1}
            alt="f-1"
            sx={{
              position: 'absolute',
              zIndex: 2,
              left: '67%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default Bento;