import React, { useEffect, useState } from 'react'
import { Box, Typography, IconButton, Paper } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import ToyCard from './ToyCard'

interface Toy {
  id: number
  image: any
  name: string
  description: string
  price: number
  moterType: string
}

const Cart: React.FC = () => {
  const [selectedToys, setSelectedToys] = useState<Toy[]>([])

  useEffect(() => {
    // Load selected toys from session storage on component mount
    const toyData = sessionStorage.getItem('selectedToys')
    if (toyData) {
      setSelectedToys(JSON.parse(toyData))
    }
  }, [])

  const handleRemoveToy = (toyId: number) => {
    // Remove toy from state
    const updatedToys = selectedToys.filter(toy => toy.id !== toyId)
    setSelectedToys(updatedToys)

    // Update session storage
    if (updatedToys.length === 0) {
      sessionStorage.removeItem('selectedToys')
    } else {
      sessionStorage.setItem('selectedToys', JSON.stringify(updatedToys))
    }
  }

  if (selectedToys.length === 0) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          Your cart is empty
        </Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
        Selected Toys
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
          gap: 2,
        }}
      >
        {selectedToys.map(toy => (
          <Paper
            key={toy.id}
            elevation={3}
            sx={{
              position: 'relative',
              p: 1,
              '&:hover': {
                boxShadow: 6,
              },
            }}
          >
            <IconButton
              onClick={() => handleRemoveToy(toy.id)}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                bgcolor: 'rgba(255, 255, 255, 0.8)',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                },
                zIndex: 1,
              }}
            >
              <DeleteIcon color="error" />
            </IconButton>
            <ToyCard
              {...toy}
              isSelected={true}
              onSelect={() => {}} // Empty function since we don't want to allow selection in cart
            />
          </Paper>
        ))}
      </Box>
    </Box>
  )
}

export default Cart
