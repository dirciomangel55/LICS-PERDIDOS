
import React, { useState, useEffect, useRef } from 'react';
import { Culture, ChatMessage } from '../types';
import { getCulturalInsight } from '../services/geminiService';

interface CultureDetailProps {
  culture: Culture;
  onBack: () => void;
}

const CultureDetail: React.FC<CultureDetailProps> = ({ culture, onBack }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await getCulturalInsight(culture.name, input, messages);
    const aiMsg: ChatMessage = { role: 'model', text: responseText || 'Sin respuesta.' };
    
    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={onBack}
        className="mb-8 flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-colors font-semibold"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Volver al inicio
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Culture Info Section */}
        <div>
          <div className="relative rounded-3xl overflow-hidden shadow-xl mb-8 h-96">
            <img src={culture.imageUrl} alt={culture.name} className="w-full h-full object-cover" />
            <div className={`absolute bottom-0 left-0 right-0 p-8 ${culture.color} text-white`}>
              <h2 className="text-4xl font-bold">{culture.name}</h2>
              <p className="text-xl opacity-90">{culture.autonym} • {culture.region}</p>
            </div>
          </div>

          <div className="space-y-6 text-lg text-stone-700 leading-relaxed">
            <section>
              <h3 className="text-2xl font-bold text-stone-900 mb-2">Sobre este pueblo</h3>
              <p>{culture.description}</p>
            </section>

            <section className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
              <h3 className="text-2xl font-bold text-stone-900 mb-2">Lengua</h3>
              <p className="italic text-stone-600">{culture.languageInfo}</p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-stone-900 mb-3">Tradiciones Clave</h3>
              <div className="flex flex-wrap gap-2">
                {culture.traditions.map((trad, idx) => (
                  <span key={idx} className="bg-stone-200 px-4 py-2 rounded-full text-sm font-medium">
                    {trad}
                  </span>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* AI Chat Section */}
        <div className="flex flex-col h-[700px] bg-white rounded-3xl shadow-xl border border-stone-100 overflow-hidden">
          <div className="bg-stone-900 text-white p-6">
            <h3 className="text-xl font-bold">Guía Cultural AI</h3>
            <p className="text-stone-400 text-sm">Pregunta sobre historia, mitos o frases en {culture.name}</p>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-stone-400 mt-12">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <p>¿Qué te gustaría saber sobre los {culture.name}?</p>
                <div className="mt-4 flex flex-col gap-2">
                  <button onClick={() => setInput("¿Cuáles son sus platos típicos?")} className="text-xs bg-stone-100 hover:bg-stone-200 px-3 py-1 rounded-full transition-colors">¿Cuáles son sus platos típicos?</button>
                  <button onClick={() => setInput("Dime una palabra común en su lengua")} className="text-xs bg-stone-100 hover:bg-stone-200 px-3 py-1 rounded-full transition-colors">Dime una palabra común en su lengua</button>
                  <button onClick={() => setInput("¿Cómo es su vestimenta tradicional?")} className="text-xs bg-stone-100 hover:bg-stone-200 px-3 py-1 rounded-full transition-colors">¿Cómo es su vestimenta tradicional?</button>
                </div>
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl ${msg.role === 'user' ? 'bg-stone-900 text-white rounded-br-none' : 'bg-stone-100 text-stone-800 rounded-bl-none'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-stone-100 p-4 rounded-2xl rounded-bl-none animate-pulse text-stone-400">
                  Explorando archivos culturales...
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="p-4 border-t border-stone-100">
            <div className="flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu pregunta aquí..."
                className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-stone-400"
              />
              <button 
                type="submit"
                disabled={isLoading}
                className="bg-stone-900 text-white px-6 py-3 rounded-xl hover:bg-stone-800 transition-colors disabled:opacity-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CultureDetail;
