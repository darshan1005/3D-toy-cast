import React, { JSX, useState } from 'react'
import { Box, Button } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useNavigate } from 'react-router-dom'
import Cart from './Cart'

interface ConfirmComponentProps {
  onConfirm: () => void;
  navigateTo?: string;
  label?: string | JSX.Element;
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
  label = 'Confrim',
  selectedToy,
  selectedFrame,
}) => {
  const [cartOpen, setCartOpen] = useState(false)
  const navigate = useNavigate();
  const handleConfirm = () => {
    onConfirm()
  }

  const handleBackNav = () => {
    navigate(navigateTo, {
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
      {/* Back Button */}
      <Button
        variant="outlined"
        sx={{
          minWidth: 40,
          width: 40,
          height: 40,
          borderRadius: '50%',
          bgcolor: 'grey.400',
          color: 'white',
          '&:hover': {
            bgcolor: 'grey.600',
          },
        }}
        onClick={handleBackNav}
      >
        <ArrowBackIcon />
      </Button>

      {/* Confirm Button and Cart */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
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
        <Button
          variant="outlined"
          sx={{
            minWidth: 40,
            width: 40,
            height: 40,
            borderRadius: '50%',
            bgcolor: 'grey.100',
            color: 'black',
            '&:hover': {
              bgcolor: 'grey.300',
            },
          }}
          onClick={() => setCartOpen(true)}
        >
          <ShoppingCartIcon />
        </Button>
      </Box>

      {/* Cart Component (Simple Drawer/Modal) */}
      {cartOpen && (
        <Cart open={cartOpen} onClose={() => setCartOpen(false)} />
      )}

    </Box>
  )
}

export default ConfirmComponent
