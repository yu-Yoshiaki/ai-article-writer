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
        <div className="mystical-card flex h-96 w-80 flex-col">
          <div className="flex items-center justify-between border-b border-slate-700/50 p-4">
            <div className="flex items-center space-x-2 text-purple-400">
              <MessageSquare className="size-5" />
              <h3 className="font-medium">AI Assistant</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-300"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            {chat.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`max-w-[80%] rounded-lg p-3 ${
                  msg.role === 'assistant'
                    ? 'bg-slate-700/50 text-slate-200'
                    : 'bg-purple-500/20 text-purple-100'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="border-t border-slate-700/50 p-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask for suggestions..."
                className="mystical-input flex-1 text-sm"
              />
              <button
                type="submit"
                className="rounded-lg p-2 text-purple-400 hover:bg-purple-900/20 hover:text-purple-300"
              >
                <Send className="size-5" />
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="mystical-button rounded-full p-4"
        >
          <MessageSquare className="size-6" />
        </button>
      )}
    </div>
  );
}