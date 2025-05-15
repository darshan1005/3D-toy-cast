import React, { useState } from 'react'
import { Box, Button, Typography, Card, Divider, Dialog } from '@mui/material'
import TruncatedText from './TruncatedText'
interface FrameDetails {
  type: string
  material: string
  dimensions: {
    width: number
    height: number
    depth: number
  }
  weight: number
  description: string
  image: string
  price: number
}

interface FrameCardProps {
  frameDetails: FrameDetails
  onSelect?: () => void
  isSelected?: boolean
  isExpanded?: boolean
}

const FrameCard: React.FC<FrameCardProps> = ({
  frameDetails,
  onSelect,
  isSelected = false,
  isExpanded,
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);

  return (
    <Card
      sx={{
        bgcolor: isSelected ? '#e0f2f1' : '#f5faff',
        color: '#222',
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        padding: { xs: 1, sm: 2 },
        width: '100%',
        height: isExpanded ? 'auto' : { xs: 'auto', sm: 300 },
        maxWidth: 1280,
        borderRadius: 3,
        boxShadow: 3,
        transition: 'background 0.3s, height 0.3s',
        '&:hover': {
          bgcolor: isSelected ? '#b2dfdb' : '#e3f2fd',
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
          sx={{
            width: { xs: 180, sm: 200 },
            height: { xs: 120, sm: 270 },
            bgcolor: '#222',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            borderRadius: 2,
            '& img': {
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            },
          }}
          onClick={() => setPreviewOpen(true)}
        >
          <img src={frameDetails.image} alt={frameDetails.type} />
        </Box>
        <Dialog open={previewOpen} onClose={() => setPreviewOpen(false)} maxWidth="md">
          <Box sx={{ p: 2, bgcolor: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
            bgcolor: '#e3f2fd',
            height: isExpanded ? 'auto' : '80%',
            minHeight: 100,
            padding: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" fontWeight="bold" noWrap>
            {frameDetails.type}
          </Typography>
          <Divider sx={{ bgcolor: 'white', opacity: 0.2 }} />

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Typography variant="body2" sx={{ minWidth: 100 }}>
              Material:
            </Typography>
            <Typography variant="body2" noWrap>
              {frameDetails.material}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Typography variant="body2" sx={{ minWidth: 100 }}>
              Dimensions:
            </Typography>
            <Typography variant="body2" noWrap>
              {frameDetails.dimensions.width} x {frameDetails.dimensions.height} x{' '}
              {frameDetails.dimensions.depth} cm
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Typography variant="body2" sx={{ minWidth: 100 }}>
              Weight:
            </Typography>
            <Typography variant="body2" noWrap>
              {frameDetails.weight} kg
            </Typography>
          </Box>

          <Divider sx={{ bgcolor: 'white', opacity: 0.2, my: 1 }} />

          <Box sx={{ mt: 1 }}>
            <TruncatedText text={frameDetails.description} truncatedValue={100} textAlign="left" />
          </Box>
        </Box>

        {/* Footer for buttons and price */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
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
              bgcolor: isSelected ? '#00796b' : '#1976d2',
              color: '#fff',
              fontWeight: 'bold',
              '&:hover': { bgcolor: isSelected ? '#004d40' : '#1565c0' },
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
              bgcolor: '#1976d2',
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
            ₹ {frameDetails.price} /-
          </Box>
        </Box>
      </Box>
    </Card>
  )
}

export default FrameCard