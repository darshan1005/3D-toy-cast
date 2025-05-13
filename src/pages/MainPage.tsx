import Bento from '@components/Bento'
import Hero from '@components/Hero'
import Selection from '@components/Selection'
import Testimonies from '@components/Testimonies'
import { Box } from '@mui/material'
import React from 'react'

const MainPage = () => {
  return (
    <Box>
      <Hero />
      <Bento />
      <Selection />
      <Testimonies />
    </Box>
  )
}

export default MainPage
