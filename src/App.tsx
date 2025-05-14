import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage'
import ScrollToTop from '@components/ScrollToTop'
import ToysPage from './pages/ToyPage'
import { carToyData } from './data/ToyData'
import FramePage from './pages/FramePage'

const App = () => {
  console.log('App component rendered')
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="toyspage" element={<ToysPage toys={carToyData} />} />
        <Route path="framespage" element={<FramePage />} />
      </Routes>
    </Router>
  )
}

export default App
