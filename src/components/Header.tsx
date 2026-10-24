import React, { useState } from 'react';
import { Wrench, Phone, Menu, X, ShieldCheck, Lock, MapPin, Calculator, Sparkles, MessageCircle } from 'lucide-react';
import { OFFICIAL_WHATSAPP, OFFICIAL_PHONE_DISPLAY, generateWhatsAppLink } from '../utils/formatters';

interface HeaderProps {
  onOpenLogin: () => void;
  onOpenCalculator: () => void;
  onOpenPhotoStudio: () => void;
  isAdminLoggedIn: boolean;
  onGoToAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenLogin,
  onOpenCalculator,
  onOpenPhotoStudio,
  isAdminLoggedIn,
  onGoToAdmin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const directWhatsAppUrl = generateWhatsAppLink(
    OFFICIAL_WHATSAPP,
    '¡Hola FixRural Digital! Necesito información y asesoría para un servicio técnico en mi vereda.'
  );

  return (
    <header className="sticky top-0 z-40 bg-[#1B4D3E] text-white shadow-md border-b border-emerald-900/40">
      {/* Top Banner Notice */}
      <div className="bg-[#143B2F] px-4 py-1.5 text-xs text-emerald-200 border-b border-emerald-800/40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="font-semibold text-emerald-100">Cobertura Activa en Veredas</span>
            <span className="hidden sm:inline text-emerald-300">· Llegamos a trochas y alta cordillera</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <a
              href="tel:+573103586278"
              className="hover:text-amber-300 transition-colors flex items-center gap-1 font-mono"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>{OFFICIAL_PHONE_DISPLAY}</span>
            </a>
            <span className="hidden md:inline text-emerald-500">|</span>
            <span className="hidden md:inline text-emerald-300">Atención técnica lunes a domingo</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo Brand */}
          <a href="#" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-amber-400 rounded-lg p-1">
            <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-[#1B4D3E] shadow-sm group-hover:bg-amber-400 transition-colors">
              <Wrench className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
                  FixRural<span className="text-amber-400">Digital</span>
                </span>
              </div>
              <p className="text-[11px] text-emerald-200 tracking-wide font-medium hidden sm:block">
                Servicios Técnicos & Mantenimiento para el Campo
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-emerald-100">
            <a href="#nosotros" className="hover:text-amber-300 transition-colors py-2">
              Misión & Origen
            </a>
            <a href="#servicios" className="hover:text-amber-300 transition-colors py-2">
              Catálogo de Servicios
            </a>
            <button
              onClick={onOpenCalculator}
              className="hover:text-amber-300 transition-colors flex items-center gap-1.5 py-2 cursor-pointer"
            >
              <Calculator className="w-4 h-4 text-amber-400" />
              <span>Calculadora de Flete</span>
            </button>
            <a href="#garantia" className="hover:text-amber-300 transition-colors py-2">
              Garantía en 3 Pasos
            </a>
            <a href="#historias" className="hover:text-amber-300 transition-colors py-2">
              Historias Campesinas
            </a>
            <button
              onClick={onOpenPhotoStudio}
              className="hover:text-amber-300 transition-colors flex items-center gap-1.5 py-2 cursor-pointer"
              title="Limpiador de fotos de repuestos y productos"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Taller de Fotos IA</span>
            </button>
          </nav>

          {/* Action Buttons Right */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Direct WhatsApp CTA */}
            <a
              href={directWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all shadow-sm focus:ring-2 focus:ring-emerald-300"
            >
              <MessageCircle className="w-4 h-4 text-emerald-100 fill-emerald-100" />
              <span>Pedir por WhatsApp</span>
            </a>

            {/* Admin Login Button */}
            {isAdminLoggedIn ? (
              <button
                onClick={onGoToAdmin}
                className="min-h-[44px] px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 transition-all shadow-sm cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-slate-950" />
                <span>Panel Administrador</span>
              </button>
            ) : (
              <button
                onClick={onOpenLogin}
                className="min-h-[44px] px-3 py-2 bg-[#143B2F] hover:bg-[#0f2c23] border border-emerald-700/60 text-emerald-200 hover:text-white rounded-xl text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>Ingreso Administrador</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle (Touch Target >= 48px) */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-h-[48px] min-w-[48px] p-2 flex items-center justify-center text-emerald-100 hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-400 rounded-lg"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation (Height >= 48px for thumb friendly) */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#143B2F] border-t border-emerald-800/80 px-4 pt-3 pb-6 space-y-2">
          <div className="py-1">
            <div className="flex items-center gap-2 text-xs text-amber-300 font-semibold px-2 py-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>Cobertura Veredal FixRural</span>
            </div>
          </div>
          <a
            href="#nosotros"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center min-h-[48px] px-3 rounded-lg text-emerald-100 hover:bg-emerald-900/60 text-base font-medium"
          >
            Misión, Visión & Origen (Güepsa)
          </a>
          <a
            href="#servicios"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center min-h-[48px] px-3 rounded-lg text-emerald-100 hover:bg-emerald-900/60 text-base font-medium"
          >
            Catálogo de Servicios
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenCalculator();
            }}
            className="w-full flex items-center gap-2 min-h-[48px] px-3 rounded-lg text-emerald-100 hover:bg-emerald-900/60 text-base font-medium text-left cursor-pointer"
          >
            <Calculator className="w-5 h-5 text-amber-400" />
            <span>Calculadora de Tarifa y Flete</span>
          </button>
          <a
            href="#garantia"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center min-h-[48px] px-3 rounded-lg text-emerald-100 hover:bg-emerald-900/60 text-base font-medium"
          >
            Garantía en 3 Pasos
          </a>
          <a
            href="#historias"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center min-h-[48px] px-3 rounded-lg text-emerald-100 hover:bg-emerald-900/60 text-base font-medium"
          >
            Historias Campesinas
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenPhotoStudio();
            }}
            className="w-full flex items-center gap-2 min-h-[48px] px-3 rounded-lg text-emerald-100 hover:bg-emerald-900/60 text-base font-medium text-left cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>Taller de Fotos IA de Repuestos</span>
          </button>

          <div className="pt-3 border-t border-emerald-800/80 space-y-2">
            <a
              href={directWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[48px] w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2 text-sm shadow-md"
            >
              <MessageCircle className="w-5 h-5 fill-white text-white" />
              <span>Pedir Técnico por WhatsApp</span>
            </a>

            {isAdminLoggedIn ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onGoToAdmin();
                }}
                className="min-h-[48px] w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl flex items-center justify-center gap-2 text-sm cursor-pointer"
              >
                <ShieldCheck className="w-5 h-5" />
                <span>Ir al Panel de Control</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLogin();
                }}
                className="min-h-[48px] w-full bg-emerald-900/60 hover:bg-emerald-800 border border-emerald-700/60 text-emerald-200 font-medium rounded-xl flex items-center justify-center gap-2 text-sm cursor-pointer"
              >
                <Lock className="w-4 h-4 text-amber-400" />
                <span>Ingreso Administrador</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
