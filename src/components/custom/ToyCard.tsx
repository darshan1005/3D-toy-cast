import React from 'react'
import { Card, CardContent, Typography, Box, Button, CardMedia, useMediaQuery, useTheme } from '@mui/material'

interface ToyCardProps {
  image: any
  name: string
  description: string
  price: number
  moterType: string
  onSelect?: () => void
  isSelected?: boolean
}

const ToyCard: React.FC<ToyCardProps> = ({
  image,
  name,
  description,
  price,
  onSelect,
  isSelected = false,
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Card
      sx={{
        width: isSmallScreen ? '100%' : 240,
        bgcolor: isSelected ? 'grey.800' : 'black',
        color: 'white',
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 330,
        borderRadius: 2,
        cursor: onSelect ? 'pointer' : 'default',
        transition: 'background-color 0.3s ease',
        '&:hover': {
          bgcolor: isSelected ? 'grey.700' : 'grey.900',
        },
      }}
      onClick={onSelect}
    >
      {/* Image section */}
      <CardMedia
        component="img"
        image={image}
        alt={name}
        sx={{
          height: 120,
          objectFit: 'contain',
          mb: 2,
        }}
      />

      {/* Content */}
      <CardContent sx={{ p: 0, flexGrow: 1 }}>
        <Typography variant="body1" fontWeight="bold" gutterBottom>
          {name} <Typography component={'span'} variant='caption' sx={{ opacity: 0.7 }}></Typography>
        </Typography>
        <Typography variant="body2" color="white">
          {description}
        </Typography>
      </CardContent>

      {/* Footer */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 2,
        }}
      >
        <Box
          sx={{
            bgcolor: 'red',
            px: 2,
            py: 1,
            fontWeight: 'bold',
            fontSize: '0.8rem',
          }}
        >
          ₹ {price} /-
        </Box>
        <Button
          variant="contained"
          sx={{
            bgcolor: 'red',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '0.7rem',
            '&:hover': {
              bgcolor: 'darkred',
            },
          }}
        >
          {isSelected ? 'Selected' : 'Select'}
        </Button>
      </Box>
    </Card>
  )
}

export default ToyCard
