import React, { useState } from 'react';
import { MessageCircle, X, Send, PhoneCall, Clock, Check } from 'lucide-react';
import { OFFICIAL_WHATSAPP, generateWhatsAppLink } from '../utils/formatters';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('Motobomba varada o sin presión');

  const defaultTopics = [
    'Motobomba varada o sin presión',
    'Cerca eléctrica solar sin pulso',
    'Tubería rota / falta de agua',
    'Enfriador de leche averiado',
    'Emergencia de ordeño o cosecha'
  ];

  const handleSend = () => {
    const text = customMsg.trim() 
      ? `¡Hola FixRural Digital! Asunto: ${selectedTopic}. Detalle: ${customMsg}`
      : `¡Hola FixRural Digital! Necesito atención técnica en mi vereda para: ${selectedTopic}.`;
    
    window.open(generateWhatsAppLink(OFFICIAL_WHATSAPP, text), '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {/* Expanded Quick Message Bubble */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800 animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="bg-[#1B4D3E] p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold">
                <MessageCircle className="w-6 h-6 fill-white" />
              </div>
              <div>
                <h4 className="font-bold text-sm">Central Veredal FixRural</h4>
                <div className="flex items-center gap-1.5 text-xs text-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>Técnicos de guardia disponibles</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-800"
              aria-label="Cerrar chat flotante"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-3 text-xs sm:text-sm">
            <p className="text-slate-600">
              ¿Qué problema técnico presenta en su finca? Seleccione o escriba su necesidad:
            </p>

            {/* Quick Chips */}
            <div className="flex flex-wrap gap-1.5">
              {defaultTopics.map((topic) => (
                <button
                  key={topic}
                  onClick={() => setSelectedTopic(topic)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all text-left cursor-pointer ${
                    selectedTopic === topic
                      ? 'bg-[#1B4D3E] text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>

            {/* Input detail */}
            <div className="pt-1">
              <textarea
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                placeholder="Nombre de la vereda, finca y detalle del daño (opcional)..."
                rows={2}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#1B4D3E] focus:border-transparent resize-none"
              />
            </div>

            {/* Response speed note */}
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              <span>Conexión directa con la administradora Tatiana</span>
            </div>

            {/* Submit button */}
            <button
              onClick={handleSend}
              className="w-full min-h-[46px] py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>Abrir WhatsApp Ahora</span>
            </button>
          </div>
        </div>
      )}

      {/* The Giant Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl transition-all border-2 border-white cursor-pointer"
        aria-label="Contactar soporte por WhatsApp"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-400"></span>
        </span>
        <MessageCircle className="w-7 h-7 sm:w-6 sm:h-6 fill-white text-white" />
        <span className="hidden sm:inline font-bold text-sm tracking-wide">
          WhatsApp Técnico
        </span>
      </button>
    </div>
  );
};
