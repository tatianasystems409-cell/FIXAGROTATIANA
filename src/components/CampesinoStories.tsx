import React from 'react';
import { Quote, Star, MapPin, CheckCircle, HeartHandshake } from 'lucide-react';

export const CampesinoStories: React.FC = () => {
  const stories = [
    {
      id: 1,
      author: 'Don Ramiro Beltrán',
      farm: 'Finca El Mirador',
      vereda: 'Vereda El Manantial',
      production: 'Café Especial y Plátano Hartón',
      rating: 5,
      story: 'Se nos fundió la motobomba de gasolina en plena semana de cosecha cafetera. Antes tocaba amarrarla en una bestia y bajar 3 horas al pueblo a esperar tres días. En menos de 2 horas llegó Don Hernán en su moto con el carburador nuevo y los empaques. Nos salvó más de 40 arrobas de café en el beneficio.',
      impact: 'Cosecha de 40 arrobas salvada en menos de 3 horas'
    },
    {
      id: 2,
      author: 'Doña Carmen Echeverry',
      farm: 'Parcela San Isidro',
      vereda: 'Vereda Bellavista',
      production: 'Ganadería Doble Propósito y Lechería',
      rating: 5,
      story: 'Una tormenta eléctrica con un rayo cercano nos quemó el impulsor solar. Los terneros y vacas ya se estaban saliendo hacia el cultivo de maíz del vecino. Carlos Mario vino el mismo día, cambió el varillaje de tierra a copperweld, reemplazó los fusibles y la dejó calibrada con 8.5 kV de pulso seguro.',
      impact: '0 ganado extraviado y cerca protegida contra rayos'
    },
    {
      id: 3,
      author: 'Don Jaime Londoño',
      farm: 'Hacienda La Colina',
      vereda: 'Vereda San Rafael',
      production: 'Ordeño Mecánico y Silos de Maíz',
      rating: 5,
      story: 'El tanque enfriador de 1.200 litros se recalentó un sábado por la tarde con todo el ordeño recién almacenado. Pensamos que nos tocaría botar la leche. El servicio de emergencia de FixRural respondió en 45 minutos. Traían el relé y el ventilador de repuesto exacto.',
      impact: '1.200 litros de leche fría grado A protegidos'
    }
  ];

  return (
    <section id="historias" className="py-14 sm:py-20 bg-[#F8F9FA] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2E7D32]">
            <HeartHandshake className="w-4 h-4 text-[#2E7D32]" />
            <span>Historias Reales de Nuestros Productores</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            La Palabra y el Trabajo en el Campo
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Conozca los testimonios de campesinos, finqueros y administradores que confían su maquinaria y equipos a los técnicos de FixRural Digital.
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {stories.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow relative"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-7 h-7 text-emerald-200" />
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{item.story}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2">
                <div className="bg-emerald-50 text-emerald-900 text-xs px-2.5 py-1 rounded-md font-semibold flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-[#2E7D32] shrink-0" />
                  <span className="truncate">{item.impact}</span>
                </div>

                <div>
                  <h4 className="font-bold text-sm text-slate-900">{item.author}</h4>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <MapPin className="w-3 h-3 text-[#2E7D32]" />
                    <span>{item.farm} · {item.vereda}</span>
                  </div>
                  <span className="text-[11px] text-slate-400 block pt-0.5">
                    Producción: {item.production}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
