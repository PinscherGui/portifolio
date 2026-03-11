import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef(null);
  const { t } = useLanguage();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.about-reveal', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        }
      });
      
      gsap.to('.about-img', {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={containerRef} className="py-32 px-6 bg-background relative z-20 overflow-hidden border-t border-dark/10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Profile Image Column */}
        <div className="lg:col-span-5 relative">
          <div className="about-reveal aspect-[4/5] rounded-[2rem] overflow-hidden bg-dark relative shadow-xl border border-dark/10">
            <img 
              src="/about.png" 
              alt="GR Digital - Developer" 
              className="about-img absolute inset-0 w-full h-[120%] object-cover top-[-25%]"
            />
            <div className="absolute inset-0 bg-accent mix-blend-overlay opacity-20"></div>
          </div>
          
          {/* Status Badge */}
          <div className="about-reveal absolute bottom-6 right-[-2rem] md:right-[-4rem] bg-dark text-primary px-6 py-4 rounded-xl border border-primary/20 shadow-2xl backdrop-blur-md">
            <p className="font-mono text-xs uppercase tracking-widest text-primary/60 mb-1">{t.about.statusLabel}</p>
            <p className="font-sans font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
              {t.about.status}
            </p>
          </div>
        </div>

        {/* Content Column */}
        <div className="lg:col-span-7 flex flex-col items-start">
          <span className="about-reveal font-mono text-accent text-xs uppercase tracking-widest mb-6 border border-accent/20 px-3 py-1 rounded-full bg-accent/5">
            {t.about.tag}
          </span>
          
          <h2 className="about-reveal font-drama italic text-5xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tighter mb-8 text-dark" dangerouslySetInnerHTML={{ __html: t.about.title }} />
          
          <p className="about-reveal font-mono text-sm leading-relaxed text-dark/70 mb-6 max-w-lg">
            {t.about.p1}
          </p>
          
          <p className="about-reveal font-mono text-sm leading-relaxed text-dark/70 mb-10 max-w-lg">
            {t.about.p2}
          </p>

          <div className="about-reveal flex flex-wrap gap-4">
            <a 
              href="#contact" 
              className="group relative overflow-hidden bg-dark text-primary px-8 py-3 rounded-full font-sans font-bold tracking-wide uppercase text-xs transition-transform hover:scale-105 duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
            >
              <span className="relative z-10 transition-colors group-hover:text-dark">{t.about.btn1}</span>
              <span className="absolute inset-0 bg-primary translate-y-full transition-transform duration-300 group-hover:translate-y-0 z-0"></span>
            </a>
            
            <a 
               href="https://instagram.com/g.lbr_digital"
               target="_blank"
               rel="noopener noreferrer"
              className="group relative overflow-hidden bg-transparent border border-dark/20 text-dark px-8 py-3 rounded-full font-sans font-bold tracking-wide uppercase text-xs transition-transform hover:scale-105 hover:border-dark/50 duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
            >
              <span className="relative z-10 transition-colors">{t.about.btn2}</span>
              <span className="absolute inset-0 bg-dark/5 translate-y-full transition-transform duration-300 group-hover:translate-y-0 z-0"></span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
