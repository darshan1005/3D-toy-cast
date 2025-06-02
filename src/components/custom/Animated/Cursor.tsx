import React, { useState, useEffect } from 'react';
import { Box, Avatar, styled } from '@mui/material';

// Styled components for cursor elements
const CursorContainer = styled(Box)({
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 9999,
  transform: 'translate(-50%, -50%)',
});

const CursorCircle = styled(Box)(({ theme, size }) => ({
  width: size,
  height: size,
  border: `2px solid ${theme.palette.error.main}` + 20,
  borderRadius: '50% 30% 25%',
  backgroundColor: theme.palette.error.light + '20', // 20% opacity
  boxShadow: theme.shadows[3],
}));

const CursorTrail = styled(Box)(({ theme, size, opacity }) => ({
  width: size,
  height: size,
  border: `2px solid ${theme.palette.error.main}`,
  borderRadius: '50%',
  backgroundColor: theme.palette.error.light + '10', // 10% opacity
  opacity: opacity,
  transition: 'opacity 0.1s ease-out',
}));

interface CustomCursorProps {
  useImage?: boolean;
  imageUrl?: string;
  size?: number;
  trailLength?: number;
  disabled?: boolean;
}

const CustomCursor: React.FC<CustomCursorProps> = ({
  useImage = false,
  imageUrl = '',
  size = 20,
  trailLength = 8,
  disabled = false,
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<Array<{ x: number; y: number }>>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (disabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      setPosition(newPosition);
      setIsVisible(true);
      
      // Add to trail for followers
      setTrail((prev) => {
        const newTrail = [newPosition, ...prev.slice(0, trailLength - 1)];
        return newTrail;
      });
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [disabled, trailLength]);

  // Don't render if disabled or not visible
  if (disabled || !isVisible) return null;

  return (
    <>
      {/* Trail followers */}
      {trail.map((pos, index) => (
        <CursorContainer
          key={index}
          sx={{
            left: pos.x,
            top: pos.y,
            zIndex: 9998 - index, // Lower z-index for trail
          }}
        >
          {useImage && imageUrl ? (
            <Avatar
              src={imageUrl}
              sx={{
                width: Math.max(size - index * 2, 8), // Minimum size of 8px
                height: Math.max(size - index * 2, 8),
                opacity: Math.max(0.8 - index * 0.1, 0.1), // Minimum opacity of 0.1
                transition: 'opacity 0.1s ease-out',
                border: (theme) => `2px solid ${theme.palette.primary.main}`,
              }}
            />
          ) : (
            <CursorTrail
              size={Math.max(size - index * 2, 8)}
              opacity={Math.max(0.8 - index * 0.1, 0.1)}
            />
          )}
        </CursorContainer>
      ))}

      {/* Main cursor */}
      <CursorContainer
        sx={{
          left: position.x,
          top: position.y,
          zIndex: 9999,
        }}
      >
        {useImage && imageUrl ? (
          <Avatar
            src={imageUrl}
            sx={{
              width: size,
              height: size,
              border: (theme) => `2px solid ${theme.palette.primary.main}`,
              boxShadow: (theme) => theme.shadows[4],
            }}
          />
        ) : (
          <CursorCircle size={size} />
        )}
      </CursorContainer>
    </>
  );
};

export default CustomCursor;