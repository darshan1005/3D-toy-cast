import { Box, useMediaQuery, useTheme } from '@mui/material'
import FrameCard from '@components/custom/FrameCard'
import { frameData, FrameDetailsProps } from '../data/FrameData'
import ConfirmComponent from '@components/custom/ConfirmComponent'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const FramePage = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const [selectedFrame, setSelectedFrame] = useState<FrameDetailsProps | null>(null)

  // Load selected frame from sessionStorage on component mount
  useEffect(() => {
    const savedFrame = sessionStorage.getItem('selectedFrame')
    if (savedFrame && savedFrame !== 'null') {
      setSelectedFrame(JSON.parse(savedFrame))
    }
  }, [])

  // Listen for storage updates
  useEffect(() => {
    const handleStorageUpdate = () => {
      const savedFrame = sessionStorage.getItem('selectedFrame')
      if (savedFrame && savedFrame !== 'null') {
        setSelectedFrame(JSON.parse(savedFrame))
      } else {
        setSelectedFrame(null)
      }
    }

    window.addEventListener('storageUpdate', handleStorageUpdate)
    return () => {
      window.removeEventListener('storageUpdate', handleStorageUpdate)
    }
  }, [])

  const handleFrameSelect = (frame: FrameDetailsProps) => {
    setSelectedFrame(prevFrame => {
      // If the same frame is clicked again, unselect it
      if (prevFrame?.id === frame.id) {
        sessionStorage.removeItem('selectedFrame')
        return null
      }

      // Select the new frame
      sessionStorage.setItem('selectedFrame', JSON.stringify(frame))
      return frame
    })
  }

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
      <ConfirmComponent
        onConfirm={handleConfirm}
        selectedFrame={selectedFrame}
        navigateTo="/toyspage"
        label={'Proceed To Order'}
      />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: isSmallScreen ? 'repeat(1, auto)' : 'repeat(2, auto)',
          gap: 2,
          margin: '0 auto',
          backgroundColor: 'white',
          padding: 2,
          borderRadius: 3,
        }}
      >
        {frameData.map(frame => (
          <FrameCard
            key={frame.id}
            frameDetails={frame}
            onSelect={() => handleFrameSelect(frame)}
            isSelected={selectedFrame?.id === frame.id}
          />
        ))}
      </Box>
    </Box>
  )
}

export default FramePage
