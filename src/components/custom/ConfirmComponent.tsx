import React, { JSX, useEffect, useState } from 'react'
import { Badge, Box, Button, IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Link, useNavigate } from 'react-router-dom'
import Cart from './Cart'
import HomeIcon from '@mui/icons-material/Home';

interface ConfirmComponentProps {
  onConfirm: () => void;
  navigateTo?: string;
  label?: string | JSX.Element;
  showHome?: boolean;
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

const ConfirmComponent: React.FC<ConfirmComponentProps> = ({
  onConfirm,
  navigateTo = '/',
  showHome = true,
  label = 'Confrim',
  selectedToy,
  selectedFrame,
}) => {
  const [cartOpen, setCartOpen] = useState(false);
  const [storgaCount, setStorageCount] = useState<number>(0);
  const navigate = useNavigate();
  const availabilityType = sessionStorage.getItem('availabilityType')

  useEffect(() => {
    setStorageCount(sessionStorage.length);
  })

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
        boxShadow: 2
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <IconButton
          size='small'
          sx={{
            minWidth: 40,
            width: 40,
            height: 40,
            bgcolor: '#3331'
          }}
          onClick={handleBackNav}
        >
          <ArrowBackIcon />
        </IconButton>

        {showHome && availabilityType === '3d' &&
          <IconButton
            size='small'
            sx={{
              minWidth: 40,
              width: 40,
              height: 40,
            }}
            onClick={handleScollHome}
          >
            <HomeIcon />
          </IconButton>}
      </Box>

      {/* Confirm Button and Cart */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          size='small'
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
          <Badge
            color="error"
            overlap="circular"
            variant="dot"
            invisible={storgaCount === 0}>
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Box>

      {/* Cart Component (Simple Drawer/Modal) */}
      {cartOpen && (
        <Cart open={cartOpen} onClose={() => setCartOpen(false)} />
      )}

    </Box>
  )
}

export default ConfirmComponent
