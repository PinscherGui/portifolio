import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function Protocol() {
  const containerRef = useRef(null);
  const { t } = useLanguage();

  const STEPS = [
    {
      title: t.protocol.step1.title,
      desc: t.protocol.step1.desc,
      viz: <GeometricMotif />
    },
    {
      title: t.protocol.step2.title,
      desc: t.protocol.step2.desc,
      viz: <ScanningLaser />
    },
    {
      title: t.protocol.step3.title,
      desc: t.protocol.step3.desc,
      viz: <PulsingWaveform />
    }
  ];

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card');
      
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return; // skip last card

        ScrollTrigger.create({
          trigger: card,
          start: 'top top',
          pin: true,
          pinSpacing: false,
          endTrigger: '.protocol-container',
          end: 'bottom bottom'
        });

        const nextCard = cards[i + 1];
        gsap.to(card, {
          scale: 0.9,
          opacity: 0.5,
          filter: 'blur(20px)',
          ease: 'none',
          scrollTrigger: {
            trigger: nextCard,
            start: 'top bottom',
            end: 'top top',
            scrub: true
          }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, [t]);

  return (
    <section className="protocol-container relative bg-dark z-20" ref={containerRef}>
      {STEPS.map((step, i) => (
        <div 
          key={i} 
          className="protocol-card min-h-screen w-full flex items-center justify-center p-6 bg-background text-dark relative border-t border-dark/10"
          style={{ zIndex: i + 10 }}
        >
          <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="font-sans font-bold text-4xl md:text-5xl lg:text-6xl uppercase tracking-tighter mb-8 leading-none">
                {step.title}
              </h3>
              <p className="font-mono text-dark/70 text-lg leading-relaxed mb-8">
                {step.desc}
              </p>
            </div>
            <div className="flex justify-center items-center h-[400px] border border-dark/20 rounded-[2rem] bg-dark text-primary relative overflow-hidden shadow-inner">
              {step.viz}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

function GeometricMotif() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="w-48 h-48 animate-[spin_20s_linear_infinite]">
        <path d="M50 5 L95 25 L95 75 L50 95 L5 75 L5 25 Z" fill="none" stroke="#ff8200" strokeWidth="0.5" className="opacity-80" />
        <path d="M50 15 L85 30 L85 70 L50 85 L15 70 L15 30 Z" fill="none" stroke="#E8E4DD" strokeWidth="1" className="animate-[spin_30s_linear_infinite_reverse] origin-center" />
        <circle cx="50" cy="50" r="10" fill="#ff8200" className="animate-pulse" />
      </svg>
    </div>
  );
}

function ScanningLaser() {
  return (
    <div className="relative w-full h-full p-8 flex flex-col justify-between">
      <div className="grid grid-cols-12 gap-1 h-full w-full opacity-20">
        {Array.from({length: 144}).map((_, i) => (
          <div key={i} className="bg-primary aspect-square object-cover" />
        ))}
      </div>
      <div className="absolute top-0 left-0 w-full h-1 bg-accent shadow-[0_0_15px_#ff8200] animate-[ping_4s_ease-in-out_infinite]" style={{ animation: 'scan 3s ease-in-out infinite alternate' }} />
      <style>{`
        @keyframes scan {
          0% { transform: translateY(0); }
          100% { transform: translateY(396px); }
        }
      `}</style>
    </div>
  );
}

function PulsingWaveform() {
  return (
    <div className="relative w-full h-full flex items-center overflow-hidden px-4">
      <svg viewBox="0 0 400 100" className="w-full h-full stroke-accent fill-none" preserveAspectRatio="none">
        <path 
          d="M0,50 L100,50 L120,20 L140,80 L160,10 L180,90 L200,50 L400,50" 
          strokeWidth="2"
          className="animate-[dash_2s_linear_infinite]"
          strokeDasharray="400"
          strokeDashoffset="400"
        />
      </svg>
      <style>{`
        @keyframes dash {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
}
