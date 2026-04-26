import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
    onSendMessage: (message: string) => void;
    disabled: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled }) => {
    const [input, setInput] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleSend = () => {
        if (input.trim() && !disabled) {
            onSendMessage(input.trim());
            setInput('');
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto';
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
        }
    }, [input]);

    return (
        <div className="bg-white border-t border-stone-200 p-4 sm:p-6">
            <div className="max-w-3xl mx-auto relative flex items-end gap-2">
                <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Share what's on your mind..."
                    disabled={disabled}
                    className="w-full bg-stone-50 border border-stone-200 rounded-2xl py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 resize-none overflow-y-auto min-h-[52px] max-h-[120px] transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                    rows={1}
                />
                <button
                    onClick={handleSend}
                    disabled={!input.trim() || disabled}
                    className="absolute right-2 bottom-2 p-2 rounded-xl bg-teal-600 text-white hover:bg-teal-700 disabled:bg-stone-200 disabled:text-stone-400 transition-colors flex-shrink-0"
                    aria-label="Send message"
                >
                    <Send size={18} className={input.trim() && !disabled ? 'translate-x-0.5 -translate-y-0.5 transition-transform' : ''} />
                </button>
            </div>
            <div className="text-center mt-2">
                <p className="text-xs text-stone-400">Bloom is an AI coach, not a medical professional. For emergencies, please contact a crisis line.</p>
            </div>
        </div>
    );
};
