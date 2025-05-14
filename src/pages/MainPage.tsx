import Bento from '@components/Bento'
import Footer from '@components/Footer'
import Hero from '@components/Hero'
import Selection from '@components/Selection'
import Testimonies from '@components/Testimonies'
import { Box } from '@mui/material'

const MainPage = () => {
  return (
    <Box>
      <Hero />
      <Bento />
      <Selection />
      <Testimonies />
      <Footer />
    </Box>
  )
}

export default MainPage
