import React from 'react'
import { Box, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import testimonialsJson from '../content/TestimonialsData.json'
import { Testimonial as TestimonialType } from '../types/types'
import CarouselHOC from './custom/HOC/CarouselHOC'

const Testimonial = ({ username, stars, testimonial }: TestimonialType) => {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const renderStars = () => {
    const totalStars = 5
    return [...Array(totalStars)].map((_, index) => (
      <Box key={index} sx={{ color: 'gold' }}>
        {index < stars ? <StarIcon fontSize="small" /> : <StarBorderIcon fontSize="small" />}
      </Box>
    ))
  }

  return (
    <Box
      sx={{
        bgcolor: 'white',
        p: isSmallScreen ? 1 : 3,
        borderRadius: 2,
        height: '100%',
        minHeight: 250,
        border: '1px solid #000'
      }}
    >
      <Stack spacing={1.5}>
        <Typography variant="h6" fontWeight="bold" fontSize={{ xs: '1rem', sm: '1.25rem' }}>
          {username}
        </Typography>
        <Stack direction="row" spacing={0.5}>
          {renderStars()}
        </Stack>
        <Typography variant="body2" color="text.secondary" fontSize={{ xs: '0.9rem', sm: '1rem' }}>
          {testimonial}
        </Typography>
      </Stack>
    </Box>
  )
}

const Testimonies = () => {
  const testimonials: TestimonialType[] = testimonialsJson.testimonials

  return (
    <Box sx={{ backgroundColor: 'red', p: 2 }}>
      <Box sx={{ backgroundColor: 'white', borderRadius: 3 }}>
        <Stack spacing={3} sx={{ p: { xs: 1, sm: 4 } }}>
          <Typography
            fontWeight="bold"
            textAlign="center"
            sx={{ fontSize: { xs: '1.5rem', sm: '2rem' }, mb: { xs: 1, sm: 2 } }}
          >
            What Our Customers Say
          </Typography>

          <CarouselHOC data={testimonials} itemsPerView={4}>
            {item => (
              <React.Fragment key={item.username}>
                <Testimonial
                  username={item.username}
                  stars={item.stars}
                  testimonial={item.testimonial}
                />
              </React.Fragment>
            )}
          </CarouselHOC>
        </Stack>
      </Box>
    </Box>
  )
}

export default Testimonies
