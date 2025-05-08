import React, { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './sections/HeroSection';
import FeaturesSection from './sections/FeaturesSection';
import DemoSection from './sections/DemoSection';
import ComparisonSection from './sections/ComparisonSection';
import TestimonialsSection from './sections/TestimonialsSection';
import CTASection from './sections/CTASection';

function App() {
  useEffect(() => {
    document.title = "Vocalift | Traduction Audio IA";
  }, []);

  return (
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
  );
}

export default App;