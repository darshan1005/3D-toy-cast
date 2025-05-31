import {
  Box,
  Button,
  IconButton,
  Snackbar,
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
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import LazyImage from './custom/LazyImage'
import { getOrderType, setOrderType } from '@utils/session'
import { getToyItem, removeToyItem } from '../DB/ToyStore'
import { getFrameItem, removeFrameItem } from '../DB/FrameStore'
import SnacKBar from './custom/SnackBar'

const selectionButtonObj = [
  { label: 'Frame', link: '/framespage' },
  { label: 'Toy', link: '/toyspage' },
]

const Selection = () => {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const navigate = useNavigate()
  const location = useLocation()

  const [openSnack, setOpenSnack] = useState(false)
  const [is3DToyFrame, setIs3DToyFrame] = useState<boolean>(true)
  const [isOnlyToys, setIsOnlyToys] = useState<boolean>(false)
  const [isOnlyFrames, setIsOnlyFrame] = useState<boolean>(false)

  const [openModal, setModalOpen] = useState(false)

  const [toySelected, setToySelected] = useState(false)
  const [frameSelected, setFrameSelected] = useState(false)

  // Function to check if an item is selected
  const isItemSelected = async (item: string) => {
    const storedData =
      item === 'Toy' ? await getToyItem('selectedToys') : await getFrameItem('selectedFrame')
    if (!storedData || storedData === '[]' || storedData === 'null') return false
    try {
      const parsed = JSON.parse(storedData as string)
      if (Array.isArray(parsed)) return parsed.length > 0
      if (typeof parsed === 'object' && parsed !== null) return Object.keys(parsed).length > 0
      return false
    } catch {
      return false
    }
  }

  const updateSelectionStates = async () => {
    const toySelected = await isItemSelected('Toy')
    const frameSelected = await isItemSelected('Frame')
    setToySelected(toySelected)
    setFrameSelected(frameSelected)
  }

  useEffect(() => {
    // Initialize order type to '3d' on first load
    const stored = getOrderType()
    if (!stored) {
      setOrderType('OrderType', '3d')
      updateOrderState('3d')
    } else {
      updateOrderState(stored as '3d' | 'toy' | 'frame')
    }
    updateSelectionStates()
  }, [])

  // Update selection states when component mounts
  useEffect(() => {
    updateSelectionStates()
  }, [])

  useEffect(() => {
    const orderType = getOrderType() as '3d' | 'toy' | 'frame' | null
    if (orderType) updateOrderState(orderType)

    if (location.state?.scrollToSelection) {
      document.getElementById('selection')?.scrollIntoView({ behavior: 'smooth' })
      navigate(location.pathname, { replace: true, state: {} })
    }
  }, [location, navigate])

  useEffect(() => {
    const handleStorageUpdate = () => {
      updateSelectionStates()
    }
  }, [])

  const updateOrderState = (type: '3d' | 'toy' | 'frame') => {
    setIs3DToyFrame(type === '3d')
    setIsOnlyToys(type === 'toy')
    setIsOnlyFrame(type === 'frame')
  }

  const handleOrderType = (type: '3d' | 'toy' | 'frame') => {
    setOrderType('OrderType', type)
    updateOrderState(type)

    // Update selection states after order change
    updateSelectionStates()
  }

  const handleOrder = () => {
    setModalOpen(true)
  }

  const handleClearOrder = () => {
    setOpenSnack(true)
    removeToyItem('selectedToys')
    removeFrameItem('selectedFrame')

    // Update local state immediately
    setToySelected(false)
    setFrameSelected(false)
  }

  const isButtonDisabled = () => {
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
            display: 'flex',
            flexDirection: isSmallScreen ? 'column' : 'row',
            bgcolor: Palette.background.paper,
            p: isSmallScreen ? 2 : 4,
            height: isSmallScreen ? 'auto' : '540px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Car image on the left (relative, not absolute) */}
          {!isSmallScreen && (
            <Box
              sx={{
                width: '45%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              <LazyImage
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
            </Box>
          )}
          <Stack
            alignItems={isSmallScreen ? 'center' : 'flex-start'}
            justifyContent="center"
            width={isSmallScreen ? '100%' : '50%'}
            height="100%"
            gap={isSmallScreen ? 2 : 3}
            mr={isSmallScreen ? 0 : 2}
          >
            <Typography
              variant={isSmallScreen ? 'h5' : 'h3'}
              fontWeight="bold"
              textAlign={isSmallScreen ? 'center' : 'left'}
              zIndex={4}
              mt={2}
            >
              Customise Your Order
            </Typography>

            <Typography
              sx={{
                width: '100%',
                textAlign: isSmallScreen ? 'center' : 'left',
                fontSize: isSmallScreen ? '.8rem' : '1.2rem',
                color: isSmallScreen ? Palette.text.white : Palette.text.secondary,
                fontWeight: 600,
                zIndex: 2,
                p: 1,
                background: isSmallScreen ? 'rgba(0,0,0, 0.4)' : 'transparent',
              }}
            >
              Build your perfect gift! Start by selecting your favorite toy and a matching frame to
              make it truly yours. Only when both are chosen, the magic happens -
              <Typography
                component="span"
                sx={{
                  color: 'red',
                  fontSize: isSmallScreen ? '.8rem' : '1rem',
                  fontWeight: 700,
                  pl: 1,
                }}
              >
                3D TOYCAST
              </Typography>
            </Typography>

            {/* Product Type Selection Buttons */}
            <Stack direction="row" spacing={1} width="100%">
              <Button
                fullWidth
                variant={is3DToyFrame ? 'contained' : 'outlined'}
                color={is3DToyFrame ? 'primary' : 'inherit'}
                onClick={() => handleOrderType('3d')}
                sx={{
                  fontSize: isSmallScreen ? '.65rem' : '1rem',
                  fontWeight: 600,
                  bgcolor: is3DToyFrame ? 'red' : undefined,
                  color: is3DToyFrame ? 'white' : Palette.text.secondary,
                  borderColor: is3DToyFrame ? 'red' : Palette.text.secondary,
                  '&:hover': {
                    bgcolor: is3DToyFrame ? 'darkred' : Palette.secondary.light,
                    color: is3DToyFrame ? 'white' : Palette.text.primary,
                  },
                }}
              >
                Toy & Frame
              </Button>
              <Button
                fullWidth
                variant={isOnlyToys ? 'contained' : 'outlined'}
                color={isOnlyToys ? 'primary' : 'inherit'}
                onClick={() => handleOrderType('toy')}
                sx={{
                  fontWeight: 600,
                  fontSize: isSmallScreen ? '.7rem' : '1rem',
                  bgcolor: isOnlyToys ? 'red' : undefined,
                  color: isOnlyToys ? 'white' : Palette.text.secondary,
                  borderColor: isOnlyToys ? 'red' : Palette.text.secondary,
                  '&:hover': {
                    bgcolor: isOnlyToys ? 'darkred' : Palette.secondary.light,
                    color: isOnlyToys ? 'white' : Palette.text.primary,
                  },
                }}
              >
                Toys
              </Button>
              <Button
                fullWidth
                variant={isOnlyFrames ? 'contained' : 'outlined'}
                color={isOnlyFrames ? 'primary' : 'inherit'}
                onClick={() => handleOrderType('frame')}
                sx={{
                  fontWeight: 600,
                  fontSize: isSmallScreen ? '.7rem' : '1rem',
                  bgcolor: isOnlyFrames ? 'red' : undefined,
                  color: isOnlyFrames ? 'white' : Palette.text.secondary,
                  borderColor: isOnlyFrames ? 'red' : Palette.text.secondary,
                  '&:hover': {
                    bgcolor: isOnlyFrames ? 'darkred' : Palette.secondary.light,
                    color: isOnlyFrames ? 'white' : Palette.text.primary,
                  },
                }}
              >
                Frames
              </Button>
            </Stack>

            <Stack width={'100%'} gap={isSmallScreen ? 2 : 3}>
              <Stack
                direction={isSmallScreen ? 'column' : 'row'}
                spacing={isSmallScreen ? 1 : 3}
                width="100%"
                justifyContent="center"
              >
                {selectionButtonObj.map(item => {
                  const isSelected = item.label === 'Toy' ? toySelected : frameSelected
                  const isToyHidden = isOnlyFrames && item.label === 'Toy'
                  const isFrameHidden = isOnlyToys && item.label === 'Frame'
                  const isToyDisabled = is3DToyFrame && item.label === 'Toy' && !frameSelected
                  if (isToyHidden || isFrameHidden) return null

                  return (
                    <Link
                      to={item.link}
                      key={item.label}
                      style={{
                        textDecoration: 'none',
                        flex: 1,
                        pointerEvents: isToyDisabled ? 'none' : 'auto',
                      }}
                    >
                      <Button
                        variant={isSmallScreen ? 'contained' : 'outlined'}
                        startIcon={
                          isSelected ? (
                            <ShoppingCartIcon
                              sx={{ fontSize: isSmallScreen ? '.8rem' : '1.4rem' }}
                            />
                          ) : (
                            <AddShoppingCartIcon
                              sx={{ fontSize: isSmallScreen ? '.8rem' : '1.4rem' }}
                            />
                          )
                        }
                        disabled={isToyDisabled}
                        sx={{
                          width: '100%',
                          fontSize: isSmallScreen ? '.8rem' : '1.4rem',
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
                            borderColor: isSelected ? Palette.secondary.dark : Palette.text.primary,
                            color: isSelected ? Palette.text.white : Palette.text.primary,
                            bgcolor: isSelected ? Palette.secondary.dark : Palette.secondary.light,
                          },
                        }}
                      >
                        {item.label}
                      </Button>
                    </Link>
                  )
                })}
              </Stack>
            </Stack>

            <Stack direction={'row'} spacing={1} justifyContent="center" width={'100%'}>
              <Button
                fullWidth
                variant="contained"
                onClick={handleOrder}
                disabled={isButtonDisabled()}
                startIcon={isButtonDisabled() ? <ShoppingCartIcon /> : <ShoppingCartCheckoutIcon />}
                sx={{
                  alignSelf: 'center',
                  bgcolor: 'transparent',
                  color: Palette.success.dark,
                  border:
                    !toySelected || !frameSelected
                      ? undefined
                      : `1px solid ${Palette.secondary.main}90`,
                  fontWeight: 600,
                  fontSize: isSmallScreen ? '.7rem' : '1.2rem',
                }}
              >
                Order
              </Button>
              <Button
                fullWidth
                size={isSmallScreen ? 'small' : 'medium'}
                variant="contained"
                onClick={handleClearOrder}
                disabled={isButtonDisabled()}
                startIcon={<RemoveShoppingCartIcon />}
                sx={{
                  alignSelf: 'center',
                  bgcolor: 'transparent',
                  color: Palette.success.dark,
                  border:
                    !toySelected || !frameSelected
                      ? undefined
                      : `1px solid ${Palette.secondary.main}90`,
                  fontWeight: 600,
                  fontSize: isSmallScreen ? '.7rem' : '1.2rem',
                }}
              >
                Clear Cart
              </Button>
              <SnacKBar
                open={openSnack}
                close={() => setOpenSnack(false)}
                message={
                  getOrderType() === '3d'
                    ? 'Removed 3DToys&Frame'
                    : getOrderType() === 'frame'
                      ? 'Removed Frame'
                      : 'Removed Toys'
                }
              />
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
        >
          <OrderForm />
        </PopupHOC>
      )}
    </>
  )
}

export default Selection
