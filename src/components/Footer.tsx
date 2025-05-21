import { Box, Button, Input, Stack, Typography, IconButton } from '@mui/material'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import YouTubeIcon from '@mui/icons-material/YouTube'
import TelegramIcon from '@mui/icons-material/Telegram'

const FooterContent =
  'Refund/Return Policy: We accept returns or offer replacements for products with manufacturing defects (e.g., torn or broken items) or if the wrong product was delivered. To process a claim, please provide a video and photo documentation of the unboxing process, from the beginning to the end. Email this documentation to the order confirmation email address.'

const Footer = () => {
  return (
    <Box id="footer">
      <Box
        sx={{
          backgroundColor: 'white',
          padding: 2,
          borderRadius: 3,
        }}
      >
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
          {/* Left Section */}
          <Stack
            spacing={1}
            sx={{
              bgcolor: 'black',
              color: 'white',
              p: { xs: 2, md: 3 },
              borderRadius: 2,
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            <Typography
              variant="h3"
              fontWeight="bold"
              color="red"
              sx={{ fontSize: { xs: '1.8rem', md: '2.5rem' } }}
            >
              3D TOY CAST
            </Typography>
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{ textAlign: 'center', fontSize: { xs: '1rem', md: '1.5rem' } }}
            >
              We combine precision engineering with artistic design to deliver collector-grade
              products.
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.6 }}>
              © 2025 3D Toy Cast
            </Typography>
            <Typography
              variant="body2"
              sx={{
                opacity: 0.7,
                fontSize: { xs: '0.8rem', md: '0.9rem' },
                textAlign: 'center',
                transition: 'opacity 0.2s ease',
                '&:hover': {
                  opacity: 1,
                },
              }}
            >
              {FooterContent}
            </Typography>
          </Stack>

          {/* Right Section */}
          <Stack spacing={2} flex={1}>
            {/* Contact Info */}
            <Stack spacing={2}>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}
              >
                Contact Us
              </Typography>
              <Stack spacing={1}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                  <WhatsAppIcon color="success" />
                  <Typography sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>
                    +91 99X XXX XX0
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                  <EmailIcon color="primary" />
                  <Typography sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>
                    <a className="contact" href="mailto:contact@3dtoycast.com">
                      contact@3dtoycast.com
                    </a>
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                  <PhoneIcon color="secondary" />
                  <Typography sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>
                    <a href="tel:99XXXXXX0" className="contact">
                      +91 99X XXX XX0
                    </a>
                  </Typography>
                </Box>
              </Stack>
            </Stack>

            {/* Social Media */}
            <Stack spacing={1}>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}
              >
                Follow Us
              </Typography>
              <Stack direction="row" spacing={1} sx={{ justifyContent: 'flex-start' }}>
                <IconButton color="primary">
                  <FacebookIcon />
                </IconButton>
                <IconButton sx={{ color: '#E1306C' }}>
                  <InstagramIcon />
                </IconButton>
                <IconButton color="error">
                  <YouTubeIcon />
                </IconButton>
                <IconButton sx={{ color: '#0088cc' }}>
                  <TelegramIcon />
                </IconButton>
              </Stack>
            </Stack>

            <Stack spacing={1}>
              <Typography variant="h6" fontWeight="bold" sx={{ fontSize: { xs: '1rem' } }}>
                For Business
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: { xs: '0.8rem', md: '1rem' } }}
              >
                Please send us the business mail to{' '}
                <mark style={{ fontWeight: 'bold' }}>contact@3dtoycast.com / +91 99X XXX XX0</mark>
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Box>
  )
}

export default Footer
