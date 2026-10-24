import React from 'react';
import { Calculator, PhoneCall, ShieldCheck, CheckCircle2, ChevronRight, MapPin, Sparkles } from 'lucide-react';
import { OFFICIAL_WHATSAPP, generateWhatsAppLink } from '../utils/formatters';

interface HeroProps {
  onOpenCalculator: () => void;
  onOpenPhotoStudio: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCalculator, onOpenPhotoStudio }) => {
  const directWhatsAppUrl = generateWhatsAppLink(
    OFFICIAL_WHATSAPP,
    '¡Hola FixRural Digital! Necesito un técnico urgente para mi finca.'
  );

  return (
    <div className="relative overflow-hidden bg-[#1B4D3E] text-white">
      {/* Background Graphic & Fluid Image with Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_fixrural_campo_1792873893587.jpg"
          alt="Técnica agrícola revisando sistema en finca veredal FixRural"
          className="w-full h-full object-cover object-center opacity-35"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1B4D3E] via-[#1B4D3E]/90 to-[#1B4D3E]/70"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B4D3E] via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Main Copy (Col 7) */}
          <div className="lg:col-span-7 space-y-6 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/80 border border-emerald-600/40 text-xs sm:text-sm text-emerald-200">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span className="font-semibold text-white">Servicio Técnico Especializado en Trochas y Veredas</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Mantenimiento y Reparación de Confianza{' '}
              <span className="text-amber-400 block sm:inline">Directo en su Parcela o Finca</span>
            </h1>

            <p className="text-base sm:text-lg text-emerald-100/90 max-w-2xl leading-relaxed">
              No baje su motobomba ni su impulsor hasta el pueblo. Nuestros técnicos certificados llegan en moto o campero con herramientas y repuestos originales para salvar su jornada de riego, ordeño o cosecha.
            </p>

            {/* Quick Benefits Bullet List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm text-emerald-200">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                <span>Tarifa transparente + flete según vereda</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                <span>90 días de garantía por escrito</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                <span>Atención a motobombas, cercas y plomería</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                <span>Técnicos veredales con experiencia real</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-4">
              <button
                onClick={onOpenCalculator}
                className="min-h-[52px] px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-base shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2.5 transition-all transform active:scale-[0.98] cursor-pointer"
              >
                <Calculator className="w-5 h-5 text-slate-950" />
                <span>Calcular Tarifa y Flete Veredal</span>
                <ChevronRight className="w-4 h-4 text-slate-950" />
              </button>

              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[52px] px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-base shadow-md flex items-center justify-center gap-2.5 transition-all border border-emerald-400/30"
              >
                <PhoneCall className="w-5 h-5 text-white" />
                <span>Solicitar Técnico Urgente</span>
              </a>
            </div>

            {/* AI CleanUp Studio Banner Teaser */}
            <div className="pt-2">
              <button
                onClick={onOpenPhotoStudio}
                className="inline-flex items-center gap-2 text-xs text-amber-300 hover:text-amber-200 transition-colors py-1 cursor-pointer underline-offset-4 hover:underline"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>¿Tiene un repuesto averiado? Tome una foto y límpiela con instrucciones de texto en nuestro Taller IA →</span>
              </button>
            </div>
          </div>

          {/* Quick Quote Interactive Mini Card (Col 5) */}
          <div className="lg:col-span-5">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 sm:p-7 text-slate-900 shadow-2xl border border-white/20 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#1B4D3E] flex items-center justify-center font-bold">
                    <ShieldCheck className="w-5 h-5 text-[#2E7D32]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900">Cotización Inmediata</h3>
                    <p className="text-xs text-slate-500">Sin intermediarios ni sorpresas</p>
                  </div>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                  En Línea
                </span>
              </div>

              {/* Quick Feature Highlights */}
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <MapPin className="w-4 h-4 text-[#2E7D32] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-800 block">Flete Calculado por Trocha y Kilómetros</span>
                    <span className="text-slate-500 text-xs">Conozca de antemano el costo de movilización según el estado de la vía.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-800 block">Mano de Obra Certificada</span>
                    <span className="text-slate-500 text-xs">Diagnóstico exhaustivo y repuestos de alta resistencia rural.</span>
                  </div>
                </div>
              </div>

              {/* Action trigger button */}
              <button
                onClick={onOpenCalculator}
                className="w-full min-h-[48px] py-3 px-4 bg-[#1B4D3E] hover:bg-[#143B2F] text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <Calculator className="w-4 h-4 text-amber-400" />
                <span>Abrir Calculadora Interactiva</span>
              </button>

              <p className="text-center text-[11px] text-slate-500">
                Respuesta promedio en WhatsApp: <span className="font-semibold text-slate-700">menos de 15 minutos</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Trust Metric Strip */}
      <div className="bg-[#143B2F] border-t border-emerald-800/60 py-4 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-xl sm:text-2xl font-black text-amber-400 font-mono">42+</div>
            <div className="text-xs text-emerald-200">Veredas con Cobertura</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-amber-400 font-mono">850+</div>
            <div className="text-xs text-emerald-200">Fincas & Parcelas Atendidas</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-amber-400 font-mono">90 Días</div>
            <div className="text-xs text-emerald-200">Garantía Escrita en Sitio</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-amber-400 font-mono">4.9 / 5.0</div>
            <div className="text-xs text-emerald-200">Calificación de Productores</div>
          </div>
        </div>
      </div>
    </div>
  );
};
