import React, { useState } from 'react';
import { Service, Technician, QuoteRequest, ServiceCategory, TechnicianStatus, QuoteStatus } from '../types';
import { formatCurrency, generateWhatsAppLink, ADMIN_EMAIL } from '../utils/formatters';
import { 
  Wrench, Users, FileText, LogOut, Plus, Edit2, Trash2, CheckCircle2, 
  Clock, AlertCircle, Phone, MapPin, Search, ChevronRight, Eye, Sparkles, Filter, Check
} from 'lucide-react';

interface AdminDashboardProps {
  services: Service[];
  technicians: Technician[];
  quotes: QuoteRequest[];
  onUpdateServices: (services: Service[]) => void;
  onUpdateTechnicians: (technicians: Technician[]) => void;
  onUpdateQuotes: (quotes: QuoteRequest[]) => void;
  onLogout: () => void;
  onOpenPhotoStudio: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  services,
  technicians,
  quotes,
  onUpdateServices,
  onUpdateTechnicians,
  onUpdateQuotes,
  onLogout,
  onOpenPhotoStudio,
}) => {
  const [activeTab, setActiveTab] = useState<'servicios' | 'tecnicos' | 'cotizaciones'>('servicios');

  // Search & Filters
  const [quoteFilter, setQuoteFilter] = useState<'all' | QuoteStatus>('all');
  const [quoteSearch, setQuoteSearch] = useState('');

  // Service modal / form state
  const [isEditingService, setIsEditingService] = useState<boolean>(false);
  const [currentEditingService, setCurrentEditingService] = useState<Service | null>(null);
  const [serviceForm, setServiceForm] = useState<{
    name: string;
    price: number;
    category: ServiceCategory;
    image: string;
    description: string;
    estimatedTime: string;
  }>({
    name: '',
    price: 100000,
    category: 'motobombas',
    image: '/images/service_motobomba.jpg',
    description: '',
    estimatedTime: '2 horas',
  });

  // Technician modal / form state
  const [isAddingTech, setIsAddingTech] = useState<boolean>(false);
  const [techForm, setTechForm] = useState<{
    name: string;
    specialty: string;
    vereda: string;
    phone: string;
  }>({
    name: '',
    specialty: '',
    vereda: '',
    phone: '',
  });

  // Quote detail preview modal
  const [selectedQuoteDetail, setSelectedQuoteDetail] = useState<QuoteRequest | null>(null);

  // Handlers for Services
  const handleOpenAddService = () => {
    setCurrentEditingService(null);
    setServiceForm({
      name: '',
      price: 100000,
      category: 'motobombas',
      image: '/images/service_motobomba.jpg',
      description: '',
      estimatedTime: '2 a 3 horas',
    });
    setIsEditingService(true);
  };

  const handleOpenEditService = (srv: Service) => {
    setCurrentEditingService(srv);
    setServiceForm({
      name: srv.name,
      price: srv.price,
      category: srv.category,
      image: srv.image,
      description: srv.description,
      estimatedTime: srv.estimatedTime,
    });
    setIsEditingService(true);
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentEditingService) {
      // Edit
      const updated = services.map((s) =>
        s.id === currentEditingService.id
          ? { ...s, ...serviceForm }
          : s
      );
      onUpdateServices(updated);
    } else {
      // Create
      const newSrv: Service = {
        id: `srv-${Date.now()}`,
        ...serviceForm,
        popular: false,
        active: true,
      };
      onUpdateServices([newSrv, ...services]);
    }
    setIsEditingService(false);
  };

  const handleDeleteService = (id: string) => {
    if (confirm('¿Confirma que desea eliminar este servicio del catálogo?')) {
      onUpdateServices(services.filter((s) => s.id !== id));
    }
  };

  const handleToggleServiceActive = (id: string) => {
    onUpdateServices(
      services.map((s) => (s.id === id ? { ...s, active: !s.active } : s))
    );
  };

  // Handlers for Technicians
  const handleSaveTechnician = (e: React.FormEvent) => {
    e.preventDefault();
    if (!techForm.name || !techForm.phone) return;
    const newTech: Technician = {
      id: `tec-${Date.now()}`,
      name: techForm.name,
      specialty: techForm.specialty || 'Técnico General',
      vereda: techForm.vereda || 'Casco Urbano y Veredas',
      phone: techForm.phone,
      status: 'disponible',
      rating: 5.0,
      completedJobs: 0,
      avatar: 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&q=80&w=200',
    };
    onUpdateTechnicians([newTech, ...technicians]);
    setIsAddingTech(false);
    setTechForm({ name: '', specialty: '', vereda: '', phone: '' });
  };

  const handleUpdateTechStatus = (techId: string, newStatus: TechnicianStatus) => {
    onUpdateTechnicians(
      technicians.map((t) => (t.id === techId ? { ...t, status: newStatus } : t))
    );
  };

  const handleDeleteTechnician = (techId: string) => {
    if (confirm('¿Desea desvincular a este técnico del registro veredal?')) {
      onUpdateTechnicians(technicians.filter((t) => t.id !== techId));
    }
  };

  // Handlers for Quotes
  const handleUpdateQuoteStatus = (quoteId: string, newStatus: QuoteStatus) => {
    onUpdateQuotes(
      quotes.map((q) => (q.id === quoteId ? { ...q, status: newStatus } : q))
    );
  };

  const filteredQuotes = quotes.filter((q) => {
    const matchStatus = quoteFilter === 'all' || q.status === quoteFilter;
    const matchSearch =
      q.clientName.toLowerCase().includes(quoteSearch.toLowerCase()) ||
      q.vereda.toLowerCase().includes(quoteSearch.toLowerCase()) ||
      q.id.toLowerCase().includes(quoteSearch.toLowerCase()) ||
      q.serviceName.toLowerCase().includes(quoteSearch.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      {/* Admin Top Bar */}
      <header className="bg-[#1B4D3E] text-white border-b border-emerald-900 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
              <Wrench className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl">
                  Panel de Control FixRural
                </span>
                <span className="text-[10px] bg-amber-400 text-slate-950 font-bold px-2 py-0.5 rounded uppercase hidden sm:inline">
                  Tatiana Callejas · Güepsa, Santander
                </span>
              </div>
              <p className="text-xs text-emerald-200 font-mono truncate max-w-[200px] sm:max-w-none">
                {ADMIN_EMAIL}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenPhotoStudio}
              className="min-h-[40px] px-3 py-1.5 bg-emerald-700/80 hover:bg-emerald-600 text-amber-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
              title="Limpiador de fotos de repuestos"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Taller Fotos IA</span>
            </button>

            {/* Logout Button (PDF Requirement d: Botón de Cerrar Sesión) */}
            <button
              onClick={onLogout}
              className="min-h-[40px] px-3.5 py-1.5 bg-red-600/90 hover:bg-red-500 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 cursor-pointer shadow-sm transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>

        {/* 3 Main Tabs Strip (PDF Requirement a, b, c) */}
        <div className="bg-[#143B2F] border-t border-emerald-800/80 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center gap-2 sm:gap-4 overflow-x-auto scrollbar-none py-1">
            <button
              onClick={() => setActiveTab('servicios')}
              className={`min-h-[44px] px-4 py-2 text-xs sm:text-sm font-bold flex items-center gap-2 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'servicios'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-emerald-200 hover:text-white hover:bg-emerald-800/60'
              }`}
            >
              <Wrench className="w-4 h-4" />
              <span>a) Gestionar Servicios ({services.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('tecnicos')}
              className={`min-h-[44px] px-4 py-2 text-xs sm:text-sm font-bold flex items-center gap-2 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'tecnicos'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-emerald-200 hover:text-white hover:bg-emerald-800/60'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>b) Técnicos Veredales ({technicians.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('cotizaciones')}
              className={`min-h-[44px] px-4 py-2 text-xs sm:text-sm font-bold flex items-center gap-2 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'cotizaciones'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-emerald-200 hover:text-white hover:bg-emerald-800/60'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>c) Solicitudes y Cotizaciones ({quotes.length})</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        {/* ============================================================== */}
        {/* TAB A: GESTIONAR SERVICIOS */}
        {/* ============================================================== */}
        {activeTab === 'servicios' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Gestión del Catálogo de Servicios
                </h2>
                <p className="text-xs text-slate-500">
                  Agregue, edite precios, categorías y disponibilidad técnica en finca.
                </p>
              </div>

              <button
                onClick={handleOpenAddService}
                className="min-h-[44px] px-4 py-2.5 bg-[#1B4D3E] hover:bg-[#143B2F] text-white text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-colors"
              >
                <Plus className="w-4 h-4 text-amber-400" />
                <span>Agregar Nuevo Servicio</span>
              </button>
            </div>

            {/* Services Grid in Admin */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {services.map((srv) => (
                <div
                  key={srv.id}
                  className={`bg-white rounded-2xl border transition-all p-5 flex flex-col justify-between space-y-4 shadow-sm ${
                    srv.active ? 'border-slate-200' : 'border-red-200 bg-slate-50 opacity-70'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="relative h-36 rounded-xl overflow-hidden bg-slate-100">
                      <img
                        src={srv.image}
                        alt={srv.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-900/80 text-white">
                        {srv.category}
                      </span>
                      <span className="absolute bottom-2 right-2 text-xs font-black font-mono px-2 py-0.5 rounded bg-amber-400 text-slate-950 shadow">
                        {formatCurrency(srv.price)}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-bold text-base text-slate-900 leading-snug">
                        {srv.name}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                        {srv.description}
                      </p>
                    </div>

                    <div className="text-[11px] text-slate-400">
                      Tiempo estimado: <span className="text-slate-600 font-medium">{srv.estimatedTime}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleToggleServiceActive(srv.id)}
                      className={`text-xs px-2.5 py-1.5 rounded-lg font-medium cursor-pointer transition-colors ${
                        srv.active
                          ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                          : 'bg-red-50 text-red-700 hover:bg-red-100'
                      }`}
                    >
                      {srv.active ? '✓ Activo' : '✕ Pausado'}
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenEditService(srv)}
                        className="p-2 text-slate-600 hover:text-[#1B4D3E] hover:bg-slate-100 rounded-lg cursor-pointer transition-colors"
                        title="Editar servicio"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteService(srv.id)}
                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg cursor-pointer transition-colors"
                        title="Eliminar servicio"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB B: REGISTRO DE TÉCNICOS VEREDALES */}
        {/* ============================================================== */}
        {activeTab === 'tecnicos' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Registro de Técnicos Veredales
                </h2>
                <p className="text-xs text-slate-500">
                  Inscriba personal técnico, asigne sectores y supervise el estado operativo.
                </p>
              </div>

              <button
                onClick={() => setIsAddingTech(true)}
                className="min-h-[44px] px-4 py-2.5 bg-[#1B4D3E] hover:bg-[#143B2F] text-white text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-colors"
              >
                <Plus className="w-4 h-4 text-amber-400" />
                <span>Inscribir Nuevo Técnico</span>
              </button>
            </div>

            {/* Technicians Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {technicians.map((tech) => {
                const techWhatsApp = generateWhatsAppLink(
                  tech.phone,
                  `Hola ${tech.name}, desde la administración de FixRural Digital te contactamos para asignar un nuevo servicio técnico.`
                );

                return (
                  <div
                    key={tech.id}
                    className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={tech.avatar || 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&q=80&w=200'}
                            alt={tech.name}
                            className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <h3 className="font-bold text-base text-slate-900 leading-snug">
                              {tech.name}
                            </h3>
                            <span className="text-xs text-[#2E7D32] font-semibold block">
                              {tech.specialty}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleDeleteTechnician(tech.id)}
                          className="text-slate-400 hover:text-red-500 p-1"
                          title="Eliminar técnico"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-[#2E7D32] shrink-0" />
                          <span className="font-medium text-slate-800">{tech.vereda}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          <span className="font-mono text-slate-700">{tech.phone}</span>
                        </div>
                        <div className="flex items-center justify-between pt-1 border-t border-slate-200 text-[11px]">
                          <span>Servicios realizados:</span>
                          <span className="font-bold font-mono text-slate-800">{tech.completedJobs} fincas</span>
                        </div>
                      </div>
                    </div>

                    {/* Status & WhatsApp Action */}
                    <div className="pt-3 border-t border-slate-100 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500 font-medium">Estado actual:</span>
                        <select
                          value={tech.status}
                          onChange={(e) => handleUpdateTechStatus(tech.id, e.target.value as TechnicianStatus)}
                          className={`text-xs font-bold rounded-lg px-2 py-1 border cursor-pointer ${
                            tech.status === 'disponible'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : tech.status === 'en_servicio'
                              ? 'bg-amber-50 text-amber-900 border-amber-300'
                              : 'bg-slate-100 text-slate-600 border-slate-300'
                          }`}
                        >
                          <option value="disponible">🟢 Disponible</option>
                          <option value="en_servicio">🟠 En Servicio</option>
                          <option value="descanso">⚪ Descanso</option>
                        </select>
                      </div>

                      <a
                        href={techWhatsApp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full min-h-[38px] py-1.5 px-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-[#1B4D3E] text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5 text-[#2E7D32]" />
                        <span>Despachar por WhatsApp</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB C: HISTORIAL DE SOLICITUDES Y COTIZACIONES (TABLE CON SCROLL HORIZONTAL) */}
        {/* ============================================================== */}
        {activeTab === 'cotizaciones' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            {/* Top Toolbar with Filter & Search */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Historial de Solicitudes y Cotizaciones
                </h2>
                <p className="text-xs text-slate-500">
                  Supervise en tiempo real las solicitudes generadas por clientes y campesinos.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Search */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={quoteSearch}
                    onChange={(e) => setQuoteSearch(e.target.value)}
                    placeholder="Buscar cliente, vereda..."
                    className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#1B4D3E]"
                  />
                </div>

                {/* Filter Status */}
                <select
                  value={quoteFilter}
                  onChange={(e) => setQuoteFilter(e.target.value as any)}
                  className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-[#1B4D3E]"
                >
                  <option value="all">Todos los Estados</option>
                  <option value="pendiente">Pendientes</option>
                  <option value="en_ruta">En Ruta</option>
                  <option value="atendido">Atendidos</option>
                </select>
              </div>
            </div>

            {/* Table with Automatic Horizontal Scroll on Mobile per PDF Requirement */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs whitespace-nowrap min-w-[750px]">
                  <thead className="bg-[#1B4D3E] text-white text-[11px] uppercase font-bold tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4">Código / Fecha</th>
                      <th className="py-3.5 px-4">Cliente / Celular</th>
                      <th className="py-3.5 px-4">Vereda / Terreno</th>
                      <th className="py-3.5 px-4">Servicio Solicitado</th>
                      <th className="py-3.5 px-4 text-right">Mano Obra</th>
                      <th className="py-3.5 px-4 text-right">Flete Veredal</th>
                      <th className="py-3.5 px-4 text-right">Total Est.</th>
                      <th className="py-3.5 px-4 text-center">Estado</th>
                      <th className="py-3.5 px-4 text-center">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    {filteredQuotes.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="py-8 text-center text-slate-400">
                          No se encontraron solicitudes registradas con estos filtros.
                        </td>
                      </tr>
                    ) : (
                      filteredQuotes.map((quote) => {
                        const directClientWhatsApp = generateWhatsAppLink(
                          quote.clientPhone,
                          `Hola ${quote.clientName}, de FixRural Digital le escribimos respecto a su solicitud ${quote.id} para ${quote.serviceName}. Le confirmamos asignación del técnico.`
                        );

                        return (
                          <tr key={quote.id} className="hover:bg-slate-50 transition-colors">
                            {/* Code / Date */}
                            <td className="py-3 px-4 font-mono">
                              <span className="font-bold text-[#1B4D3E]">{quote.id}</span>
                              <span className="block text-[10px] text-slate-400">{quote.createdAt}</span>
                            </td>

                            {/* Client */}
                            <td className="py-3 px-4">
                              <span className="font-bold text-slate-900 block">{quote.clientName}</span>
                              <span className="text-[11px] text-slate-500 font-mono">{quote.clientPhone}</span>
                            </td>

                            {/* Vereda */}
                            <td className="py-3 px-4">
                              <span className="font-medium text-slate-800 block">{quote.vereda}</span>
                              <span className="text-[10px] text-emerald-700 font-semibold uppercase">
                                {quote.roadCondition} ({quote.distanceKm} km)
                              </span>
                            </td>

                            {/* Service */}
                            <td className="py-3 px-4 max-w-xs truncate" title={quote.serviceName}>
                              <span className="font-medium text-slate-900 block truncate">
                                {quote.serviceName}
                              </span>
                              <span className="text-[10px] text-slate-500">{quote.urgencyLabel}</span>
                            </td>

                            {/* Base Labor */}
                            <td className="py-3 px-4 text-right font-mono font-medium">
                              {formatCurrency(quote.baseLaborPrice)}
                            </td>

                            {/* Freight */}
                            <td className="py-3 px-4 text-right font-mono font-medium text-amber-700">
                              {formatCurrency(quote.freightPrice)}
                            </td>

                            {/* Total */}
                            <td className="py-3 px-4 text-right font-mono font-extrabold text-[#1B4D3E]">
                              {formatCurrency(quote.totalPrice)}
                            </td>

                            {/* Status Selector */}
                            <td className="py-3 px-4 text-center">
                              <select
                                value={quote.status}
                                onChange={(e) => handleUpdateQuoteStatus(quote.id, e.target.value as QuoteStatus)}
                                className={`text-[11px] font-bold rounded-lg px-2 py-1 border cursor-pointer ${
                                  quote.status === 'pendiente'
                                    ? 'bg-amber-50 text-amber-800 border-amber-300'
                                    : quote.status === 'en_ruta'
                                    ? 'bg-blue-50 text-blue-800 border-blue-300'
                                    : quote.status === 'atendido'
                                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                    : 'bg-red-50 text-red-800 border-red-300'
                                }`}
                              >
                                <option value="pendiente">Pendiente</option>
                                <option value="en_ruta">En Ruta</option>
                                <option value="atendido">Atendido</option>
                                <option value="cancelado">Cancelado</option>
                              </select>
                            </td>

                            {/* Actions */}
                            <td className="py-3 px-4 text-center">
                              <div className="flex items-center justify-center gap-1.5">
                                <button
                                  onClick={() => setSelectedQuoteDetail(quote)}
                                  className="p-1.5 text-slate-500 hover:text-[#1B4D3E] hover:bg-slate-100 rounded-lg cursor-pointer"
                                  title="Ver detalle de notas"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <a
                                  href={directClientWhatsApp}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg"
                                  title="Enviar WhatsApp al cliente"
                                >
                                  <Phone className="w-4 h-4" />
                                </a>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Table Footer with Summary */}
              <div className="bg-slate-50 px-4 py-3 border-t border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-500">
                <span>
                  Total registros: <strong className="text-slate-800">{filteredQuotes.length}</strong>
                </span>
                <span className="text-[11px] text-slate-400">
                  Deslice horizontalmente en celulares para ver todas las columnas →
                </span>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ============================================================== */}
      {/* MODAL: AGREGAR / EDITAR SERVICIO */}
      {/* ============================================================== */}
      {isEditingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-[#1B4D3E] text-white p-4 flex items-center justify-between">
              <h3 className="font-bold text-base">
                {currentEditingService ? 'Editar Servicio del Catálogo' : 'Agregar Nuevo Servicio'}
              </h3>
              <button
                onClick={() => setIsEditingService(false)}
                className="text-emerald-200 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveService} className="p-5 space-y-4 text-xs sm:text-sm">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Nombre del Servicio:</label>
                <input
                  type="text"
                  required
                  value={serviceForm.name}
                  onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
                  placeholder="Ej. Calibración de Molino o Bomba..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Precio Base Mano de Obra ($ COP):</label>
                  <input
                    type="number"
                    min="10000"
                    step="5000"
                    required
                    value={serviceForm.price}
                    onChange={(e) => setServiceForm({ ...serviceForm, price: parseInt(e.target.value) || 0 })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Categoría:</label>
                  <select
                    value={serviceForm.category}
                    onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value as ServiceCategory })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
                  >
                    <option value="motobombas">Motobombas & Riego</option>
                    <option value="electricidad">Electricidad & Cercas</option>
                    <option value="plomeria">Plomería & Hidráulica</option>
                    <option value="electrodomesticos">Electrodomésticos / Finca</option>
                    <option value="maquinaria">Maquinaria & Motores</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">URL de Imagen del Servicio:</label>
                <input
                  type="text"
                  required
                  value={serviceForm.image}
                  onChange={(e) => setServiceForm({ ...serviceForm, image: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-mono text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Tiempo Estimado en Parcela:</label>
                <input
                  type="text"
                  value={serviceForm.estimatedTime}
                  onChange={(e) => setServiceForm({ ...serviceForm, estimatedTime: e.target.value })}
                  placeholder="Ej. 2 a 3 horas"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Descripción Detallada:</label>
                <textarea
                  rows={3}
                  required
                  value={serviceForm.description}
                  onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                  placeholder="Detalles de la labor técnica..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditingService(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1B4D3E] hover:bg-[#143B2F] text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  Guardar Servicio
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL: INSCRIBIR TÉCNICO VEREDAL */}
      {/* ============================================================== */}
      {isAddingTech && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-[#1B4D3E] text-white p-4 flex items-center justify-between">
              <h3 className="font-bold text-base">Inscribir Técnico Veredal</h3>
              <button
                onClick={() => setIsAddingTech(false)}
                className="text-emerald-200 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveTechnician} className="p-5 space-y-4 text-xs sm:text-sm">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Nombre Completo del Técnico:</label>
                <input
                  type="text"
                  required
                  value={techForm.name}
                  onChange={(e) => setTechForm({ ...techForm, name: e.target.value })}
                  placeholder="Ej. Don Albeiro Morales"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Especialidad Principal:</label>
                <input
                  type="text"
                  required
                  value={techForm.specialty}
                  onChange={(e) => setTechForm({ ...techForm, specialty: e.target.value })}
                  placeholder="Ej. Motobombas & Motores Diésel"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Vereda de Residencia / Base:</label>
                <input
                  type="text"
                  required
                  value={techForm.vereda}
                  onChange={(e) => setTechForm({ ...techForm, vereda: e.target.value })}
                  placeholder="Ej. Vereda San Rafael o Casco Urbano"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Teléfono / Celular de Contacto:</label>
                <input
                  type="tel"
                  required
                  value={techForm.phone}
                  onChange={(e) => setTechForm({ ...techForm, phone: e.target.value })}
                  placeholder="Ej. 312 458 9201"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-mono"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddingTech(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1B4D3E] hover:bg-[#143B2F] text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  Inscribir Técnico
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL: DETALLE DE COTIZACIÓN */}
      {/* ============================================================== */}
      {selectedQuoteDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-[#1B4D3E] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-base">Detalle Solicitud {selectedQuoteDetail.id}</h3>
              </div>
              <button
                onClick={() => setSelectedQuoteDetail(null)}
                className="text-emerald-200 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-500 text-[11px] block">Cliente:</span>
                  <span className="font-bold text-slate-900">{selectedQuoteDetail.clientName}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[11px] block">Teléfono:</span>
                  <span className="font-mono font-semibold text-slate-900">{selectedQuoteDetail.clientPhone}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[11px] block">Ubicación:</span>
                  <span className="font-semibold text-slate-800">{selectedQuoteDetail.vereda}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[11px] block">Vía y Distancia:</span>
                  <span className="capitalize font-semibold text-slate-800">
                    {selectedQuoteDetail.roadCondition} ({selectedQuoteDetail.distanceKm} km)
                  </span>
                </div>
              </div>

              <div>
                <span className="text-slate-500 text-[11px] block">Servicio Requerido:</span>
                <span className="font-bold text-[#1B4D3E] text-base">{selectedQuoteDetail.serviceName}</span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                <span className="text-slate-500 text-[11px] block font-bold uppercase">
                  Observaciones y Punto de Referencia:
                </span>
                <p className="text-slate-700 italic">{selectedQuoteDetail.notes || 'Sin observaciones adicionales.'}</p>
              </div>

              <div className="border-t border-slate-200 pt-3 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-600">Mano de Obra:</span>
                  <span className="font-mono font-bold">{formatCurrency(selectedQuoteDetail.baseLaborPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Flete Veredal:</span>
                  <span className="font-mono font-bold">{formatCurrency(selectedQuoteDetail.freightPrice)}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-200 text-sm font-black text-[#1B4D3E]">
                  <span>Total Liquidado:</span>
                  <span className="font-mono">{formatCurrency(selectedQuoteDetail.totalPrice)}</span>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setSelectedQuoteDetail(null)}
                  className="px-4 py-2 bg-[#1B4D3E] text-white font-bold rounded-xl text-xs"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
