import { useState, useCallback, useEffect } from 'react';
import { Slide, SlideLayout } from '../types';
import { INITIAL_SLIDES, THEMES } from '../lib/constants';

export function usePresentation() {
  const [slides, setSlides] = useState<Slide[]>(INITIAL_SLIDES);
  const [currentSlideId, setCurrentSlideId] = useState<string>('slide-1');
  const [currentTheme, setCurrentTheme] = useState<string>('clinical');
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false);
  const [aiPrompt, setAiPrompt] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'edit' | 'themes' | 'ai'>('edit');

  const activeSlideIndex = slides.findIndex((s) => s.id === currentSlideId);
  const activeSlide = slides[activeSlideIndex] || slides[0];
  const theme = THEMES[currentTheme];

  const handleTextChange = useCallback(
    (field: keyof Slide, value: any, index: number | null = null, subfield: string | null = null) => {
      setSlides((prev) => {
        const updated = [...prev];
        const slide = { ...updated[activeSlideIndex] };
        
        if (index !== null) {
          if (subfield) {
            // @ts-ignore
            slide[field][index] = { ...slide[field][index], [subfield]: value };
          } else {
            // @ts-ignore
            const newArray = [...slide[field]];
            newArray[index] = value;
            // @ts-ignore
            slide[field] = newArray;
          }
        } else {
          // @ts-ignore
          slide[field] = value;
        }
        
        updated[activeSlideIndex] = slide;
        return updated;
      });
    },
    [activeSlideIndex]
  );

  const addNewSlide = useCallback((layout: SlideLayout = 'title') => {
    const newId = `slide-${Date.now()}`;
    const newSlide: Slide = {
      id: newId,
      layout,
      title: 'Título de la Nueva Diapositiva',
      subtitle: 'Descripción o subtítulo secundario explicativo',
      bullets: layout === 'bullets' ? ['Primer punto crítico del análisis.', 'Segundo punto relevante a destacar.'] : [],
      metrics: layout === 'metrics' ? [{ number: '85%', label: 'Incremento Neto' }] : [],
      features: layout === 'features' ? [
        { icon: 'activity', title: 'Característica A', desc: 'Breve descripción del elemento.' },
        { icon: 'target', title: 'Característica B', desc: 'Breve descripción del elemento.' }
      ] : [],
      imageUrl: layout === 'image' ? 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80' : undefined
    };
    setSlides((prev) => [...prev, newSlide]);
    setCurrentSlideId(newId);
  }, []);

  const deleteSlide = useCallback((id: string) => {
    setSlides((prev) => {
      if (prev.length <= 1) {
        alert("Debe quedar al menos una diapositiva en la suite.");
        return prev;
      }
      const remaining = prev.filter((s) => s.id !== id);
      if (currentSlideId === id) {
        setCurrentSlideId(remaining[0].id);
      }
      return remaining;
    });
  }, [currentSlideId]);

  const moveSlide = useCallback((index: number, direction: 'up' | 'down') => {
    setSlides((prev) => {
      if (direction === 'up' && index === 0) return prev;
      if (direction === 'down' && index === prev.length - 1) return prev;
      
      const newSlides = [...prev];
      const swapWith = direction === 'up' ? index - 1 : index + 1;
      const temp = newSlides[index];
      newSlides[index] = newSlides[swapWith];
      newSlides[swapWith] = temp;
      
      return newSlides;
    });
  }, []);

  const handleAiSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const prompt = aiPrompt.toLowerCase();
    
    let newSlide: Slide;
    const newId = `slide-${Date.now()}`;

    if (prompt.includes('marketing') || prompt.includes('mercado') || prompt.includes('ventas')) {
      newSlide = {
        id: newId,
        layout: 'features',
        title: 'Estrategia de Crecimiento de Ventas',
        subtitle: 'Propuesta de canales para el trimestre actual',
        bullets: [],
        metrics: [],
        features: [
          { icon: 'trending-up', title: 'Inbound Marketing', desc: 'Creación de contenido educativo de alta conversión.' },
          { icon: 'users', title: 'Canales Sociales', desc: 'Anuncios hiper-segmentados con audiencias demográficas.' },
          { icon: 'mail', title: 'Campañas Directas', desc: 'Fidelización automática mediante correos con disparadores.' }
        ]
      };
      alert("¡Diapositiva de Marketing Inteligente Generada con Éxito!");
    } else if (prompt.includes('precio') || prompt.includes('costo') || prompt.includes('financiero') || prompt.includes('tabla')) {
      newSlide = {
        id: newId,
        layout: 'metrics',
        title: 'Estructura de Precios Propuesta',
        subtitle: 'Comparativa de planes de suscripción anual',
        bullets: [],
        metrics: [
          { number: '$29/mo', label: 'Plan Startup' },
          { number: '$99/mo', label: 'Plan Enterprise' }
        ],
        features: []
      };
      alert("¡Estructura de Precios Generada!");
    } else {
      newSlide = {
        id: newId,
        layout: 'bullets',
        title: aiPrompt.charAt(0).toUpperCase() + aiPrompt.slice(1),
        subtitle: 'Estructura inteligente sugerida para responder a la solicitud',
        bullets: [
          'Punto de partida y desglose del tema introducido.',
          'Análisis detallado de ventajas competitivas derivadas.',
          'Siguientes pasos de implementación y conclusiones.'
        ],
        metrics: [],
        features: []
      };
      alert("¡Diapositiva estructurada generada!");
    }

    setSlides((prev) => [...prev, newSlide]);
    setCurrentSlideId(newId);
    setAiPrompt('');
  }, [aiPrompt]);

  // Handle Presentation Mode keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPreviewMode) return;
      if (e.key === 'ArrowRight' || e.key === ' ') {
        if (activeSlideIndex < slides.length - 1) {
          setCurrentSlideId(slides[activeSlideIndex + 1].id);
        }
      }
      if (e.key === 'ArrowLeft') {
        if (activeSlideIndex > 0) {
          setCurrentSlideId(slides[activeSlideIndex - 1].id);
        }
      }
      if (e.key === 'Escape') {
        setIsPreviewMode(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPreviewMode, activeSlideIndex, slides]);

  return {
    slides,
    setSlides,
    currentSlideId,
    setCurrentSlideId,
    currentTheme,
    setCurrentTheme,
    isPreviewMode,
    setIsPreviewMode,
    aiPrompt,
    setAiPrompt,
    activeTab,
    setActiveTab,
    activeSlide,
    activeSlideIndex,
    theme,
    handleTextChange,
    addNewSlide,
    deleteSlide,
    moveSlide,
    handleAiSubmit,
  };
}
