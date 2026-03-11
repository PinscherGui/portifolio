import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const sectionRef = useRef(null);
  const { t } = useLanguage();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Text Reveal
      gsap.from('.reveal-word', {
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 50%'
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [t]);

  return (
    <section id="philosophy" ref={sectionRef} className="relative min-h-screen flex items-center justify-center bg-dark overflow-hidden py-32 px-6">
      
      <div className="relative z-10 max-w-5xl mx-auto w-full text-center flex flex-col items-center">
        <p className="text-primary/60 font-mono uppercase tracking-widest text-sm mb-16 max-w-lg mx-auto">
          {t.philosophy.prefix}
        </p>
        
        <h2 className="text-primary font-drama italic text-5xl md:text-7xl lg:text-8xl leading-none tracking-tight flex flex-wrap justify-center gap-x-4 gap-y-2">
          {t.philosophy.words.map((word, i) => (
            <span key={i} className="reveal-word inline-block">{word}</span>
          ))}
          <span className="reveal-word inline-block text-accent">{t.philosophy.accentWord}</span>
        </h2>
      </div>
    </section>
  );
}
