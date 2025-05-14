import React, { useState } from 'react'
import { Box, Button, Typography, Card, Divider } from '@mui/material'
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
}

const FrameCard: React.FC<FrameCardProps> = ({ frameDetails, onSelect }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card
      sx={{
        bgcolor: 'black',
        color: 'white',
        display: 'flex',
        padding: 2,
        width: '100%',
        height: isExpanded ? 'auto' : '300px',
        maxWidth: 1200,
        borderRadius: 2,
        transition: 'height 0.3s ease-in-out',
      }}
    >
      {/* Left Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
          mr: 2,
        }}
      >
        {/* Frame Preview */}
        <Box
          sx={{
            width: 200,
            height: 270,
            bgcolor: 'red',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            '& img': {
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            },
          }}
        >
          <img src={frameDetails.image} alt={frameDetails.type} />
        </Box>
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
            bgcolor: 'red',
            height: isExpanded ? 'auto' : '80%',
            minHeight: 100,
            padding: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
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
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
            mt: 1,
          }}
        >
          <Button
            onClick={onSelect}
            variant="contained"
            sx={{
              bgcolor: 'red',
              color: 'white',
              fontWeight: 'bold',
              '&:hover': { bgcolor: 'darkred' },
              fontSize: '1rem',
              py: 0.5,
              minWidth: 80,
            }}
          >
            SELECT
          </Button>
          <Box
            sx={{
              bgcolor: 'red',
              fontWeight: 'bold',
              fontSize: '1.5rem',
              py: 0.5,
              px: 1,
              textAlign: 'center',
              color: 'white',
              minWidth: 80,
              borderRadius: 1,
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
