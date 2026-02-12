
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getCulturalInsight = async (cultureName: string, question: string, history: ChatMessage[]) => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: `Eres un experto historiador y antropólogo especializado en las culturas indígenas del estado de Guerrero, México (Me'phaa, Na Savi, Nahuatl y Mñondaa). 
        Tu objetivo es proporcionar información precisa, respetuosa y enriquecedora sobre sus lenguas, tradiciones, historia y cosmovisión. 
        Responde siempre en español y mantén un tono educativo y apreciativo de la diversidad cultural. 
        Si el usuario pregunta algo fuera de este contexto cultural de Guerrero, redirige gentilmente la conversación hacia estas cuatro culturas.`,
      },
    });

    // We only send the message, chat manages history if we keep the instance, 
    // but here we are creating a new one or we could pass the whole history to contents if needed.
    // For simplicity in this SPA, we use sendMessage.
    const response = await chat.sendMessage({ message: `Hablando de la cultura ${cultureName}: ${question}` });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Lo siento, hubo un error al consultar a nuestro guía cultural. Por favor intenta de nuevo.";
  }
};
