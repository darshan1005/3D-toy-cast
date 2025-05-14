import React from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import ToyCard from '@components/custom/ToyCard';
import { carToyData } from '../data/ToyData';

const ToysPage = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        backgroundColor: 'red',
        p: 2,
      }}
    >
      <Box
        sx={{
          backgroundColor: 'white',
          padding: 2,
          borderRadius: 3,

        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            justifyContent: isSmallScreen ? 'center' : 'flex-start',
          }}
        >
          {carToyData.map(toy => (
            <Box key={toy.id} >
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
    </Box>
  );
};

export default ToysPage;
