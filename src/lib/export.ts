import pptxgen from "pptxgenjs";
import { Slide } from "../types";
import { getAccessToken, googleSignIn } from "./auth";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { createRoot } from "react-dom/client";
import { PresentationView } from "../components/PresentationView";

async function getBase64ImageFromUrl(imageUrl: string): Promise<string | null> {
  const fetchAsBase64 = async (url: string): Promise<string> => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  try {
    return await fetchAsBase64(imageUrl);
  } catch (error) {
    console.warn("Direct fetch failed, trying CORS proxies...", error);
    try {
      const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(imageUrl)}`;
      return await fetchAsBase64(proxyUrl);
    } catch (proxyError) {
      try {
        const proxyUrl2 = `https://api.allorigins.win/raw?url=${encodeURIComponent(imageUrl)}`;
        return await fetchAsBase64(proxyUrl2);
      } catch (proxyError2) {
        console.warn("All image fetch attempts failed:", proxyError2);
        return null;
      }
    }
  }
}

async function generatePptx(slides: Slide[]): Promise<pptxgen> {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';

  for (const s of slides) {
    let slide = pres.addSlide();
    
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

    slide.addText(s.title || "", { 
      x: 0.5, y: 0.5, w: "90%", h: 1, fontSize: 32, bold: true, color: "0f172a" 
    });
    
    slide.addText(s.subtitle || "", { 
      x: 0.5, y: 1.5, w: "90%", h: 0.5, fontSize: 18, color: "64748b" 
    });

    if (s.layout === 'bullets') {
       const bulletOptions = (s.bullets || []).map(b => ({ text: b, options: { bullet: true, color: '334155', fontSize: 18 } }));
       slide.addText(bulletOptions, { 
         x: 0.5, y: 2.2, w: "90%", h: 4, align: 'left', valign: 'top'
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
             data: base64, x: 0.5, y: 2.2, w: 9, h: 5, sizing: { type: 'contain', w: 9, h: 5 } 
           });
         }
       } catch (e) {
         console.error("Could not add image to PPTX", e);
       }
    }
  }
  return pres;
}

export async function exportToPowerPoint(slides: Slide[]) {
  try {
    const pres = await generatePptx(slides);
    await pres.writeFile({ fileName: "Zenith_Presentation.pptx" });
  } catch (error) {
    console.error("Error exporting to PowerPoint:", error);
    alert("Hubo un error al exportar la presentación.");
  }
}

export async function saveToGoogleDrive(slides: Slide[]) {
  try {
    let token = await getAccessToken();
    if (!token) {
      const authResult = await googleSignIn();
      if (authResult) {
        token = authResult.accessToken;
      } else {
        return;
      }
    }

    const pres = await generatePptx(slides);
    const blob = (await pres.write('blob')) as Blob;

    const metadata = {
      name: 'Zenith_Presentation.pptx',
      mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    };

    const form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    form.append('file', blob);

    const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: form
    });

    if (!response.ok) {
      throw new Error(`Google Drive API error: ${response.status}`);
    }

    alert('¡Guardado exitosamente en Google Drive!');
  } catch (error) {
    console.error("Error saving to Google Drive:", error);
    alert("Hubo un error al guardar en Google Drive.");
  }
}

export async function exportToPDF(slides: Slide[]) {
  alert("Esta función generará un PDF básico con el contenido de las diapositivas.");
  try {
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'in',
      format: [13.33, 7.5] // 16:9 ratio
    });

    for (let i = 0; i < slides.length; i++) {
      const s = slides[i];
      if (i > 0) pdf.addPage();
      
      if (s.backgroundColor) {
        pdf.setFillColor(s.backgroundColor);
        pdf.rect(0, 0, 13.33, 7.5, 'F');
      }
      
      pdf.setTextColor('#0f172a');
      pdf.setFontSize(32);
      pdf.text(s.title || '', 0.5, 1);
      
      pdf.setTextColor('#64748b');
      pdf.setFontSize(18);
      pdf.text(s.subtitle || '', 0.5, 1.5);
      
      if (s.layout === 'bullets' && s.bullets) {
        pdf.setTextColor('#334155');
        pdf.setFontSize(18);
        s.bullets.forEach((b, idx) => {
          pdf.text(`• ${b}`, 0.5, 2.5 + (idx * 0.4));
        });
      }
    }
    pdf.save("Zenith_Presentation.pdf");
  } catch (error) {
    console.error("Error exporting to PDF:", error);
    alert("Hubo un error al exportar a PDF.");
  }
}
