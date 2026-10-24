import { Service, Technician, QuoteRequest, VeredaInfo } from '../types';

export const INITIAL_VEREDAS: VeredaInfo[] = [
  {
    name: 'Vereda San Isidro (Güepsa)',
    distanceKm: 9,
    roadCondition: 'trocha',
    freightCost: 22000,
    description: 'Sector cañero y trapiches paneleros, acceso por trocha destapada'
  },
  {
    name: 'Vereda San Antonio (Güepsa)',
    distanceKm: 14,
    roadCondition: 'trocha',
    freightCost: 30000,
    description: 'Cordillera alta panelera y cafetera, vía de herradura y camino rural'
  },
  {
    name: 'Vereda Santa Bárbara (Güepsa)',
    distanceKm: 11,
    roadCondition: 'placa_huella',
    freightCost: 24000,
    description: 'Sector lechero y ganadero con tramos de placa-huella y pendientes'
  },
  {
    name: 'Vereda La Colorada (Güepsa)',
    distanceKm: 7,
    roadCondition: 'placa_huella',
    freightCost: 16000,
    description: 'Zona rural intermedia con acceso para moto o campero'
  },
  {
    name: 'Vereda El Porvenir & Trapiches (Güepsa)',
    distanceKm: 16,
    roadCondition: 'trocha',
    freightCost: 35000,
    description: 'Cuenca panelera con maquinaria de molienda y motores pesados'
  },
  {
    name: 'Sector Río Suárez / Límite Barbosa (Güepsa)',
    distanceKm: 18,
    roadCondition: 'trocha',
    freightCost: 38000,
    description: 'Zona de bombas de riego ribereñas y captaciones de agua'
  },
  {
    name: 'Casco Urbano de Güepsa y Alrededores',
    distanceKm: 3,
    roadCondition: 'pavimentada',
    freightCost: 8000,
    description: 'Perímetro urbano de Güepsa y fincas borde de vía nacional'
  }
];

export const INITIAL_SERVICES: Service[] = [
  {
    id: 'srv-1',
    name: 'Mantenimiento y Reparación de Motobomba Diésel / Gasolina',
    category: 'motobombas',
    price: 110000,
    description: 'Limpieza de carburador o inyector, cambio de empaques, ajuste de válvulas, chequeo de compresión y prueba de caudal bajo carga.',
    image: '/src/assets/images/service_motobomba_1792873894922.jpg',
    popular: true,
    estimatedTime: '2 a 3 horas en finca',
    active: true
  },
  {
    id: 'srv-2',
    name: 'Bobinado y Reparación de Electrobomba Sumergible / Pozo',
    category: 'motobombas',
    price: 145000,
    description: 'Diagnóstico de aislamiento dieléctrico, cambio de sello mecánico cerámico, rodamientos sellados y prueba de hermeticidad.',
    image: '/src/assets/images/service_motobomba_1792873894922.jpg',
    popular: false,
    estimatedTime: 'Mismo día o 24h con taller móvil',
    active: true
  },
  {
    id: 'srv-3',
    name: 'Instalación y Calibración de Cerca Eléctrica Solar Ganadera',
    category: 'electricidad',
    price: 125000,
    description: 'Montaje de panel solar fotovoltaico, regulador, batería de ciclo profundo, varilla de polo a tierra copperweld y medición de kilovoltios.',
    image: '/src/assets/images/service_cercas_1792873894915.jpg',
    popular: true,
    estimatedTime: '3 a 4 horas en potrero',
    active: true
  },
  {
    id: 'srv-4',
    name: 'Reparación de Energizador / Impulsor y Aisladores de Línea',
    category: 'electricidad',
    price: 90000,
    description: 'Detección de chispazos y fugas a tierra, reemplazo de condensadores quemados por descargas de tormenta y chequeo de corte.',
    image: '/src/assets/images/service_cercas_1792873894915.jpg',
    popular: false,
    estimatedTime: '1 a 2 horas',
    active: true
  },
  {
    id: 'srv-5',
    name: 'Red de Conducción Hidráulica por Gravedad y Válvulas Reguladoras',
    category: 'plomeria',
    price: 95000,
    description: 'Termofusión y roscado de manguera de alta densidad, instalación de ventosas rompedoras de vacío, cajas de paso y manómetros.',
    image: '/src/assets/images/service_hidraulica_1792873895217.jpg',
    popular: true,
    estimatedTime: '2 a 4 horas',
    active: true
  },
  {
    id: 'srv-6',
    name: 'Instalación, Desinfección y Boyas de Tanques de Almacenamiento',
    category: 'plomeria',
    price: 85000,
    description: 'Adecuación de base estructural, acople de flotadores mecánicos reforzados, filtros de sedimentos y reboses protegidos.',
    image: '/src/assets/images/service_hidraulica_1792873895217.jpg',
    popular: false,
    estimatedTime: '2 horas',
    active: true
  },
  {
    id: 'srv-7',
    name: 'Mantenimiento Preventivo de Tanque Enfriador de Leche',
    category: 'electrodomesticos',
    price: 135000,
    description: 'Revisión de compresor frigorífico, termostato digital, aspas del agitador, nivel de gas refrigerante y lavado higiénico de serpentín.',
    image: '/src/assets/images/hero_fixrural_campo_1792873893587.jpg',
    popular: true,
    estimatedTime: '3 horas',
    active: true
  },
  {
    id: 'srv-8',
    name: 'Reparación de Picapastos, Desgranadoras y Pequeños Motores',
    category: 'maquinaria',
    price: 100000,
    description: 'Afilado de cuchillas de corte, calibración de poleas y correas, engrase de chumaceras y alineación del eje de transmisión.',
    image: '/src/assets/images/service_motobomba_1792873894922.jpg',
    popular: false,
    estimatedTime: '2 horas',
    active: true
  }
];

export const INITIAL_TECHNICIANS: Technician[] = [
  {
    id: 'tec-1',
    name: 'Don Hernán Restrepo',
    specialty: 'Motobombas, Motores Diésel y Sistemas de Riego',
    vereda: 'Vereda El Manantial',
    phone: '312 458 9201',
    status: 'disponible',
    rating: 4.9,
    completedJobs: 148,
    avatar: 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'tec-2',
    name: 'Carlos Mario Gómez',
    specialty: 'Cercas Eléctricas Solares y Redes Eléctricas de Finca',
    vereda: 'Vereda Bellavista',
    phone: '314 789 3344',
    status: 'en_servicio',
    rating: 5.0,
    completedJobs: 195,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'tec-3',
    name: 'Javier Morales',
    specialty: 'Fontanería Rural, Acueductos y Presión por Gravedad',
    vereda: 'Vereda San Rafael',
    phone: '320 611 8852',
    status: 'disponible',
    rating: 4.8,
    completedJobs: 112,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'tec-4',
    name: 'Sandra Milena Ortiz',
    specialty: 'Electromecánica de Enfriadores y Línea Blanca Rural',
    vereda: 'Vereda La Cristalina',
    phone: '310 902 4411',
    status: 'disponible',
    rating: 4.9,
    completedJobs: 134,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200'
  }
];

export const INITIAL_QUOTES: QuoteRequest[] = [
  {
    id: 'COT-8921',
    clientName: 'Don Gonzalo Henao',
    clientPhone: '313 774 2019',
    vereda: 'Vereda El Manantial',
    distanceKm: 12,
    roadCondition: 'trocha',
    serviceId: 'srv-1',
    serviceName: 'Mantenimiento y Reparación de Motobomba Diésel / Gasolina',
    baseLaborPrice: 110000,
    freightPrice: 28000,
    urgencyMultiplier: 1.0,
    urgencyLabel: 'Servicio Programado (24h)',
    totalPrice: 138000,
    notes: 'Motobomba no chupa agua, tiene sonido extraño al acelerar.',
    status: 'en_ruta',
    createdAt: '2026-10-24 09:30'
  },
  {
    id: 'COT-8920',
    clientName: 'Doña Amparo Cañas',
    clientPhone: '311 892 1140',
    vereda: 'Vereda Bellavista',
    distanceKm: 8,
    roadCondition: 'placa_huella',
    serviceId: 'srv-3',
    serviceName: 'Instalación y Calibración de Cerca Eléctrica Solar Ganadera',
    baseLaborPrice: 125000,
    freightPrice: 18000,
    urgencyMultiplier: 1.3,
    urgencyLabel: 'Prioritario Mismo Día (+30%)',
    totalPrice: 180500,
    notes: 'El ganado se está pasando al potrero vecino porque el energizador no da golpe.',
    status: 'pendiente',
    createdAt: '2026-10-24 11:15'
  },
  {
    id: 'COT-8919',
    clientName: 'Finca Los Guaduales (Adm. Ramiro)',
    clientPhone: '315 220 9081',
    vereda: 'Vereda La Cristalina',
    distanceKm: 6,
    roadCondition: 'placa_huella',
    serviceId: 'srv-5',
    serviceName: 'Red de Conducción Hidráulica por Gravedad y Válvulas Reguladoras',
    baseLaborPrice: 95000,
    freightPrice: 14000,
    urgencyMultiplier: 1.0,
    urgencyLabel: 'Servicio Programado (24h)',
    totalPrice: 109000,
    notes: 'Rotura en manguera de 2 pulgadas por derrumbe leve.',
    status: 'atendido',
    createdAt: '2026-10-23 16:40'
  },
  {
    id: 'COT-8918',
    clientName: 'Jorge Eliécer Quiceno',
    clientPhone: '318 450 6329',
    vereda: 'Vereda Santa Bárbara',
    distanceKm: 15,
    roadCondition: 'trocha',
    serviceId: 'srv-7',
    serviceName: 'Mantenimiento Preventivo de Tanque Enfriador de Leche',
    baseLaborPrice: 135000,
    freightPrice: 32000,
    urgencyMultiplier: 1.5,
    urgencyLabel: 'Emergencia Crítica Cosecha/Ordeño (+50%)',
    totalPrice: 234500,
    notes: 'Tanque no baja de 12 grados, ordeño listo para conservar.',
    status: 'atendido',
    createdAt: '2026-10-23 07:15'
  }
];
