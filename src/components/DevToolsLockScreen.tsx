import React, { useState } from 'react';
import { ShieldAlert, Lock, Mail, Eye, EyeOff, ShieldCheck, AlertCircle, RefreshCw, CheckCircle2 } from 'lucide-react';
import { ADMIN_EMAIL, verifyAdminPassword } from '../utils/formatters';
import { setSessionAuthorized } from '../utils/security';

interface DevToolsLockScreenProps {
  onUnlock: () => void;
}

export const DevToolsLockScreen: React.FC<DevToolsLockScreenProps> = ({ onUnlock }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [unlockedSuccess, setUnlockedSuccess] = useState(false);

  const handleAuthorize = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    const cleanEmail = email.trim().toLowerCase();
    const isEmailValid = cleanEmail === ADMIN_EMAIL.toLowerCase();
    const isPassValid = await verifyAdminPassword(password);

    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsLoading(false);

    if (isEmailValid && isPassValid) {
      setUnlockedSuccess(true);
      setSessionAuthorized(true);
      setTimeout(() => {
        onUnlock();
      }, 700);
    } else {
      setErrorMsg('Credenciales no autorizadas. Solo la administradora Tatiana Callejas tiene permiso de inspección técnica.');
    }
  };

  const handleCheckClosed = () => {
    // Verificar si el usuario ya cerró las herramientas de desarrollo
    const widthThreshold = window.outerWidth - window.innerWidth > 160;
    const heightThreshold = window.outerHeight - window.innerHeight > 160;

    if (!widthThreshold && !heightThreshold) {
      onUnlock();
    } else {
      setErrorMsg('Las herramientas de desarrollo siguen abiertas en el navegador. Ciérrelas o ingrese sus credenciales de administradora.');
    }
  };

  return (
    <div className="fixed inset-0 z-[999999] bg-[#0A1612]/95 backdrop-blur-xl flex items-center justify-center p-4 select-none">
      <div className="bg-slate-900 border-2 border-amber-500/80 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl text-white space-y-6 relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Glow ambient */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Header with warning icon */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 shadow-lg font-bold">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-950/80 border border-red-700/60 text-[11px] font-bold text-red-400 uppercase tracking-wide">
              <span>Alerta de Seguridad Activa</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
              Herramientas de Desarrollo Detectadas
            </h2>
            <p className="text-xs text-emerald-300 font-medium">
              FixRural Digital · Sede Güepsa, Santander
            </p>
          </div>
        </div>

        {/* Explanation banner */}
        <div className="bg-[#143B2F]/60 border border-emerald-800 rounded-2xl p-4 text-xs sm:text-sm text-emerald-100/90 leading-relaxed space-y-2">
          <p>
            Se ha detectado la apertura de la <strong>Consola de Programador o Herramientas de Desarrollador</strong> en este navegador.
          </p>
          <p className="text-amber-200 text-xs">
            Por directivas de protección contra modificaciones indebidas y resguardo de datos campesinos, el acceso y código de la plataforma están protegidos.
            <strong> Solo la Administradora Oficial (Tatiana Callejas) puede ingresar o desbloquear esta vista.</strong>
          </p>
        </div>

        {errorMsg && (
          <div className="bg-red-950/80 border border-red-500/80 text-red-200 text-xs p-3.5 rounded-xl flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {unlockedSuccess ? (
          <div className="bg-emerald-900 border border-emerald-500 text-emerald-200 p-4 rounded-xl text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-amber-400 mx-auto" />
            <h4 className="font-bold text-sm text-white">Identidad Confirmada</h4>
            <p className="text-xs">Bienvenida Tatiana. Desbloqueando plataforma...</p>
          </div>
        ) : (
          <form onSubmit={handleAuthorize} autoComplete="off" className="space-y-4">
            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase text-slate-300 tracking-wide">
                Correo Administradora:
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  disabled={isLoading}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="correo@ejemplo.com"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="none"
                  spellCheck={false}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder-slate-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase text-slate-300 tracking-wide">
                Contraseña Administradora:
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  disabled={isLoading}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  autoComplete="new-password"
                  autoCorrect="off"
                  autoCapitalize="none"
                  spellCheck={false}
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder-slate-500 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1.5 text-slate-400 hover:text-white absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2 space-y-2.5">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full min-h-[48px] py-3 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer disabled:opacity-50"
              >
                <ShieldCheck className="w-5 h-5 text-slate-950" />
                <span>{isLoading ? 'Comprobando autorización...' : 'Autorizar y Desbloquear Plataforma'}</span>
              </button>

              <button
                type="button"
                onClick={handleCheckClosed}
                className="w-full min-h-[40px] py-2 px-3 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-emerald-200 hover:text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Ya cerré las Herramientas de Desarrollador</span>
              </button>
            </div>
          </form>
        )}

        <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span>Seguridad activa SHA-256</span>
          <span className="text-amber-400/90 font-mono">Güepsa · FixRural</span>
        </div>
      </div>
    </div>
  );
};
