
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { Message, Role } from "../types";

const API_KEY = process.env.API_KEY || "";

export const sendMessageToGemini = async (
  history: Message[],
  userInput: string,
  systemInstruction: string
): Promise<string> => {
  if (!API_KEY) {
    throw new Error("API Key is missing. Please ensure process.env.API_KEY is configured.");
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  // Format history for Gemini's Chat interface
  // We exclude system and filter only valid roles
  const formattedHistory = history
    .filter(m => m.role === Role.USER || m.role === Role.MODEL)
    .map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

  const chat: Chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction,
      temperature: 0.7,
      topP: 0.9,
    },
    // Gemini 3 Flash is very fast, perfect for a blog widget
  });

  // Note: For some reason standard chat history injection in the create call 
  // can be tricky in certain versions of SDK, we often start fresh or pass history.
  // Here we use sendMessage directly.
  
  try {
    const result: GenerateContentResponse = await chat.sendMessage({ 
      message: userInput 
    });
    return result.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Maaf, terjadi kesalahan koneksi dengan AI. Silakan coba lagi nanti.";
  }
};
