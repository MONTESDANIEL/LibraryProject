import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

import Navbar from './components/NavBar.tsx';
import Footer from './components/Footer.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Navbar />
    <Footer />
  </StrictMode>,
)
