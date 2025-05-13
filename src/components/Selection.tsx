import { Box, Button, Stack, Typography } from "@mui/material";
import orangeCar from '../assets/orangeCar.png';

const Selection = () => {
  return (
    <Box sx={{ bgcolor: 'red', p: 2, pb: 1 }} id="selection">
      <Stack
        sx={{
          bgcolor: 'white',
          p: 4,
          borderRadius: 3,
          height: '540px',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Box
          component="img"
          src={orangeCar}
          alt="Orange Car"
          sx={{
            position: 'absolute',
            left: 0,
            top: '30%',
            transform: 'translateY(-50%) rotate(-55deg)',
            filter: 'blur(1px)',
            transition: 'all 0.3s ease',
            '&:hover': { filter: 'blur(0)' }
          }}
        />

        <Stack
          alignItems="flex-end"
          justifyContent="center"
          height="100%"
          spacing={3}
        >
          <Typography variant="h3" fontWeight="bold">
            Select Your Toy and Frame
          </Typography>

          <Typography
            sx={{
              width: '50%',
              textAlign: 'right',
              fontSize: '1.2rem',
              opacity: 0.7,
              fontWeight: 600
            }}
          >
            Build your perfect gift! Start by selecting your favorite toy and a matching frame to make it truly yours. Only when both are chosen, the magic happens -
            <Typography component="span" sx={{ color: 'red', fontWeight: 700 }}>
              3D Toy Caste
            </Typography>
          </Typography>

          <Stack width="50%" spacing={3}>
            <Stack
              direction="row"
              spacing={3}
              width="100%"
              justifyContent="center"
            >
              {['Toy', 'Frame'].map((label) => (
                <Button
                  key={label}
                  variant="outlined"
                  sx={{
                    flex: 1,
                    fontSize: '1.4rem',
                    fontWeight: 600,
                    borderColor: 'common.black',
                    color: 'common.black',
                    '&:hover': {
                      borderColor: 'red',
                      color: 'red'
                    }
                  }}
                >
                  {label}
                </Button>
              ))}
            </Stack>

            <Button
              variant="contained"
              sx={{
                width: '30%',
                alignSelf: 'center',
                bgcolor: 'red',
                color: 'white',
                fontWeight: 600,
                fontSize: '1.2rem',
                '&:hover': { bgcolor: 'transparent', border: '1px solid red', color: 'red' }
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