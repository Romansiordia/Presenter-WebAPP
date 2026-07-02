import { Plus, ChevronUp, ChevronDown, Trash } from 'lucide-react';
import { Slide, SlideLayout } from '../types';

interface LeftSidebarProps {
  slides: Slide[];
  currentSlideId: string;
  onAddSlide: (layout: SlideLayout) => void;
  onSelectSlide: (id: string) => void;
  onMoveSlide: (index: number, direction: 'up' | 'down') => void;
  onDeleteSlide: (id: string) => void;
}

export function LeftSidebar({
  slides,
  currentSlideId,
  onAddSlide,
  onSelectSlide,
  onMoveSlide,
  onDeleteSlide
}: LeftSidebarProps) {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0 overflow-hidden">
      <div className="p-4 border-b border-slate-200 flex items-center justify-between">
        <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Diapositivas ({slides.length})</span>
        <div className="flex space-x-1">
          <button 
            onClick={() => onAddSlide('title')} 
            title="Añadir Diapositiva"
            className="p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-700 rounded-md transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
        {slides.map((s, idx) => (
          <div 
            key={s.id}
            onClick={() => onSelectSlide(s.id)}
            className={`group relative p-3 rounded-lg border cursor-pointer transition-all ${
              s.id === currentSlideId 
                ? 'bg-indigo-50 border-indigo-400 text-indigo-900 shadow-sm' 
                : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-800'
            }`}
          >
            <div className="flex items-start justify-between">
              <span className={`text-[10px] font-bold ${s.id === currentSlideId ? 'text-indigo-600' : 'text-slate-400'}`}>
                {idx + 1}
              </span>
              <span className={`text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded font-bold ${
                s.id === currentSlideId ? 'bg-white border-indigo-200 text-indigo-600' : 'bg-white border-slate-200 text-slate-500 border'
              }`}>
                {s.layout}
              </span>
            </div>
            <div className="mt-2 font-semibold text-xs truncate max-w-[150px]">
              {s.title || "Sin título"}
            </div>
            
            <div className="absolute right-2 bottom-2 hidden group-hover:flex space-x-1 bg-white p-1 rounded-md border border-slate-200 shadow-sm">
              <button 
                onClick={(e) => { e.stopPropagation(); onMoveSlide(idx, 'up'); }}
                className="p-0.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded"
                title="Subir"
              >
                <ChevronUp className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); onMoveSlide(idx, 'down'); }}
                className="p-0.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded"
                title="Bajar"
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); onDeleteSlide(s.id); }}
                className="p-0.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded"
                title="Eliminar"
              >
                <Trash className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
        <button 
          onClick={() => onAddSlide('title')}
          className="w-full py-4 border-2 border-dashed border-slate-200 rounded-lg flex items-center justify-center text-slate-400 hover:border-slate-300 hover:text-slate-500 hover:bg-slate-50 transition-all"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="p-3 border-t border-slate-200 bg-slate-50">
        <div className="grid grid-cols-2 gap-2 mb-2">
          <button onClick={() => onAddSlide('title')} className="text-[10px] py-1.5 font-semibold bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 rounded shadow-sm text-center">Títulos</button>
          <button onClick={() => onAddSlide('features')} className="text-[10px] py-1.5 font-semibold bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 rounded shadow-sm text-center">Tarjetas</button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button onClick={() => onAddSlide('metrics')} className="text-[10px] py-1.5 font-semibold bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 rounded shadow-sm text-center">Métricas</button>
          <button onClick={() => onAddSlide('image')} className="text-[10px] py-1.5 font-semibold bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 rounded shadow-sm text-center">Imagen</button>
        </div>
      </div>
    </aside>
  );
}
