import { Sparkles } from 'lucide-react';
import { THEMES } from '../lib/constants';

interface RightSidebarProps {
  activeTab: 'edit' | 'themes' | 'ai';
  setActiveTab: (tab: 'edit' | 'themes' | 'ai') => void;
  currentTheme: string;
  setCurrentTheme: (theme: string) => void;
  aiPrompt: string;
  setAiPrompt: (prompt: string) => void;
  onAiSubmit: (e: React.FormEvent) => void;
}

export function RightSidebar({
  activeTab,
  setActiveTab,
  currentTheme,
  setCurrentTheme,
  aiPrompt,
  setAiPrompt,
  onAiSubmit
}: RightSidebarProps) {
  return (
    <aside className="w-80 bg-white border-l border-slate-200 shrink-0 flex flex-col">
      <div className="flex border-b border-slate-200">
        <button 
          onClick={() => setActiveTab('themes')}
          className={`flex-1 py-3 text-xs font-bold tracking-wider text-center border-b-2 transition-all ${activeTab === 'themes' ? 'border-indigo-600 text-slate-900 bg-slate-50' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          PALETAS
        </button>
        <button 
          onClick={() => setActiveTab('ai')}
          className={`flex-1 py-3 text-xs font-bold tracking-wider text-center border-b-2 transition-all ${activeTab === 'ai' ? 'border-indigo-600 text-slate-900 bg-slate-50' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          ASISTENTE IA
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
        
        {/* TAB 1: SELECCIÓN DE TEMAS GLOBALES */}
        {activeTab === 'themes' && (
          <div className="space-y-5">
            <p className="text-[11px] text-slate-500 font-medium">Personaliza el aspecto de tus diapositivas aplicando un tema global al instante.</p>
            {Object.keys(THEMES).map((key) => {
              const th = THEMES[key];
              return (
                <div 
                  key={key}
                  onClick={() => setCurrentTheme(key)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${currentTheme === key ? 'border-indigo-400 bg-indigo-50 ring-2 ring-indigo-600/20 shadow-sm' : 'border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100'}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-800">{th.name}</span>
                    <div className="flex space-x-1">
                      <span className="w-3 h-3 rounded-full bg-slate-900 border border-slate-200 shadow-sm"></span>
                      <span className={`w-3 h-3 rounded-full ${th.bg.split(' ')[0]} border border-slate-200 shadow-sm`}></span>
                      <span className={`w-3 h-3 rounded-full ${th.btnBg.split(' ')[0]} border border-slate-200 shadow-sm`}></span>
                    </div>
                  </div>
                  <div className="mt-2 text-[11px] text-slate-500 font-medium">Estilo: <span className="font-mono text-[10px] bg-white border border-slate-200 px-1.5 py-0.5 rounded text-indigo-600 font-bold">{th.fontClass.replace('font-', '')}</span></div>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 2: SIMULADOR DE ASISTENTE DE DIAPOSITIVAS POR LENGUAJE NATURAL */}
        {activeTab === 'ai' && (
          <div className="space-y-5">
            <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl text-xs text-indigo-800 leading-relaxed font-medium">
              <span className="font-bold flex items-center gap-1.5 mb-1"><Sparkles className="w-4 h-4 text-indigo-600"/> Innovación Zenith</span>
              Describe un tema o sección comercial y el generador de diseño adaptará automáticamente la plantilla correspondiente.
            </div>
            
            <form onSubmit={onAiSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">¿Qué deseas proyectar?</label>
                <textarea 
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="Ej: 'Crear diapositiva de marketing' o 'Tabla financiera'..."
                  className="w-full bg-white border border-slate-200 rounded-lg p-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent min-h-[120px] resize-none shadow-sm"
                  required
                />
              </div>
              <button 
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center space-x-2 shadow-md"
              >
                <Sparkles className="w-4 h-4" />
                <span>GENERAR AUTOMÁTICAMENTE</span>
              </button>
            </form>

            <div className="border-t border-slate-200 pt-4 mt-6">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-3">Sugerencias Rápidas</span>
              <div className="space-y-2">
                <button onClick={() => setAiPrompt('Estrategia de marketing global')} className="w-full text-left p-2.5 rounded-lg bg-slate-50 text-slate-700 text-xs font-medium border border-slate-200 hover:border-slate-300 hover:bg-slate-100 transition-colors flex items-center gap-2">
                  <span className="text-indigo-500">✨</span> Estrategia de marketing
                </button>
                <button onClick={() => setAiPrompt('Precios mensuales de la suite')} className="w-full text-left p-2.5 rounded-lg bg-slate-50 text-slate-700 text-xs font-medium border border-slate-200 hover:border-slate-300 hover:bg-slate-100 transition-colors flex items-center gap-2">
                  <span className="text-indigo-500">✨</span> Precios mensuales
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      <div className="mt-auto p-4 bg-indigo-900 m-4 rounded-xl">
        <h4 className="text-white text-xs font-bold mb-1 flex items-center gap-2">
           <span className="animate-pulse">✨</span> AI Suggested Theme
        </h4>
        <p className="text-indigo-200 text-[10px] mb-3 leading-relaxed">
          Based on your content, try "Clinical Minimalist".
        </p>
        <button onClick={() => setCurrentTheme('clinical')} className="w-full py-1.5 bg-indigo-500 hover:bg-indigo-400 text-white text-[10px] font-bold rounded shadow-inner transition-colors">
          Apply Changes
        </button>
      </div>
    </aside>
  );
}
