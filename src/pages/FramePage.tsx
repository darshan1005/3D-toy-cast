import { Box } from '@mui/material'
import FrameCard from '@components/custom/FrameCard'
import { frameCardData, FrameDetailsProps } from '../data/FrameData'
import ConfirmComponent from '@components/custom/ConfirmComponent'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const FramePage = () => {
  const navigate = useNavigate()
  const [selectedFrame, setSelectedFrame] = useState<FrameDetailsProps | null>(null)

  // Load selected frame from sessionStorage on component mount
  useEffect(() => {
    const savedFrame = sessionStorage.getItem('selectedFrame')
    if (savedFrame && savedFrame !== 'null') {
      setSelectedFrame(JSON.parse(savedFrame))
    }
  }, [])

  const handleFrameSelect = (frame: FrameDetailsProps) => {
    setSelectedFrame(prevFrame => {
      // If the same frame is clicked again, unselect it
      if (prevFrame?.id === frame.id) {
        sessionStorage.removeItem('selectedFrame')
        console.log('Frame unselected, removed from sessionStorage')
        return null
      }

      // Select the new frame
      sessionStorage.setItem('selectedFrame', JSON.stringify(frame))
      console.log('Selected frame in sessionStorage:', frame)
      return frame
    })
  }

  const handleConfirm = () => {
    if (!selectedFrame) {
      sessionStorage.removeItem('selectedFrame')
    }
    console.log('Selected frame:', selectedFrame)
    console.log('SessionStorage data:', {
      selectedToys: sessionStorage.getItem('selectedToys'),
      selectedFrame: sessionStorage.getItem('selectedFrame'),
    })

    // Navigate to home page after confirming
    navigate('/')
  }

  return (
    <Box
      sx={{
        backgroundColor: 'red',
        p: 2,
      }}
    >
      <Box
        sx={{
          backgroundColor: 'white',
          padding: 2,
          borderRadius: 3,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <ConfirmComponent onConfirm={handleConfirm} selectedFrame={selectedFrame} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            maxWidth: 1280,
            margin: '0 auto',
          }}
        >
          {frameCardData.map(frame => (
            <FrameCard
              key={frame.id}
              frameDetails={frame}
              onSelect={() => handleFrameSelect(frame)}
              isSelected={selectedFrame?.id === frame.id}
            />
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default FramePage
