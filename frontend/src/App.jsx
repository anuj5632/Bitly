import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { getApps } from './utils/helper';

function App() {

  const CurrentApp = getApps();

  return (
    <BrowserRouter>
      <CurrentApp />
    </BrowserRouter>
  )
}

export default App
