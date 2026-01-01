
import React from 'react';
import { Message, Role } from '../types';

interface ChatMessageProps {
  message: Message;
  assistantName: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, assistantName }) => {
  const isUser = message.role === Role.USER;

  return (
    <div className={`flex w-full mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[85%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${isUser ? 'bg-indigo-600 text-white ml-2' : 'bg-slate-200 text-slate-600 mr-2'}`}>
          {isUser ? 'U' : assistantName[0].toUpperCase()}
        </div>
        
        <div className={`px-4 py-2 rounded-2xl text-sm shadow-sm ${
          isUser 
            ? 'bg-indigo-600 text-white rounded-tr-none' 
            : 'bg-white border border-slate-100 text-slate-800 rounded-tl-none'
        }`}>
          <div className="whitespace-pre-wrap leading-relaxed">
            {message.text}
          </div>
          <div className={`text-[10px] mt-1 opacity-60 ${isUser ? 'text-right' : 'text-left'}`}>
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
