import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import orangeCar from '../assets/orangeCar.png'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import OrderForm from './custom/OrderFrom'
import { Palette } from '../theme'
import PopupHOC from './custom/HOC/PopupHOC'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const selectionButtonObj = [
  { label: 'Frame', link: '/framespage' },
  { label: 'Toy', link: '/toyspage' },
]

const Selection = () => {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const navigate = useNavigate()
  const location = useLocation()

  const [is3DToyFrame, setIs3DToyFrame] = useState<boolean>(true)
  const [isOnlyToys, setIsOnlyToys] = useState<boolean>(false)
  const [isOnlyFrames, setIsOnlyFrame] = useState<boolean>(false)

  const [openModal, setModalOpen] = useState(false)

  const [toySelected, setToySelected] = useState(false)
  const [frameSelected, setFrameSelected] = useState(false)

  // Function to check if an item is selected
  const isItemSelected = (item: string) => {
    const storageKey = item === 'Toy' ? 'selectedToys' : 'selectedFrame'
    const storedData = sessionStorage.getItem(storageKey)
    return storedData !== null && storedData !== '[]' && storedData !== 'null'
  }

  const updateSelectionStates = () => {
    const toySelected = isItemSelected('Toy')
    const frameSelected = isItemSelected('Frame')
    setToySelected(toySelected)
    setFrameSelected(frameSelected)
  }

  useEffect(() => {
    updateSelectionStates()

    const toySelected = isItemSelected('Toy')
    const frameSelected = isItemSelected('Frame')
    const stored = sessionStorage.getItem('availabilityType')

    if (!stored) {
      if (toySelected && frameSelected) {
        handleAvailability('3d')
      } else if (toySelected) {
        handleAvailability('toy')
      } else if (frameSelected) {
        handleAvailability('frame')
      } else {
        handleAvailability('3d') // fallback default
      }
    }
  }, [])

  useEffect(() => {
    const availabilityType = sessionStorage.getItem('availabilityType') as
      | '3d'
      | 'toy'
      | 'frame'
      | null
    if (availabilityType) updateAvailabilityState(availabilityType)

    if (location.state?.scrollToSelection) {
      document.getElementById('selection')?.scrollIntoView({ behavior: 'smooth' })
      navigate(location.pathname, { replace: true, state: {} })
    }
  }, [location, navigate])

  useEffect(() => {
    const handleStorageUpdate = () => {
      updateSelectionStates()
    }

    window.addEventListener('storageUpdate', handleStorageUpdate)

    // Also listen for focus events to catch changes from other tabs
    window.addEventListener('focus', handleStorageUpdate)

    return () => {
      window.removeEventListener('storageUpdate', handleStorageUpdate)
      window.removeEventListener('focus', handleStorageUpdate)
    }
  }, [])

  const updateAvailabilityState = (type: '3d' | 'toy' | 'frame') => {
    setIs3DToyFrame(type === '3d')
    setIsOnlyToys(type === 'toy')
    setIsOnlyFrame(type === 'frame')
  }

  const handleAvailability = (type: '3d' | 'toy' | 'frame') => {
    sessionStorage.setItem('availabilityType', type)
    updateAvailabilityState(type)

    if (type === 'toy') {
      sessionStorage.removeItem('selectedFrame')
    } else if (type === 'frame') {
      sessionStorage.removeItem('selectedToys')
    } else if (type === '3d') {
      const toyData = sessionStorage.getItem('selectedToys')
      if (toyData) {
        try {
          const parsedToyData = JSON.parse(toyData)
          if (Array.isArray(parsedToyData) && parsedToyData.length > 2) {
            const trimmed = parsedToyData.slice(0, 2)
            sessionStorage.setItem('selectedToys', JSON.stringify(trimmed))
          }
        } catch {
          sessionStorage.removeItem('selectedToys')
        }
      }
    }

    // Update selection states after availability change
    updateSelectionStates()
  }

  const handleOrder = () => {
    setModalOpen(true)
  }

  const handleClearOrder = () => {
    sessionStorage.removeItem('selectedToys')
    sessionStorage.removeItem('selectedFrame')

    // Update local state immediately
    setToySelected(false)
    setFrameSelected(false)

    window.dispatchEvent(new Event('storageUpdate'))
  }

  const isOrderButtonDisabled = () => {
    if (is3DToyFrame) {
      return !(toySelected && frameSelected)
    } else if (isOnlyToys) {
      return !toySelected
    } else if (isOnlyFrames) {
      return !frameSelected
    }
    return true
  }

  return (
    <>
      <Box id="selection">
        <Stack
          sx={{
            bgcolor: Palette.background.paper,
            p: isSmallScreen ? 2 : 4,
            height: isSmallScreen ? 'auto' : '540px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <img
            src={orangeCar}
            loading='lazy'
            alt="Orange Car"
            style={{
              position: 'absolute',
              left: isSmallScreen ? '50%' : 0,
              top: isSmallScreen ? '10%' : '30%',
              transform: isSmallScreen
                ? 'translate(-50%, -50%) rotate(0deg)'
                : 'translateY(-50%) rotate(-50deg)',
              filter: 'blur(3px)',
              display: isSmallScreen ? 'none' : 'block',
            }}
          />
          <Stack
            alignItems={isSmallScreen ? 'center' : 'flex-end'}
            justifyContent="center"
            height="100%"
            gap={isSmallScreen ? 2 : 3}
            mr={isSmallScreen ? 0 : 2}
          >
            <Typography
              variant={isSmallScreen ? 'h4' : 'h3'}
              fontWeight="bold"
              textAlign={isSmallScreen ? 'center' : 'right'}
              zIndex={4}
            >
              Customise Your Order
            </Typography>

            <Typography
              sx={{
                width: isSmallScreen ? '100%' : '50%',
                textAlign: isSmallScreen ? 'center' : 'right',
                fontSize: isSmallScreen ? '1rem' : '1.2rem',
                color: isSmallScreen ? Palette.text.white : Palette.text.secondary,
                fontWeight: 600,
                zIndex: 2,
                p: 1,
                background: isSmallScreen ? 'rgba(0,0,0, 0.4)' : 'transparent',
              }}
            >
              Build your perfect gift! Start by selecting your favorite toy and a matching frame to
              make it truly yours. Only when both are chosen, the magic happens -
              <Typography component="span" sx={{ color: 'red', fontWeight: 700, pl: 1 }}>
                3D Toy Cast
              </Typography>
            </Typography>

            <Box
              display={'flex'}
              flexDirection={'column'}
              alignItems={isSmallScreen ? 'center' : 'end'}
              zIndex={2}
            >
              <Typography variant="h6" fontWeight={'bold'} mr={isSmallScreen ? 0 : 2}>
                Available Product Types
              </Typography>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={is3DToyFrame}
                      onChange={() => handleAvailability('3d')}
                      sx={{
                        '&.Mui-checked': {
                          color: 'red',
                        },
                      }}
                    />
                  }
                  label="Toy & Frame"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isOnlyToys}
                      onChange={() => handleAvailability('toy')}
                      sx={{
                        '&.Mui-checked': {
                          color: 'red',
                        },
                      }}
                    />
                  }
                  label="Toys"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isOnlyFrames}
                      onChange={() => handleAvailability('frame')}
                      sx={{
                        '&.Mui-checked': {
                          color: 'red',
                        },
                      }}
                    />
                  }
                  label="Frame"
                />
              </FormGroup>
            </Box>

            <Stack width={isSmallScreen ? '100%' : '50%'} gap={isSmallScreen ? 2 : 3}>
              <Stack
                direction={isSmallScreen ? 'column' : 'row'}
                spacing={isSmallScreen ? 2 : 3}
                width="100%"
                justifyContent="center"
              >
                {selectionButtonObj.map(item => {
                  const isSelected = item.label === 'Toy' ? toySelected : frameSelected
                  const isToyDisabled = isOnlyFrames && item.label === 'Toy'
                  const isFrameDisabled = isOnlyToys && item.label === 'Frame'

                  const isDisabled = isToyDisabled || isFrameDisabled

                  return (
                    <Link
                      to={isDisabled ? '' : item.link}
                      key={item.label}
                      style={{ textDecoration: 'none', width: '100%' }}
                    >
                      <Button
                        variant={isSmallScreen ? 'contained' : 'outlined'}
                        disabled={isDisabled}
                        startIcon={
                          isSelected ? (
                            <ShoppingCartIcon />
                          ) : (
                            <AddShoppingCartIcon />
                          )
                        }
                        sx={{
                          width: '100%',
                          fontSize: isSmallScreen ? '1rem' : '1.4rem',
                          fontWeight: 600,
                          borderColor: isSelected ? Palette.secondary.main : Palette.text.secondary,
                          bgcolor: isSmallScreen
                            ? isSelected
                              ? Palette.secondary.light
                              : Palette.text.secondary
                            : isSelected
                              ? Palette.secondary.light
                              : 'transparent',
                          color: isSmallScreen
                            ? Palette.text.white
                            : isSelected
                              ? Palette.text.white
                              : Palette.text.secondary,
                          '&:hover': {
                            borderColor: isSelected
                              ? Palette.secondary.dark
                              : Palette.text.primary,
                            color: isSelected ? Palette.text.white : Palette.text.primary,
                            bgcolor: isSelected ? Palette.secondary.dark : 'transparent',
                          },
                        }}
                      >
                        {item.label}
                      </Button>
                    </Link>
                  )
                })}
              </Stack>
              <Stack direction={'row'} gap={2} justifyContent="center">
                <Button
                  variant="contained"
                  onClick={handleOrder}
                  disabled={isOrderButtonDisabled()}
                  startIcon={
                    isOrderButtonDisabled() ? (
                      <ShoppingCartIcon />
                    ) : (
                      <ShoppingCartCheckoutIcon />
                    )
                  }
                  sx={{
                    width: isSmallScreen ? '100%' : '30%',
                    alignSelf: 'center',
                    bgcolor: 'transparent',
                    color: Palette.success.dark,
                    border:
                      !toySelected || !frameSelected
                        ? undefined
                        : `2px solid ${Palette.secondary.main}`,
                    fontWeight: 600,
                    fontSize: isSmallScreen ? '.9rem' : '1.2rem',
                  }}
                >
                  Order
                </Button>
                <Button
                  variant="contained"
                  onClick={handleClearOrder}
                  disabled={isOrderButtonDisabled()}
                  startIcon={<RemoveShoppingCartIcon />}
                  sx={{
                    width: isSmallScreen ? '100%' : '30%',
                    alignSelf: 'center',
                    bgcolor: 'transparent',
                    color: Palette.success.dark,
                    border:
                      !toySelected || !frameSelected
                        ? undefined
                        : `2px solid ${Palette.secondary.main}`,
                    fontWeight: 600,
                    fontSize: isSmallScreen ? '.9rem' : '1.2rem',
                  }}
                >
                  Clear Cart
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Box>
      {openModal && (
        <PopupHOC
          open={openModal}
          onClose={function (): void {
            setModalOpen(false)
          }}
          centerTitle
          width={630}
          title="Order Summary"
        >
          <OrderForm />
        </PopupHOC>
      )}
    </>
  )
}

export default Selection