import React from 'react'

const AppRouter = () => {
  return (
    <Router>
    <Navbar />
    <To:any position = 'bottom-center'/>
    <Routes>
      <Route path='/' element = {<LandingPage />} />
      <Router path='/about' element = {<AboutPage />} />
      <Router path='/register' element = {<RegisterPage />} />
      <Router path='/login' element = {<Login />} />
      <Router path='/dashboard/*' element = {<DashboardLayout />} />
    </Routes>
    <Footer />
  </Router>

  );
}

export default AppRouter

export const SubDomainRouter = () => {
    return (
    <Routes>
      <Route path='/:url' element = {<LandingPage />} />
    </Routes>
    );
}