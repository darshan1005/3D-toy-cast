import { Box, Button, Input, Stack, Typography, IconButton } from "@mui/material";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TelegramIcon from '@mui/icons-material/Telegram';
import Logo from '../assets/Logo.svg';
import { useState } from 'react';

const FooterContent = 'Refund/Return Policy: We accept returns or offer replacements for products with manufacturing defects (e.g., torn or broken items) or if the wrong product was delivered. To process a claim, please provide a video and photo documentation of the unboxing process, from the beginning to the end. Email this documentation to the order confirmation email address.'

const Footer = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

  const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEmail(value);
    setEmailError(!validateEmail(value) && value.length > 0);
  };

  return (
    <Box sx={{ p: 2 }} id='footer'>
      <Box sx={{
        backgroundColor: 'white',
        padding: 2,
        borderRadius: 3,
      }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
          {/* Left Section */}
          <Stack
            spacing={2}
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
            <Typography variant="h3" fontWeight="bold" color="red" sx={{ fontSize: { xs: '1.8rem', md: '2.5rem' } }}>
              3D TOY CAST
            </Typography>
            <Typography variant="h5" fontWeight="bold" sx={{ textAlign: 'center', fontSize: { xs: '1rem', md: '1.5rem' } }}>
              We combine precision engineering with artistic design to deliver collector-grade products.
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
          <Stack spacing={4} flex={1}>
            {/* Contact Info */}
            <Stack spacing={2}>
              <Typography variant="h6" fontWeight="bold" sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>
                Contact Us
              </Typography>
              <Stack spacing={1}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                  <WhatsAppIcon color="success" />
                  <Typography sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>+91 99X XXX XX0</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                  <EmailIcon color="primary" />
                  <Typography sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>contact@3dtoycast.com</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                  <PhoneIcon color="secondary" />
                  <Typography sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>+1 9XX XXX XX1</Typography>
                </Box>
              </Stack>
            </Stack>

            {/* Social Media */}
            <Stack spacing={1}>
              <Typography variant="h6" fontWeight="bold" sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>
                Follow Us
              </Typography>
              <Stack direction="row" spacing={1} sx={{ justifyContent: 'flex-start' }}>
                <IconButton color="primary"><FacebookIcon /></IconButton>
                <IconButton sx={{ color: '#E1306C' }}><InstagramIcon /></IconButton>
                <IconButton color="error"><YouTubeIcon /></IconButton>
                <IconButton sx={{ color: '#0088cc' }}><TelegramIcon /></IconButton>
              </Stack>
            </Stack>

            {/* Newsletter */}
            <Stack spacing={2}>
              <Typography variant="h6" fontWeight="bold" sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>
                For Business
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.8rem', md: '1rem' } }}>
                Please send us the business mail below
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                <Input
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                  error={emailError}
                  sx={{
                    flex: 1,
                    '&:before': { borderColor: 'rgba(0, 0, 0, 0.23)' },
                    '& input': { color: emailError ? 'error.main' : 'inherit' },
                    fontSize: { xs: '0.8rem', md: '1rem' },
                  }}
                />
                <Button
                  variant="contained"
                  disabled={emailError || !email}

                  sx={{
                    width: 'max-content',
                    bgcolor: 'black',
                    '&:hover': { bgcolor: 'red' },
                    fontSize: { xs: '0.8rem', md: '1rem' },
                  }}
                >
                  SEND
                </Button>
              </Stack>
              {emailError && (
                <Typography variant="caption" color="error" sx={{ fontSize: { xs: '0.7rem', md: '0.9rem' } }}>
                  Please enter a valid email address
                </Typography>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default Footer;