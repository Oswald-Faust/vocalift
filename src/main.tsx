import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Import des composants de page
import Dashboard from './pages/dashboard/index'

// Styles globaux
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Redirection de la page d'accueil vers le dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        {/* Page 404 à implémenter plus tard */}
        <Route path="*" element={<div>Page non trouvée</div>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
