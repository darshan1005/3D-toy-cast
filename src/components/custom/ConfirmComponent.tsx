import React from 'react'
import { Box, Button } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Link, useNavigate } from 'react-router-dom'

interface ConfirmComponentProps {
  onConfirm: () => void
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
  selectedToy,
  selectedFrame,
}) => {
  const navigate = useNavigate()

  const handleConfirm = () => {
    // Save to session storage
    if (selectedToy) {
      sessionStorage.setItem('selectedToy', JSON.stringify(selectedToy))
    }
    if (selectedFrame) {
      sessionStorage.setItem('selectedFrame', JSON.stringify(selectedFrame))
    }

    // If we're on the toy page and have selected a toy, navigate to home page and change toy button to green
    if (selectedToy && !selectedFrame) {
      navigate('/')
    } else {
      // If we're on the frame page or have both selections, call the onConfirm callback
      onConfirm()
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 2,
        p: 2,
        bgcolor: 'white',
        borderRadius: 2,
      }}
    >
      {/* Back Button */}
      <Link to="/" style={{ textDecoration: 'none' }}>
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
        >
          <ArrowBackIcon />
        </Button>
      </Link>

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
      >
        Confirm
      </Button>
    </Box>
  )
}

export default ConfirmComponent
