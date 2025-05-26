import { Box, useMediaQuery, useTheme } from '@mui/material'
import FrameCard from '@components/custom/FrameCard'
import ConfirmComponent from '@components/custom/NavHeader'
import { useState, useEffect, useMemo, use } from 'react'
import { useNavigate } from 'react-router-dom'
import { getFramePrice } from '../utils/pricing'
import frameJsonData from '../content/FrameData.json'
import { FrameDetailsProps } from 'src/types/types'

interface SelectedFrame {
  id: number
  type: string
  price: number
}

const FramePage = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const [selectedFrame, setSelectedFrame] = useState<SelectedFrame | null>(null)
  const [selectedFrameDimensions, setSelectedFrameDimensions] = useState<{ [key: string]: string }>(
    {},
  )

  const frameDataJSON = useMemo(() => {
    return frameJsonData.frames.map((frame: FrameDetailsProps) => ({
      ...frame,
    }))
  }, [frameJsonData.frames])

  // Load selected frame from sessionStorage on component mount
  useEffect(() => {
    const savedFrame = sessionStorage.getItem('selectedFrame')
    if (savedFrame && savedFrame !== 'null') {
      const parsedFrame = JSON.parse(savedFrame)
      const framePrice = getFramePrice(parsedFrame.type, parsedFrame.selectedDimension)
      setSelectedFrame({
        id: parsedFrame.id,
        type: parsedFrame.type,
        price: framePrice,
      })
      // Initialize selected dimension for the frame
      if (parsedFrame && !selectedFrameDimensions[parsedFrame.type]) {
        const frameDetails = frameDataJSON.find(f => f.type === parsedFrame.type)
        const defaultDimension = frameDetails?.dimensionPrice[0]?.size
        if (defaultDimension) {
          setSelectedFrameDimensions(prev => ({
            ...prev,
            [parsedFrame.type]: defaultDimension,
          }))
        }
      }
    }
  }, [])

  // Listen for storage updates
  useEffect(() => {
    const handleStorageUpdate = () => {
      const savedFrame = sessionStorage.getItem('selectedFrame')
      if (savedFrame && savedFrame !== 'null') {
        const parsedFrame = JSON.parse(savedFrame)
        const framePrice = getFramePrice(parsedFrame.type, parsedFrame.selectedDimension)
        setSelectedFrame({
          id: parsedFrame.id,
          type: parsedFrame.type,
          price: framePrice,
        })
        // Initialize selected dimension for the frame
        if (parsedFrame && !selectedFrameDimensions[parsedFrame.type]) {
          const frameDetails = frameDataJSON.find(f => f.type === parsedFrame.type)
          const defaultDimension = frameDetails?.dimensionPrice[0]?.size
          if (defaultDimension) {
            setSelectedFrameDimensions(prev => ({
              ...prev,
              [parsedFrame.type]: defaultDimension,
            }))
          }
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

  const handleFrameDimensionChange = (frameType: string, dimension: string) => {
    setSelectedFrameDimensions(prev => ({
      ...prev,
      [frameType]: dimension,
    }))

    // Update session storage if this frame is selected
    if (selectedFrame?.type === frameType) {
      const framePrice = getFramePrice(frameType, dimension)
      const updatedFrame = {
        ...selectedFrame,
        selectedDimension: dimension,
        price: framePrice,
      }
      sessionStorage.setItem('selectedFrame', JSON.stringify(updatedFrame))
      setSelectedFrame({
        id: selectedFrame.id,
        type: frameType,
        price: framePrice,
      })
    }
  }

  const handleFrameSelect = (frame: FrameDetailsProps) => {
    setSelectedFrame(prevFrame => {
      // If the same frame is clicked again, unselect it
      if (prevFrame?.type === frame.type) {
        sessionStorage.removeItem('selectedFrame')
        return null
      }

      // Select the new frame with the selected dimension
      const defaultDimension = frame.dimensionPrice[0]?.size
      const selectedDimension = selectedFrameDimensions[frame.type] || defaultDimension
      // Always use getFramePrice for the selling price
      const framePrice = getFramePrice(frame.type, selectedDimension)

      const frameWithDimension = {
        ...frame,
        selectedDimension,
        price: framePrice,
      }
      sessionStorage.setItem('selectedFrame', JSON.stringify(frameWithDimension))
      return {
        id: frame.id,
        type: frame.type,
        price: framePrice,
      }
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
        {frameDataJSON.map(frame => (
          <FrameCard
            key={frame.type}
            frameDetails={{
              ...frame,
              dimensionPrices: frame.dimensionPrice,
            }}
            onSelect={() => handleFrameSelect(frame)}
            isSelected={selectedFrame?.type === frame.type}
            selectedDimension={selectedFrameDimensions[frame.type] || frame.dimensionPrice[0]?.size}
            onDimensionChange={(dimension: string) =>
              handleFrameDimensionChange(frame.type, dimension)
            }
          />
        ))}
      </Box>
    </Box>
  )
}

export default FramePage
