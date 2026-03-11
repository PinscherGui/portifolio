import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const containerRef = useRef(null);
  const { t } = useLanguage();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.hero-anim', {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.2
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-[100dvh] w-full overflow-hidden flex items-end">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop" 
          alt="Brutalist Architecture" 
          className="w-full h-full object-cover grayscale-[0.5]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-dark/20 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-transparent"></div>
      </div>

      {/* Content Bottom Left Third */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-24 md:pb-32 flex flex-col items-start w-full md:w-2/3 lg:w-1/2">
        <h1 className="text-primary flex flex-col uppercase">
          <span className="hero-anim font-sans font-bold text-2xl md:text-3xl lg:text-4xl tracking-tight mb-2">
            {t.hero.engineer}
          </span>
          <span className="hero-anim font-drama italic text-6xl md:text-8xl lg:text-9xl leading-[0.85] tracking-tighter lowercase pr-4 whitespace-pre-line">
            {t.hero.presence}
          </span>
        </h1>
        
        <p className="hero-anim text-primary/80 font-mono mt-8 mb-10 max-w-sm text-sm">
          {t.hero.desc}
        </p>

        <a 
          href="#contact" 
          className="hero-anim group relative overflow-hidden bg-accent text-primary px-8 py-4 rounded-full font-sans font-bold tracking-wide uppercase text-sm transition-transform hover:scale-105 duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
        >
          <span className="relative z-10 transition-colors group-hover:text-dark">{t.hero.btn}</span>
          <span className="absolute inset-0 bg-primary translate-y-full transition-transform duration-300 group-hover:translate-y-0 z-0"></span>
        </a>
      </div>
    </section>
  );
}
