import { useState, useCallback, useRef } from 'react';
import { Mic, Loader2 } from 'lucide-react';
import { Slide } from '../types';

interface DictationButtonProps {
  onSlideGenerated: (slide: Slide) => void;
}

export function DictationButton({ onSlideGenerated }: DictationButtonProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const recognitionRef = useRef<any>(null);

  const startDictation = useCallback(() => {
    // @ts-ignore
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Tu navegador no soporta la API de reconocimiento de voz. Intenta usar Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'es-ES'; // Spanish by default as per conversation
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onresult = async (event: any) => {
      const transcript = event.results[0][0].transcript;
      setIsRecording(false);
      setIsGenerating(true);

      try {
        const response = await fetch('/api/generate-slide', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: transcript }),
        });

        if (!response.ok) {
          throw new Error('Error al generar la diapositiva');
        }

        const slideData = await response.json();
        onSlideGenerated(slideData);
      } catch (error) {
        console.error(error);
        alert("Hubo un error al procesar el dictado.");
      } finally {
        setIsGenerating(false);
      }
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      setIsRecording(false);
      alert("Error en el reconocimiento de voz: " + event.error);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  }, [onSlideGenerated]);

  const stopDictation = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  }, []);

  return (
    <button 
      onClick={isRecording ? stopDictation : startDictation}
      disabled={isGenerating}
      className={`flex items-center space-x-2 px-4 py-1.5 rounded-md text-sm font-semibold transition-colors shadow-sm ${
        isRecording 
          ? 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 animate-pulse'
          : isGenerating
            ? 'bg-slate-100 text-slate-500 border border-slate-200 cursor-not-allowed'
            : 'bg-white border border-slate-200 hover:bg-slate-50 text-slate-700'
      }`}
      title="Dictar una diapositiva nueva"
    >
      {isGenerating ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Mic className="w-4 h-4" />
      )}
      <span>{isRecording ? 'Escuchando...' : isGenerating ? 'Generando...' : 'Dictar'}</span>
    </button>
  );
}
