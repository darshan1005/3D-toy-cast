import React, { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  IconButton,
  Paper,
  Drawer,
  Button,
  Divider,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import ToyCard from './ToyCard'
import { FrameDetailsProps } from 'src/data/FrameData'
import { ToyDataProps } from 'src/data/ToyData'

interface CartProps {
  open: boolean
  onClose: () => void
}

const Cart: React.FC<CartProps> = ({ open, onClose }) => {
  const [selectedToys, setSelectedToys] = useState<ToyDataProps[]>([])
  const [selectedFrame, setSelectedFrame] = useState<FrameDetailsProps | null>(null)

  useEffect(() => {
    const toyData = sessionStorage.getItem('selectedToys')
    const frameData = sessionStorage.getItem('selectedFrame')

    if (toyData) setSelectedToys(JSON.parse(toyData))
    if (frameData) setSelectedFrame(JSON.parse(frameData))
  }, [open]) // refresh data every time the drawer is opened

  const handleRemoveToy = (toyId: number) => {
    const updatedToys = selectedToys.filter(toy => toy.id !== toyId)
    setSelectedToys(updatedToys)
    updatedToys.length === 0
      ? sessionStorage.removeItem('selectedToys')
      : sessionStorage.setItem('selectedToys', JSON.stringify(updatedToys))

    window.dispatchEvent(new Event('storageUpdate'))
  }

  const handleRemoveFrame = () => {
    setSelectedFrame(null)
    sessionStorage.removeItem('selectedFrame')
    window.dispatchEvent(new Event('storageUpdate'))
  }

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 400, p: 2 }}>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Your Cart
        </Typography>

        {/* TOYS LIST */}
        {selectedToys.length > 0 ? (
          selectedToys.map(toy => (
            <Paper
              key={toy.id}
              elevation={3}
              sx={{
                position: 'relative',
                p: 1,
                mb: 2,
                '&:hover': { boxShadow: 6 },
              }}
            >
              <IconButton
                onClick={() => handleRemoveToy(toy.id)}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  bgcolor: 'rgba(255,255,255,0.8)',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
                }}
              >
                <DeleteIcon color="error" />
              </IconButton>
              <ToyCard
                isSelected={true}
                onSelect={() => { return }}
                image={toy.image}
                name={toy.name}
                description={toy.description}
                price={toy.price}
                moterType={toy.type} />
            </Paper>
          ))
        ) : (
          <Typography color="text.secondary" mb={2}>
            No toys selected.
          </Typography>
        )}

        <Divider sx={{ my: 2 }} />

        {/* FRAME CARD */}
        {selectedFrame ? (
          <Paper elevation={3} sx={{ position: 'relative', p: 2, mb: 2 }}>
            <IconButton
              onClick={handleRemoveFrame}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                bgcolor: 'rgba(255,255,255,0.8)',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
              }}
            >
              <DeleteIcon color="error" />
            </IconButton>
            <Box>
              <img
                src={selectedFrame.image}
                alt={selectedFrame.type}
                style={{ width: '100%', borderRadius: 8 }}
              />
              <Typography variant="subtitle1" fontWeight="bold" mt={1}>
                {selectedFrame.type}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedFrame.description}
              </Typography>
              <Typography variant="body2" mt={1}>
                <strong>Material:</strong> {selectedFrame.material}
              </Typography>
              <Typography variant="body2">
                <strong>Size:</strong> {selectedFrame.dimensions.width} x{' '}
                {selectedFrame.dimensions.height} x {selectedFrame.dimensions.depth} cm
              </Typography>
              <Typography variant="body2">
                <strong>Weight:</strong> {selectedFrame.weight} kg
              </Typography>
              <Typography variant="body2">
                <strong>Price:</strong> ₹{selectedFrame.price}
              </Typography>
            </Box>
          </Paper>
        ) : (
          <Typography color="text.secondary">No frame selected.</Typography>
        )}

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
          onClick={onClose}
        >
          Close Cart
        </Button>
      </Box>
    </Drawer>
  )
}

export default Cart
