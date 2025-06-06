import React, { useEffect, useState } from 'react'
import { Box, Typography, IconButton, Paper, Drawer, Divider } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import ToyCard from './ToyCard'
import CloseIcon from '@mui/icons-material/Close'
import { FrameDetailsProps, ToyDataProps } from '../../types/types'
import LazyImage from './LazyImage'
import { getToyItem, removeToyItem, setToyItem } from '../../DB/ToyStore'
import { getFrameItem, removeFrameItem } from '../../DB/FrameStore'

interface CartProps {
  open: boolean
  onClose: () => void
}

const Cart: React.FC<CartProps> = ({ open, onClose }) => {
  const [selectedToys, setSelectedToys] = useState<ToyDataProps[]>([])
  const [selectedFrame, setSelectedFrame] = useState<FrameDetailsProps | null>(null)
  const [frameTotalCost, setFrameTotalCost] = useState<number>(0)

  useEffect(() => {
    const fetchCartData = async () => {
      const toyData = await getToyItem('selectedToys')
      const frameData = await getFrameItem('selectedFrame')

      if (toyData && typeof toyData === 'string') {
        setSelectedToys(JSON.parse(toyData))
      } else {
        setSelectedToys([])
      }

      if (frameData && typeof frameData === 'string') {
        const parsedFrame = JSON.parse(frameData)
        setSelectedFrame(parsedFrame)
        setFrameTotalCost(parsedFrame?.price || 0)
      } else {
        setSelectedFrame(null)
        setFrameTotalCost(0)
      }
    }
    fetchCartData()
  }, [open]) // refresh data every time the drawer is opened

  const handleRemoveToy = (toyId: number) => {
    const updatedToys = selectedToys.filter(toy => toy.id !== toyId)
    setSelectedToys(updatedToys)
    updatedToys.length === 0
      ? removeToyItem('selectedToys')
      : setToyItem('selectedToys', JSON.stringify(updatedToys))

  }

  const handleRemoveFrame = () => {
    setSelectedFrame(null)
    setFrameTotalCost(0)
    removeFrameItem('selectedFrame')
  }

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: { xs: 350, sm: 400 }, p: 2 }}>
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} mb={2}>
          <Typography variant="h6" fontWeight="bold">
            Your Cart
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

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
                }}
              >
                <DeleteIcon color="error" />
              </IconButton>
              <ToyCard
                isSelected={true}
                onSelect={() => {
                  return
                }}
                image={toy.image}
                name={toy.name}
                description={toy.description}
                price={toy.price}
                moterType={toy.type}
                scale={toy.scale}
              />
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
              <LazyImage
                src={selectedFrame.image}
                alt={selectedFrame.type}
                sx={{ width: '70%', borderRadius: 8 }}
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
                <strong>Size:</strong> {selectedFrame?.selectedDimension}
              </Typography>
              <Typography variant="body2">
                <strong>Weight:</strong> {selectedFrame.weight} kg
              </Typography>
              <Typography variant="body2">
                <strong>Price:</strong> ₹{frameTotalCost.toFixed(2)}
              </Typography>
            </Box>
          </Paper>
        ) : (
          <Typography color="text.secondary">No frame selected.</Typography>
        )}
      </Box>
    </Drawer>
  )
}

export default Cart
