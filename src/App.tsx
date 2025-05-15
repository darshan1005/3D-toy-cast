import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage'
import ScrollToTop from '@components/ScrollToTop'
import ToysPage from './pages/ToyPage'
import FramePage from './pages/FramePage'
import ScrollTop from './helpers/scrollTop'

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <ScrollTop /> {/* trigger scroll to top on route change */}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="toyspage" element={<ToysPage />} />
        <Route path="framespage" element={<FramePage />} />
      </Routes>
    </Router>
  )
}

export default App
