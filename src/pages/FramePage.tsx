import React from 'react'
import { Box } from '@mui/material'
import FrameCard from '@components/custom/FrameCard'
import { frameCardData } from '../data/FrameData'

interface FramePageProps {
  headline?: string
}

const FramePage: React.FC<FramePageProps> = () => {
  return (
    <Box sx={{ p: 4, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          maxWidth: 1200,
          margin: '0 auto',
        }}
      >
        {frameCardData.map(frame => (
          <FrameCard
            key={frame.type}
            frameDetails={frame}
            onSelect={() => console.log(`Selected frame: ${frame.type}`)}
          />
        ))}
      </Box>
    </Box>
  )
}

export default FramePage
