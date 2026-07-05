import pptxgen from "pptxgenjs";
import { Slide } from "../types";

async function getBase64ImageFromUrl(imageUrl: string): Promise<string | null> {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) return null;
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.warn("Could not fetch image for PPTX export due to CORS or network error:", error);
    return null;
  }
}

export async function exportToPowerPoint(slides: Slide[]) {
  try {
    const pres = new pptxgen();
    
    // Set layout
    pres.layout = 'LAYOUT_16x9';

    for (const s of slides) {
      let slide = pres.addSlide();
      
      // Add Background if present
      try {
        if (s.backgroundImage) {
          const base64 = await getBase64ImageFromUrl(s.backgroundImage);
          if (base64) {
            slide.background = { data: base64 };
          } else if (s.backgroundColor) {
            const hexColor = s.backgroundColor.startsWith('#') ? s.backgroundColor.substring(1) : s.backgroundColor;
            slide.background = { color: hexColor };
          }
        } else if (s.backgroundColor) {
          const hexColor = s.backgroundColor.startsWith('#') ? s.backgroundColor.substring(1) : s.backgroundColor;
          slide.background = { color: hexColor };
        }
      } catch (e) {
        console.error("Could not add background to PPTX", e);
      }

      // Add Title
      slide.addText(s.title || "", { 
        x: 0.5, 
        y: 0.5, 
        w: "90%", 
        h: 1, 
        fontSize: 32, 
        bold: true, 
        color: "0f172a" 
      });
      
      // Add Subtitle
      slide.addText(s.subtitle || "", { 
        x: 0.5, 
        y: 1.5, 
        w: "90%", 
        h: 0.5, 
        fontSize: 18, 
        color: "64748b" 
      });

      if (s.layout === 'bullets') {
         const bulletOptions = (s.bullets || []).map(b => ({ text: b, options: { bullet: true, color: '334155', fontSize: 18 } }));
         slide.addText(bulletOptions, { 
           x: 0.5, 
           y: 2.2, 
           w: "90%", 
           h: 4, 
           align: 'left',
           valign: 'top'
         });
      } 
      else if (s.layout === 'features') {
         (s.features || []).forEach((f, idx) => {
            const xPos = 0.5 + (idx % 3) * 3;
            const yPos = 2.5 + Math.floor(idx / 3) * 2;
            
            slide.addShape(pres.ShapeType.rect, {
              x: xPos, y: yPos, w: 2.8, h: 1.5, fill: { color: "f8fafc" }, line: { color: "e2e8f0", width: 1 }
            });

            slide.addText(
              [
                { text: f.title + "\n", options: { bold: true, fontSize: 14, color: "0f172a" } },
                { text: f.desc, options: { fontSize: 11, color: "64748b" } }
              ], 
              { x: xPos, y: yPos, w: 2.8, h: 1.5, align: "center", valign: "middle" }
            );
         });
      } 
      else if (s.layout === 'metrics') {
         (s.metrics || []).forEach((m, idx) => {
            const xPos = 0.5 + (idx % 2) * 4.5;
            slide.addText(m.number, { 
              x: xPos, y: 2.5, w: 4, h: 1.5, 
              fontSize: 64, bold: true, color: "4f46e5", align: "center" 
            });
            slide.addText(m.label, { 
              x: xPos, y: 4.0, w: 4, h: 0.5, 
              fontSize: 14, color: "64748b", align: "center", bold: true
            });
         });
      } 
      else if (s.layout === 'image' && s.imageUrl) {
         try {
           const base64 = await getBase64ImageFromUrl(s.imageUrl);
           if (base64) {
             slide.addImage({ 
               data: base64, 
               x: 0.5, 
               y: 2.2, 
               w: 9, 
               h: 5, 
               sizing: { type: 'contain', w: 9, h: 5 } 
             });
           }
         } catch (e) {
           console.error("Could not add image to PPTX", e);
         }
      }
    }

    // Save the presentation
    await pres.writeFile({ fileName: "Zenith_Presentation.pptx" });
  } catch (error) {
    console.error("Error exporting to PowerPoint:", error);
    alert("Hubo un error al exportar la presentación. Es posible que algunas imágenes tengan restricciones de acceso (CORS) que impidan su descarga.");
  }
}
