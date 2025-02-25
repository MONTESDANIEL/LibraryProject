import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

import Navbar from './components/NavBar.tsx';
import Footer from './components/Footer.tsx';

import Home from './pages/Home.tsx'
import Books from './pages/Books.tsx';
import Statistics from './pages/Statistics.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Navbar />
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/statistics" element={<Statistics />} />
      </Routes>
    </Router>
    <Footer />
  </StrictMode>,
)
