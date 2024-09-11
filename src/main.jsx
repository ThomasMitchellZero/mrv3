import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

//      <App />

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <div>Fartrell Cluggins</div>
    </BrowserRouter>
  </StrictMode>
)
