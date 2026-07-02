import { Info, Sparkle, LayoutTemplate, List, GripHorizontal, BarChart2, Image as ImageIcon } from 'lucide-react';
import { Slide, Theme, SlideLayout } from '../types';
import { DynamicIcon } from './DynamicIcon';

interface SlideCanvasProps {
  activeSlide: Slide;
  theme: Theme;
  onTextChange: (field: keyof Slide, value: string, index?: number | null, subfield?: string | null) => void;
}

export function SlideCanvas({ activeSlide, theme, onTextChange }: SlideCanvasProps) {
  const handleLayoutChange = (layout: SlideLayout) => {
    onTextChange('layout', layout);
  };

  return (
    <main className="flex-1 bg-slate-100 flex flex-col relative overflow-hidden">
      {/* Contextual Toolbar */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md shadow-md border border-slate-200/50 rounded-full px-4 py-1.5 flex items-center gap-2 z-10">
        <button 
          onClick={() => handleLayoutChange('title')}
          className={`p-2 rounded-full transition-colors flex items-center gap-2 text-xs font-semibold ${activeSlide.layout === 'title' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500 hover:text-indigo-600 hover:bg-slate-50'}`}
          title="Portada"
        >
          <LayoutTemplate className="w-4 h-4" />
          {activeSlide.layout === 'title' && <span>Title</span>}
        </button>
        <button 
          onClick={() => handleLayoutChange('bullets')}
          className={`p-2 rounded-full transition-colors flex items-center gap-2 text-xs font-semibold ${activeSlide.layout === 'bullets' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500 hover:text-indigo-600 hover:bg-slate-50'}`}
          title="Lista"
        >
          <List className="w-4 h-4" />
          {activeSlide.layout === 'bullets' && <span>Bullets</span>}
        </button>
        <button 
          onClick={() => handleLayoutChange('features')}
          className={`p-2 rounded-full transition-colors flex items-center gap-2 text-xs font-semibold ${activeSlide.layout === 'features' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500 hover:text-indigo-600 hover:bg-slate-50'}`}
          title="Tarjetas"
        >
          <GripHorizontal className="w-4 h-4" />
          {activeSlide.layout === 'features' && <span>Features</span>}
        </button>
        <button 
          onClick={() => handleLayoutChange('metrics')}
          className={`p-2 rounded-full transition-colors flex items-center gap-2 text-xs font-semibold ${activeSlide.layout === 'metrics' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500 hover:text-indigo-600 hover:bg-slate-50'}`}
          title="Métricas"
        >
          <BarChart2 className="w-4 h-4" />
          {activeSlide.layout === 'metrics' && <span>Metrics</span>}
        </button>
        <button 
          onClick={() => handleLayoutChange('image')}
          className={`p-2 rounded-full transition-colors flex items-center gap-2 text-xs font-semibold ${activeSlide.layout === 'image' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500 hover:text-indigo-600 hover:bg-slate-50'}`}
          title="Imagen"
        >
          <ImageIcon className="w-4 h-4" />
          {activeSlide.layout === 'image' && <span>Image</span>}
        </button>
        <div className="h-4 w-[1px] bg-slate-200 mx-2"></div>
        <div className="flex items-center gap-2 text-slate-500 text-xs">
          <Info className="w-4 h-4" /> Edit inline
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-12 overflow-y-auto custom-scrollbar">
        <div className={`w-full max-w-4xl aspect-[16/9] ${theme.bg} shadow-xl rounded-lg overflow-hidden relative border border-slate-200 p-12 flex flex-col justify-between transition-all duration-300`}>
          
          <div>
            <div className="flex justify-between items-start mb-6">
              <span className={`text-[10px] font-bold tracking-widest uppercase border px-2 py-0.5 rounded-sm ${theme.badge}`}>
                {theme.name}
              </span>
              <Sparkle className={`w-5 h-5 ${theme.accent}`} />
            </div>

            <h2 
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onTextChange('title', e.currentTarget.innerText)}
              className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${theme.text} ${theme.fontClass} outline-none max-h-[120px] overflow-hidden leading-tight`}
            >
              {activeSlide.title}
            </h2>
            
            <p 
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onTextChange('subtitle', e.currentTarget.innerText)}
              className={`text-lg mt-4 max-w-2xl leading-relaxed outline-none opacity-80 ${theme.text}`}
            >
              {activeSlide.subtitle}
            </p>
          </div>

          <div className="flex-1 flex items-center justify-center my-8">
            
            {activeSlide.layout === 'title' && (
              <div className="text-center w-full">
                <div className={`h-1.5 w-16 mx-auto my-6 rounded-full ${theme.accentBg}`}></div>
                <p className={`text-sm italic opacity-60 ${theme.text}`}>Generated by Zenith Auto-Layout</p>
              </div>
            )}

            {activeSlide.layout === 'bullets' && (
              <div className="w-full px-4">
                <ul className="space-y-4">
                  {activeSlide.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start space-x-4 group">
                      <span className={`w-2 h-2 rounded-full mt-2.5 shrink-0 ${theme.accentBg} ring-4 ${theme.accentBorder}`}></span>
                      <p 
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => onTextChange('bullets', e.currentTarget.innerText, bIdx)}
                        className={`text-lg outline-none flex-1 leading-relaxed ${theme.text}`}
                      >
                        {bullet}
                      </p>
                    </li>
                  ))}
                  {activeSlide.bullets.length === 0 && (
                     <li className="flex items-start space-x-4 group">
                       <span className={`w-2 h-2 rounded-full mt-2.5 shrink-0 ${theme.accentBg} ring-4 ${theme.accentBorder}`}></span>
                       <p 
                         contentEditable
                         suppressContentEditableWarning
                         onBlur={(e) => onTextChange('bullets', e.currentTarget.innerText, 0)}
                         className={`text-lg outline-none flex-1 leading-relaxed italic opacity-50 ${theme.text}`}
                       >
                         Add a point here...
                       </p>
                     </li>
                  )}
                </ul>
              </div>
            )}

            {activeSlide.layout === 'features' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
                {activeSlide.features.map((feat, fIdx) => (
                  <div key={fIdx} className={`p-6 rounded-xl border ${theme.accentBorder} ${theme.cardBg} transition-all shadow-sm`}>
                    <div className={`p-2.5 w-12 h-12 rounded-lg ${theme.accentBg} border ${theme.accentBorder} flex items-center justify-center mb-5`}>
                      <DynamicIcon name={feat.icon || "star"} className={`w-6 h-6 text-white`} />
                    </div>
                    <h4 
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => onTextChange('features', e.currentTarget.innerText, fIdx, 'title')}
                      className={`text-lg font-bold outline-none mb-2 ${theme.text}`}
                    >
                      {feat.title}
                    </h4>
                    <p 
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => onTextChange('features', e.currentTarget.innerText, fIdx, 'desc')}
                      className={`text-sm outline-none leading-relaxed opacity-75 ${theme.text}`}
                    >
                      {feat.desc}
                    </p>
                  </div>
                ))}
                {activeSlide.features.length === 0 && (
                  <div className={`p-6 rounded-xl border ${theme.accentBorder} ${theme.cardBg} transition-all shadow-sm`}>
                     <div className={`p-2.5 w-12 h-12 rounded-lg ${theme.accentBg} border ${theme.accentBorder} flex items-center justify-center mb-5`}>
                       <DynamicIcon name="plus" className={`w-6 h-6 text-white`} />
                     </div>
                     <h4 
                       contentEditable
                       suppressContentEditableWarning
                       onBlur={(e) => onTextChange('features', e.currentTarget.innerText, 0, 'title')}
                       className={`text-lg font-bold outline-none mb-2 ${theme.text}`}
                     >
                       New Feature
                     </h4>
                     <p 
                       contentEditable
                       suppressContentEditableWarning
                       onBlur={(e) => onTextChange('features', e.currentTarget.innerText, 0, 'desc')}
                       className={`text-sm outline-none leading-relaxed opacity-75 ${theme.text}`}
                     >
                       Description goes here.
                     </p>
                  </div>
                )}
              </div>
            )}

            {activeSlide.layout === 'metrics' && (
              <div className="grid grid-cols-2 gap-12 w-full max-w-3xl">
                {activeSlide.metrics.map((met, mIdx) => (
                  <div key={mIdx} className="text-center group relative p-6">
                    <h3 
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => onTextChange('metrics', e.currentTarget.innerText, mIdx, 'number')}
                      className={`text-7xl font-extrabold tracking-tighter ${theme.accent} ${theme.fontClass} outline-none drop-shadow-sm`}
                    >
                      {met.number}
                    </h3>
                    <p 
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => onTextChange('metrics', e.currentTarget.innerText, mIdx, 'label')}
                      className={`text-sm uppercase tracking-widest mt-4 outline-none font-semibold opacity-75 ${theme.text}`}
                    >
                      {met.label}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {activeSlide.layout === 'image' && (
              <div className="w-full h-full flex flex-col items-center justify-center mt-6">
                <div className={`relative group w-full max-w-4xl aspect-[21/9] rounded-2xl overflow-hidden border-2 border-dashed ${theme.accentBorder} transition-all flex items-center justify-center shadow-lg ${theme.cardBg}`}>
                  {activeSlide.imageUrl ? (
                    <img src={activeSlide.imageUrl} alt="Slide content" className="w-full h-full object-cover" />
                  ) : (
                    <div className={`flex flex-col items-center opacity-60 ${theme.text}`}>
                      <ImageIcon className="w-10 h-10 mb-3" />
                      <span className="text-sm font-semibold tracking-widest uppercase">Add Image URL</span>
                    </div>
                  )}
                  {/* Overlay for editing URL */}
                  <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-sm">
                    <input 
                      type="text" 
                      placeholder="Paste image URL here..." 
                      className="w-3/4 max-w-lg px-5 py-3 rounded-xl shadow-2xl bg-white text-slate-900 border-none outline-none ring-4 ring-indigo-500/50 text-sm font-medium"
                      value={activeSlide.imageUrl || ''}
                      onChange={(e) => onTextChange('imageUrl', e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </div>
              </div>
            )}

          </div>

          <div className="flex items-center justify-between pt-6 text-[11px] font-semibold tracking-wider opacity-50 uppercase">
            <span>Zenith Intelligence 2026</span>
            <span>Confidential</span>
          </div>

          {/* Layout Guides Hover Effect */}
          <div className="absolute inset-0 border border-indigo-200 opacity-0 pointer-events-none hover:opacity-100 transition-opacity rounded-lg"></div>
        </div>
      </div>
      
      {/* Footer Canvas Controls (as in Sleek mockup) */}
      <div className="h-10 bg-white/50 backdrop-blur-sm border-t border-slate-200 px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
          <span>Auto-Layout active</span>
        </div>
        <div className="flex items-center gap-3 text-slate-500">
          <button className="p-1 hover:bg-slate-200 rounded text-xs font-bold px-2">Fit</button>
          <span className="text-xs font-bold">100%</span>
        </div>
      </div>
    </main>
  );
}
