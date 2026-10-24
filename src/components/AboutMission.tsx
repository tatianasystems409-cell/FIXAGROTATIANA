import React from 'react';
import { Target, Compass, Heart, User, MapPin, Sparkles, CheckCircle, ShieldCheck, Quote } from 'lucide-react';
import { ADMIN_EMAIL } from '../utils/formatters';

export const AboutMission: React.FC = () => {
  return (
    <section id="nosotros" className="py-16 sm:py-24 bg-white border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-[#2E7D32]">
            <MapPin className="w-3.5 h-3.5 text-amber-500" />
            <span>Nacidos en el Corazón de Santander · Güepsa</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Nuestra Historia, Misión y Visión
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            FixRural Digital no nació en una oficina lejana; nació en los caminos veredales de Güepsa, Santander, para resolver un dolor real que viven las familias campesinas a diario.
          </p>
        </div>

        {/* The Founder & "El Por Qué" Feature Card */}
        <div className="bg-gradient-to-br from-[#1B4D3E] via-[#143B2F] to-[#0D261E] rounded-3xl p-6 sm:p-10 lg:p-12 text-white shadow-2xl relative overflow-hidden">
          {/* Subtle decorative glow */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Founder Avatar & Origin Badge (Col 4) */}
            <div className="lg:col-span-4 flex flex-col items-center text-center space-y-4">
              <div className="relative">
                <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-200 p-1 shadow-xl">
                  <div className="w-full h-full bg-[#143B2F] rounded-xl flex flex-col items-center justify-center p-3 text-center border border-emerald-700">
                    <User className="w-12 h-12 text-amber-400 mb-1" />
                    <span className="font-extrabold text-white text-sm">Tatiana Callejas</span>
                    <span className="text-[11px] text-emerald-200 font-medium">Fundadora & Creadora</span>
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-amber-500 text-slate-950 p-2 rounded-xl shadow-lg font-black text-xs">
                  Güepsa, ST
                </div>
              </div>

              <div className="space-y-1">
                <h4 className="font-bold text-lg text-white">Tatiana Callejas</h4>
                <p className="text-xs text-amber-300 font-semibold">
                  Administradora General y Desarrolladora de FixRural
                </p>
                <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-300 font-mono pt-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>Güepsa, Santander · Zona Rural</span>
                </div>
              </div>

              <div className="bg-emerald-950/80 px-3.5 py-2.5 rounded-xl border border-emerald-700/60 text-[11px] text-emerald-200 font-mono space-y-1">
                <div>
                  <span className="text-slate-400 block text-[10px]">Línea Directa / WhatsApp:</span>
                  <a
                    href="https://wa.me/573103586278"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:text-amber-300 font-bold text-xs"
                  >
                    310 358 6278
                  </a>
                </div>
                <div className="pt-1 border-t border-emerald-800">
                  <span className="text-slate-400 block text-[10px]">Correo Oficial:</span>
                  <span className="text-amber-300 font-semibold">{ADMIN_EMAIL}</span>
                </div>
              </div>
            </div>

            {/* "El Por Qué" & Personal Manifesto (Col 8) */}
            <div className="lg:col-span-8 space-y-5">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <Heart className="w-4 h-4 fill-amber-400" />
                <span>El Por Qué Nació FixRural Digital</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                "Vivo en Güepsa, Santander, en plena zona rural... y aquí estos servicios simplemente no existen."
              </h3>

              <div className="space-y-4 text-emerald-100/90 text-sm sm:text-base leading-relaxed">
                <p className="italic bg-emerald-900/40 p-4 rounded-2xl border-l-4 border-amber-400 text-emerald-50">
                  <Quote className="w-6 h-6 text-amber-400/60 inline mr-2 -mt-1" />
                  «En nuestras veredas de Güepsa, cuando se quema una motobomba de riego, cuando la cerca eléctrica de los potreros deja de patear, o cuando se apaga el tanque de leche o el motor del trapiche, el campesino queda completamente desamparado. Ningún técnico de las ciudades quiere subir por las trochas, o cobran fletes exorbitantes y desproporcionados sin dar garantía.
                </p>
                <p>
                  Por vivir esta realidad en carne propia decidí crear **FixRural Digital**: una plataforma campesina, justa y transparente para que cualquier productor de Güepsa y de Santander pueda cotizar con el flete veredal exacto, solicitar un técnico local honesto por WhatsApp y recibir servicio con repuestos garantizados directo en su parcela.»
                </p>
              </div>

              {/* Guarantees of our origin */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-emerald-200 bg-emerald-900/30 p-2.5 rounded-xl border border-emerald-800">
                  <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Sin intermediarios de ciudad</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-emerald-200 bg-emerald-900/30 p-2.5 rounded-xl border border-emerald-800">
                  <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Conocemos las trochas de Santander</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Misión y Visión Grid (2 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Misión Card */}
          <div className="bg-[#F8F9FA] rounded-2xl p-7 sm:p-9 border border-slate-200 hover:border-[#1B4D3E]/40 transition-all shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#1B4D3E] text-white flex items-center justify-center shadow-md">
                <Target className="w-7 h-7 text-amber-400" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#2E7D32] block">
                  Nuestro Propósito Diario
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-1">
                  Misión
                </h3>
              </div>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Brindar soluciones técnicas integrales, inmediatas y transparentes a las familias campesinas y productores agropecuarios de <strong>Güepsa, la Provincia de Vélez y todo Santander</strong>, facilitando la reparación y mantenimiento preventivo de motobombas, cercas eléctricas solares, sistemas hidráulicos y maquinaria de finca directo en sus veredas, dignificando el oficio del técnico rural y evitando la pérdida de cosechas y producción.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-200/80 flex items-center gap-2 text-xs font-semibold text-[#1B4D3E]">
              <ShieldCheck className="w-4 h-4 text-[#2E7D32]" />
              <span>Compromiso de asistencia veredal continua</span>
            </div>
          </div>

          {/* Visión Card */}
          <div className="bg-[#F8F9FA] rounded-2xl p-7 sm:p-9 border border-slate-200 hover:border-[#1B4D3E]/40 transition-all shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center shadow-md">
                <Compass className="w-7 h-7 text-slate-950" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#2E7D32] block">
                  Nuestra Meta al Futuro
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-1">
                  Visión
                </h3>
              </div>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Para el <strong>2030</strong>, consolidar a <strong>FixRural Digital</strong> como la red veredal y rural más confiable e influyente de Santander y Colombia en asistencia técnica agropecuaria, llevando tecnología accesible, talleres móviles equipados con repuestos originales y herramientas digitales a cada rincón del campo, garantizando que ninguna finca quede incomunicada o paralizada por fallas electromecánicas.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-200/80 flex items-center gap-2 text-xs font-semibold text-[#1B4D3E]">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Modernización y dignidad para el campo colombiano</span>
            </div>
          </div>
        </div>

        {/* Santander Regional Trust Banner */}
        <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1B4D3E] text-white flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-slate-900">
                Cobertura Principal: Güepsa, San Benito, Barbosa, Vélez y Veredas
              </h4>
              <p className="text-xs text-slate-600">
                Atendemos trapiches paneleros, fincas ganaderas, cafetales y acueductos veredales con despacho local.
              </p>
            </div>
          </div>
          <a
            href="#calculadora"
            className="px-5 py-2.5 bg-[#1B4D3E] hover:bg-[#143B2F] text-white font-bold text-xs rounded-xl shadow-sm transition-colors whitespace-nowrap shrink-0"
          >
            Calcular Flete a mi Vereda
          </a>
        </div>
      </div>
    </section>
  );
};
