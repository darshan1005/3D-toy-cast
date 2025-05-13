import { Box, Stack, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

interface TestimonialProps {
  username: string;
  stars: number;
  testimonial: string;
}

const Testimonial = ({ username, stars, testimonial }: TestimonialProps) => {
  const renderStars = () => {
    const totalStars = 5;
    return [...Array(totalStars)].map((_, index) => (
      <Box key={index} sx={{ color: 'gold' }}>
        {index < stars ? <StarIcon /> : <StarBorderIcon />}
      </Box>
    ));
  };

  return (
    <Box
      sx={{
        bgcolor: 'white',
        p: 3,
        borderRadius: 2,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
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
  );
};

const Testimonies = () => {
  const testimonials = [
    {
      username: "John Doe",
      stars: 5,
      testimonial: "Amazing product! The quality exceeded my expectations."
    },
    {
      username: "Jane Smith",
      stars: 4,
      testimonial: "Great service and fast delivery. Would recommend!"
    }
  ];

  return (
    <Box
      sx={{
        backgroundColor: 'red',
        p: 2,
        pb: 1,
      }}>
      <Box sx={{
        backgroundColor: 'white',
        padding: 2,
        borderRadius: 3,
      }}
      >
        <Stack spacing={3} sx={{ p: 4 }}>
          <Typography variant="h4" fontWeight="bold" textAlign="center" mb={3}>
            What Our Customers Say
          </Typography>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={3}
            sx={{ width: '100%' }}
          >
            {testimonials.map((item, index) => (
              <Testimonial
                key={index}
                username={item.username}
                stars={item.stars}
                testimonial={item.testimonial}
              />
            ))}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default Testimonies;