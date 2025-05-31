import { useState, useEffect } from 'react'
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp'
import { IconButton } from '@mui/material'

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <IconButton
      onClick={scrollToTop}
      sx={{
        position: 'fixed',
        right: '10px',
        bottom: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: { xs: '40px', sm: '50px' },
        height: { xs: '40px', sm: '50px' },
        backgroundColor: 'rgba(255, 0, 0, 0.3)',
        border: '2px solid black',
        visibility: isVisible ? 'visible' : 'hidden',
        opacity: isVisible ? 1 : 0,
        transition: 'visibility 0.3s ease, opacity 0.3s ease',
        zIndex: 999,
        '&:hover': {
          backgroundColor: 'rgb(255, 2, 2)',
          color: 'white'
        },
      }}
    >
      <KeyboardDoubleArrowUpIcon fontSize="small" />
    </IconButton>
  )
}

export default ScrollToTop
