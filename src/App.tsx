import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage'
import ScrollToTop from '@components/ScrollToTop'
import ToysPage from './pages/ToyPage'
import FramePage from './pages/FramePage'
import ScrollTop from './helpers/scrollTop'
import Guide from './components/custom/Guide'
import GridImages from './pages/GalleryPage'

const App = () => {
  return (
    <Router>
      <Guide />
      <ScrollToTop />
      <ScrollTop /> {/* trigger scroll to top on route change */}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path='/gallery' element={<GridImages />} />
        <Route path="/toyspage" element={<ToysPage />} />
        <Route path="/framespage" element={<FramePage />} />
      </Routes>
    </Router>
  )
}

export default App
