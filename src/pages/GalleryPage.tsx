import { ImageGallery } from 'react-image-grid-gallery'
import { Box, Divider, Typography, useMediaQuery, useTheme } from '@mui/material'
import galleryJsonData from '../content/GalleryData.json'
import NavHeader from '@components/custom/NavHeader'
import { useNavigate } from 'react-router-dom'

const GridImages = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const handleConfirm = () => {
    navigate('/', {
      state: { scrollToSelection: true },
    })
  }
  return (
    <Box
      sx={{
        backgroundColor: 'red',
        p: 2,
      }}
    >
      <NavHeader showHome={false} showCart={false} label={'Order Now'} onConfirm={handleConfirm} />
      <Box
        sx={{
          backgroundColor: 'white',
          padding: 2,
          borderRadius: 3,
        }}
      >
        <Typography
          variant={isSmallScreen ? 'h5' : 'h4'}
          textAlign={'center'}
          fontWeight={'bold'}
          mb={2}
        >
          Gallery
        </Typography>
        {galleryJsonData.gallery.length === 0 ? (
          <>
            <Divider sx={{ mb: 2 }} />
            <Typography
              textAlign={'center'}
              fontWeight={'bold'}
              variant={isSmallScreen ? 'h5' : 'h4'}
              color="#3336"
            >
              No Images
            </Typography>
          </>
        ) : (
          <ImageGallery
            imagesInfoArray={galleryJsonData.gallery.map(img => ({
              ...img,
              src: img.image,
            }))}
            columnWidth={isSmallScreen ? '100%' : 230}
            gapSize={14}
            lazy
            lazyFromIndex={galleryJsonData.gallery[0].id}
          />
        )}
      </Box>
    </Box>
  )
}

export default GridImages
