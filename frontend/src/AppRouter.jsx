import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/NavBar";
import ShortenUrlPage from "./components/ShortenUrlPage";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import AboutPage from "./components/AboutPage";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import DashboardLayout from "./components/Dashboard/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "./components/ErrorPage";

const AppRouter = () => {
  const location = useLocation();
  const hideHeaderFooter = location.pathname.startsWith("/s");

    return (
        <div className="flex min-h-screen bg-surface">
          {!hideHeaderFooter && <Navbar /> }
          
          <main className={`flex-1 flex flex-col ${!hideHeaderFooter ? 'pl-20' : ''}`}>
            <Toaster 
              position='bottom-center'
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#1A1A1A',
                  color: '#E0E0E0',
                  border: '1px solid #444',
                  borderRadius: '4px',
                  padding: '12px 16px',
                  fontFamily: 'Cabin, sans-serif',
                  fontSize: '14px',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                },
                success: {
                  iconTheme: {
                    primary: '#DFFF00',
                    secondary: '#000000',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#F87171',
                    secondary: '#000000',
                  },
                },
              }}
            />
            
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/s/:url" element={<ShortenUrlPage />} />

                <Route path="/register" element={<PrivateRoute publicPage={true}><RegisterPage /></PrivateRoute>} />
                <Route path="/login" element={<PrivateRoute publicPage={true}><LoginPage /></PrivateRoute>} />
                
                <Route path="/dashboard" element={ <PrivateRoute publicPage={false}><DashboardLayout /></PrivateRoute>} />
                <Route path="/error" element={ <ErrorPage />} />
                <Route path="*" element={ <ErrorPage message="We can't seem to find the page you're looking for"/>} />
              </Routes>
            </div>

            {!hideHeaderFooter && <Footer />}
          </main>
        </div>
    );
}


export default AppRouter;

export const SubDomainRouter = () => {
    return (
        <Routes>
          <Route path="/:url" element={<ShortenUrlPage />} />
        </Routes>
    )
}