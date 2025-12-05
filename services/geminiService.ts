import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { AnalysisResult, FighterResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Helper to clean JSON string if the model returns markdown code blocks
const cleanJson = (text: string): string => {
  return text.replace(/^```json\s*/, '').replace(/\s*```$/, '');
};

export const decodeLetter = async (base64Image: string): Promise<AnalysisResult> => {
  const prompt = `
    You are a salty, experienced Veteran Advocate and NCO. 
    Analyze this VA letter image. 
    
    Output strictly valid JSON with the following structure:
    {
      "bluf": "A Bottom Line Up Front summary. Extremely direct. No fluff. Tell the soldier exactly what the decision was.",
      "deadlines": ["List of specific dates or timeframes (e.g., 'Appeal within 1 year', 'Evidence due by Oct 12')"],
      "nextSteps": ["Tactical, numbered steps on what to do next. Imperative mood."]
    }

    If the image is blurry or unreadable, return a BLUF stating that.
    Do not be polite. Be tactical and precise.
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg', // Assuming jpeg for simplicity, though standard input handles this
              data: base64Image,
            },
          },
          { text: prompt },
        ],
      },
      config: {
        responseMimeType: "application/json",
      }
    });

    const text = response.text || "{}";
    return JSON.parse(text) as AnalysisResult;
  } catch (error) {
    console.error("Gemini Decode Error:", error);
    throw new Error("SCAN FAILURE: COULD NOT DECRYPT INTEL.");
  }
};

export const fightClaim = async (userIssue: string): Promise<FighterResult> => {
  const prompt = `
    You are a VA Claims Expert and Lawyer.
    The user is a veteran describing their issue: "${userIssue}".
    
    Translate this into professional, legalistic language suitable for a VA Form 21-4138 (Statement in Support of Claim) or a Higher-Level Review argument.
    
    Output strictly valid JSON:
    {
      "professionalText": "The exact paragraph they should copy and paste. Use phrases like 'service-connection', 'nexus', 'aggravation', 'more likely than not'. Cite CFR title 38 if relevant.",
      "regulations": ["List of likely relevant CFR codes or M21-1 manual references"]
    }
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const text = response.text || "{}";
    return JSON.parse(text) as FighterResult;
  } catch (error) {
    console.error("Gemini Fighter Error:", error);
    throw new Error("COMM FAILURE: UNABLE TO GENERATE COUNTER-MEASURE.");
  }
};

export const getBattleBuddyMessage = async (context: string): Promise<string> => {
  const prompt = `
    Act as a "Battle Buddy" - a fellow veteran who has been there.
    The user is likely in crisis or extremely frustrated with the VA bureaucracy.
    
    Current Context: ${context}
    
    Give me a short, punchy message of support.
    - No "wellness" fluff.
    - No generic "I'm sorry".
    - Use military camaraderie tone.
    - Remind them they survived worse than paperwork.
    - Keep it under 50 words.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "Hold the line. We got this.";
  } catch (error) {
    return "Comm check. Stay fast.";
  }
};