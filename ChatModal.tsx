import React, { useState, useEffect, useRef } from 'react';
import { X, Check, ShieldCheck, Send } from 'lucide-react';
import { ItemPost, ChatMessage } from '../types';

interface ChatModalProps {
  item: ItemPost | null;
  messages: ChatMessage[];
  onClose: () => void;
  onSendMessage: (text: string) => void;
  onResolveItem: (itemId: string) => void;
}

export const ChatModal: React.FC<ChatModalProps> = ({
  item,
  messages,
  onClose,
  onSendMessage,
  onResolveItem,
}) => {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!item) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  const handleQuickReply = (text: string) => {
    onSendMessage(text);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-[430px] h-[90vh] bg-white rounded-t-2xl sm:rounded-2xl flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Chat Header */}
        <div className="px-4 py-3 bg-[#003366] text-white flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-slate-200 text-[#003366] font-bold flex items-center justify-center text-xs border border-white/30 shrink-0">
              {item.avatarInitials}
            </div>
            <div className="min-w-0">
              <h3 className="text-xs font-bold leading-tight truncate">
                {item.author}
              </h3>
              <p className="text-[10px] text-slate-300 truncate max-w-[200px]">
                Re: {item.title}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {item.status !== 'Resolved' && (
              <button
                onClick={() => onResolveItem(item.id)}
                className="px-2 py-1 bg-emerald-500 hover:bg-emerald-600 text-white text-[10px] font-bold rounded-md flex items-center gap-1 cursor-pointer transition active:scale-95"
                title="Mark item as returned and resolved"
              >
                <Check className="w-3 h-3" /> Resolve
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-white/10 text-white/80 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Chat Notification Banner */}
        <div className="bg-blue-50 border-b border-blue-100 px-3 py-1.5 flex items-center justify-between text-[10px] text-[#003366] font-medium">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Verified Campus Communication Channel
          </span>
          <span className="text-slate-500">Rajkot, Campus Net</span>
        </div>

        {/* Messages Feed Area */}
        <div className="flex-1 p-3 overflow-y-auto space-y-2.5 bg-slate-50 text-xs custom-scrollbar">
          {messages.map((msg) => {
            const isMe = msg.sender === 'me';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[82%] px-3.5 py-2 rounded-2xl text-xs leading-relaxed ${
                    isMe
                      ? 'bg-[#003366] text-white rounded-br-xs'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-bl-xs shadow-xs'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[9px] text-slate-400 mt-0.5 px-1">{msg.time}</span>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Response Chips */}
        <div className="px-3 py-1.5 bg-white border-t border-slate-100 flex gap-1.5 overflow-x-auto custom-scrollbar text-[11px]">
          <button
            onClick={() => handleQuickReply('Can you confirm the serial number/sticker?')}
            className="bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-full text-slate-700 whitespace-nowrap cursor-pointer transition"
          >
            Confirm details?
          </button>
          <button
            onClick={() => handleQuickReply("Let's meet at Main Security Gate 1 at 3 PM.")}
            className="bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-full text-slate-700 whitespace-nowrap cursor-pointer transition"
          >
            Meet at Gate 1
          </button>
          <button
            onClick={() => handleQuickReply('I handed this to Building A Canteen Manager.')}
            className="bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-full text-slate-700 whitespace-nowrap cursor-pointer transition"
          >
            At Canteen desk
          </button>
        </div>

        {/* Chat Input Bar */}
        <form
          onSubmit={handleSend}
          className="p-2.5 bg-white border-t border-slate-200 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type a message to verify ownership..."
            className="flex-1 px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#003366]"
          />
          <button
            type="submit"
            className="p-2.5 bg-[#003366] hover:bg-[#002244] text-white rounded-xl shadow-xs transition cursor-pointer active:scale-95"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
