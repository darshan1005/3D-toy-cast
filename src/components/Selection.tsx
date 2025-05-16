import { Box, Button, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import orangeCar from '../assets/orangeCar.png'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import CustomPopupHOC from './custom/CustomPopup'
import OrderForm from './custom/OrderFrom'
import { Palette } from '../theme'

const selectionButtonObj = [
  { label: 'Toy', link: '/toyspage' },
  { label: 'Frame', link: '/framespage' },
]

const Selection = () => {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const navigate = useNavigate()
  const location = useLocation()
  const [selectedToy, setSelectedToy] = useState<any>(null)
  const [selectedFrame, setSelectedFrame] = useState<any>(null)

  const [openModal, setModalOpen] = useState(false)

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

    // Check if we need to scroll to selection
    if (location.state?.scrollToSelection) {
      document.getElementById('selection')?.scrollIntoView({
        behavior: 'smooth',
      })
      // Clear the state after scrolling
      navigate(location.pathname, { replace: true, state: {} })
    }
  }, [location, navigate])

  const handleOrder = () => {
    setModalOpen(true)
    // Handle order logic here
    console.log('Order placed with:', { toy: selectedToy, frame: selectedFrame })
  }

  return (
    <>
      <Box id="selection">
        <Stack
          sx={{
            bgcolor: Palette.background.paper,
            p: 4,
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
                : 'translateY(-50%) rotate(-50deg)',
              filter: 'blur(3px)',
              width: isSmallScreen ? '80%' : 'auto',
              opacity: 0.7
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
              color={isSmallScreen ? Palette.text.white : Palette.error.dark}
            >
              Select Your Toy and Frame
            </Typography>

            <Typography
              sx={{
                width: isSmallScreen ? '100%' : '50%',
                textAlign: isSmallScreen ? 'center' : 'right',
                fontSize: isSmallScreen ? '1rem' : '1.2rem',
                color: Palette.text.secondary,
                fontWeight: 600,
                zIndex: 2,
              }}
            >
              Build your perfect gift! Start by selecting your favorite toy and a matching frame to make it truly yours. Only when both are chosen, the magic happens -
              <Typography component="span" sx={{ color: Palette.error.light, fontWeight: 700 }}>
                3D Toy Cast
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
                          borderColor: isSelected
                            ? Palette.secondary.main
                            : Palette.text.secondary,
                          bgcolor: isSmallScreen
                            ? isSelected
                              ? Palette.secondary.light
                              : Palette.text.secondary
                            : isSelected
                              ? Palette.secondary.light
                              : 'transparent',
                          color: isSmallScreen ? Palette.text.white : isSelected ? Palette.text.white : Palette.text.secondary,
                          '&:hover': {
                            borderColor: isSelected
                              ? Palette.secondary.dark : Palette.warning.light,
                            color: isSelected
                              ? Palette.text.white : Palette.warning.light,
                            bgcolor: isSelected
                              ? Palette.secondary.dark : 'transparent',
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
                  bgcolor: 'transparent',
                  color: Palette.success.dark,
                  border: (!isItemSelected('Toy') || !isItemSelected('Frame'))
                    ? undefined
                    : `2px solid ${Palette.secondary.main}`,
                  fontWeight: 600,
                  fontSize: isSmallScreen ? '1rem' : '1.2rem',
                }}
              >
                Order
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Box >
      {openModal && (
        <CustomPopupHOC
          open={openModal}
          onClose={function (): void {
            setModalOpen(false)
          }}
          centerTitle
          width={500}
        >
          <OrderForm />
        </CustomPopupHOC>
      )
      }
    </>
  )
}

export default Selection
