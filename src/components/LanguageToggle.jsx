import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageToggle() {
  const { lang, toggleLanguage } = useLanguage();

  return (
    <div 
      className="group/toggle relative inline-flex items-center bg-transparent border border-primary/30 [.scrolled_&]:border-dark/60 rounded-[3rem] p-1 cursor-pointer h-10 w-[160px] shadow-sm overflow-hidden" 
      onClick={() => toggleLanguage(lang === 'en' ? 'pt' : 'en')}
    >
      {/* Sliding active background marker */}
      <div 
        className="absolute w-[calc(50%-4px)] h-[calc(100%-8px)] bg-primary/20 [.scrolled_&]:bg-[#9D9D9C] rounded-[3rem] transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] z-0 pointer-events-none"
        style={{ transform: lang === 'en' ? 'translateX(0)' : 'translateX(100%)' }}
      ></div>
      
      {/* English option */}
      <div 
        className="flex-1 flex justify-center items-center z-10 h-full relative"
        onClick={(e) => { e.stopPropagation(); toggleLanguage('en'); }}
      >
        <span className={`font-sans text-[11px] uppercase tracking-widest transition-colors duration-300 flex items-center justify-center gap-2
          ${lang === 'en' 
            ? 'text-primary [.scrolled_&]:text-dark font-bold' 
            : 'text-primary/40 [.scrolled_&]:text-dark/60'}`}
        >
          <img src="/flag-us.png" alt="US" className="w-[18px] object-contain shadow-sm rounded-sm" /> 
          <span className="leading-none mt-px">EN-US</span>
        </span>
      </div>
      
      {/* Portuguese option */}
      <div 
        className="flex-1 flex justify-center items-center z-10 h-full relative"
        onClick={(e) => { e.stopPropagation(); toggleLanguage('pt'); }}
      >
        <span className={`font-sans text-[11px] uppercase tracking-widest transition-colors duration-300 flex items-center justify-center gap-2
          ${lang === 'pt' 
            ? 'text-primary [.scrolled_&]:text-dark font-bold' 
            : 'text-primary/40 [.scrolled_&]:text-dark/60'}`}
        >
          <img src="/flag-br.png" alt="BR" className="w-[18px] object-contain shadow-sm rounded-sm" /> 
          <span className="leading-none mt-px">PT-BR</span>
        </span>
      </div>
    </div>
  );
}
