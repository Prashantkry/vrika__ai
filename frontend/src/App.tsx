
import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import Layout from './Layout'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import TextToImage from './pages/TextToImage'

function App() {

  return (
    <>
      <Routes>
        <Route path="" element={<Layout />} >
          <Route path="/" element={<HomePage />} />
          <Route path="/AboutPage" element={<AboutPage />} />
          <Route path="/ContactPage" element={<ContactPage />} />

          <Route path="/TextToImage" element={<TextToImage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
