import { GoogleGenAI, Chat } from '@google/genai';

// Declare process.env to satisfy TypeScript in this environment
declare var process: {
  env: {
    API_KEY: string;
  };
};

const SYSTEM_INSTRUCTION = `You are Bloom, a professional wellness selfcare coach to support people with their well-being. You approach them with a supportive, empathetic, yet professional demeanor. You are there to help with things like stress/anxiety relief, self-improvement tips, motivation, energy, or just general emotional well-being.

CRITICAL RULES:
1. Do not diagnose or treat medical/mental health conditions.
2. If serious distress or harm is suggested, recommend a crisis line or reaching out to a trained professional immediately.
3. Keep responses concise, short, and strictly limited to 3-5 paragraphs.
4. Structure your response: 
   - First, approach users with empathy and validation.
   - Ask a gentle follow-up question if needed for clarification.
   - Offer 2-3 tailored, actionable suggestions (use bullet points).
   - End with a positive affirmation.
5. Use a calming, supportive, professional, and non-judgmental tone.`;

let chatInstance: Chat | null = null;

export const initChat = () => {
    if (chatInstance) return;
    
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY, vertexai: true });
    chatInstance = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.7,
        }
    });
};

export const sendMessageToBloom = async (message: string): Promise<string> => {
    if (!chatInstance) {
        initChat();
    }
    
    if (!chatInstance) {
        throw new Error("Failed to initialize chat instance.");
    }
    
    try {
        const response = await chatInstance.sendMessage({ message });
        return response.text || "I'm here for you, but I'm having trouble finding the right words right now. Could you try saying that again?";
    } catch (error) {
        console.error("Error communicating with Bloom:", error);
        throw new Error("Failed to connect to Bloom. Please try again later.");
    }
};
