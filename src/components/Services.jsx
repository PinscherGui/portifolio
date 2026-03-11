import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';
import { PenTool, Target, Link, TrendingUp, MonitorPlay } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ICONS = [PenTool, Target, Link, TrendingUp, MonitorPlay];

export default function Services() {
  const containerRef = useRef(null);
  const { t } = useLanguage();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.service-card', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
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
    <section id="services" ref={containerRef} className="py-32 px-6 bg-dark text-primary relative z-20 overflow-hidden border-t border-primary/10">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-drama italic text-5xl md:text-7xl mb-16 text-primary border-b border-primary/20 pb-8 tracking-tighter">
          {t.services.title}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.services.items.map((srv, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <div key={i} className="service-card group bg-background relative overflow-hidden text-dark border border-dark/10 rounded-[2rem] p-8 shadow-sm flex flex-col hover:-translate-y-2 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">
                <div className="mb-8 w-14 h-14 rounded-full bg-dark flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
                  <Icon size={24} className="text-accent" />
                </div>
                <h3 className="font-sans font-bold text-2xl uppercase tracking-tighter mb-4 pr-4">{srv.title}</h3>
                <p className="font-mono text-sm leading-relaxed text-dark/70 mt-auto">{srv.desc}</p>
                
                {/* Hover accent ring */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent/40 rounded-[2rem] pointer-events-none transition-colors duration-500"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
