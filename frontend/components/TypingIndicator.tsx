import React from 'react';
import { Flower2 } from 'lucide-react';

export const TypingIndicator: React.FC = () => {
    return (
        <div className="flex w-full mb-6 justify-start">
            <div className="flex max-w-[85%] md:max-w-[75%] flex-row">
                <div className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center mt-1 mr-3 bg-rose-100 text-rose-600">
                    <Flower2 size={18} />
                </div>
                <div className="px-5 py-4 rounded-2xl shadow-sm bg-white border border-stone-100 rounded-tl-sm flex items-center gap-1">
                    <div className="w-2 h-2 bg-stone-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-stone-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-stone-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
            </div>
        </div>
    );
};
