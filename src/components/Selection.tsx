import { Box, Button, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import orangeCar from '../assets/orangeCar.png';
import { Link } from "react-router-dom";
const selectionButtonObj = [{label:'Toy', link:'/toyspage'}, {label:'Frame', link:'/framespage'}]
const Selection = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));


  return (
    <Box
      sx={{
        bgcolor: 'red',
        p: 2,
        pb: isSmallScreen ? 0.5 : 1,
      }}
      id="selection"
    >
      <Stack
        sx={{
          bgcolor: 'white',
          p: 4,
          borderRadius: 3,
          height: isSmallScreen ? 'auto' : '540px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          component="img"
          src={orangeCar}
          alt="Orange Car"
          sx={{
            position: 'absolute',
            left: isSmallScreen ? '50%' : 0,
            top: isSmallScreen ? '10%' : '30%',
            transform: isSmallScreen
              ? 'translate(-50%, -50%) rotate(-45deg)'
              : 'translateY(-50%) rotate(-55deg)',
            filter: 'blur(3px)',
            transition: 'all 0.3s ease',
            width: isSmallScreen ? '80%' : 'auto',
            '&:hover': { filter: 'blur(0)' },
          }}
        />

        <Stack
          alignItems={isSmallScreen ? 'center' : 'flex-end'}
          justifyContent="center"
          height="100%"
          spacing={isSmallScreen ? 2 : 3}
        >
          <Typography
            variant={isSmallScreen ? 'h5' : 'h3'}
            fontWeight="bold"
            textAlign={isSmallScreen ? 'center' : 'right'}
            zIndex={4}
            color={isSmallScreen ? 'white' : 'red'}
          >
            Select Your Toy and Frame
          </Typography>

          <Typography
            sx={{
              width: isSmallScreen ? '100%' : '50%',
              textAlign: isSmallScreen ? 'center' : 'right',
              fontSize: isSmallScreen ? '1rem' : '1.2rem',
              opacity: isSmallScreen ? 1 : 0.7,
              fontWeight: 600,
              zIndex: 2
            }}
          >
            Build your perfect gift! Start by selecting your favorite toy and a matching frame to make it truly yours. Only when both are chosen, the magic happens -
            <Typography component="span" sx={{ color: 'red', fontWeight: 700 }}>
              3D Toy Caste
            </Typography>
          </Typography>

          <Stack
            width={isSmallScreen ? '100%' : '50%'}
            spacing={isSmallScreen ? 2 : 3}
          >
            <Stack
              direction={isSmallScreen ? 'column' : 'row'}
              spacing={isSmallScreen ? 2 : 3}
              width="100%"
              justifyContent="center"
            >
              {Object.values(selectionButtonObj).map((label) => (
                <Link to={label.link} key={label.label} style={{ textDecoration: 'none' }}>
                <Button
                  key={label.label}
                  variant={isSmallScreen ? "contained" : "outlined"}
                  sx={{
                    flex: 1,
                    fontSize: isSmallScreen ? '1rem' : '1.4rem',
                    fontWeight: 600,
                    borderColor: 'common.black',
                    bgcolor: isSmallScreen ? 'black' : 'none',
                    color: isSmallScreen ? 'white' : 'common.black',
                    '&:hover': {
                      borderColor: 'red',
                      color: 'red',
                    },
                  }}
                >
                  {label.label}
                </Button>
                </Link>
              ))}
            </Stack>

            <Button
              variant="contained"
              sx={{
                width: isSmallScreen ? '100%' : '30%',
                alignSelf: 'center',
                bgcolor: 'red',
                color: 'white',
                fontWeight: 600,
                fontSize: isSmallScreen ? '1rem' : '1.2rem',
                '&:hover': {
                  bgcolor: 'transparent',
                  border: '1px solid red',
                  color: 'red',
                },
              }}
            >
              Order
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Selection;