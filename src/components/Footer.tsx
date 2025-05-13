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
    <Box sx={{ backgroundColor: 'red', p: 2, pb: 1 }}>
      <Box sx={{
        backgroundColor: 'white',
        padding: 4,
        borderRadius: 3,
      }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} >
          {/* Left Section */}
          <Stack
            spacing={2}
            sx={{
              bgcolor: 'black',
              color: 'white',
              p: 3,
              borderRadius: 2,
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h3" fontWeight="bold" color="red">3D TOY CAST</Typography>
            <Typography variant="h5" fontWeight="bold" sx={{ textAlign: 'center' }}>
              We combine precision engineering with artistic design to deliver collector-grade products.
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.6 }}>
              © 2025 3D Toy Cast
            </Typography>
            <Typography
              variant="body2"
              sx={{
                opacity: 0.7,
                fontSize: '0.9rem',
                textAlign: 'center',
                transition: 'opacity 0.2s ease',
                '&:hover': {
                  opacity: 1
                }
              }}
            >
              {FooterContent}
            </Typography>
          </Stack>
          {/* Right Section */}
          <Stack spacing={4}>
            {/* Contact Info */}
            <Stack spacing={2}>
              <Typography variant="h6" fontWeight="bold">Contact Us</Typography>
              <Stack spacing={1}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <WhatsAppIcon color="success" />
                  <Typography>+1 99X XXX XX0</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <EmailIcon color="primary" />
                  <Typography>contact@3dtoycast.com</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PhoneIcon color="secondary" />
                  <Typography>+1 9XX XXX XX1</Typography>
                </Box>
              </Stack>
            </Stack>
          </Stack>
          {/* Social Media */}
          <Stack>
            <Stack spacing={1}>
              <Typography variant="h6" fontWeight="bold">Follow Us</Typography>
              <Stack direction="row" spacing={1}>
                <IconButton color="primary"><FacebookIcon /></IconButton>
                <IconButton sx={{ color: '#E1306C' }}><InstagramIcon /></IconButton>
                <IconButton color="error"><YouTubeIcon /></IconButton>
                <IconButton sx={{ color: '#0088cc' }}><TelegramIcon /></IconButton>
              </Stack>
            </Stack>
            {/* Newsletter */}
            <Stack spacing={2}>
              <Typography variant="h6" fontWeight="bold">
                For Business
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Please send us the business mail below
              </Typography>
              <Stack direction="row" spacing={1}>
                <Input
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                  error={emailError}
                  sx={{
                    '&:before': { borderColor: 'rgba(0, 0, 0, 0.23)' },
                    '& input': { color: emailError ? 'error.main' : 'inherit' }
                  }}
                />
                <Button
                  variant="contained"
                  disabled={emailError || !email}
                  sx={{
                    bgcolor: 'black',
                    '&:hover': { bgcolor: 'red' }
                  }}
                >
                  SEND
                </Button>
              </Stack>
              {emailError && (
                <Typography variant="caption" color="error">
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