import React, { JSX, useEffect, useState } from 'react'
import { Badge, Box, Button, IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useNavigate } from 'react-router-dom'
import Cart from './Cart'
import HomeIcon from '@mui/icons-material/Home'
import { Toy } from '../../types/types'
import { getOrderType } from '@utils/session'
import { getToyItem } from '../../DB/ToyStore'
import { getFrameItem } from '../../DB/FrameStore'

interface NavHeaderProps {
  onConfirm: () => void
  navigateTo?: string
  label?: string | JSX.Element
  showHome?: boolean
  selectedToy?: {
    id: number
    name: string
    price: number
  } | null
  selectedFrame?: {
    id: number
    type: string
    price: number
  } | null
}

const NavHeader: React.FC<NavHeaderProps> = ({
  onConfirm,
  navigateTo = '/',
  showHome = true,
  label = 'Confrim',
  selectedToy,
  selectedFrame,
}) => {
  const [cartOpen, setCartOpen] = useState(false)
  const [isStorage, setIsStorage] = useState<boolean>(false)
  const navigate = useNavigate()
  const orderType = getOrderType()

  useEffect(() => {
    const reloadStorage = async () => {
      const toyData = await getToyItem('selectedToys')
      const frameData = await getFrameItem('selectedFrame')

      let parsedToys: Toy[] = []
      if (typeof toyData === 'string') {
        try {
          parsedToys = JSON.parse(toyData)
        } catch {
          parsedToys = []
        }
      }
      const hasSelectedToy = parsedToys.length > 0

      let parsedFrame: any = null
      if (typeof frameData === 'string') {
        try {
          parsedFrame = JSON.parse(frameData)
        } catch {
          parsedFrame = null
        }
      }
      const hasSelectedFrame = Array.isArray(parsedFrame) ? parsedFrame.length > 0 : !!parsedFrame

      const isSelected = hasSelectedToy || hasSelectedFrame
      setIsStorage(isSelected)
    }
    reloadStorage()
  }, [selectedToy, selectedFrame])

  const handleConfirm = () => {
    onConfirm()
  }

  const handleBackNav = () => {
    navigate(navigateTo, {
      state: { scrollToSelection: true },
    })
  }

  const handleScollHome = () => {
    navigate('/', {
      state: { scrollToSelection: true },
    })
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 2,
        p: 2,
        mb: 2,
        bgcolor: 'white',
        borderRadius: 2,
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        width: '100%',
        boxShadow: 2,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <IconButton
          size="small"
          sx={{
            minWidth: 40,
            width: 40,
            height: 40,
            bgcolor: '#3331',
          }}
          onClick={handleBackNav}
        >
          <ArrowBackIcon />
        </IconButton>

        {showHome && orderType === '3d' && (
          <IconButton
            size="small"
            sx={{
              minWidth: 40,
              width: 40,
              height: 40,
            }}
            onClick={handleScollHome}
          >
            <HomeIcon />
          </IconButton>
        )}
      </Box>

      {/* Confirm Button and Cart */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          size="small"
          onClick={handleConfirm}
          variant="contained"
          sx={{
            bgcolor: 'black',
            color: 'white',
            fontWeight: 'bold',
            px: 3,
            '&:hover': { bgcolor: '#333' },
          }}
          disabled={!selectedToy && !selectedFrame}
        >
          {label}
        </Button>

        <IconButton
          sx={{
            minWidth: 40,
            width: 40,
            height: 40,
            borderRadius: '50%',
            color: 'black',
            '&:hover': {
              bgcolor: 'grey.300',
            },
          }}
          onClick={() => setCartOpen(true)}
        >
          <Badge color="error" overlap="circular" variant="dot" invisible={!isStorage}>
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Box>

      {/* Cart Component (Simple Drawer/Modal) */}
      {cartOpen && <Cart open={cartOpen} onClose={() => setCartOpen(false)} />}
    </Box>
  )
}

export default NavHeader
