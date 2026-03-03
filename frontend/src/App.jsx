import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import './App.css'
function App() {

  const CurrentApp = getApps();

  return (
    <Router>
      <CurrentApp />
    </Router>
  )
}

export default App
