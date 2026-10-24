import React from 'react';
import { Wrench, Phone, Lock, Heart, ShieldCheck, MapPin } from 'lucide-react';
import { ADMIN_EMAIL } from '../utils/formatters';

interface FooterProps {
  onOpenLogin: () => void;
  isAdminLoggedIn: boolean;
  onGoToAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenLogin,
  isAdminLoggedIn,
  onGoToAdmin,
}) => {
  return (
    <footer className="bg-[#143B2F] text-emerald-100 border-t border-emerald-900/60 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Identity */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-[#1B4D3E]">
                <Wrench className="w-6 h-6 stroke-[2.5]" />
              </div>
              <span className="text-2xl font-extrabold text-white">
                FixRural<span className="text-amber-400">Digital</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-emerald-200/90 max-w-md leading-relaxed">
              Plataforma tecnológica oficial para la asistencia técnica, reparación y mantenimiento preventivo del sector agropecuario y campesino. Conectando a los mejores técnicos veredales con productores del campo.
            </p>

            <div className="flex items-center gap-2 text-xs text-amber-300 font-medium">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Garantía de 90 días por escrito y repuestos de alta resistencia</span>
            </div>
          </div>

          {/* Col 2: Veredas with Active Coverage */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Veredas de Güepsa & Santander</span>
            </h4>
            <ul className="text-xs text-emerald-200/80 space-y-1.5">
              <li>· Vereda San Isidro (Sector Trapiches)</li>
              <li>· Vereda San Antonio & Cordillera</li>
              <li>· Vereda Santa Bárbara (Lechería)</li>
              <li>· Vereda La Colorada & El Porvenir</li>
              <li>· Casco Urbano de Güepsa y Provincia de Vélez</li>
            </ul>
          </div>

          {/* Col 3: Direct Emergency Contact & Admin */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Sede y Administración
            </h4>
            <div className="space-y-2 text-xs">
              <p className="text-amber-300 font-semibold">Creado por: Tatiana Callejas</p>
              <p className="text-emerald-200">Sede: Güepsa, Santander · Zona Rural</p>
              <a
                href="tel:+573103586278"
                className="flex items-center gap-2 text-amber-300 hover:text-amber-200 font-mono"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>310 358 6278</span>
              </a>
              <p className="text-emerald-300/80">Lunes a Domingo: 6:00 a.m. - 7:00 p.m.</p>

              <div className="pt-2">
                {isAdminLoggedIn ? (
                  <button
                    onClick={onGoToAdmin}
                    className="text-xs text-amber-400 hover:underline flex items-center gap-1 cursor-pointer font-semibold"
                  >
                    <Lock className="w-3 h-3" />
                    <span>Panel Administradora Activo</span>
                  </button>
                ) : (
                  <button
                    onClick={onOpenLogin}
                    className="text-xs text-emerald-300 hover:text-white hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Lock className="w-3 h-3 text-amber-400" />
                    <span>Ingreso Administrador (Tatiana)</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-emerald-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-300/70">
          <p>© 2026 FixRural Digital. Fundado por Tatiana Callejas en Güepsa, Santander. Todos los derechos reservados.</p>
          <div className="flex items-center gap-1">
            <span>Hecho con orgullo campesino en Güepsa, Santander</span>
            <Heart className="w-3 h-3 text-amber-400 fill-amber-400" />
          </div>
        </div>
      </div>
    </footer>
  );
};
