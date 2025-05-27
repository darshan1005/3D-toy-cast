import {
  Box,
  Stack,
  SxProps,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
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
        p: isSmallScreen ? 2 : 3,
        borderRadius: 2,
        boxShadow: '2px 2px 6px rgba(0, 0, 0, 0.1)',
        height: '100%',
        minHeight: 250,
      }}
    >
      <Stack spacing={1.5}>
        <Typography
          variant="h6"
          fontWeight="bold"
          fontSize={{ xs: '1rem', sm: '1.25rem' }}
        >
          {username}
        </Typography>
        <Stack direction="row" spacing={0.5}>
          {renderStars()}
        </Stack>
        <Typography
          variant="body2"
          color="text.secondary"
          fontSize={{ xs: '0.9rem', sm: '1rem' }}
        >
          {testimonial}
        </Typography>
      </Stack>
    </Box>
  )
}

const Testimonies = () => {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const testimonials: TestimonialType[] = testimonialsJson.testimonials

  const containerStyles = isSmallScreen
    ? {
      display: 'flex',
      overflowX: 'auto',
      scrollSnapType: 'x mandatory',
      gap: 2,
      paddingBottom: 2,
      '&::-webkit-scrollbar': { display: 'none' },
      scrollbarWidth: 'none',
    }
    : {
      display: 'flex',
      justifyContent: 'center',
      gap: 3,
    }

  const cardStyles = isSmallScreen
    ? {
      flex: '0 0 80%',
      scrollSnapAlign: 'start',
    }
    : {
      width: '300px',
    }

  return (
    <Box sx={{ backgroundColor: 'red', p: 2 }}>
      <Box sx={{ backgroundColor: 'white', p: 2, borderRadius: 3 }}>
        <Stack spacing={3} sx={{ p: { xs: 2, sm: 4 } }}>
          <Typography
            fontWeight="bold"
            textAlign="center"
            sx={{ fontSize: { xs: '1.5rem', sm: '2rem' }, mb: { xs: 1, sm: 2 } }}
          >
            What Our Customers Say
          </Typography>

          <CarouselHOC data={testimonials}>
            {(item) => (
              <Testimonial
                username={item.username}
                stars={item.stars}
                testimonial={item.testimonial}
              />
            )}
          </CarouselHOC>
        </Stack>
      </Box>
    </Box>
  )
}

export default Testimonies
