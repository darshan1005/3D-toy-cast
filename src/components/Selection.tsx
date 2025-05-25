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
import CustomPopupHOC from './custom/CustomPopup'
import OrderForm from './custom/OrderFrom'
import { Palette } from '../theme'

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

  // Function to check if an item is selected
  const isItemSelected = (item: string) => {
    const storageKey = item === 'Toy' ? 'selectedToys' : 'selectedFrame'
    const storedData = sessionStorage.getItem(storageKey)
    return storedData !== null && storedData !== '[]' && storedData !== 'null'
  }

  useEffect(() => {
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
          const parsed = JSON.parse(toyData)
          if (Array.isArray(parsed) && parsed.length > 2) {
            const trimmed = parsed.slice(0, 2)
            sessionStorage.setItem('selectedToys', JSON.stringify(trimmed))
          }
        } catch {
          sessionStorage.removeItem('selectedToys')
        }
      }
    }
  }

  const handleOrder = () => {
    setModalOpen(true)
  }

  const isOrderButtonDisabled = () => {
    if (is3DToyFrame) {
      return !(isItemSelected('Toy') && isItemSelected('Frame'))
    } else if (isOnlyToys) {
      return !isItemSelected('Toy')
    } else if (isOnlyFrames) {
      return !isItemSelected('Frame')
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
          <Box
            component="img"
            src={orangeCar}
            alt="Orange Car"
            sx={{
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
                direction={'row'}
                spacing={isSmallScreen ? 2 : 3}
                width="100%"
                justifyContent="center"
              >
                {selectionButtonObj.map(item => {
                  const isSelected = isItemSelected(item.label)
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
                              : Palette.warning.light,
                            color: isSelected ? Palette.text.white : Palette.warning.light,
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

              <Button
                variant="contained"
                onClick={handleOrder}
                disabled={isOrderButtonDisabled()}
                sx={{
                  width: isSmallScreen ? '100%' : '30%',
                  alignSelf: 'center',
                  bgcolor: 'transparent',
                  color: Palette.success.dark,
                  border:
                    !isItemSelected('Toy') || !isItemSelected('Frame')
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
      </Box>
      {openModal && (
        <CustomPopupHOC
          open={openModal}
          onClose={function (): void {
            setModalOpen(false)
          }}
          centerTitle
          width={630}
          title="Order Summary"
        >
          <OrderForm />
        </CustomPopupHOC>
      )}
    </>
  )
}

export default Selection
