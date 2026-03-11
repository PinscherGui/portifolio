import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';
import LanguageToggle from './LanguageToggle';

export default function Navbar() {
  const navRef = useRef(null);
  const { t } = useLanguage();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -80',
        end: 99999,
        toggleClass: {
          targets: navRef.current,
          className: 'scrolled'
        }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-40 flex justify-center pt-6 px-4 pointer-events-none">
      <nav 
        ref={navRef}
        className="pointer-events-auto flex items-center justify-between w-full max-w-5xl px-4 md:px-8 py-4 rounded-full transition-all duration-500 bg-transparent text-primary
          [&.scrolled]:bg-background/80 [&.scrolled]:backdrop-blur-xl [&.scrolled]:text-dark [&.scrolled]:shadow-sm [&.scrolled]:border [&.scrolled]:border-dark/10"
      >
        <div className="flex items-center gap-2 md:gap-3">
          <img src="/logo.png" alt="GR Digital Logo" className="w-[42px] h-[42px] object-contain hidden md:block" />
          <div className="font-sans font-bold text-lg md:text-xl uppercase tracking-tighter">
            GR Digital
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest pl-4">
          <a href="#features" className="hover:-translate-y-[1px] transition-transform">{t.nav.solutions}</a>
          <a href="#philosophy" className="hover:-translate-y-[1px] transition-transform">{t.nav.vision}</a>
          <a href="#contact" className="hover:-translate-y-[1px] transition-transform">{t.nav.contact}</a>
        </div>
        
        <div className="flex items-center gap-6">
          <LanguageToggle />
          
          <a 
            href="#contact" 
            className="group relative overflow-hidden bg-accent text-background px-6 py-2 rounded-full font-mono text-xs uppercase tracking-widest transition-transform hover:scale-105 duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hidden sm:inline-block"
          >
            <span className="relative z-10 transition-colors group-hover:text-dark">{t.nav.cta}</span>
            <span className="absolute inset-0 bg-primary translate-y-full transition-transform duration-300 group-hover:translate-y-0 z-0"></span>
          </a>
        </div>
      </nav>
    </header>
  );
}
