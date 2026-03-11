import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const containerRef = useRef(null);
  const { t } = useLanguage();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.testimonial-card', {
        scale: 0.95,
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, [t]);

  return (
    <section id="testimonials" ref={containerRef} className="pt-32 pb-48 px-6 bg-dark text-primary relative z-20 overflow-hidden border-t border-primary/10">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-drama italic text-5xl md:text-7xl mb-16 text-primary tracking-tighter text-center">
          {t.testimonials.title}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.testimonials.items.map((item, i) => (
            <div key={i} className="testimonial-card bg-background/5 relative border border-primary/10 rounded-[2rem] p-8 md:p-10 flex flex-col justify-between">
              <Quote size={32} className="text-accent/40 absolute top-8 right-8 z-0" />
              <p className="font-mono text-sm leading-relaxed text-primary/80 mb-12 italic relative z-10 pr-6">
                "{item.quote}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center font-bold text-accent font-sans">
                  {item.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-sans font-bold text-sm tracking-tighter uppercase text-primary">
                    {item.author}
                  </h4>
                  <p className="font-mono text-[10px] uppercase text-primary/40 tracking-widest">Client</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
