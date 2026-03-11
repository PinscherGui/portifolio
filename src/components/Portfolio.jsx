import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function Portfolio() {
  const containerRef = useRef(null);
  const { t } = useLanguage();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Animate project cards in
      gsap.from('.project-card', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        }
      });
      
      // Image parallax effect (Desktop only)
      let mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        gsap.utils.toArray('.project-img-container').forEach(container => {
          const img = container.querySelector('img');
          gsap.to(img, {
            yPercent: 20,
            ease: 'none',
            scrollTrigger: {
              trigger: container,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          });
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, [t]);

  return (
    <section id="portfolio" ref={containerRef} className="py-32 px-6 bg-background relative z-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-drama italic text-5xl md:text-7xl mb-16 text-dark border-b border-dark/20 pb-8 tracking-tighter">
          {t.portfolio.title}
        </h2>
        
        <div className="flex flex-col gap-24">
          {t.portfolio.items.map((proj, i) => (
            <div key={i} className="project-card grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
              
              {/* Image Side */}
              <div className={`lg:col-span-7 project-img-container relative flex items-center justify-center ${i % 2 !== 0 ? 'lg:order-2' : ''}`}>
                <img 
                  src={proj.img} 
                  alt={proj.name} 
                  className="w-full max-w-[400px] h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                />
              </div>

              {/* Text Side */}
              <div className={`lg:col-span-5 flex flex-col items-start ${i % 2 !== 0 ? 'lg:order-1' : ''}`}>
                <span className="font-mono text-accent text-xs uppercase tracking-widest mb-4 border border-accent/20 px-3 py-1 rounded-full bg-accent/5">
                  0{i + 1}
                </span>
                
                <h3 className="font-sans font-bold text-3xl md:text-4xl uppercase tracking-tighter mb-8 text-dark">
                  {proj.name}
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-widest text-dark/40 mb-2">/ Challenge</h4>
                    <p className="font-mono text-sm leading-relaxed text-dark/80">
                      {proj.challenge}
                    </p>
                  </div>
                  
                  <div className="w-full h-px bg-dark/10"></div>
                  
                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-widest text-accent mb-2">/ Solution</h4>
                    <p className="font-mono text-sm leading-relaxed text-dark/80">
                      {proj.solution}
                    </p>
                  </div>
                </div>
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
