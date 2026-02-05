import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPage from './components/LandingPage'
import AboutPage from './components/AboutPage'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import RegisterPage from './components/RegisterPage'
import Login from './components/Login'
import DashboardLayout from './Dashboard/DashboardLayout'
import { Toaster } from 'react-hot-toast'
function App() {
  return (
    <BrowserRouter>
    <NavBar />
    <Toaster position="top-center" reverseOrder={false} />
    <Routes>
      <Route path='/' element = {<LandingPage />} />
      <Route path='/about' element = {<AboutPage />} />
      <Route path='/register' element = {<RegisterPage />} />
      <Route path='/login' element = {<Login />} />
      <Route path='/dashboard/*' element = {<DashboardLayout />} />
    </Routes>
    <Footer />
    </BrowserRouter>
  )
}

export default App
