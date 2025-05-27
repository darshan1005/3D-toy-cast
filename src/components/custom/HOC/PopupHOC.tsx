import React from 'react'
import { Box, IconButton, Modal, Paper, Typography, useTheme } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

interface CustomPopupProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  width?: number | string
  height?: number | string
  centerTitle?: boolean
}

const PopupHOC: React.FC<CustomPopupProps> = ({
  open,
  onClose,
  children,
  title = '',
  width = 400,
  height = 'auto',
  centerTitle = false,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          p: 2,
        }}
      >
        <Paper
          sx={{
            position: 'relative',
            p: 3,
            bgcolor: 'background.paper',
            width,
            height,
            maxHeight: '90vh',
            overflowY: 'auto',
            borderRadius: 2,
            boxShadow: 6,
          }}
        >
          <IconButton
            sx={{
              position: 'absolute',
              top: 8,
              left: 8,
              bgcolor: 'grey.200',
            }}
            onClick={onClose}
            aria-label="Close"
            size="small"
          >
            <CloseIcon />
          </IconButton>

          {title && (
            <Typography
              variant="h6"
              fontWeight="bold"
              textAlign={centerTitle ? 'center' : 'left'}
              sx={{ mb: 2 }}
            >
              {title}
            </Typography>
          )}

          {children}
        </Paper>
      </Box>
    </Modal>
  )
}

export default PopupHOC
