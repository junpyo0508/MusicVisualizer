import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MusicVisualizer from './visual'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MusicVisualizer />
  </StrictMode>,
)
