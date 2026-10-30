import React, { useState, useEffect } from 'react';
import { Service, Technician, QuoteRequest } from './types';
import { INITIAL_SERVICES, INITIAL_TECHNICIANS, INITIAL_QUOTES } from './data/mockData';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutMission } from './components/AboutMission';
import { ServiceCatalog } from './components/ServiceCatalog';
import { FreightCalculator } from './components/FreightCalculator';
import { WarrantySection } from './components/WarrantySection';
import { CampesinoStories } from './components/CampesinoStories';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { LoginModal } from './components/LoginModal';
import { AdminDashboard } from './components/AdminDashboard';
import { PhotoCleanUpStudio } from './components/PhotoCleanUpStudio';
import { Footer } from './components/Footer';
import { DevToolsLockScreen } from './components/DevToolsLockScreen';
import { subscribeDevTools } from './utils/security';

export default function App() {
  // App views
  const [view, setView] = useState<'public' | 'admin'>('public');

  // Shared state
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const [technicians, setTechnicians] = useState<Technician[]>(INITIAL_TECHNICIANS);
  const [quotes, setQuotes] = useState<QuoteRequest[]>(INITIAL_QUOTES);

  // Modals & Panels
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [isPhotoStudioOpen, setIsPhotoStudioOpen] = useState<boolean>(false);
  const [selectedServiceForQuote, setSelectedServiceForQuote] = useState<Service | null>(null);
  const [isDevToolsLocked, setIsDevToolsLocked] = useState<boolean>(false);

  // Escuchar detección de herramientas de desarrollador
  useEffect(() => {
    const unsubscribe = subscribeDevTools((isOpen) => {
      setIsDevToolsLocked(isOpen);
    });
    return unsubscribe;
  }, []);

  const handleOpenCalculator = () => {
    setView('public');
    const elem = document.getElementById('calculadora');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceFromCatalog = (service: Service) => {
    setSelectedServiceForQuote(service);
    handleOpenCalculator();
  };

  const handleAddQuoteRequest = (newQuote: QuoteRequest) => {
    setQuotes((prev) => [newQuote, ...prev]);
  };

  const handleLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    setView('admin');
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    setView('public');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-slate-900">
      {view === 'admin' && isAdminLoggedIn ? (
        <AdminDashboard
          services={services}
          technicians={technicians}
          quotes={quotes}
          onUpdateServices={setServices}
          onUpdateTechnicians={setTechnicians}
          onUpdateQuotes={setQuotes}
          onLogout={handleLogout}
          onOpenPhotoStudio={() => setIsPhotoStudioOpen(true)}
        />
      ) : (
        <>
          {/* Public Platform Navigation */}
          <Header
            onOpenLogin={() => setIsLoginOpen(true)}
            onOpenCalculator={handleOpenCalculator}
            onOpenPhotoStudio={() => setIsPhotoStudioOpen(true)}
            isAdminLoggedIn={isAdminLoggedIn}
            onGoToAdmin={() => setView('admin')}
          />

          {/* Hero Section */}
          <main className="flex-1">
            <Hero
              onOpenCalculator={handleOpenCalculator}
              onOpenPhotoStudio={() => setIsPhotoStudioOpen(true)}
            />

            {/* Misión, Visión, Quién lo creó y El Por qué (Güepsa, Santander) */}
            <AboutMission />

            {/* Dynamic Catalog */}
            <ServiceCatalog
              services={services}
              onSelectServiceForQuote={handleSelectServiceFromCatalog}
            />

            {/* Interactive Fare and Freight Calculator */}
            <FreightCalculator
              services={services.filter((s) => s.active)}
              selectedServiceId={selectedServiceForQuote?.id}
              onAddQuoteRequest={handleAddQuoteRequest}
            />

            {/* 3-Step Warranty */}
            <WarrantySection />

            {/* Campesino Stories and Impact */}
            <CampesinoStories />
          </main>

          {/* Footer */}
          <Footer
            onOpenLogin={() => setIsLoginOpen(true)}
            isAdminLoggedIn={isAdminLoggedIn}
            onGoToAdmin={() => setView('admin')}
          />

          {/* Giant Floating WhatsApp Widget */}
          <FloatingWhatsApp />
        </>
      )}

      {/* Login & Recovery Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSuccessLogin={handleLoginSuccess}
      />

      {/* AI Photo CleanUp Studio for Machinery & Product Photos */}
      <PhotoCleanUpStudio
        isOpen={isPhotoStudioOpen}
        onClose={() => setIsPhotoStudioOpen(false)}
      />

      {/* Pantalla de Bloqueo de Seguridad por Herramientas de Desarrollo */}
      {isDevToolsLocked && (
        <DevToolsLockScreen onUnlock={() => setIsDevToolsLocked(false)} />
      )}
    </div>
  );
}
