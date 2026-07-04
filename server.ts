import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/generate-slide", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY environment variable is required");
      }

      const { prompt } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
      }

      const ai = new GoogleGenAI({ apiKey });

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `You are an AI assistant that generates presentation slide content based on a user's dictation.
Based on the following dictation, create a single presentation slide in JSON format.
The JSON should match this schema (Slide):
{
  "id": "slide-id", // generate a random string ID
  "layout": "title" | "bullets" | "features" | "metrics" | "image" | "freeform",
  "title": "Main title of the slide",
  "subtitle": "Subtitle or brief description",
  "features": [ // Include only if layout is 'features', 'bullets'
    { "icon": "lucide-icon-name", "title": "Feature Title", "description": "Feature description" }
  ],
  "metrics": [ // Include only if layout is 'metrics'
    { "value": "100%", "label": "Metric Label" }
  ],
  "elements": [] // Leave empty
}

Dictation: "${prompt}"

Respond ONLY with valid JSON. Do not use markdown blocks like \`\`\`json. Just the raw JSON object.`
              }
            ]
          }
        ],
        config: {
          responseMimeType: "application/json"
        }
      });

      if (!response.text) {
        throw new Error("No text returned from Gemini");
      }

      const slideData = JSON.parse(response.text);
      // add a unique ID
      slideData.id = `slide-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

      res.json(slideData);

    } catch (error: any) {
      console.error("Error generating slide:", error);
      res.status(500).json({ error: error.message || "Failed to generate slide" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
