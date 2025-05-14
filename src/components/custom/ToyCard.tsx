import React from 'react'
import { Card, CardContent, Typography, Box, Button, CardMedia } from '@mui/material'

interface ToyCardProps {
  image: any
  name: string
  description: string
  price: number
}

const ToyCard: React.FC<ToyCardProps> = ({ image, name, description, price }) => {
  return (
    <Card
      sx={{
        width: 230,
        bgcolor: 'black',
        color: 'white',
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        borderRadius: 2,
      }}
    >
      {/* Image section */}
      <CardMedia
        component="img"
        image={image}
        alt={name}
        sx={{
          height: 120,
          backgroundColor: 'red',
          objectFit: 'contain',
          mb: 2,
        }}
      />

      {/* Content */}
      <CardContent sx={{ p: 0, flexGrow: 1 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {name}
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
            '&:hover': {
              bgcolor: 'darkred',
            },
          }}
        >
          Add
        </Button>
      </Box>
    </Card>
  )
}

export default ToyCard
