/**
 * FixRural Digital - Módulo de Seguridad y Protección de Código
 * Protege contra inspección no autorizada, apertura de consola de programador y robo de credenciales.
 */

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
      return false;
    }

    const isCtrlOrCmd = e.ctrlKey || e.metaKey;

    // Ctrl/Cmd + Shift + I (Inspeccionar elemento)
    // Ctrl/Cmd + Shift + J (Consola de desarrollador)
    // Ctrl/Cmd + Shift + C (Selector de elementos)
    if (isCtrlOrCmd && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl/Cmd + U (Ver código fuente / View Source)
    if (isCtrlOrCmd && (e.key === 'U' || e.key === 'u')) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl/Cmd + S (Guardar página como HTML completo)
    if (isCtrlOrCmd && (e.key === 'S' || e.key === 's')) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }, { capture: true });

  // 3. Limpiar y desactivar funciones de consola en modo producción
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

    // Sobrescribir inspectores comunes
    window.console.warn = noop;
    window.console.info = noop;
    window.console.debug = noop;
  } catch {
    // Silently continue
  }

  // 4. Bloquear drag & drop de imágenes para evitar descarga indebida
  window.addEventListener('dragstart', (e) => {
    if ((e.target as HTMLElement)?.tagName === 'IMG') {
      e.preventDefault();
    }
  });
}
