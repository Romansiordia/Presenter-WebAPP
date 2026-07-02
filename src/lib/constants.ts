import { Theme, Slide } from '../types';

export const THEMES: Record<string, Theme> = {
  clinical: {
    name: 'Clean White',
    bg: 'bg-white',
    cardBg: 'bg-slate-50',
    text: 'text-slate-900',
    accent: 'text-indigo-600',
    accentBg: 'bg-indigo-600',
    accentBorder: 'border-slate-200',
    btnBg: 'bg-indigo-600',
    badge: 'text-indigo-600 bg-indigo-50 border-indigo-100',
    fontClass: 'font-sans'
  },
  terracotta: {
    name: 'Warm Paper',
    bg: 'bg-[#faf9f6]',
    cardBg: 'bg-orange-50/50',
    text: 'text-stone-900',
    accent: 'text-orange-600',
    accentBg: 'bg-orange-600',
    accentBorder: 'border-orange-200/50',
    btnBg: 'bg-orange-600',
    badge: 'text-orange-700 bg-orange-100 border-orange-200',
    fontClass: 'font-serif'
  },
  cyberpunk: {
    name: 'Dark Slate',
    bg: 'bg-slate-900',
    cardBg: 'bg-slate-800/80',
    text: 'text-white',
    accent: 'text-sky-400',
    accentBg: 'bg-sky-400',
    accentBorder: 'border-slate-700',
    btnBg: 'bg-sky-500',
    badge: 'text-sky-300 bg-sky-900/50 border-sky-800',
    fontClass: 'font-display'
  },
  elegant: {
    name: 'Navy Minimal',
    bg: 'bg-[#f4f7f9]',
    cardBg: 'bg-white',
    text: 'text-slate-800',
    accent: 'text-blue-600',
    accentBg: 'bg-blue-600',
    accentBorder: 'border-blue-100',
    btnBg: 'bg-blue-600',
    badge: 'text-blue-700 bg-blue-100 border-blue-200',
    fontClass: 'font-display'
  }
};

export const INITIAL_SLIDES: Slide[] = [
  {
    id: 'slide-1',
    layout: 'title',
    title: 'El Futuro de la IA Generativa',
    subtitle: 'Transformación del trabajo en la era de los agentes inteligentes',
    bullets: [],
    metrics: [],
    features: []
  },
  {
    id: 'slide-2',
    layout: 'features',
    title: 'Los 3 Pilares del Cambio',
    subtitle: 'Cómo los nuevos modelos transforman los flujos corporativos',
    bullets: [],
    metrics: [],
    features: [
      { icon: 'zap', title: 'Automatización Cognitiva', desc: 'Tareas complejas resueltas en milisegundos con IA multitarea.' },
      { icon: 'shield', title: 'Seguridad Aislada', desc: 'Modelos de lenguaje ejecutados localmente sin fugas de datos corporativos.' },
      { icon: 'sparkles', title: 'Personalización Extrema', desc: 'Respuestas adaptadas a la voz, tono e historial de cada cliente único.' }
    ]
  },
  {
    id: 'slide-3',
    layout: 'metrics',
    title: 'Impacto Cuantificable',
    subtitle: 'Resultados promedio medidos tras la integración del ecosistema',
    bullets: [],
    metrics: [
      { number: '+300%', label: 'Eficiencia Operativa' },
      { number: '-45%', label: 'Costos de Soporte' }
    ],
    features: []
  },
  {
    id: 'slide-4',
    layout: 'bullets',
    title: 'Hoja de Ruta Tecnológica',
    subtitle: 'Pasos críticos para la adopción ágil en organizaciones modernas',
    bullets: [
      'Evaluación inicial de infraestructura de datos y fuentes de información.',
      'Pruebas piloto aisladas en departamentos de soporte técnico y atención al cliente.',
      'Capacitación continua de empleados con metodologías de Prompt Engineering.',
      'Integración completa mediante arquitecturas distribuidas en la nube híbrida.'
    ],
    metrics: [],
    features: []
  }
];
