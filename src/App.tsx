import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './sections/HeroSection';
import FeaturesSection from './sections/FeaturesSection';
import DemoSection from './sections/DemoSection';
import ComparisonSection from './sections/ComparisonSection';
import TestimonialsSection from './sections/TestimonialsSection';
import CTASection from './sections/CTASection';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  useEffect(() => {
    document.title = "Vocalift | Traduction Audio IA";
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={
          <div className="min-h-screen bg-dark text-white overflow-hidden">
            <Header />
            <main>
              <HeroSection />
              <FeaturesSection />
              <DemoSection />
              <ComparisonSection />
              <TestimonialsSection />
              <CTASection />
            </main>
            <Footer />
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;