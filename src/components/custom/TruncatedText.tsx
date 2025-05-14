import { useState } from 'react'
import { Box, Typography, useTheme } from '@mui/material'

interface TruncatedTextProps {
  text: string
  textAlign?: 'left' | 'center' | 'right'
  truncatedValue?: number
}

const TruncatedText: React.FC<TruncatedTextProps> = ({
  text,
  textAlign = 'left',
  truncatedValue = 100,
}) => {
  const theme = useTheme()
  const [showFullText, setShowFullText] = useState(false)

  const handleToggleText = () => {
    setShowFullText(prev => !prev)
  }

  const isTextLong = text.length > truncatedValue

  return (
    <Typography
      variant="body1"
      sx={{
        textAlign: {
          xs: textAlign === 'left' ? 'left' : 'center',
          md: textAlign !== 'left' ? 'left' : undefined,
        },
        fontSize: {
          xs: '0.9rem',
          md: '1rem',
        },
      }}
    >
      {isTextLong ? (
        <>
          {showFullText ? text : `${text.substring(0, truncatedValue)}...`}
          <Box
            component="span"
            onClick={handleToggleText}
            sx={{
              color: theme.palette.primary.main,
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1rem',
              marginLeft: '0.5rem',
            }}
          >
            {showFullText ? 'Read less' : 'Read more'}
          </Box>
        </>
      ) : (
        text
      )}
    </Typography>
  )
}
export default TruncatedText
