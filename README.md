# 🌾⚡ FixRural Digital — Asistencia Técnica Agropecuaria & Cotización de Fletes

> **Plataforma web e infraestructura de soporte técnico veredal para maquinaria agrícola en Colombia.**  
> *Proyecto de Aula (ACA) — Plan de Negocio Aplicado (NRC 54429)*

[![Vercel Deployment]([suspicious link removed])](https://fixruraldigital.vercel.app)
[![Node.js]([suspicious link removed])]([suspicious link removed])
[![React / Next.js]([suspicious link removed])]([suspicious link removed])
[![Tailwind CSS]([suspicious link removed])]([suspicious link removed])
[![License: MIT]([suspicious link removed])](LICENSE)

---

## 📌 🌐 Enlaces en Producción & Contacto

* 🚀 **Plataforma Web en Vivo:** [`fixruraldigital.vercel.app`](https://fixruraldigital.vercel.app)
* 📲 **Asistente & Canal WhatsApp:** `+57 310 358 6278`
* 📍 **Zona de Cobertura Inicial:** Güepsa y Provincia de Vélez (Santander, Colombia)

---

## 📖 1. Sobre el Proyecto

En las zonas rurales dispersas de Colombia, cuando se avería una motobomba de riego, una cerca eléctrica solar o un tanque de enfriamiento de leche, el pequeño y mediano productor pierde días críticos de trabajo y enfrenta costos de traslado en campero informales de hasta **$100.000 a $200.000 COP** hacia el casco urbano.

**FixRural Digital** elimina esta brecha trasladando técnicos veredales certificados directamente a la parcela en **menos de 24 horas**. A través de una Calculadora Web interactiva y un motor de pre-diagnóstico multimodal por WhatsApp (fotos, videos y audio), congelamos la tarifa de flete y mano de obra antes del viaje y respaldamos cada atención con **90 días de garantía escrita en sitio**.

---

## ✨ 2. Características Principales

* 🧮 **Calculadora Web de Fletes & Mano de Obra:** Cotización automática e instantánea calculada según la falla, la vereda y la urgencia.
* 📱 **Pre-diagnóstico Multimodal en WhatsApp:** Clasificación previa de la avería mediante análisis de notas de voz, fotos y videos enviados por el campesino.
* 🛠️ **Tasa de Solución en Primer Viaje (*First-Time Fix Rate*) >90%:** El técnico se desplaza equipado con la herramienta de precisión y el kit de repuestos rústicos exacto.
* 🛡️ **Póliza Digital de Garantía:** Generación y firma de certificado de 90 días de garantía técnica en finca tras verificar la prueba de funcionamiento del equipo.
* 📊 **Panel Administrativo Operativo:** Tablero central para el despacho de técnicos veredales y seguimiento en tiempo real de servicios y facturación.

---

## 🛠️ 3. Stack Tecnológico

| Capa | Tecnología / Herramienta |
| :--- | :--- |
| **Frontend & UI** | React.js / Next.js, Tailwind CSS, Lucide Icons |
| **Backend & API** | Node.js, Express / Serverless Functions |
| **Despliegue & Cloud** | Vercel Platform (`fixruraldigital.vercel.app`) |
| **Inteligencia Artificial** | Google Gemini API (Gemini 1.5 / 2.0 Flash) |
| **Integraciones** | API WhatsApp Business, Google Maps Geolocalización |
| **Modelado Financiero** | Python (OpenPyXL) / Dashboard Excel (`.xlsx`) |

---

## 🚀 4. Instalación & Configuración Local

Sigue estos pasos para ejecutar la aplicación localmente en tu entorno de desarrollo:

### 📋 Requisitos Previos
* **Node.js** v18.0.0 o superior
* **npm** v9.0.0 o superior
* Cuenta y Clave de API en **Google AI Studio** (`GEMINI_API_KEY`)

### 📦 Pasos de Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone [suspicious link removed]
   cd fixrural-digital
Instalar dependencias:npm install
Configurar variables de entorno:
Crea un archivo .env.local en la raíz del proyecto y agrega tu clave de API:GEMINI_API_KEY=tu_clave_api_aquí
NEXT_PUBLIC_VERCEL_URL=fixruraldigital.vercel.app
NEXT_PUBLIC_WHATSAPP_NUMBER=573103586278
Ejecutar el servidor de desarrollo:npm run dev
Abrir en el navegador:
Accede a http://localhost:3000 para interactuar con la aplicación localmente.📊 5. Métricas de Negocio & Economías Unitarias (Unit Economics)Métrica / IndicadorValor NuméricoImpacto OperativoTicket Promedio$90.000 COPTarifa fija cobrada en parcela por mano de obra y flete.Costo Variable Unitario$54.000 COPPago a técnico veredal + repuestos rústicos + combustible.Margen Bruto Unitario40,0% ($36.000 COP)Utilidad neta directa generada por servicio completado.Costos Fijos Mensuales$1.800.000 COPMantenimiento de servidores, despacho central y marketing.Punto de Equilibrio (PE)50 servicios/mesFacturación mínima de $4.500.000 COP/mes para neutralidad.Ratio LTV / CAC21.6xCAC: $10.000 COP | LTV: $216.000 COP a 24 meses.North Star Metric100 serv/mes**$9.000.000 COP/mes** ventas ($3.600.000 COP utilidad bruta).🎓 6. Información Académica & CréditosProyecto: Proyecto de Aula — Aplicación Práctica de Emprendimiento RuralInstitución: Corporación Unificada Nacional de Educación Superior (CUN)Asignatura: Plan de Negocio Aplicado (Código ASA-FOR-001)Ficha / NRC: 54429 — Segundo Bloque (26V04)Autora / Estudiante: Ingri Tatiana Faustino CallejasDocente Evaluadora: Ing. Paula Andrea Barbosa Rodríguez 
