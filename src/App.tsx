import { usePresentation } from './hooks/usePresentation';
import { Header } from './components/Header';
import { LeftSidebar } from './components/LeftSidebar';
import { RightSidebar } from './components/RightSidebar';
import { SlideCanvas } from './components/SlideCanvas';
import { PresentationView } from './components/PresentationView';
import { Slide } from './types';

export default function App() {
  const {
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
  } = usePresentation();

  const handleSlideGenerated = (newSlide: Slide) => {
    setSlides(prev => [...prev, newSlide]);
    setCurrentSlideId(newSlide.id);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden font-sans bg-slate-50 text-slate-900">
      <Header 
        onEnterPreview={() => setIsPreviewMode(true)} 
        slides={slides} 
        onSlideGenerated={handleSlideGenerated}
      />

      <div className="flex flex-1 overflow-hidden">
        <LeftSidebar 
          slides={slides}
          currentSlideId={currentSlideId}
          onAddSlide={addNewSlide}
          onSelectSlide={setCurrentSlideId}
          onMoveSlide={moveSlide}
          onDeleteSlide={deleteSlide}
        />

        <SlideCanvas 
          activeSlide={activeSlide}
          theme={theme}
          onTextChange={handleTextChange}
        />

        <RightSidebar 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          currentTheme={currentTheme}
          setCurrentTheme={setCurrentTheme}
          aiPrompt={aiPrompt}
          setAiPrompt={setAiPrompt}
          onAiSubmit={handleAiSubmit}
        />
      </div>

      {isPreviewMode && (
        <PresentationView 
          slides={slides}
          activeSlideIndex={activeSlideIndex}
          activeSlide={activeSlide}
          theme={theme}
          onClose={() => setIsPreviewMode(false)}
          onNext={() => {
            if (activeSlideIndex < slides.length - 1) setCurrentSlideId(slides[activeSlideIndex + 1].id);
          }}
          onPrev={() => {
            if (activeSlideIndex > 0) setCurrentSlideId(slides[activeSlideIndex - 1].id);
          }}
        />
      )}
    </div>
  );
}
