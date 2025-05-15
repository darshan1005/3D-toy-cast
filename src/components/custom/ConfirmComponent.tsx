import React, { JSX } from 'react'
import { Box, Button } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Link, useNavigate } from 'react-router-dom'

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
  const navigate = useNavigate();

  const handleConfirm = () => {
    // Call onConfirm callback if provided
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

      {/* Confirm Button */}
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
    </Box>
  )
}

export default ConfirmComponent
