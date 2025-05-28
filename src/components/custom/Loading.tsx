import React from 'react';
import { Box, Typography, useTheme, keyframes, PaletteColor } from '@mui/material';

// Define a keyframe animation for bouncing effect
const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
    opacity: 0.6;
  }
  50% {
    transform: translateY(-20px);
    opacity: 1;
  }
`;

const colorKeys: Array<'primary' | 'secondary' | 'error'> = ['primary', 'secondary', 'error'];

const Loading: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'background.default',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      <Box sx={{ display: 'flex', gap: 1 }}>
        {colorKeys.map((key, i) => (
          <Box
            key={i}
            sx={{
              width: 16,
              height: 16,
              borderRadius: '50%',
              bgcolor: (theme.palette[key] as PaletteColor).main,
              animation: `${bounce} 1.2s ${i * 0.2}s infinite ease-in-out`,
            }}
          />
        ))}
      </Box>
      <Typography variant="h6" color="text.secondary">
        Casting imagination into reality...
      </Typography>
    </Box>
  );
};

export default Loading;
