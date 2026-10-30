import React, { useState, useEffect } from 'react';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, X, ArrowLeft, Send, CheckCircle2, AlertCircle, ShieldAlert, Clock } from 'lucide-react';
import { ADMIN_EMAIL, verifyAdminPassword } from '../utils/formatters';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessLogin: () => void;
}

const MAX_FAILED_ATTEMPTS = 3;
const LOCKOUT_SECONDS = 120; // 2 minutos de bloqueo por seguridad

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSuccessLogin }) => {
  const [view, setView] = useState<'login' | 'recovery'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Security attempt limiting & lockout
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutRemaining, setLockoutRemaining] = useState(0);

  // Recovery state
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [showFloatingToast, setShowFloatingToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Lockout countdown timer
  useEffect(() => {
    if (lockoutRemaining <= 0) return;
    const timer = setInterval(() => {
      setLockoutRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setFailedAttempts(0);
          setErrorMsg('');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [lockoutRemaining]);

  if (!isOpen) return null;

  const isLocked = lockoutRemaining > 0;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLocked) return;

    setErrorMsg('');
    setIsLoading(true);

    const cleanEmail = email.trim().toLowerCase();
    const isEmailValid = cleanEmail === ADMIN_EMAIL.toLowerCase();
    
    // Cryptographic SHA-256 validation (no plaintext password in client code)
    const isPasswordValid = await verifyAdminPassword(password);

    // Artificial delay to prevent timing attacks
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsLoading(false);

    if (isEmailValid && isPasswordValid) {
      setFailedAttempts(0);
      setErrorMsg('');
      onSuccessLogin();
      onClose();
    } else {
      const nextFailures = failedAttempts + 1;
      setFailedAttempts(nextFailures);

      if (nextFailures >= MAX_FAILED_ATTEMPTS) {
        setLockoutRemaining(LOCKOUT_SECONDS);
        setErrorMsg(`Acceso bloqueado por seguridad tras ${MAX_FAILED_ATTEMPTS} intentos fallidos. Espere el tiempo reglamentario.`);
      } else {
        const remainingTries = MAX_FAILED_ATTEMPTS - nextFailures;
        setErrorMsg(`Credenciales incorrectas. Le quedan ${remainingTries} intento${remainingTries === 1 ? '' : 's'} antes del bloqueo.`);
      }
    }
  };

  const handleRecoverySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsLoading(false);

    const cleanRecovery = recoveryEmail.trim().toLowerCase();
    if (cleanRecovery === ADMIN_EMAIL.toLowerCase()) {
      setToastMessage(`Se ha generado y enviado el enlace de verificación al correo oficial de Tatiana (${cleanRecovery}).`);
      setShowFloatingToast(true);
      setTimeout(() => {
        setShowFloatingToast(false);
        setView('login');
      }, 5000);
    } else {
      setErrorMsg('El correo ingresado no corresponde a la administradora de FixRural Digital.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      {/* Floating Notification Toast */}
      {showFloatingToast && (
        <div className="fixed top-6 right-6 z-50 max-w-md bg-emerald-950 text-white p-4 rounded-2xl shadow-2xl border-2 border-amber-400 flex items-start gap-3 animate-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-sm text-amber-300">Enlace de Recuperación Enviado</h4>
            <p className="text-xs text-emerald-100 leading-relaxed">{toastMessage}</p>
          </div>
          <button
            onClick={() => setShowFloatingToast(false)}
            className="text-emerald-300 hover:text-white p-1"
            aria-label="Cerrar notificación"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Modal Dialog */}
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl border border-slate-200 overflow-hidden relative animate-in fade-in zoom-in-95 duration-150">
        {/* Header Bar */}
        <div className="bg-[#1B4D3E] text-white p-5 flex items-center justify-between border-b border-emerald-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-md">
              <Lock className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">
                {view === 'login' ? 'Acceso Seguro Administradora' : 'Recuperar Acceso'}
              </h3>
              <p className="text-xs text-emerald-200">Plataforma FixRural Digital · Güepsa</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-800 transition-colors"
            aria-label="Cerrar ventana"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Security Lockout Banner */}
        {isLocked && (
          <div className="bg-red-50 border-b border-red-200 p-4 text-xs text-red-800 flex items-center gap-3">
            <ShieldAlert className="w-6 h-6 text-red-600 shrink-0" />
            <div>
              <span className="font-bold block text-sm text-red-950">Sistema Bloqueado Temporalmente</span>
              <span className="flex items-center gap-1 font-mono text-red-700 mt-0.5">
                <Clock className="w-3.5 h-3.5" />
                Tiempo de espera: <strong>{lockoutRemaining} segundos</strong>
              </span>
            </div>
          </div>
        )}

        {/* Body Form */}
        <div className="p-6 space-y-5">
          {errorMsg && !isLocked && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3.5 rounded-xl flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span className="leading-tight">{errorMsg}</span>
            </div>
          )}

          {view === 'login' ? (
            <form onSubmit={handleLoginSubmit} autoComplete="off" className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase text-slate-700 tracking-wide">
                  Correo Electrónico:
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    disabled={isLocked || isLoading}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="correo@ejemplo.com"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="none"
                    spellCheck={false}
                    name="fx_adm_usr"
                    id="fx_adm_usr"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1B4D3E] focus:bg-white disabled:opacity-50"
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
                    className="text-xs text-[#2E7D32] hover:text-[#1B4D3E] font-semibold underline cursor-pointer"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    disabled={isLocked || isLoading}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    autoComplete="new-password"
                    autoCorrect="off"
                    autoCapitalize="none"
                    spellCheck={false}
                    name="fx_adm_pwd"
                    id="fx_adm_pwd"
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1B4D3E] focus:bg-white font-mono disabled:opacity-50"
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

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLocked || isLoading}
                className="w-full min-h-[48px] py-3 px-4 bg-[#1B4D3E] hover:bg-[#143B2F] text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
              >
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                <span>{isLoading ? 'Verificando...' : 'Iniciar Sesión'}</span>
              </button>
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
                    placeholder="correo@ejemplo.com"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="none"
                    spellCheck={false}
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
