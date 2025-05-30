import { Box, useMediaQuery, useTheme } from '@mui/material'
import FrameCard from '@components/custom/FrameCard'
import ConfirmComponent from '@components/custom/NavHeader'
import { useState, useEffect, useMemo, use } from 'react'
import { useNavigate } from 'react-router-dom'
import { getFramePrice } from '../utils/pricing'
import frameJsonData from '../content/FrameData.json'
import { FrameDetailsProps, DimensionPrice } from 'src/types/types'
import { getOrderType } from '@utils/session'
import { getFrameItem, removeFrameItem, setFrameItem } from '../DB/FrameStore'
import { memCache } from '../Cache/instance'

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

  const FRAME_CACHE_KEY = 'frameData'

  const getCachedFrameData = () => {
    let data = memCache.get<FrameDetailsProps[]>(FRAME_CACHE_KEY)
    if (data) return data

    data = frameJsonData.frames.map((frame: any) => ({
      ...frame,
      dimensionPrice: frame.dimensionPrice.map((d: any) => ({
        ...d,
        preview: Array.isArray(d.preview) ? d.preview : [],
      })) as DimensionPrice[],
    })) as FrameDetailsProps[]
    memCache.set(FRAME_CACHE_KEY, data)
    return data
  }

  const frameDataJSON = getCachedFrameData()

  // Load selected frame from IndexDB on component mount
  useEffect(() => {
    const fetchFrame = async () => {
      const savedFrame = await getFrameItem('selectedFrame')
      if (savedFrame && savedFrame !== 'null') {
        const parsedFrame = JSON.parse(typeof savedFrame === 'string' ? savedFrame : 'null')
        const framePrice = getFramePrice(parsedFrame.type, parsedFrame.selectedDimension)
        setSelectedFrame({
          id: parsedFrame.id,
          type: parsedFrame.type,
          price: framePrice,
        })
        // Restore the selected dimension for the frame!
        if (parsedFrame.selectedDimension) {
          setSelectedFrameDimensions(prev => ({
            ...prev,
            [parsedFrame.type]: parsedFrame.selectedDimension,
          }))
        } else {
          // fallback to default if not present
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
    }
    fetchFrame()
  }, [])

  // Listen for storage updates
  useEffect(() => {
    const handleStorageUpdate = async () => {
      const savedFrame = await getFrameItem('selectedFrame')
      if (savedFrame && savedFrame !== 'null') {
        const parsedFrame = JSON.parse(typeof savedFrame === 'string' ? savedFrame : 'null')
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
      setFrameItem('selectedFrame', JSON.stringify(updatedFrame))
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
        removeFrameItem('selectedFrame')
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
      setFrameItem('selectedFrame', JSON.stringify(frameWithDimension))
      return {
        id: frame.id,
        type: frame.type,
        price: framePrice,
      }
    })
  }

  const handleConfirm = () => {
    const availabilityType = getOrderType()
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
        label={getOrderType() === '3d' ? 'Next' : 'Proceed'}
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
            previewTitle={`Preview for ${frame.type} ${frame.dimensionPrice[0]?.size}`}
          />
        ))}
      </Box>
    </Box>
  )
}

export default FramePage
