import { Info, Sparkle, LayoutTemplate, List, GripHorizontal, BarChart2, Image as ImageIcon, Move } from 'lucide-react';
import { Slide, Theme, SlideLayout } from '../types';
import { DynamicIcon } from './DynamicIcon';
import { motion } from 'motion/react';

interface SlideCanvasProps {
  activeSlide: Slide;
  theme: Theme;
  onTextChange: (field: keyof Slide, value: any, index?: number | null, subfield?: string | null) => void;
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
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-1 text-xs font-semibold text-slate-500 cursor-pointer" title="Color de texto">
            <span className="sr-only">Color</span>
            <input 
              type="color" 
              value={activeSlide.textColor || "#334155"} 
              onChange={(e) => onTextChange('textColor', e.target.value)} 
              className="w-5 h-5 p-0 border-0 rounded overflow-hidden cursor-pointer bg-transparent"
            />
          </label>
          <label className="flex items-center gap-1 text-xs font-semibold text-slate-500" title="Tamaño de título">
            Tít.:
            <input 
              type="number" 
              min="10" 
              max="150"
              value={activeSlide.titleFontSize ? parseInt(activeSlide.titleFontSize) : 48} 
              onChange={(e) => onTextChange('titleFontSize', `${e.target.value}px`)} 
              className="w-12 h-6 px-1 border border-slate-300 rounded text-slate-700 bg-white"
            />
          </label>
        </div>
        <div className="h-4 w-[1px] bg-slate-200 mx-2"></div>
        <div className="flex items-center gap-2 text-slate-500 text-xs">
          <Info className="w-4 h-4" /> Edit inline
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 overflow-hidden">
        <div 
          className={`w-full aspect-[16/9] ${theme.bg} shadow-xl rounded-lg overflow-hidden relative border border-slate-200 p-12 flex flex-col justify-between transition-all duration-300`}
          style={{ maxHeight: 'calc(100vh - 180px)', maxWidth: 'calc((100vh - 180px) * 16 / 9)' }}
        >
          
          <div style={{ color: activeSlide.textColor || undefined }}>
            <h2 
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onTextChange('title', e.currentTarget.innerText)}
              className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${theme.text} ${theme.fontClass} outline-none max-h-[120px] overflow-hidden leading-tight`}
              style={{ fontSize: activeSlide.titleFontSize, color: activeSlide.textColor || undefined }}
            >
              {activeSlide.title}
            </h2>
            
            <p 
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onTextChange('subtitle', e.currentTarget.innerText)}
              className={`text-lg mt-4 max-w-2xl leading-relaxed outline-none opacity-80 ${theme.text}`}
              style={{ color: activeSlide.textColor || undefined }}
            >
              {activeSlide.subtitle}
            </p>
          </div>

          <div className="flex-1 flex items-center justify-center my-8" style={{ color: activeSlide.textColor || undefined }}>
            
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
              <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                {activeSlide.imageUrl ? (
                  <motion.div 
                    className="relative group cursor-move flex items-center justify-center pointer-events-auto"
                    style={{ 
                      width: `${activeSlide.imageScale || 100}%`,
                      x: activeSlide.imageX || 0,
                      y: activeSlide.imageY || 0,
                    }}
                    drag
                    dragMomentum={false}
                    onDragEnd={(_, info) => {
                      const newX = (activeSlide.imageX || 0) + info.offset.x;
                      const newY = (activeSlide.imageY || 0) + info.offset.y;
                      onTextChange('imageX', newX);
                      onTextChange('imageY', newY);
                    }}
                  >
                    <img 
                      src={activeSlide.imageUrl} 
                      alt="Slide content" 
                      className="object-contain max-h-[80vh] rounded-xl shadow-2xl pointer-events-none" 
                    />
                    <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity backdrop-blur-sm gap-4 rounded-xl">
                      <div className="flex w-11/12 max-w-md gap-2" onPointerDown={(e) => e.stopPropagation()}>
                        <input 
                          type="text" 
                          placeholder="URL..." 
                          className="flex-1 px-4 py-2 rounded-lg shadow-xl bg-white text-slate-900 border-none outline-none text-xs font-medium"
                          value={activeSlide.imageUrl || ''}
                          onChange={(e) => onTextChange('imageUrl', e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                        />
                        <label className="flex items-center justify-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-xl cursor-pointer text-xs font-semibold transition-colors">
                          Subir
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = (event) => {
                                  onTextChange('imageUrl', event.target?.result as string);
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </label>
                      </div>
                      <div className="flex flex-col gap-2 w-11/12 max-w-md" onPointerDown={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-3 bg-white/10 p-2 rounded-lg backdrop-blur-md">
                          <span className="text-white text-[10px] font-bold uppercase tracking-wider">Tamaño</span>
                          <input 
                            type="range" 
                            min="10" 
                            max="300" 
                            value={activeSlide.imageScale || 100} 
                            onChange={(e) => onTextChange('imageScale', e.target.value)} 
                            className="flex-1 accent-indigo-500"
                          />
                          <span className="text-white text-[10px] font-bold w-10 text-right">{activeSlide.imageScale || 100}%</span>
                        </div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            onTextChange('imageX', 0);
                            onTextChange('imageY', 0);
                          }}
                          className="flex items-center justify-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg backdrop-blur-md transition-colors text-[10px] font-bold uppercase tracking-wider"
                        >
                          <Move className="w-3 h-3" />
                          Restablecer Posición
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className={`relative pointer-events-auto group w-full max-w-4xl aspect-[21/9] rounded-2xl border-2 border-dashed ${theme.accentBorder} transition-all flex items-center justify-center shadow-lg ${theme.cardBg}`}>
                    <div className={`flex flex-col items-center opacity-60 ${theme.text}`}>
                      <ImageIcon className="w-10 h-10 mb-3" />
                      <span className="text-sm font-semibold tracking-widest uppercase">Agregar Imagen</span>
                    </div>
                    <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity backdrop-blur-sm gap-4 rounded-2xl">
                      <div className="flex w-3/4 max-w-lg gap-2">
                        <input 
                          type="text" 
                          placeholder="Pegar URL de la imagen..." 
                          className="flex-1 px-5 py-3 rounded-xl shadow-2xl bg-white text-slate-900 border-none outline-none ring-2 ring-indigo-500/50 text-sm font-medium"
                          value={activeSlide.imageUrl || ''}
                          onChange={(e) => onTextChange('imageUrl', e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                        />
                        <label className="flex items-center justify-center px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-2xl cursor-pointer text-sm font-semibold transition-colors">
                          Subir Archivo
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = (event) => {
                                  onTextChange('imageUrl', event.target?.result as string);
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

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
