import React from 'react'
import { Box, Button } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Link } from 'react-router-dom'

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
  const handleConfirm = () => {
    // Call onConfirm callback if provided
    onConfirm()
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
        disabled={!selectedToy && !selectedFrame}
      >
        Confirm
      </Button>
    </Box>
  )
}

export default ConfirmComponent
