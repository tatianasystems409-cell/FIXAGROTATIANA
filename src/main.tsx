import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initSecurityShield } from './utils/security.ts';

// Activar escudo de seguridad: bloquea F12, inspección, click derecho y consola de programador
initSecurityShield();

createRoot(document.getElementById('root')!).render(<App />);

