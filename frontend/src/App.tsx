
import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import Layout from './Layout'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import TextToImage from './pages/TextToImage'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux'
import store from '../redux/store'
import ProfilePage from './pages/ProfilePage'
import SuccessPage from './components/SuccessPage'
import CancelPage from './components/CancelPage'
import ProtectedRoute from './components/ProtectedRoute'

function App() {

  return (
    <>
      <Provider store={store}>
        <ToastContainer />
        <Routes>
          <Route path="" element={<Layout />} >
            <Route path="/" element={<HomePage />} />
            <Route path="/ProfilePage" element={<ProfilePage />} />
            <Route path="/AboutPage" element={<AboutPage />} />
            <Route path="/ContactPage" element={<ContactPage />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/SuccessPage" element={<SuccessPage />} />
            <Route path="/CancelPage" element={<CancelPage />} />

            <Route path="/TextToImage" element={
              <ProtectedRoute>
                <TextToImage />
              </ProtectedRoute>
            } />
            <Route path="/ProfilePage" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />
          </Route>
        </Routes>
      </Provider >
    </>
  )
}

export default App
