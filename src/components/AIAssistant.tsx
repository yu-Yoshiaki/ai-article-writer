import React, { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import type { Article } from '../types';

interface AIAssistantProps {
  article: Article;
  onSuggestionApply: (suggestion: string) => void;
}

export function AIAssistant({ article, onSuggestionApply }: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message
    setChat(prev => [...prev, { role: 'user', content: message }]);
    
    // Simulate AI response
    setTimeout(() => {
      setChat(prev => [...prev, {
        role: 'assistant',
        content: `Here's a suggestion for improving your article: Consider adding more details about ${message}`
      }]);
    }, 1000);

    setMessage('');
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="mystical-card w-80 h-96 flex flex-col">
          <div className="p-4 border-b border-slate-700/50 flex justify-between items-center">
            <div className="flex items-center space-x-2 text-purple-400">
              <MessageSquare className="w-5 h-5" />
              <h3 className="font-medium">AI Assistant</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-300"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chat.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`max-w-[80%] p-3 rounded-lg ${
                  msg.role === 'assistant'
                    ? 'bg-slate-700/50 text-slate-200'
                    : 'bg-purple-500/20 text-purple-100'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t border-slate-700/50">
            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask for suggestions..."
                className="flex-1 mystical-input text-sm"
              />
              <button
                type="submit"
                className="p-2 text-purple-400 hover:text-purple-300 hover:bg-purple-900/20 rounded-lg"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="mystical-button p-4 rounded-full"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}