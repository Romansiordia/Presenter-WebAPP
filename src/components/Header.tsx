import { Presentation, Play, Download } from 'lucide-react';
import { Slide } from '../types';
import { exportToPowerPoint } from '../lib/export';

interface HeaderProps {
  onEnterPreview: () => void;
  slides: Slide[];
}

export function Header({ onEnterPreview, slides }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 h-14 bg-white border-b border-slate-200 shrink-0 z-20 shadow-sm">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center shadow-sm">
          <Presentation className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-display font-bold text-sm tracking-wide text-slate-900 uppercase">Zenith</span>
            <span className="text-[10px] bg-slate-100 border border-slate-200 text-slate-500 px-2 py-0.5 rounded uppercase font-bold">Auto-Saved</span>
          </div>
          <p className="text-[11px] text-slate-500 font-medium">Plataforma de Diseño Inteligente</p>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <div className="relative group">
          <button 
            className="flex items-center space-x-2 bg-white border border-slate-200 hover:bg-slate-50 px-4 py-1.5 rounded-md text-sm font-semibold text-slate-700 transition-colors shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Guardar</span>
          </button>
          
          <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-slate-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
            <div className="p-1">
              <button 
                onClick={() => exportToPowerPoint(slides)}
                className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-indigo-600 rounded-sm font-medium"
              >
                Formato (.pptx)
              </button>
              <button 
                onClick={() => exportToPowerPoint(slides)}
                className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-indigo-600 rounded-sm font-medium"
                title="Generado internamente como pptx compatible con todas las versiones modernas"
              >
                Formato (.ppt)
              </button>
            </div>
          </div>
        </div>

        <button 
          onClick={onEnterPreview}
          className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 px-4 py-1.5 rounded-md text-sm font-semibold text-white transition-colors shadow-md"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>Present</span>
        </button>
        <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300 ml-2 overflow-hidden flex items-center justify-center text-xs font-bold text-slate-500">
          JD
        </div>
      </div>
    </header>
  );
}
