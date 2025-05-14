import { Box, Button, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import orangeCar from '../assets/orangeCar.png'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const selectionButtonObj = [
  { label: 'Toy', link: '/toyspage' },
  { label: 'Frame', link: '/framespage' },
]

const Selection = () => {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const navigate = useNavigate()
  const [selectedToy, setSelectedToy] = useState<any>(null)
  const [selectedFrame, setSelectedFrame] = useState<any>(null)

  // Function to check if an item is selected
  const isItemSelected = (item: string) => {
    const storageKey = item === 'Toy' ? 'selectedToys' : 'selectedFrame'
    const storedData = sessionStorage.getItem(storageKey)
    return storedData !== null && storedData !== '[]' && storedData !== 'null'
  }

  useEffect(() => {
    // Load selections from sessionStorage
    const toy = sessionStorage.getItem('selectedToys')
    const frame = sessionStorage.getItem('selectedFrame')

    if (toy && toy !== '[]' && toy !== 'null') {
      setSelectedToy(JSON.parse(toy))
    } else {
      setSelectedToy(null)
    }

    if (frame && frame !== '[]' && frame !== 'null') {
      setSelectedFrame(JSON.parse(frame))
    } else {
      setSelectedFrame(null)
    }
  }, [])

  const handleOrder = () => {
    // Handle order logic here
    console.log('Order placed with:', { toy: selectedToy, frame: selectedFrame })
  }

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
              zIndex: 2,
            }}
          >
            Build your perfect gift! Start by selecting your favorite toy and a matching frame to
            make it truly yours. Only when both are chosen, the magic happens -
            <Typography component="span" sx={{ color: 'red', fontWeight: 700 }}>
              3D Toy Caste
            </Typography>
          </Typography>

          <Stack width={isSmallScreen ? '100%' : '50%'} spacing={isSmallScreen ? 2 : 3}>
            <Stack
              direction={isSmallScreen ? 'column' : 'row'}
              spacing={isSmallScreen ? 2 : 3}
              width="100%"
              justifyContent="center"
            >
              {selectionButtonObj.map(item => {
                const isSelected = isItemSelected(item.label)
                return (
                  <Link
                    to={item.link}
                    key={item.label}
                    style={{ textDecoration: 'none', width: '100%' }}
                  >
                    <Button
                      variant={isSmallScreen ? 'contained' : 'outlined'}
                      sx={{
                        width: '100%',
                        fontSize: isSmallScreen ? '1rem' : '1.4rem',
                        fontWeight: 600,
                        borderColor: isSelected ? 'green' : 'common.black',
                        bgcolor: isSmallScreen
                          ? isSelected
                            ? 'green'
                            : 'black'
                          : isSelected
                          ? 'green'
                          : 'none',
                        color: isSmallScreen ? 'white' : isSelected ? 'white' : 'common.black',
                        '&:hover': {
                          borderColor: isSelected ? 'green' : 'red',
                          color: isSelected ? 'white' : 'red',
                          bgcolor: isSelected ? 'green' : 'none',
                        },
                      }}
                    >
                      {item.label}
                    </Button>
                  </Link>
                )
              })}
            </Stack>

            <Button
              variant="contained"
              onClick={handleOrder}
              disabled={!isItemSelected('Toy') || !isItemSelected('Frame')}
              sx={{
                width: isSmallScreen ? '100%' : '30%',
                alignSelf: 'center',
                bgcolor: isItemSelected('Toy') && isItemSelected('Frame') ? 'green' : 'red',
                color: 'white',
                fontWeight: 600,
                fontSize: isSmallScreen ? '1rem' : '1.2rem',
                '&:hover': {
                  bgcolor:
                    isItemSelected('Toy') && isItemSelected('Frame') ? 'darkgreen' : 'darkred',
                },
                '&.Mui-disabled': {
                  bgcolor: 'grey.400',
                  color: 'white',
                },
              }}
            >
              Order
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  )
}

export default Selection
