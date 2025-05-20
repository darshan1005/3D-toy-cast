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
  const [selectedDimensions, setSelectedDimensions] = useState<{ [key: number]: string }>({})

  // Load selected frame from sessionStorage on component mount
  useEffect(() => {
    const savedFrame = sessionStorage.getItem('selectedFrame')
    if (savedFrame && savedFrame !== 'null') {
      const parsedFrame = JSON.parse(savedFrame)
      setSelectedFrame(parsedFrame)
      // Initialize selected dimension for the frame
      if (parsedFrame && !selectedDimensions[parsedFrame.id]) {
        setSelectedDimensions(prev => ({
          ...prev,
          [parsedFrame.id]: parsedFrame.dimensions[0],
        }))
      }
    }
  }, [])

  // Listen for storage updates
  useEffect(() => {
    const handleStorageUpdate = () => {
      const savedFrame = sessionStorage.getItem('selectedFrame')
      if (savedFrame && savedFrame !== 'null') {
        const parsedFrame = JSON.parse(savedFrame)
        setSelectedFrame(parsedFrame)
        // Initialize selected dimension for the frame
        if (parsedFrame && !selectedDimensions[parsedFrame.id]) {
          setSelectedDimensions(prev => ({
            ...prev,
            [parsedFrame.id]: parsedFrame.dimensions[0],
          }))
        }
      } else {
        setSelectedFrame(null)
      }
    }

    window.addEventListener('storageUpdate', handleStorageUpdate)
    return () => {
      window.removeEventListener('storageUpdate', handleStorageUpdate)
    }
  }, [])

  const handleDimensionChange = (frameId: number, dimension: string) => {
    setSelectedDimensions(prev => ({
      ...prev,
      [frameId]: dimension,
    }))

    // Update session storage if this frame is selected
    if (selectedFrame?.id === frameId) {
      const updatedFrame = {
        ...selectedFrame,
        selectedDimension: dimension,
      }
      sessionStorage.setItem('selectedFrame', JSON.stringify(updatedFrame))
      setSelectedFrame(updatedFrame)
    }
  }

  const handleFrameSelect = (frame: FrameDetailsProps) => {
    setSelectedFrame(prevFrame => {
      // If the same frame is clicked again, unselect it
      if (prevFrame?.id === frame.id) {
        sessionStorage.removeItem('selectedFrame')
        return null
      }

      // Select the new frame with the selected dimension
      const frameWithDimension = {
        ...frame,
        selectedDimension: selectedDimensions[frame.id] || '20 X 30 cm',
      }
      sessionStorage.setItem('selectedFrame', JSON.stringify(frameWithDimension))
      return frameWithDimension
    })
  }

  const handleConfirm = () => {
    const availabilityType = sessionStorage.getItem('availabilityType')
    const nav = availabilityType === '3d' ? '/toyspage' : '/'
    navigate(nav, {
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
        label={sessionStorage.getItem('availabilityType') === '3d' ? 'Next' : 'Proceed'}
        showHome={false}
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
            selectedDimension={selectedDimensions[frame.id] || frame.dimensions[0]}
            onDimensionChange={(dimension: string) => handleDimensionChange(frame.id, dimension)}
          />
        ))}
      </Box>
    </Box>
  )
}

export default FramePage
