import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './home.jsx'
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import Footprint from './Footprint'

// npm install react-image --save
// npm install react-icons --save

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/carbon_intensity" element={<App />} />
            <Route path="/carbon_dioxide_footprint" element={<Footprint />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    </BrowserRouter>,
)
