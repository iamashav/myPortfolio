import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/anton/400.css'
import '@fontsource/instrument-serif/400.css'
import '@fontsource/instrument-serif/400-italic.css'
import '@fontsource/jetbrains-mono/400.css'
import '@fontsource/jetbrains-mono/700.css'
import 'lenis/dist/lenis.css'
import './styles/global.scss'
import App from './App.tsx'

const revealFonts = () => document.documentElement.classList.add('fonts-ready')
if ('fonts' in document) {
  Promise.all([
    document.fonts.load('1em "Anton"'),
    document.fonts.load('1em "Instrument Serif"'),
  ])
    .then(revealFonts)
    .catch(revealFonts)
  window.setTimeout(revealFonts, 1500)
} else {
  revealFonts()
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
