import React from 'react';
import ReactMarkdown from 'react-markdown';
import { User, Flower2 } from 'lucide-react';
import { Message, Role } from '../types';

interface ChatMessageProps {
    message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
    const isUser = message.role === Role.USER;

    return (
        <div className={`flex w-full mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex max-w-[85%] md:max-w-[75%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                
                {/* Avatar */}
                <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center mt-1 
                    ${isUser ? 'ml-3 bg-teal-100 text-teal-700' : 'mr-3 bg-rose-100 text-rose-600'}`}>
                    {isUser ? <User size={18} /> : <Flower2 size={18} />}
                </div>

                {/* Message Bubble */}
                <div className={`px-5 py-4 rounded-2xl shadow-sm
                    ${isUser 
                        ? 'bg-teal-600 text-white rounded-tr-sm' 
                        : 'bg-white border border-stone-100 text-stone-700 rounded-tl-sm'
                    }`}
                >
                    {isUser ? (
                        <p className="whitespace-pre-wrap leading-relaxed">{message.text}</p>
                    ) : (
                        <div className="prose prose-sm max-w-none">
                            <ReactMarkdown
                                components={{
                                    p: ({node, ...props}: any) => <p className="mb-3 last:mb-0 leading-relaxed" {...props} />,
                                    ul: ({node, ...props}: any) => <ul className="list-disc pl-5 mb-3 space-y-1" {...props} />,
                                    li: ({node, ...props}: any) => <li className="leading-relaxed" {...props} />,
                                    strong: ({node, ...props}: any) => <strong className="font-semibold text-stone-900" {...props} />,
                                }}
                            >
                                {message.text}
                            </ReactMarkdown>
                        </div>
                    )}
                    <div className={`text-[10px] mt-2 ${isUser ? 'text-teal-100 text-right' : 'text-stone-400 text-left'}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                </div>
            </div>
        </div>
    );
};
