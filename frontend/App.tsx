import React, { useState, useRef, useEffect } from 'react';
import { Flower2, Sparkles } from 'lucide-react';
import { Message, Role } from './types';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { TypingIndicator } from './components/TypingIndicator';
import { initChat, sendMessageToBloom } from './services/geminiService';

const INITIAL_MESSAGE: Message = {
    id: 'init-1',
    role: Role.MODEL,
    text: "Hello there. I'm Bloom, your wellness coach. I'm here to offer a listening ear, support your emotional well-being, and help you find a little more balance in your day.\n\nHow are you feeling right now?",
    timestamp: new Date()
};

export default function App() {
    const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Initialize the chat session on mount
        initChat();
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const handleSendMessage = async (text: string) => {
        const newUserMessage: Message = {
            id: Date.now().toString(),
            role: Role.USER,
            text,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newUserMessage]);
        setIsTyping(true);

        try {
            const responseText = await sendMessageToBloom(text);
            
            const newModelMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: Role.MODEL,
                text: responseText,
                timestamp: new Date()
            };
            
            setMessages(prev => [...prev, newModelMessage]);
        } catch (error) {
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: Role.MODEL,
                text: "I'm so sorry, but I'm having a little trouble connecting right now. Please take a deep breath and try sending your message again in a moment.",
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="flex flex-col h-full max-w-4xl mx-auto bg-stone-50 shadow-2xl sm:border-x sm:border-stone-200">
            {/* Header */}
            <header className="bg-white border-b border-stone-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <div className="bg-rose-100 p-2 rounded-xl text-rose-600">
                        <Flower2 size={24} />
                    </div>
                    <div>
                        <h1 className="text-xl font-semibold text-stone-800 tracking-tight">Bloom</h1>
                        <p className="text-xs text-stone-500 font-medium">Wellness Selfcare Coach</p>
                    </div>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-xs text-teal-600 bg-teal-50 px-3 py-1.5 rounded-full font-medium">
                    <Sparkles size={14} />
                    <span>Here for you</span>
                </div>
            </header>

            {/* Chat Area */}
            <main className="flex-1 overflow-y-auto p-4 sm:p-6 scroll-smooth">
                <div className="max-w-3xl mx-auto">
                    {/* Welcome Banner */}
                    <div className="mb-8 text-center">
                        <div className="inline-block bg-white border border-stone-200 rounded-2xl px-6 py-4 shadow-sm">
                            <p className="text-sm text-stone-600">
                                This is a safe space. Take a deep breath, relax your shoulders, and let's chat.
                            </p>
                        </div>
                    </div>

                    {/* Messages */}
                    {messages.map((msg) => (
                        <ChatMessage key={msg.id} message={msg} />
                    ))}
                    
                    {isTyping && <TypingIndicator />}
                    
                    <div ref={messagesEndRef} className="h-4" />
                </div>
            </main>

            {/* Input Area */}
            <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
        </div>
    );
}
