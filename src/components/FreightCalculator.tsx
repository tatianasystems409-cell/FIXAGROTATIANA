import React, { useState, useEffect } from 'react';
import { Service, VeredaInfo, QuoteRequest } from '../types';
import { INITIAL_VEREDAS } from '../data/mockData';
import { formatCurrency, generateWhatsAppLink, OFFICIAL_WHATSAPP } from '../utils/formatters';
import { Calculator, MapPin, Send, AlertTriangle, CheckCircle, Clock, Truck, ShieldAlert, Sparkles } from 'lucide-react';

interface FreightCalculatorProps {
  services: Service[];
  selectedServiceId?: string | null;
  onAddQuoteRequest: (quote: QuoteRequest) => void;
}

export const FreightCalculator: React.FC<FreightCalculatorProps> = ({
  services,
  selectedServiceId,
  onAddQuoteRequest,
}) => {
  // State
  const [activeServiceId, setActiveServiceId] = useState<string>(
    selectedServiceId || (services[0]?.id ?? '')
  );
  const [selectedVeredaName, setSelectedVeredaName] = useState<string>(
    INITIAL_VEREDAS[0].name
  );
  const [isCustomVereda, setIsCustomVereda] = useState<boolean>(false);
  const [customDistanceKm, setCustomDistanceKm] = useState<number>(10);
  const [customRoadCondition, setCustomRoadCondition] = useState<'pavimentada' | 'placa_huella' | 'trocha'>('trocha');
  const [urgency, setUrgency] = useState<'normal' | 'prioritario' | 'emergencia'>('normal');

  // Customer contact info
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientNotes, setClientNotes] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  useEffect(() => {
    if (selectedServiceId) {
      setActiveServiceId(selectedServiceId);
      const element = document.getElementById('calculadora');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [selectedServiceId]);

  const currentService = services.find((s) => s.id === activeServiceId) || services[0];
  const matchedVereda = INITIAL_VEREDAS.find((v) => v.name === selectedVeredaName);

  // Freight calculation math
  const distanceKm = isCustomVereda ? customDistanceKm : (matchedVereda?.distanceKm || 10);
  const roadCondition = isCustomVereda ? customRoadCondition : (matchedVereda?.roadCondition || 'trocha');

  let freightRatePerKm = 2200; // standard base rate
  if (roadCondition === 'trocha') freightRatePerKm = 3000;
  if (roadCondition === 'placa_huella') freightRatePerKm = 2400;
  if (roadCondition === 'pavimentada') freightRatePerKm = 1800;

  // Base freight starts with fixed equipment mobilization of $8,000 + per km
  const calculatedFreight = isCustomVereda
    ? Math.round((8000 + distanceKm * freightRatePerKm) / 1000) * 1000
    : (matchedVereda?.freightCost || 25000);

  const baseLabor = currentService?.price || 100000;

  let urgencyMultiplier = 1.0;
  let urgencyLabel = 'Servicio Programado (24h - 48h)';
  if (urgency === 'prioritario') {
    urgencyMultiplier = 1.3;
    urgencyLabel = 'Prioritario Mismo Día (+30% mano de obra)';
  } else if (urgency === 'emergencia') {
    urgencyMultiplier = 1.5;
    urgencyLabel = 'Emergencia Inmediata 24/7 (+50% mano de obra)';
  }

  const adjustedLabor = Math.round(baseLabor * urgencyMultiplier);
  const totalEstimate = adjustedLabor + calculatedFreight;

  const handleGenerateQuoteAndWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim()) {
      alert('Por favor ingrese su nombre y teléfono para despachar el técnico.');
      return;
    }

    const newQuote: QuoteRequest = {
      id: `COT-${Math.floor(1000 + Math.random() * 9000)}`,
      clientName,
      clientPhone,
      vereda: isCustomVereda ? `Vereda personalizada (${distanceKm} km)` : selectedVeredaName,
      distanceKm,
      roadCondition,
      serviceId: currentService.id,
      serviceName: currentService.name,
      baseLaborPrice: adjustedLabor,
      freightPrice: calculatedFreight,
      urgencyMultiplier,
      urgencyLabel,
      totalPrice: totalEstimate,
      notes: clientNotes.trim() || 'Sin observaciones adicionales.',
      status: 'pendiente',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
    };

    onAddQuoteRequest(newQuote);
    setSubmittedSuccess(true);

    // Build formatted message for WhatsApp
    const message = 
`🌾 *SOLICITUD DE SERVICIO TÉCNICO - FIXRURAL DIGITAL*
*Código:* ${newQuote.id}
----------------------------------------
🔧 *Servicio:* ${currentService.name}
📍 *Vereda / Finca:* ${newQuote.vereda}
🛣️ *Tipo de Vía:* ${roadCondition.toUpperCase()} (~${distanceKm} km)
⚡ *Prioridad:* ${urgencyLabel}

💰 *DESGLOSE ESTIMADO:*
• Mano de Obra: ${formatCurrency(adjustedLabor)}
• Flete y Movilización: ${formatCurrency(calculatedFreight)}
----------------------------------------
*TOTAL ESTIMADO:* ${formatCurrency(totalEstimate)}

👤 *Datos del Campesino/Propietario:*
• Nombre: ${clientName}
• Celular: ${clientPhone}
• Observaciones: ${clientNotes || 'Ninguna'}

_Quedo atento a la confirmación de la visita técnica._`;

    const waLink = generateWhatsAppLink(OFFICIAL_WHATSAPP, message);
    window.open(waLink, '_blank');
  };

  return (
    <section id="calculadora" className="py-14 sm:py-20 bg-white border-y border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2E7D32]">
            <Calculator className="w-4 h-4 text-[#2E7D32]" />
            <span>Herramienta Interactiva de Cotización Veredal</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Calculadora de Tarifa y Flete en Sitio
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Conozca el costo exacto antes de pedir el técnico. Calculamos la mano de obra certificada más el flete veredal según la distancia y estado de la vía.
          </p>
        </div>

        {/* The 2-Column Responsive Form & Result (1-col on mobile, 2-col on lg) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Form (Col 7) */}
          <div className="lg:col-span-7 bg-[#F8F9FA] rounded-2xl p-5 sm:p-7 border border-slate-200 shadow-sm space-y-6">
            <form onSubmit={handleGenerateQuoteAndWhatsApp} className="space-y-6">
              {/* Step 1: Select Service */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase text-slate-700 tracking-wide">
                  1. Seleccione el Servicio Técnico Requerido:
                </label>
                <select
                  value={activeServiceId}
                  onChange={(e) => setActiveServiceId(e.target.value)}
                  className="w-full min-h-[48px] px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1B4D3E]"
                >
                  {services.map((srv) => (
                    <option key={srv.id} value={srv.id}>
                      {srv.name} — Base {formatCurrency(srv.price)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Step 2: Location and Vereda selection */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase text-slate-700 tracking-wide">
                    2. Ubicación de la Finca o Vereda:
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsCustomVereda(!isCustomVereda)}
                    className="text-xs text-[#2E7D32] hover:text-[#1B4D3E] font-semibold underline cursor-pointer"
                  >
                    {isCustomVereda ? 'Elegir de lista de veredas' : 'Ingresar kilómetros manuales'}
                  </button>
                </div>

                {!isCustomVereda ? (
                  <div className="space-y-2">
                    <select
                      value={selectedVeredaName}
                      onChange={(e) => setSelectedVeredaName(e.target.value)}
                      className="w-full min-h-[48px] px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1B4D3E]"
                    >
                      {INITIAL_VEREDAS.map((v) => (
                        <option key={v.name} value={v.name}>
                          {v.name} ({v.distanceKm} km · {v.roadCondition.replace('_', ' ')}) — Flete {formatCurrency(v.freightCost)}
                        </option>
                      ))}
                    </select>
                    {matchedVereda && (
                      <div className="flex items-center gap-2 text-xs text-slate-500 bg-white p-2.5 rounded-lg border border-slate-200">
                        <MapPin className="w-3.5 h-3.5 text-[#2E7D32] shrink-0" />
                        <span>{matchedVereda.description}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white p-3.5 rounded-xl border border-slate-200">
                    <div className="space-y-1">
                      <label className="text-xs text-slate-600 font-medium">
                        Distancia estimada desde el pueblo (km):
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="80"
                        value={customDistanceKm}
                        onChange={(e) => setCustomDistanceKm(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-full min-h-[44px] px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-slate-600 font-medium">Estado de la vía:</label>
                      <select
                        value={customRoadCondition}
                        onChange={(e) => setCustomRoadCondition(e.target.value as any)}
                        className="w-full min-h-[44px] px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900"
                      >
                        <option value="trocha">Trocha destapada / Herradura</option>
                        <option value="placa_huella">Placa-huella / Pavimento mixto</option>
                        <option value="pavimentada">Carretera pavimentada</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* Step 3: Urgency Level */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase text-slate-700 tracking-wide">
                  3. Nivel de Urgencia del Mantenimiento:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setUrgency('normal')}
                    className={`min-h-[48px] p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      urgency === 'normal'
                        ? 'bg-white border-[#1B4D3E] shadow-sm ring-2 ring-[#1B4D3E]/20'
                        : 'bg-white/60 border-slate-200 hover:bg-white'
                    }`}
                  >
                    <span className="block text-xs font-bold text-slate-900">Programado</span>
                    <span className="block text-[11px] text-slate-500">24 a 48 horas (Tarifa base)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setUrgency('prioritario')}
                    className={`min-h-[48px] p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      urgency === 'prioritario'
                        ? 'bg-amber-50 border-amber-500 shadow-sm ring-2 ring-amber-500/20'
                        : 'bg-white/60 border-slate-200 hover:bg-white'
                    }`}
                  >
                    <span className="block text-xs font-bold text-amber-900">Mismo Día</span>
                    <span className="block text-[11px] text-amber-700">+30% en mano de obra</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setUrgency('emergencia')}
                    className={`min-h-[48px] p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      urgency === 'emergencia'
                        ? 'bg-red-50 border-red-500 shadow-sm ring-2 ring-red-500/20'
                        : 'bg-white/60 border-slate-200 hover:bg-white'
                    }`}
                  >
                    <span className="block text-xs font-bold text-red-900">Emergencia 24/7</span>
                    <span className="block text-[11px] text-red-700">+50% (Ordeño/Cosecha)</span>
                  </button>
                </div>
              </div>

              {/* Step 4: Contact details */}
              <div className="space-y-3 pt-2 border-t border-slate-200">
                <label className="block text-xs font-bold uppercase text-slate-700 tracking-wide">
                  4. Datos de Contacto para Despacho:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-600 mb-1">Nombre del productor / finca:</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Don Hernando - Finca El Roble"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full min-h-[44px] px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1B4D3E]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-600 mb-1">Teléfono o WhatsApp:</label>
                    <input
                      type="tel"
                      required
                      placeholder="Ej. 312 458 9201"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full min-h-[44px] px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1B4D3E]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-slate-600 mb-1">Punto de referencia o falla detectada:</label>
                  <textarea
                    rows={2}
                    placeholder="Ej. Pasando la escuela 200m a la derecha portón verde. La motobomba se recalienta a los 10 minutos."
                    value={clientNotes}
                    onChange={(e) => setClientNotes(e.target.value)}
                    className="w-full text-xs sm:text-sm p-3 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1B4D3E] resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full min-h-[50px] py-3 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <Send className="w-5 h-5" />
                <span>Enviar Cotización Directo a WhatsApp</span>
              </button>
            </form>
          </div>

          {/* Real-time Calculation Summary Card (Col 5) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#1B4D3E] to-[#143B2F] text-white rounded-2xl p-6 sm:p-7 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-800">
              <div>
                <span className="text-xs text-emerald-300 uppercase font-semibold tracking-wider">
                  Liquidación de Tarifa
                </span>
                <h3 className="font-extrabold text-lg text-white">Resumen de Cotización</h3>
              </div>
              <Truck className="w-6 h-6 text-amber-400" />
            </div>

            {/* Service & Destination Brief */}
            <div className="space-y-2 text-xs sm:text-sm bg-[#113127] p-3.5 rounded-xl border border-emerald-800/80">
              <div className="text-emerald-300 text-[11px] uppercase font-bold">Servicio Seleccionado:</div>
              <div className="font-bold text-white">{currentService?.name}</div>

              <div className="pt-2 border-t border-emerald-800/60 flex items-center justify-between text-xs">
                <span className="text-emerald-200">Destino:</span>
                <span className="font-semibold text-white">
                  {isCustomVereda ? `Personalizado (~${distanceKm} km)` : selectedVeredaName}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-emerald-200">Tipo de terreno:</span>
                <span className="capitalize text-amber-300 font-medium">
                  {roadCondition.replace('_', ' ')}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-emerald-200">Prioridad:</span>
                <span className="text-white font-medium">{urgencyLabel}</span>
              </div>
            </div>

            {/* Price Itemized List */}
            <div className="space-y-3 pt-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-emerald-200">Mano de obra técnica:</span>
                <span className="font-mono font-bold text-white">
                  {formatCurrency(adjustedLabor)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-200">Flete veredal & transporte:</span>
                  <span className="text-[10px] text-emerald-400 font-mono">({distanceKm} km)</span>
                </div>
                <span className="font-mono font-bold text-white">
                  {formatCurrency(calculatedFreight)}
                </span>
              </div>

              {urgency !== 'normal' && (
                <div className="flex items-center justify-between text-amber-300 text-xs">
                  <span>Recargo por urgencia rápida:</span>
                  <span className="font-mono font-semibold">Incluido</span>
                </div>
              )}

              {/* Total Row */}
              <div className="pt-4 border-t border-emerald-700/80 flex items-baseline justify-between">
                <div>
                  <span className="block text-xs uppercase text-emerald-300 font-bold tracking-wider">
                    Total Estimado en Sitio
                  </span>
                  <span className="text-[11px] text-emerald-400">Sin costos ocultos</span>
                </div>
                <div className="text-right">
                  <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">
                    {formatCurrency(totalEstimate)}
                  </span>
                  <span className="block text-[10px] text-emerald-300">COP</span>
                </div>
              </div>
            </div>

            {/* Guarantees Box */}
            <div className="bg-emerald-950/60 p-3.5 rounded-xl border border-emerald-800 text-xs space-y-2">
              <div className="flex items-center gap-2 font-semibold text-emerald-200">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>¿Qué incluye este valor?</span>
              </div>
              <ul className="text-emerald-300/90 space-y-1 list-disc list-inside text-[11px]">
                <li>Llegada del técnico hasta su finca con caja de herramientas.</li>
                <li>Desarme, diagnóstico y reparación técnica in situ.</li>
                <li>Pruebas de funcionamiento con carga de agua o electricidad.</li>
                <li>90 días de garantía escrita sobre la labor efectuada.</li>
              </ul>
            </div>

            {submittedSuccess && (
              <div className="bg-amber-400 text-slate-950 p-3 rounded-xl text-xs font-bold text-center animate-in fade-in">
                ✓ Solicitud registrada en el sistema y remitida a WhatsApp.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
