import React from 'react';
import { ShieldCheck, SearchCheck, Award, RefreshCw, CheckCircle2 } from 'lucide-react';

export const WarrantySection: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Diagnóstico Técnico Transparente',
      description: 'Llegamos a su finca y desarmamos el equipo frente a usted. Le mostramos exactamente cuál es la pieza desgastada o averiada y le explicamos la causa del fallo sin tecnicismos confusos.',
      icon: SearchCheck,
      badge: 'Paso 1'
    },
    {
      number: '02',
      title: 'Repuestos Originales de Alto Rendimiento',
      description: 'Instalamos sellos mecánicos reforzados, condensadores para uso agropecuario, aisladores con protección UV y cables diseñados para soportar el clima rudo de la cordillera.',
      icon: Award,
      badge: 'Paso 2'
    },
    {
      number: '03',
      title: '90 Días de Garantía Escrita en Sitio',
      description: 'Firmamos un comprobante de garantía veredal. Si el equipo presenta cualquier anomalía relacionada con el arreglo dentro de los 90 días, regresamos a su parcela sin cobrar nuevo flete ni mano de obra.',
      icon: RefreshCw,
      badge: 'Paso 3'
    }
  ];

  return (
    <section id="garantia" className="py-14 sm:py-20 bg-[#143B2F] text-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Respaldo y Seguridad en Cada Reparación</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Nuestra Garantía Rural en 3 Pasos
          </h2>
          <p className="text-sm sm:text-base text-emerald-200">
            En el campo la palabra vale, pero con FixRural Digital además tiene respaldo técnico documentado para que su inversión esté 100% protegida.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="bg-[#1B4D3E] border border-emerald-700/60 rounded-2xl p-6 sm:p-7 space-y-4 hover:border-amber-400/60 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-black font-mono text-amber-400">
                      {step.number}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#143B2F] text-emerald-300 border border-emerald-700">
                      {step.badge}
                    </span>
                  </div>

                  <div className="w-12 h-12 rounded-xl bg-emerald-800/80 text-amber-400 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-white leading-snug">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-emerald-800/80 flex items-center gap-2 text-xs text-amber-300">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Compromiso veredal verificado</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
