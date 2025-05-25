import { Box, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import { testimonials } from '../data/testimonials'

interface TestimonialProps {
  username: string
  stars: number
  testimonial: string
}

const Testimonial = ({ username, stars, testimonial }: TestimonialProps) => {
  const renderStars = () => {
    const totalStars = 5
    return [...Array(totalStars)].map((_, index) => (
      <Box key={index} sx={{ color: 'gold' }}>
        {index < stars ? <StarIcon /> : <StarBorderIcon />}
      </Box>
    ))
  }

  return (
    <Box
      sx={{
        bgcolor: 'white',
        p: 3,
        borderRadius: 2,
        boxShadow: '2px 2px 6px rgba(0, 0, 0, 0.1)',
        height: 300
      }}
    >
      <Stack spacing={2}>
        <Typography variant="h6" fontWeight="bold">
          {username}
        </Typography>
        <Stack direction="row" spacing={0.5}>
          {renderStars()}
        </Stack>
        <Typography variant="body1" color="text.secondary">
          {testimonial}
        </Typography>
      </Stack>
    </Box>
  )
}

const Testimonies = () => {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Box sx={{ backgroundColor: 'red', p: 2 }}>
      <Box sx={{ backgroundColor: 'white', padding: 2, borderRadius: 3 }}>
        <Stack spacing={3} sx={{ p: 4 }}>
          <Typography
            sx={{ fontSize: { xs: '1.75rem', sm: '2.125rem' } }}
            fontWeight="bold"
            textAlign="center"
            mb={{ xs: 2, sm: 3 }}
          >
            What Our Customers Say
          </Typography>

          <Box
            sx={{
              position: 'relative',
              overflow: 'hidden',
              p: 2,
              '&::before': {
                content: '""',
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: isSmallScreen ? 10 : 50,
                background: 'linear-gradient(to right, white 0%, transparent 100%)',
                zIndex: 2,
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                right: 0,
                top: 0,
                bottom: 0,
                width: isSmallScreen ? 10 : 50,
                background: 'linear-gradient(to left, white 0%, transparent 100%)',
                zIndex: 2,
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                gap: 3,
                '@keyframes scroll': {
                  '0%': {
                    transform: 'translateX(0)',
                  },
                  '100%': {
                    transform: 'translateX(-50%)',
                  },
                },
                animation: 'scroll 30s linear infinite',
                '&:hover': {
                  animationPlayState: 'paused',
                },
                width: 'fit-content',
              }}
            >
              {[...testimonials, ...testimonials].map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    width: { xs: '300px', sm: '400px', md: '350px' },
                    flex: 'none',
                  }}
                >
                  <Testimonial
                    username={item.username}
                    stars={item.stars}
                    testimonial={item.testimonial}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        </Stack>
      </Box>
    </Box>
  )
}

export default Testimonies
