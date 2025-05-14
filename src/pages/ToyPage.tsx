import React from 'react'
import { Box, Typography } from '@mui/material'
import ToyCard from '@components/custom/ToyCard'

interface ToyData {
  id: number
  image: string
  name: string
  description: string
  price: number
}

interface ToysPageProps {
  toys: ToyData[]
}

const ToysPage: React.FC<ToysPageProps> = ({ toys }) => {
  return (
    <Box sx={{ p: 4, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 4,
          justifyContent: 'center',
        }}
      >
        {toys.map(toy => (
          <Box
            key={toy.id}
            sx={{
              width: {
                xs: '100%',
                sm: 'calc(50% - 16px)',
                md: 'calc(33.33% - 22px)',
                lg: 'calc(25% - 24px)',
              },
            }}
          >
            <ToyCard
              image={toy.image}
              name={toy.name}
              description={toy.description}
              price={toy.price}
            />
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default ToysPage
