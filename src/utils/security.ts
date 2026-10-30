/**
 * FixRural Digital - Módulo de Seguridad y Detección de Herramientas de Desarrollo
 * Detecta apertura de DevTools desde atajos o el menú "Más Herramientas -> Herramientas de Desarrollador",
 * bloquea la consola y protege la integridad del código fuente.
 */

type DevToolsListener = (isOpen: boolean) => void;
const listeners: Set<DevToolsListener> = new Set();
let isDevToolsCurrentlyOpen = false;
let isSessionAuthorized = false;

export function setSessionAuthorized(authorized: boolean) {
  isSessionAuthorized = authorized;
  if (authorized) {
    notifyListeners(false);
  }
}

export function getIsSessionAuthorized(): boolean {
  return isSessionAuthorized;
}

function notifyListeners(isOpen: boolean) {
  if (isSessionAuthorized && isOpen) {
    return; // Si la administradora ya autorizó la sesión, no bloquea
  }
  isDevToolsCurrentlyOpen = isOpen;
  listeners.forEach((listener) => {
    try {
      listener(isOpen);
    } catch {
      // Ignorar errores de callback
    }
  });
}

export function subscribeDevTools(listener: DevToolsListener): () => void {
  listeners.add(listener);
  // Emitir estado inicial
  if (isDevToolsCurrentlyOpen && !isSessionAuthorized) {
    listener(true);
  }
  return () => {
    listeners.delete(listener);
  };
}

export function initSecurityShield() {
  if (typeof window === 'undefined') return;

  // 1. Deshabilitar menú contextual (Click derecho -> Inspeccionar)
  window.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  }, { capture: true });

  // 2. Bloquear combinaciones de teclas de inspección y herramientas de desarrollo
  window.addEventListener('keydown', (e) => {
    // Tecla F12
    if (e.key === 'F12' || e.keyCode === 123) {
      e.preventDefault();
      e.stopPropagation();
      notifyListeners(true);
      return false;
    }

    const isCtrlOrCmd = e.ctrlKey || e.metaKey;

    // Ctrl/Cmd + Shift + I (Inspeccionar elemento)
    // Ctrl/Cmd + Shift + J (Consola de desarrollador)
    // Ctrl/Cmd + Shift + C (Selector de elementos)
    if (isCtrlOrCmd && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) {
      e.preventDefault();
      e.stopPropagation();
      notifyListeners(true);
      return false;
    }

    // Ctrl/Cmd + U (Ver código fuente / View Source)
    if (isCtrlOrCmd && (e.key === 'U' || e.key === 'u')) {
      e.preventDefault();
      e.stopPropagation();
      notifyListeners(true);
      return false;
    }

    // Ctrl/Cmd + S (Guardar página como HTML completo)
    if (isCtrlOrCmd && (e.key === 'S' || e.key === 's')) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }, { capture: true });

  // 3. Detección por cambio de dimensiones (DevTools anclado lateral o inferior)
  const checkDimensions = () => {
    if (isSessionAuthorized) return;
    const widthThreshold = window.outerWidth - window.innerWidth > 160;
    const heightThreshold = window.outerHeight - window.innerHeight > 160;
    if (widthThreshold || heightThreshold) {
      notifyListeners(true);
    }
  };

  window.addEventListener('resize', checkDimensions);

  // 4. Detección por evaluación de getters de consola
  try {
    const snifferElement = new Image();
    Object.defineProperty(snifferElement, 'id', {
      get: () => {
        if (!isSessionAuthorized) {
          notifyListeners(true);
        }
      },
    });

    // Periódicamente verificar si DevTools lee los objetos en consola
    setInterval(() => {
      if (isSessionAuthorized) return;
      checkDimensions();
      try {
        console.dir(snifferElement);
      } catch {
        // Silently continue
      }
    }, 1500);
  } catch {
    // Ignorar si el navegador bloquea getters
  }

  // 5. Limpiar y desactivar funciones de consola
  const noop = () => {};
  try {
    const banner = 
      '%c🔒 FixRural Digital · SISTEMA PROTEGIDO %c\n' +
      'Plataforma oficial bajo resguardo tecnológico y directivas de seguridad.\n' +
      'El acceso no autorizado, manipulación de código o ingeniería inversa está estrictamente prohibido.\n' +
      'Propiedad de Tatiana Callejas - Güepsa, Santander.';
    
    console.clear();
    console.log(
      banner,
      'background: #1B4D3E; color: #F59E0B; font-size: 16px; font-weight: bold; padding: 8px 12px; border-radius: 6px;',
      'color: #2E7D32; font-size: 12px; line-height: 1.6;'
    );

    window.console.warn = noop;
    window.console.info = noop;
    window.console.debug = noop;
  } catch {
    // Silently continue
  }

  // 6. Bloquear drag & drop de imágenes
  window.addEventListener('dragstart', (e) => {
    if ((e.target as HTMLElement)?.tagName === 'IMG') {
      e.preventDefault();
    }
  });
}
