import React, { useState } from 'react'
import {
  Box,
  Button,
  Typography,
  Card,
  Dialog,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import { Palette } from '../../theme'
import PreviewIcon from '@mui/icons-material/Preview'

interface FrameDetails {
  type: string
  material: string
  dimensions: string[]
  weight: number
  description: string
  image: string
  price: number
}

interface FrameCardProps {
  frameDetails: FrameDetails
  onSelect?: () => void
  isSelected?: boolean
  selectedDimension: string
  onDimensionChange: (dimension: string) => void
}

const FrameCard: React.FC<FrameCardProps> = ({
  frameDetails,
  onSelect,
  isSelected = false,
  selectedDimension,
  onDimensionChange,
}) => {
  const [previewOpen, setPreviewOpen] = useState(false)

  const handleDimensionChange = (event: SelectChangeEvent) => {
    const newDimension = event.target.value
    onDimensionChange(newDimension)
  }

  return (
    <Card
      sx={{
        bgcolor: isSelected ? 'teal' : Palette.text.primary,
        color: '#222',
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        padding: { xs: 1, sm: 2 },
        width: '100%',
        height: { xs: 'auto', sm: 300 },
        borderRadius: 3,
        ransition: 'background-color 0.3s ease',
        '&:hover': {
          bgcolor: isSelected ? '#004d4d' : '#333',
        },
      }}
    >
      {/* Left Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
          mr: { xs: 0, sm: 2 },
          mb: { xs: 2, sm: 0 },
        }}
      >
        {/* Frame Preview */}
        <Box
          component={'img'}
          src={frameDetails.image}
          alt={frameDetails.type}
          sx={{
            width: 200,
            height: { xs: 170, sm: 270 },
            bgcolor: '#222',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            borderRadius: 2,
            objectFit: 'contain',
            backgroundColor: 'transparent',
          }}
        />
        <Dialog open={previewOpen} onClose={() => setPreviewOpen(false)} maxWidth="md">
          <Box
            sx={{
              p: 2,
              bgcolor: Palette.background.paper,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <img
              src={frameDetails.image}
              alt={frameDetails.type}
              style={{ maxWidth: '90vw', maxHeight: '80vh', borderRadius: 8 }}
            />
            <Button onClick={() => setPreviewOpen(false)} sx={{ mt: 2 }} variant="outlined">
              Close
            </Button>
          </Box>
        </Dialog>
      </Box>

      {/* Right Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          height: '100%',
          justifyContent: 'space-between',
        }}
      >
        {/* Frame Details */}
        <Box
          sx={{
            bgcolor: Palette.background.default,
            padding: 2,
            display: 'flex',
            flexDirection: 'column',
            borderRadius: { xs: 1, sm: 2 },
            overflowY: 'auto',
            scrollbarWidth: 'none',
            height: 230,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'start',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              {frameDetails.type}
            </Typography>
            <PreviewIcon
              onClick={() => setPreviewOpen(true)}
              sx={{ color: '#3338', cursor: 'pointer' }}
              titleAccess="preview"
            />
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Typography variant="body2" sx={{ minWidth: 100 }}>
              Material:
            </Typography>
            <Typography variant="body2" fontWeight={'bold'}>
              {frameDetails.material}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Typography variant="body2" sx={{ minWidth: 100 }}>
              Dimensions:
            </Typography>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <Select
                value={selectedDimension}
                onChange={handleDimensionChange}
                sx={{ height: 20, fontSize: 12 }}
                variant="standard"
              >
                {frameDetails.dimensions.map(dimension => (
                  <MenuItem key={dimension} value={dimension} sx={{ fontSize: 12 }}>
                    {dimension}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Typography variant="body2" sx={{ minWidth: 100 }}>
              Weight:
            </Typography>
            <Typography variant="body2" fontWeight={'bold'}>
              {frameDetails.weight} kg
            </Typography>
          </Box>

          <Box sx={{ mt: 1 }}>
            <Typography variant="body2" sx={{ minWidth: 100 }} fontWeight={'bold'}>
              Description:
            </Typography>
            <Typography variant="subtitle1" lineHeight={1.4}>
              {frameDetails.description}
            </Typography>
          </Box>
        </Box>

        {/* Footer for buttons and price */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'center',
            gap: 2,
            mt: 1,
          }}
        >
          <Button
            onClick={onSelect}
            variant="contained"
            sx={{
              bgcolor: isSelected ? '#1976d2' : '#00796b',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '1rem',
              py: 0.5,
              minWidth: 80,
              width: { xs: '100%', sm: 'auto' },
            }}
          >
            {isSelected ? 'Selected' : 'Select'}
          </Button>
          <Box
            sx={{
              bgcolor: '#00796b',
              fontWeight: 'bold',
              fontSize: '1.5rem',
              py: 0.5,
              px: 1,
              textAlign: 'center',
              color: '#fff',
              minWidth: 80,
              borderRadius: 1,
              width: { xs: '100%', sm: 'auto' },
            }}
          >
            ₹ {frameDetails.price}.00
          </Box>
        </Box>
      </Box>
    </Card>
  )
}

export default FrameCard
