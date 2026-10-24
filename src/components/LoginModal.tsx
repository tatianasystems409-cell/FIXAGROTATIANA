import React, { useState } from 'react';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, X, ArrowLeft, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { ADMIN_EMAIL, ADMIN_PASS } from '../utils/formatters';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessLogin: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSuccessLogin }) => {
  const [view, setView] = useState<'login' | 'recovery'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Recovery state
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [showFloatingToast, setShowFloatingToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const cleanEmail = email.trim().toLowerCase();
      if (cleanEmail === ADMIN_EMAIL.toLowerCase() && password === ADMIN_PASS) {
        onSuccessLogin();
        onClose();
      } else {
        setErrorMsg('Credenciales inválidas. Verifique correo y contraseña de administración.');
      }
    }, 400);
  };

  const handleRecoverySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const cleanRecovery = recoveryEmail.trim().toLowerCase();
      if (cleanRecovery === ADMIN_EMAIL.toLowerCase()) {
        setToastMessage(`Se ha enviado con éxito el enlace de recuperación seguro a: ${cleanRecovery}. Revise su bandeja de entrada.`);
        setShowFloatingToast(true);
        setTimeout(() => {
          setShowFloatingToast(false);
          setView('login');
        }, 5000);
      } else {
        setErrorMsg('El correo ingresado no se encuentra registrado en el sistema administrativo FixRural.');
      }
    }, 500);
  };

  const handleQuickFillAdmin = () => {
    setEmail(ADMIN_EMAIL);
    setPassword(ADMIN_PASS);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
      {/* Floating Notification Toast (Per PDF requirement) */}
      {showFloatingToast && (
        <div className="fixed top-6 right-6 z-50 max-w-md bg-emerald-900 text-white p-4 rounded-2xl shadow-2xl border-2 border-amber-400 flex items-start gap-3 animate-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-sm text-amber-300">Enlace de Recuperación Enviado</h4>
            <p className="text-xs text-emerald-100 leading-relaxed">{toastMessage}</p>
          </div>
          <button
            onClick={() => setShowFloatingToast(false)}
            className="text-emerald-300 hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Modal Dialog */}
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-slate-200 overflow-hidden relative animate-in fade-in zoom-in-95 duration-150">
        {/* Header Bar */}
        <div className="bg-[#1B4D3E] text-white p-5 flex items-center justify-between border-b border-emerald-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">
                {view === 'login' ? 'Ingreso Administradora' : 'Recuperar Contraseña'}
              </h3>
              <p className="text-xs text-emerald-200">Panel Central FixRural Digital</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Form */}
        <div className="p-6 space-y-5">
          {errorMsg && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {view === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase text-slate-700 tracking-wide">
                  Correo Electrónico:
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tatianasystems409@gmail.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1B4D3E] focus:bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase text-slate-700 tracking-wide">
                    Contraseña:
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setView('recovery');
                      setErrorMsg('');
                    }}
                    className="text-xs text-[#2E7D32] hover:text-[#1B4D3E] font-medium underline cursor-pointer"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1B4D3E] focus:bg-white font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-1.5 text-slate-400 hover:text-slate-600 absolute right-2.5 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button (Touch target >= 48px) */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full min-h-[48px] py-3 px-4 bg-[#1B4D3E] hover:bg-[#143B2F] text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-60"
              >
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                <span>{isLoading ? 'Verificando...' : 'Iniciar Sesión'}</span>
              </button>

              {/* Development Quick-Fill helper */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Acceso Oficial Tatiana:</span>
                <button
                  type="button"
                  onClick={handleQuickFillAdmin}
                  className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 underline cursor-pointer"
                >
                  Autocompletar credenciales
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRecoverySubmit} className="space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                Ingrese el correo de la administradora registrado para recibir un enlace temporal y seguro de restablecimiento de contraseña:
              </p>

              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase text-slate-700 tracking-wide">
                  Correo Electrónico Administradora:
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={recoveryEmail}
                    onChange={(e) => setRecoveryEmail(e.target.value)}
                    placeholder="tatianasystems409@gmail.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1B4D3E] focus:bg-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full min-h-[48px] py-3 px-4 bg-[#1B4D3E] hover:bg-[#143B2F] text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-60"
              >
                <Send className="w-4 h-4 text-amber-400" />
                <span>{isLoading ? 'Enviando...' : 'Enviar Enlace de Recuperación'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setView('login');
                  setErrorMsg('');
                }}
                className="w-full text-center text-xs text-slate-600 hover:text-slate-900 py-2 flex items-center justify-center gap-1 cursor-pointer font-medium"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Volver al formulario de ingreso</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
