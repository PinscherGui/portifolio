import React from 'react';
import { Mail, Instagram } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer id="contact" className="bg-dark text-primary pt-24 pb-12 px-8 rounded-t-[4rem] relative z-30 -mt-8 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        <div className="text-center mb-16">
          <h2 className="font-drama italic text-5xl md:text-7xl mb-4 text-primary">{t.footer.title}</h2>
          <p className="font-mono text-primary/60 max-w-lg mx-auto mb-8 text-sm">
            {t.footer.desc}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a 
              href="mailto:grdigitalofc@gmail.com"
              className="group relative overflow-hidden border border-accent/30 bg-accent/10 px-6 py-3 rounded-full font-mono text-sm tracking-widest uppercase transition-transform hover:-translate-y-1 flex items-center gap-2"
            >
              <Mail size={16} className="text-accent" />
              <span className="relative z-10 transition-colors group-hover:text-primary">{t.footer.email}</span>
              <span className="absolute inset-0 bg-accent translate-y-full transition-transform duration-300 group-hover:translate-y-0 z-0"></span>
            </a>
            <a 
              href="https://instagram.com/g.lbr_digital"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden border border-primary/30 px-6 py-3 rounded-full font-mono text-sm tracking-widest uppercase transition-transform hover:-translate-y-1 flex items-center gap-2"
            >
              <Instagram size={16} />
              <span className="relative z-10 transition-colors group-hover:text-dark">Instagram</span>
              <span className="absolute inset-0 bg-primary translate-y-full transition-transform duration-300 group-hover:translate-y-0 z-0"></span>
            </a>
          </div>
        </div>

        <div className="w-full border-t border-primary/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="GR Digital Logo" className="w-12 h-12 object-contain" />
            <div className="font-sans font-bold text-xl uppercase tracking-tighter">
              GR Digital
              <div className="font-mono text-[10px] text-primary/40 font-normal tracking-widest mt-1">Creative Presence</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-primary/5 px-4 py-2 rounded-full border border-primary/10">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
            <div className="w-2 h-2 rounded-full bg-green-500 absolute" />
            <span className="font-mono text-xs uppercase tracking-widest text-primary/80 pl-2">{t.footer.system}</span>
          </div>

          <div className="font-mono text-[10px] text-primary/40 uppercase tracking-widest">
            {t.footer.copy}
          </div>
        </div>
      </div>
    </footer>
  );
}
