import { useState } from 'react'
import { Button, Typography } from '@mui/material'
import PopupHOC from './HOC/PopupHOC'

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
      <PopupHOC open={open} onClose={handleClose} title="Quick Guide" centerTitle>
        <Typography variant="h5">Guide</Typography>
      </PopupHOC>
    </>
  )
}

export default Guide
