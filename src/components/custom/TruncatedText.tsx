import { Typography, Box, useTheme } from '@mui/material'
import { useState } from 'react'

interface TruncatedTextProps {
  text: string
  textAlign?: 'left' | 'center'
  truncatedValue?: number
}

const TruncatedText = ({ text, textAlign = 'left', truncatedValue = 100 }: TruncatedTextProps) => {
  const theme = useTheme()
  const [showFullText, setShowFullText] = useState(false)

  const handleToggleText = () => {
    setShowFullText(prev => !prev)
  }

  const isTextLong = text.length > truncatedValue

  return (
    <Typography
      variant="body2"
      sx={{
        textAlign: {
          xs: textAlign === 'left' ? 'left' : 'center',
          md: textAlign !== 'left' ? 'left' : '',
        },
        fontSize: {
          xs: '0.9rem',
          md: '1rem',
        },
        lineHeight: 1.5,
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
              fontSize: '0.9rem',
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
