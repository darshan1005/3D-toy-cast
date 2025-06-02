import React, { useState } from 'react'
import { Button, Stack } from '@mui/material'
import PopupHOC from './HOC/PopupHOC'
import LazyImage from './LazyImage'
import Image1 from '../../assets/GuideImages/image (1).png'
import Image2 from '../../assets/GuideImages/image (2).png'
import Image3 from '../../assets/GuideImages/image (3).png'
import Image4 from '../../assets/GuideImages/image (4).png'
import Image5 from '../../assets/GuideImages/image (5).png'
import Image6 from '../../assets/GuideImages/image (6).png'
import Image7 from '../../assets/GuideImages/image (7).png'
import Image8 from '../../assets/GuideImages/image (8).png'
import Image9 from '../../assets/GuideImages/image (9).png'
import Image10 from '../../assets/GuideImages/image (10).png'
import Image11 from '../../assets/GuideImages/image (11).png'

const GuidImgArray = [
  {
    id: 1,
    src: Image1
  },
  {
    id: 2,
    src: Image2
  },
  {
    id: 3,
    src: Image3
  },
  {
    id: 4,
    src: Image4
  },
  {
    id: 5,
    src: Image5
  },
  {
    id: 6,
    src: Image6
  },
  {
    id: 7,
    src: Image7
  },
  {
    id: 8,
    src: Image8
  },
  {
    id: 9,
    src: Image9
  },
  {
    id: 10,
    src: Image10
  },
  {
    id: 11,
    src: Image11
  }
]

const Guide = () => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      {/* Sticky Enquiry Button */}
      <Button
        onClick={handleOpen}
        variant="contained"
        size="small"
        sx={{
          bgcolor: '#333',
          position: 'fixed',
          top: '50%',
          right: 15,
          zIndex: 1000,
          width: 'max-content',
          height: 40,
          transform: 'rotate(-90deg)',
          transformOrigin: 'right center',
          borderRadius: '8px 8px 0 0',
        }}
      >
        Quick Guide
      </Button>
      <PopupHOC open={open} width={'80%'} onClose={handleClose} title="Quick Guide" centerTitle>
        <Stack spacing={2}>
          {GuidImgArray.map((i) => (
            <React.Fragment key={i.id}>
              <LazyImage src={i.src} />
            </React.Fragment>
          ))}
        </Stack>
      </PopupHOC>
    </>
  )
}

export default Guide
