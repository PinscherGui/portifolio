import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { Terminal, MousePointer2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Features() {
  const containerRef = useRef(null);
  const { t } = useLanguage();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="features" ref={containerRef} className="py-32 px-6 bg-background relative z-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <FeatureCard title={t.features.creativity.title} desc={t.features.creativity.desc}>
            <ShufflerFeature cardsData={t.features.cards} />
          </FeatureCard>
          
          <FeatureCard title={t.features.vision.title} desc={t.features.vision.desc}>
            <TypewriterFeature textData={t.features.typewriter} liveFeedLabel={t.features.liveFeed} />
          </FeatureCard>
          
          <FeatureCard title={t.features.presence.title} desc={t.features.presence.desc}>
            <SchedulerFeature commitLabel={t.features.commit} />
          </FeatureCard>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ title, desc, children }) {
  return (
    <div className="feature-card bg-primary text-dark border border-dark/10 rounded-[2rem] p-8 shadow-sm flex flex-col h-[420px] relative overflow-hidden group">
      <div className="flex justify-between items-start mb-8 z-10">
        <h3 className="font-sans font-bold text-2xl uppercase tracking-tighter">{title}</h3>
        <span className="font-mono text-[10px] uppercase border border-dark/20 px-2 py-1 rounded-full">{desc}</span>
      </div>
      <div className="flex-1 relative flex items-center justify-center pointer-events-none">
        {children}
      </div>
    </div>
  );
}

function ShufflerFeature({ cardsData }) {
  const [cards, setCards] = useState(cardsData);

  useEffect(() => {
    setCards(cardsData);
  }, [cardsData]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards(prev => {
        const next = [...prev];
        const last = next.pop();
        next.unshift(last);
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [cardsData]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {cards.map((text, i) => {
        const isTop = i === 0;
        return (
          <div 
            key={text}
            className="absolute w-full max-w-[240px] bg-dark text-primary rounded-xl p-6 border border-dark/20 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-xl"
            style={{
              transform: `translateY(${i * 15}px) scale(${1 - i * 0.05})`,
              opacity: 1 - i * 0.2,
              zIndex: 10 - i,
            }}
          >
            <div className="flex justify-between items-center">
              <span className="font-mono text-xs opacity-50">0{cardsData.indexOf(text) + 1}</span>
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" style={{ opacity: isTop ? 1 : 0}}></div>
            </div>
            <p className="font-sans font-bold mt-4 tracking-tight">{text}</p>
          </div>
        );
      })}
    </div>
  );
}

function TypewriterFeature({ textData, liveFeedLabel }) {
  const [text, setText] = useState('');
  
  useEffect(() => {
    let i = 0;
    setText('');
    const interval = setInterval(() => {
      setText(textData.substring(0, i));
      i++;
      if (i > textData.length + 20) i = 0;
    }, 50);
    return () => clearInterval(interval);
  }, [textData]);

  return (
    <div className="w-full bg-dark text-primary rounded-xl p-6 font-mono text-sm h-[200px] border border-dark/20 relative shadow-inner">
      <div className="flex items-center gap-2 mb-4 text-accent border-b border-dark/40 pb-2">
        <Terminal size={14} />
        <span className="text-[10px] uppercase tracking-widest">{liveFeedLabel}</span>
        <div className="w-1.5 h-1.5 rounded-full bg-accent ml-auto animate-pulse"></div>
      </div>
      <p className="leading-relaxed opacity-80">
        {text}
        <span className="inline-block w-2.5 h-4 bg-accent ml-1 align-middle animate-pulse"></span>
      </p>
    </div>
  );
}

function SchedulerFeature({ commitLabel }) {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const gridRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
      
      tl.to('.cursor-icon', { x: 50, y: 30, duration: 1, ease: 'power2.inOut' })
        .to('.cursor-icon', { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 })
        .to('.day-cell-3', { backgroundColor: '#ff8200', color: '#111111', duration: 0.2 }, "-=0.2")
        .to('.cursor-icon', { x: 140, y: 100, duration: 1, ease: 'power2.inOut', delay: 0.5 })
        .to('.cursor-icon', { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 })
        .to('.save-btn', { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 }, "-=0.2")
        .to('.cursor-icon', { opacity: 0, duration: 0.3 })
        .set('.day-cell-3', { backgroundColor: 'transparent', color: '#E8E4DD' })
        .to('.cursor-icon', { x: -20, y: -20, opacity: 1, duration: 0.1, delay: 0.5 });
      
    }, gridRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={gridRef} className="w-full bg-dark text-primary rounded-xl p-6 relative overflow-hidden">
      <div className="grid grid-cols-7 gap-2 mb-8">
        {days.map((d, i) => (
          <div key={i} className={`day-cell-${i} aspect-square rounded-md flex items-center justify-center font-mono text-xs border border-primary/10`}>
            {d}
          </div>
        ))}
      </div>
      <div className="save-btn w-full bg-primary/10 py-2 rounded-md text-center font-mono text-xs uppercase border border-primary/20">
        {commitLabel}
      </div>
      <MousePointer2 className="cursor-icon absolute top-0 left-0 text-primary drop-shadow-md z-20" size={20} fill="#E8E4DD" />
    </div>
  );
}
