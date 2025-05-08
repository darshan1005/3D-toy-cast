import { Box } from '@mui/material'
import React from 'react'
import Logo from '../assets/Logo.svg'
import BikeImage from '../assets/Bike.svg'
import CarImage from '../assets/Car.svg'

const MainPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden',
        border: '20px solid #FF0000 !important',
        boxSizing: 'border-box',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          height: '10%',
          padding: '0 16px',
        }}
      >
        {/* Wrapper for Icon and Text */}
        <Box
          sx={{
            display: 'flex', // Align items horizontally
            alignItems: 'center', // Vertically center items
            height: '40px', // Ensure the height matches the icon and text
          }}
        >
          {/* Icon */}
          <Box
            sx={{
              width: '40px',
              height: '40px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img src={Logo} alt="Logo" style={{ width: '40px', height: '40px' }} />
          </Box>

          {/* Text */}
          <Box
            sx={{
              height: '40px', // Match the height of the icon
              display: 'flex',
              alignItems: 'center', // Vertically center the text
              color: 'white',
              fontSize: '24px',
              fontWeight: 'bold',
              backgroundColor: '#FF0000',
              padding: '0 16px',
              marginLeft: '12px',
              boxSizing: 'border-box',
              overflow: 'hidden',
            }}
          >
            3D Toy Cast
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          flex: 1,
          backgroundColor: '#f0f0f0',
        }}
      >
        <Box
          sx={{
            position: 'relative', // Enable positioning for the bike image
            background: 'linear-gradient(to bottom, black, white)', // Gradient background
            width: '20%',
            height: '100%', // Ensure it fills the parent container
            overflow: 'visible', // Allow the bike image to overflow the frame
          }}
        >
          <Box
            component="img"
            src={BikeImage} // Replace with the actual path to your bike image
            alt="Bike"
            sx={{
              position: 'absolute',
              bottom: '-150px', // Adjust to position the bike at the bottom
              right: '-100px', // Adjust to make the bike overlap Frame 2
              width: '350px', // Adjust the size of the bike image
              zIndex: 2, // Ensure the bike is above other elements
            }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column', // Align items vertically
            backgroundColor: '#ffffff',
            width: '60%',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '150px',
            paddingLeft: '50px',
            textAlign: 'center', // Center-align text
          }}
        >
          {/* Main Heading */}
          <Box
            sx={{
              fontSize: '150px',
              fontWeight: 'bold',
            }}
          >
            3D Models & Collectibles
          </Box>

          {/* Subheading */}
          <Box
            sx={{
              fontSize: '24px',
              fontWeight: 'normal',
              marginTop: '16px', // Add spacing between the heading and subheading
              height: '150px', // Ensure the height matches the icon and text
            }}
          >
            Transform your collection with our high-resolution 3D diecast toys and detailed model
            frames.
          </Box>

          {/* Button */}
          <Box
            component="button"
            sx={{
              marginTop: '32px', // Add spacing between the subheading and button
              padding: '12px 24px',
              height: '80px',
              backgroundColor: 'black',
              color: 'white',
              fontSize: '24px',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '4px',
              marginBottom: '20px',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: '#333333', // Slightly lighter black on hover
              },
            }}
          >
            Order Now !
          </Box>
        </Box>
        <Box
          sx={{
            position: 'relative', // Enable positioning for the bike image
            background: 'linear-gradient(to bottom, #FF0000, white)', // Gradient background
            width: '20%',
            height: '100%', // Ensure it fills the parent container
            overflow: 'visible', // Allow the bike image to overflow the frame
          }}
        >
          <Box
            component="img"
            src={CarImage} // Replace with the actual path to your bike image
            alt="Car"
            sx={{
              position: 'absolute',
              bottom: '-90px', // Adjust to position the bike at the bottom
              left: '-200px', // Adjust to make the bike overlap Frame 2
              width: '500px', // Adjust the size of the bike image
              zIndex: 2, // Ensure the bike is above other elements
            }}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default MainPage
