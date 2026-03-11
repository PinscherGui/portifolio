import React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LanguageProvider } from './context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import About from './components/About';
import Philosophy from './components/Philosophy';
import Protocol from './components/Protocol';
import Footer from './components/Footer';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';

export default function App() {
  return (
    <LanguageProvider>
      <div className="font-sans text-dark bg-background min-h-screen relative selection:bg-accent selection:text-dark">
        {/* Global Noise Overlay */}
        <div className="noise pointer-events-none fixed inset-0 z-50 mix-blend-overlay opacity-30"></div>
        
        <Navbar />
        <main>
          <Hero />
          <Features />
          <Services />
          <Portfolio />
          <About />
          <Philosophy />
          <Protocol />
          <div className="bg-dark">
            <Testimonials />
          </div>
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
