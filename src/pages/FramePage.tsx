import { Box } from '@mui/material'
import FrameCard from '@components/custom/FrameCard'
import { frameCardData } from '../data/FrameData'

const FramePage = () => {
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
    </Box>
  )
}

export default FramePage
