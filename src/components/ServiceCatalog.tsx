import React, { useState } from 'react';
import { Service, ServiceCategory } from '../types';
import { formatCurrency, generateWhatsAppLink, OFFICIAL_WHATSAPP } from '../utils/formatters';
import { Search, Calculator, PhoneCall, Zap, Droplets, Gauge, Sparkles, Wrench, Check } from 'lucide-react';

interface ServiceCatalogProps {
  services: Service[];
  onSelectServiceForQuote: (service: Service) => void;
}

export const ServiceCatalog: React.FC<ServiceCatalogProps> = ({
  services,
  onSelectServiceForQuote,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const categories = [
    { id: 'all', label: 'Todos los Servicios', icon: Wrench },
    { id: 'motobombas', label: 'Motobombas & Riego', icon: Gauge },
    { id: 'electricidad', label: 'Cercas & Electricidad', icon: Zap },
    { id: 'plomeria', label: 'Plomería & Hidráulica', icon: Droplets },
    { id: 'electrodomesticos', label: 'Línea Blanca & Finca', icon: Sparkles },
    { id: 'maquinaria', label: 'Maquinaria & Motores', icon: Wrench },
  ];

  const filteredServices = services.filter((srv) => {
    if (!srv.active) return false;
    const matchCategory = selectedCategory === 'all' || srv.category === selectedCategory;
    const matchSearch =
      srv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      srv.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <section id="servicios" className="py-14 sm:py-20 bg-[#F8F9FA] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2E7D32]">
            <span>Portafolio Técnico Rural Especializado</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Catálogo Dinámico de Servicios en Campo
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Reparaciones en sitio con herramientas de precisión, repuestos para uso rudo agropecuario y cotización clara antes de iniciar labores.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="space-y-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`min-h-[44px] px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#1B4D3E] text-white shadow-sm ring-1 ring-[#1B4D3E]'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-slate-500'}`} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar servicio (ej. motobomba, cerca solar, tanque)..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1B4D3E] focus:border-transparent shadow-sm"
            />
          </div>
        </div>

        {/* Services Grid (3-4 columns on desktop, 2 on tablet, 1 on mobile per PDF) */}
        {filteredServices.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 space-y-3">
            <p className="text-slate-600 text-sm">No se encontraron servicios que coincidan con la búsqueda.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchTerm('');
              }}
              className="px-4 py-2 text-xs font-semibold text-[#1B4D3E] bg-emerald-50 rounded-lg hover:bg-emerald-100"
            >
              Restablecer filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredServices.map((service) => {
              const whatsappQuoteUrl = generateWhatsAppLink(
                OFFICIAL_WHATSAPP,
                `Hola FixRural Digital, deseo consultar disponibilidad y cotizar: "${service.name}". Tarifa base: ${formatCurrency(service.price)}.`
              );

              return (
                <div
                  key={service.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  {/* Image slot */}
                  <div className="relative h-44 overflow-hidden bg-slate-100">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        // Fallback in case of image load hiccup
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    {service.popular && (
                      <span className="absolute top-2.5 right-2.5 bg-amber-500 text-slate-950 font-black text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-md shadow-sm">
                        Más Solicitado
                      </span>
                    )}
                    <span className="absolute bottom-2.5 left-2.5 bg-slate-900/80 backdrop-blur-sm text-white text-[11px] font-medium px-2 py-0.5 rounded-md">
                      {service.estimatedTime}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-bold text-[#2E7D32] uppercase tracking-wider">
                          {service.category}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">
                          Mano de obra
                        </span>
                      </div>
                      <h3 className="font-bold text-base text-slate-900 line-clamp-2 leading-snug">
                        {service.name}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Price and Action Strip */}
                    <div className="pt-3 border-t border-slate-100 space-y-3">
                      <div className="flex items-baseline justify-between">
                        <span className="text-xs text-slate-500">Tarifa técnica base</span>
                        <div className="text-right">
                          <span className="text-lg font-black text-[#1B4D3E] font-mono">
                            {formatCurrency(service.price)}
                          </span>
                          <span className="block text-[10px] text-slate-400">+ flete según vereda</span>
                        </div>
                      </div>

                      {/* Interactive Buttons (Min height 48px for thumb touch) */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => onSelectServiceForQuote(service)}
                          className="min-h-[44px] px-3 py-2 bg-[#1B4D3E] hover:bg-[#143B2F] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                        >
                          <Calculator className="w-3.5 h-3.5 text-amber-400" />
                          <span>Cotizar Flete</span>
                        </button>

                        <a
                          href={whatsappQuoteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="min-h-[44px] px-3 py-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-[#1B4D3E] text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <PhoneCall className="w-3.5 h-3.5 text-emerald-700" />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
