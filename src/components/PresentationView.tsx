import { X, ArrowLeft, ArrowRight, Sparkle } from 'lucide-react';
import { Slide, Theme } from '../types';
import { DynamicIcon } from './DynamicIcon';
import { motion, AnimatePresence } from 'motion/react';

interface PresentationViewProps {
  slides: Slide[];
  activeSlideIndex: number;
  activeSlide: Slide;
  theme: Theme;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export function PresentationView({
  slides,
  activeSlideIndex,
  activeSlide,
  theme,
  onClose,
  onNext,
  onPrev
}: PresentationViewProps) {
  return (
    <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-sm z-50 flex flex-col justify-between p-6 sm:p-12 transition-all duration-500 animate-in fade-in">
      
      {/* Controles superiores flotantes */}
      <div className="flex justify-between items-center z-10 max-w-6xl mx-auto w-full">
        <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
          <span className="text-xs font-bold tracking-widest text-white uppercase">Live Presentation</span>
        </div>
        <button 
          onClick={onClose}
          className="bg-white hover:bg-slate-100 text-slate-900 px-5 py-2.5 rounded-full text-xs font-bold flex items-center space-x-2 transition-all shadow-lg"
        >
          <X className="w-4 h-4" />
          <span>Exit [ESC]</span>
        </button>
      </div>

      {/* LIENZO DE PRESENTACIÓN CENTRAL */}
      <div className="flex items-center justify-center flex-1 w-full p-4">
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeSlide.id}
            initial={{ opacity: 0, scale: 0.98, filter: 'blur(4px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.02, filter: 'blur(4px)' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`w-full aspect-[16/9] ${theme.bg} rounded-xl border ${theme.accentBorder} p-16 flex flex-col justify-between shadow-[0_0_50px_rgba(0,0,0,0.3)] relative transition-colors duration-300`}
            style={{ maxHeight: 'calc(100vh - 160px)', maxWidth: 'calc((100vh - 160px) * 16 / 9)' }}
          >
            <div>
              <h2 className={`text-5xl sm:text-6xl font-extrabold tracking-tight leading-tight ${theme.text} ${theme.fontClass}`}>
                {activeSlide.title}
              </h2>
              <p className={`text-xl mt-6 max-w-3xl leading-relaxed opacity-80 ${theme.text}`}>
                {activeSlide.subtitle}
              </p>
            </div>

            <div className="flex-1 flex items-center justify-center my-10">
              
              {activeSlide.layout === 'title' && (
                <div className="text-center w-full">
                  <div className={`h-2 w-24 mx-auto my-8 rounded-full ${theme.accentBg}`}></div>
                </div>
              )}

              {activeSlide.layout === 'bullets' && (
                <div className="w-full px-8">
                  <ul className="space-y-6">
                    {activeSlide.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start space-x-5">
                        <span className={`w-3 h-3 rounded-full mt-3 shrink-0 ${theme.accentBg} ring-4 ${theme.accentBorder}`}></span>
                        <p className={`text-2xl leading-relaxed ${theme.text}`}>{bullet}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeSlide.layout === 'features' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full">
                  {activeSlide.features.map((feat, fIdx) => (
                    <div key={fIdx} className={`p-8 rounded-2xl border ${theme.accentBorder} ${theme.cardBg} transition-all shadow-sm`}>
                      <div className={`p-3 w-14 h-14 rounded-xl ${theme.accentBg} border ${theme.accentBorder} flex items-center justify-center mb-6 shadow-sm`}>
                        <DynamicIcon name={feat.icon || "star"} className="w-7 h-7 text-white" />
                      </div>
                      <h4 className={`text-2xl font-bold mb-3 ${theme.text}`}>{feat.title}</h4>
                      <p className={`text-base leading-relaxed opacity-80 ${theme.text}`}>{feat.desc}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeSlide.layout === 'metrics' && (
                <div className="grid grid-cols-2 gap-16 w-full max-w-4xl">
                  {activeSlide.metrics.map((met, mIdx) => (
                    <div key={mIdx} className="text-center">
                      <h3 className={`text-8xl font-extrabold tracking-tighter ${theme.accent} ${theme.fontClass} drop-shadow-sm`}>
                        {met.number}
                      </h3>
                      <p className={`text-base font-bold uppercase tracking-widest mt-6 opacity-75 ${theme.text}`}>
                        {met.label}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {activeSlide.layout === 'image' && (
                <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                  {activeSlide.imageUrl && (
                    <motion.div 
                      className="relative flex items-center justify-center"
                      style={{ 
                        width: `${activeSlide.imageScale || 100}%`,
                        x: activeSlide.imageX || 0,
                        y: activeSlide.imageY || 0,
                      }}
                    >
                      <img 
                        src={activeSlide.imageUrl} 
                        alt="Slide content" 
                        className="object-contain max-h-[80vh] rounded-xl shadow-2xl" 
                      />
                    </motion.div>
                  )}
                </div>
              )}

            </div>

          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controles de Navegación del Presentador */}
      <div className="flex items-center justify-between max-w-6xl mx-auto w-full pt-6">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Keyboard [←] [→]</span>
        <div className="flex items-center space-x-6">
          <button 
            onClick={onPrev}
            disabled={activeSlideIndex === 0}
            className="p-3 bg-white/10 hover:bg-white/20 border border-white/20 disabled:opacity-30 rounded-full transition-all text-white backdrop-blur-sm"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <span className="text-base font-bold text-white tracking-widest">
            {activeSlideIndex + 1} / {slides.length}
          </span>
          <button 
            onClick={onNext}
            disabled={activeSlideIndex === slides.length - 1}
            className="p-3 bg-white/10 hover:bg-white/20 border border-white/20 disabled:opacity-30 rounded-full transition-all text-white backdrop-blur-sm"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>

    </div>
  );
}
