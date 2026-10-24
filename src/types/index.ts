export type ServiceCategory = 
  | 'motobombas' 
  | 'electricidad' 
  | 'plomeria' 
  | 'electrodomesticos' 
  | 'maquinaria';

export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  price: number;
  description: string;
  image: string;
  popular?: boolean;
  estimatedTime: string;
  active: boolean;
}

export type TechnicianStatus = 'disponible' | 'en_servicio' | 'descanso';

export interface Technician {
  id: string;
  name: string;
  specialty: string;
  vereda: string;
  phone: string;
  status: TechnicianStatus;
  rating: number;
  completedJobs: number;
  avatar?: string;
}

export type QuoteStatus = 'pendiente' | 'en_ruta' | 'atendido' | 'cancelado';

export interface QuoteRequest {
  id: string;
  clientName: string;
  clientPhone: string;
  vereda: string;
  distanceKm: number;
  roadCondition: 'pavimentada' | 'placa_huella' | 'trocha';
  serviceId: string;
  serviceName: string;
  baseLaborPrice: number;
  freightPrice: number;
  urgencyMultiplier: number;
  urgencyLabel: string;
  totalPrice: number;
  notes?: string;
  status: QuoteStatus;
  createdAt: string;
}

export interface VeredaInfo {
  name: string;
  distanceKm: number;
  roadCondition: 'pavimentada' | 'placa_huella' | 'trocha';
  freightCost: number;
  description: string;
}
