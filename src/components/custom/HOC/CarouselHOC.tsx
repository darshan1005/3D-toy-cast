import React, { useState, useMemo } from 'react'
import { Box, useMediaQuery, useTheme, IconButton } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

interface CarouselProps<T = any> {
  data: T[]
  children: (item: T, index: number) => React.ReactNode
  itemsPerView?: number // Optional: how many items to show at once (for large screens)
}

const CarouselHOC = <T,>({ children, data, itemsPerView }: CarouselProps<T>) => {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  // On small screens, always 1 per view; on large, use prop or default to 3
  const perView = isSmallScreen ? 1 : itemsPerView || 2
  const [current, setCurrent] = useState(0)

  // Calculate the max start index for the carousel
  const maxStart = Math.max(0, data.length - perView)

  // Only show navigation and dots if more items than perView
  const showNav = data.length > perView
  const showDots = showNav

  // Get the items to display in the current view
  const visibleItems = useMemo(() => {
    return data.slice(current, current + perView)
  }, [data, current, perView])

  const handlePrev = () => {
    setCurrent(prev => (prev === 0 ? maxStart : Math.max(0, prev - perView)))
  }
  const handleNext = () => {
    setCurrent(prev => (prev >= maxStart ? 0 : Math.min(maxStart, prev + perView)))
  }

  if (!data || data.length === 0) return null

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: isSmallScreen ? 2 : 10,
        }}
      >
        {showNav && (
          <IconButton onClick={handlePrev} disabled={current === 0}>
            <ArrowBackIosNewIcon sx={{ fontSize: isSmallScreen ? '1rem' : '1.5rem' }} />
          </IconButton>
        )}
        <Box
          sx={{
            width: isSmallScreen ? '70%' : '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            gap: 2,
          }}
        >
          {visibleItems.map((item, idx) => children(item, current + idx))}
        </Box>
        {showNav && (
          <IconButton onClick={handleNext} disabled={current >= maxStart}>
            <ArrowForwardIosIcon sx={{ fontSize: isSmallScreen ? '1rem' : '1.5rem' }} />
          </IconButton>
        )}
      </Box>

      {/* Dots indicator */}
      {showDots && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {Array.from({ length: Math.ceil(data.length / perView) }).map((_, idx) => {
            // The dot is active if its range includes the current index
            const isActive = current >= idx * perView && current < (idx + 1) * perView
            return (
              <Box
                key={idx}
                sx={{
                  width: isSmallScreen ? 7 : 10,
                  height: isSmallScreen ? 7 : 10,
                  borderRadius: '50%',
                  bgcolor: isActive ? theme.palette.error.main : theme.palette.grey[400],
                  mx: 0.5,
                  transition: 'background 0.2s',
                  cursor: 'pointer',
                }}
                onClick={() => setCurrent(idx * perView)}
              />
            )
          })}
        </Box>
      )}
    </Box>
  )
}

export default CarouselHOC
