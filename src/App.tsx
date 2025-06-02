import React, { Suspense, useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
const MainPage = React.lazy(() => import('./pages/MainPage'))
const ToysPage = React.lazy(() => import('./pages/ToyPage'))
const FramePage = React.lazy(() => import('./pages/FramePage'))
const Guide = React.lazy(() => import('./components/custom/Guide'))
const GridImages = React.lazy(() => import('./pages/GalleryPage'))
import ScrollTop from './helpers/scrollTop'
import ScrollToTop from '@components/ScrollToTop'
import Loading from '@components/custom/Loading'

const App = () => {
  const [isDomReady, setIsDomReady] = useState(false);

  useEffect(() => {
    const handleReady = () => setIsDomReady(true);
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      handleReady();
    } else {
      document.addEventListener('DOMContentLoaded', handleReady);
    }

    return () => {
      document.removeEventListener('DOMContentLoaded', handleReady);
    }
  }, []);

  if (!isDomReady) {
    return (
      <Loading />
    )
  }
  return (
    <Router>
      <Guide />
      <ScrollToTop />
      <ScrollTop /> {/* trigger scroll to top on route change */}
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loading />}>
              <MainPage />
            </Suspense>
          }
        />
        <Route
          path="/gallery"
          element={
            <Suspense fallback={<Loading />}>
              <GridImages />
            </Suspense>
          }
        />
        <Route
          path="/toyspage"
          element={
            <Suspense fallback={<Loading />}>
              <ToysPage />
            </Suspense>
          }
        />
        <Route
          path="/framespage"
          element={
            <Suspense fallback={<Loading />}>
              <FramePage />
            </Suspense>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
