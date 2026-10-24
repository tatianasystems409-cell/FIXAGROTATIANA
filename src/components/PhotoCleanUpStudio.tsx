import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Upload, Download, RefreshCw, Wand2, Sliders, CheckCircle2, Image as ImageIcon, ArrowRight, X } from 'lucide-react';

interface PhotoCleanUpStudioProps {
  isOpen: boolean;
  onClose: () => void;
}

const SAMPLE_PARTS = [
  {
    id: 'sample-1',
    name: 'Impulsor de Motobomba de Bronce',
    instruction: 'Remover fondo del taller y colocar fondo blanco puro para catálogo técnico',
    url: '/src/assets/images/service_motobomba_1792873894922.jpg'
  },
  {
    id: 'sample-2',
    name: 'Energizador Solar de Cerca',
    instruction: 'Aislar equipo, remover pasto de fondo y dar acabado nítido de estudio',
    url: '/src/assets/images/service_cercas_1792873894915.jpg'
  },
  {
    id: 'sample-3',
    name: 'Válvula de Distribución Hidráulica',
    instruction: 'Quitar fondo exterior y exportar en fondo transparente PNG',
    url: '/src/assets/images/service_hidraulica_1792873895217.jpg'
  }
];

export const PhotoCleanUpStudio: React.FC<PhotoCleanUpStudioProps> = ({ isOpen, onClose }) => {
  const [selectedImage, setSelectedImage] = useState<string>(SAMPLE_PARTS[0].url);
  const [instruction, setInstruction] = useState<string>(SAMPLE_PARTS[0].instruction);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [bgStyle, setBgStyle] = useState<'white' | 'transparent' | 'dark' | 'soft-gray'>('white');
  const [tolerance, setTolerance] = useState<number>(35);
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'split' | 'side-by-side'>('split');
  const [sliderPosition, setSliderPosition] = useState<number>(50);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Quick prompt suggestions
  const promptSuggestions = [
    'Remover fondo y poner fondo blanco puro de catálogo',
    'Eliminar fondo a transparente PNG para cotización',
    'Aislar repuesto central y limpiar sombras oscuras',
    'Quitar fondo de taller rústico y suavizar contornos'
  ];

  // Process image using canvas based on instruction
  const processImage = () => {
    setIsProcessing(true);

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = selectedImage;

    img.onload = () => {
      const canvas = canvasRef.current || document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setIsProcessing(false);
        return;
      }

      // Resize canvas to reasonable size for quick editing
      const maxDim = 800;
      let width = img.width;
      let height = img.height;
      if (width > maxDim || height > maxDim) {
        if (width > height) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      }

      canvas.width = width;
      canvas.height = height;

      // Draw original
      ctx.drawImage(img, 0, 0, width, height);

      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;

      // Determine corner background color reference (top-left, top-right average)
      const rRef = (data[0] + data[(width - 1) * 4]) / 2;
      const gRef = (data[1] + data[(width - 1) * 4 + 1]) / 2;
      const bRef = (data[2] + data[(width - 1) * 4 + 2]) / 2;

      const userInstructionLower = instruction.toLowerCase();
      const wantsTransparent = userInstructionLower.includes('transparent') || bgStyle === 'transparent';
      const wantsDark = userInstructionLower.includes('oscuro') || userInstructionLower.includes('dark') || bgStyle === 'dark';
      const wantsWhite = (!wantsTransparent && !wantsDark) || userInstructionLower.includes('blanco') || bgStyle === 'white';

      // Advanced radial edge and color distance thresholding
      const centerX = width / 2;
      const centerY = height / 2;
      const maxRadius = Math.sqrt(centerX * centerX + centerY * centerY);

      for (let i = 0; i < data.length; i += 4) {
        const x = (i / 4) % width;
        const y = Math.floor((i / 4) / width);

        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Color distance to background corners
        const colorDist = Math.sqrt(
          Math.pow(r - rRef, 2) + Math.pow(g - gRef, 2) + Math.pow(b - bRef, 2)
        );

        // Radial distance from center: background is typically towards perimeter
        const distFromCenter = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
        const normalizedRadial = distFromCenter / maxRadius;

        // Brightness
        const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

        // Condition for background removal:
        // high tolerance near outer perimeter OR matching corner background sample
        const isBackground =
          (normalizedRadial > 0.65 && (colorDist < tolerance * 3.5 || luminance > 200 || luminance < 45)) ||
          (colorDist < tolerance * 2.2);

        if (isBackground) {
          if (wantsTransparent) {
            data[i + 3] = 0; // Transparent alpha
          } else if (wantsWhite) {
            data[i] = 255;
            data[i + 1] = 255;
            data[i + 2] = 255;
            data[i + 3] = 255;
          } else if (wantsDark) {
            data[i] = 27; // #1B4D3E emerald dark
            data[i + 1] = 77;
            data[i + 2] = 62;
            data[i + 3] = 255;
          } else {
            // soft studio gray
            data[i] = 248;
            data[i + 1] = 249;
            data[i + 2] = 250;
            data[i + 3] = 255;
          }
        } else {
          // Sharpen foreground subject slightly
          if (instruction.includes('nítido') || instruction.includes('limpiar')) {
            data[i] = Math.min(255, r * 1.05);
            data[i + 1] = Math.min(255, g * 1.05);
            data[i + 2] = Math.min(255, b * 1.05);
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);

      // Add clean subtle studio contact shadow if requested
      if (wantsWhite || bgStyle === 'soft-gray') {
        const shadowGrad = ctx.createRadialGradient(
          centerX,
          height - 15,
          10,
          centerX,
          height - 15,
          width * 0.35
        );
        shadowGrad.addColorStop(0, 'rgba(0,0,0,0.12)');
        shadowGrad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = shadowGrad;
        ctx.fillRect(0, height - 35, width, 30);
      }

      const resultUrl = canvas.toDataURL('image/png');
      setProcessedImageUrl(resultUrl);
      setIsProcessing(false);
    };

    img.onerror = () => {
      setIsProcessing(false);
      alert('No se pudo procesar la imagen seleccionada.');
    };
  };

  useEffect(() => {
    if (isOpen) {
      processImage();
    }
  }, [isOpen, selectedImage, bgStyle, tolerance]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setSelectedImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = () => {
    if (!processedImageUrl) return;
    const a = document.createElement('a');
    a.href = processedImageUrl;
    a.download = `fixrural-limpieza-repuesto-${Date.now()}.png`;
    a.click();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <canvas ref={canvasRef} className="hidden" />

      <div className="bg-white rounded-2xl w-full max-w-5xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#1B4D3E] text-white p-4 sm:p-5 flex items-center justify-between border-b border-emerald-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg">
                  Taller IA: Limpiador de Fotos de Repuestos y Productos
                </h3>
                <span className="text-[10px] font-bold bg-amber-400 text-slate-950 px-2 py-0.5 rounded uppercase">
                  Por Instrucciones
                </span>
              </div>
              <p className="text-xs text-emerald-200">
                Remueva el fondo del taller, aísle piezas mecánicas o repuestos y límpielos escribiendo lo que desea.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-emerald-200 hover:text-white hover:bg-emerald-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Container (2 Columns) */}
        <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-y-auto">
          {/* Left Controls & Instructions (Col 5) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Instruction Prompt Input */}
            <div className="space-y-2">
              <label className="flex items-center justify-between text-xs font-bold text-slate-800 uppercase tracking-wide">
                <span>Instrucción de Limpieza / Edición:</span>
                <span className="text-emerald-700 font-mono text-[11px]">Control por texto</span>
              </label>
              <div className="relative">
                <textarea
                  rows={3}
                  value={instruction}
                  onChange={(e) => setInstruction(e.target.value)}
                  placeholder="Ej: Remover fondo y colocar fondo blanco de catálogo, limpiar manchas..."
                  className="w-full text-xs sm:text-sm p-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1B4D3E] focus:bg-white resize-none"
                />
              </div>

              {/* Quick Prompt Suggestions */}
              <div className="space-y-1">
                <span className="text-[11px] text-slate-500 font-medium">Instrucciones rápidas:</span>
                <div className="flex flex-wrap gap-1.5">
                  {promptSuggestions.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => setInstruction(prompt)}
                      className="text-[11px] px-2.5 py-1 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-900 text-slate-700 rounded-md transition-colors text-left border border-slate-200"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Target Background Type */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wide block">
                Fondo Resultante:
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setBgStyle('white')}
                  className={`min-h-[40px] p-2 rounded-xl border font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    bgStyle === 'white'
                      ? 'bg-white border-[#1B4D3E] text-[#1B4D3E] ring-2 ring-[#1B4D3E]/20'
                      : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  <span className="w-3 h-3 rounded-full bg-white border border-slate-400"></span>
                  <span>Blanco Estudio</span>
                </button>

                <button
                  type="button"
                  onClick={() => setBgStyle('transparent')}
                  className={`min-h-[40px] p-2 rounded-xl border font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    bgStyle === 'transparent'
                      ? 'bg-white border-[#1B4D3E] text-[#1B4D3E] ring-2 ring-[#1B4D3E]/20'
                      : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  <span className="w-3 h-3 rounded-sm bg-slate-300"></span>
                  <span>Transparente</span>
                </button>

                <button
                  type="button"
                  onClick={() => setBgStyle('dark')}
                  className={`min-h-[40px] p-2 rounded-xl border font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    bgStyle === 'dark'
                      ? 'bg-white border-[#1B4D3E] text-[#1B4D3E] ring-2 ring-[#1B4D3E]/20'
                      : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  <span className="w-3 h-3 rounded-full bg-[#1B4D3E]"></span>
                  <span>Verde Rural</span>
                </button>
              </div>
            </div>

            {/* Edge Tolerance Slider */}
            <div className="space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">Tolerancia de recorte y limpieza:</span>
                <span className="font-mono text-emerald-800 font-bold">{tolerance}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="80"
                value={tolerance}
                onChange={(e) => setTolerance(parseInt(e.target.value))}
                className="w-full accent-[#1B4D3E] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Conservador (mantiene bordes)</span>
                <span>Agresivo (quita todo el fondo)</span>
              </div>
            </div>

            {/* Sample Repuestos Selector */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wide block">
                O probar con repuestos de muestra:
              </span>
              <div className="grid grid-cols-3 gap-2">
                {SAMPLE_PARTS.map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => {
                      setSelectedImage(sample.url);
                      setInstruction(sample.instruction);
                    }}
                    className={`p-1.5 rounded-xl border text-left transition-all ${
                      selectedImage === sample.url
                        ? 'border-[#1B4D3E] ring-2 ring-[#1B4D3E]/20 bg-emerald-50/50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <img
                      src={sample.url}
                      alt={sample.name}
                      className="w-full h-12 object-cover rounded-lg"
                      referrerPolicy="no-referrer"
                    />
                    <span className="block text-[10px] font-semibold text-slate-800 line-clamp-1 mt-1">
                      {sample.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Upload your own */}
            <div className="pt-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full min-h-[44px] py-2 px-4 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Upload className="w-4 h-4 text-slate-600" />
                <span>Subir foto de mi repuesto o herramienta</span>
              </button>
            </div>

            {/* Apply Button */}
            <button
              onClick={processImage}
              disabled={isProcessing}
              className="w-full min-h-[48px] py-2.5 px-4 bg-[#1B4D3E] hover:bg-[#143B2F] text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-50 transition-all"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Procesando imagen con IA...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 text-amber-400" />
                  <span>Aplicar Instrucción de Limpieza</span>
                </>
              )}
            </button>
          </div>

          {/* Right Preview & Before/After (Col 7) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4 bg-slate-100 p-4 rounded-2xl border border-slate-200">
            {/* View Mode Toggle */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-700">Vista de Comparación:</span>
                <button
                  onClick={() => setViewMode('split')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                    viewMode === 'split' ? 'bg-[#1B4D3E] text-white' : 'bg-white text-slate-600'
                  }`}
                >
                  Slider Antes / Después
                </button>
                <button
                  onClick={() => setViewMode('side-by-side')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                    viewMode === 'side-by-side' ? 'bg-[#1B4D3E] text-white' : 'bg-white text-slate-600'
                  }`}
                >
                  Lado a Lado
                </button>
              </div>

              {processedImageUrl && (
                <button
                  onClick={handleDownload}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Descargar PNG</span>
                </button>
              )}
            </div>

            {/* Visual Workspace Canvas */}
            <div className="relative h-80 sm:h-96 rounded-xl overflow-hidden bg-white border border-slate-300 flex items-center justify-center">
              {viewMode === 'split' ? (
                <div className="relative w-full h-full select-none overflow-hidden">
                  {/* Cleaned image behind */}
                  {processedImageUrl ? (
                    <img
                      src={processedImageUrl}
                      alt="Repuesto Limpio"
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-xs text-slate-400">
                      Cargando resultado...
                    </div>
                  )}

                  {/* Original image clipped on left */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ width: `${sliderPosition}%` }}
                  >
                    <img
                      src={selectedImage}
                      alt="Original"
                      className="absolute inset-0 w-full h-full object-contain max-w-none"
                    />
                    <span className="absolute top-3 left-3 bg-slate-900/80 text-white text-[11px] font-bold px-2 py-0.5 rounded shadow">
                      Original
                    </span>
                  </div>

                  {/* Cleaned badge */}
                  <span className="absolute top-3 right-3 bg-emerald-700 text-white text-[11px] font-bold px-2 py-0.5 rounded shadow">
                    Limpio con IA
                  </span>

                  {/* Vertical Divider line */}
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-amber-400 cursor-ew-resize flex items-center justify-center shadow-lg"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center text-[10px] font-bold shadow-md">
                      ↔
                    </div>
                  </div>

                  {/* Range slider touch overlay */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderPosition}
                    onChange={(e) => setSliderPosition(parseInt(e.target.value))}
                    className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-20"
                  />
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 w-full h-full p-2">
                  <div className="relative h-full rounded-lg bg-slate-50 border border-slate-200 overflow-hidden flex flex-col">
                    <span className="absolute top-2 left-2 bg-slate-900/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded z-10">
                      Original
                    </span>
                    <img
                      src={selectedImage}
                      alt="Original"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="relative h-full rounded-lg bg-white border border-slate-200 overflow-hidden flex flex-col">
                    <span className="absolute top-2 right-2 bg-emerald-700 text-white text-[10px] font-bold px-1.5 py-0.5 rounded z-10">
                      Limpio
                    </span>
                    {processedImageUrl && (
                      <img
                        src={processedImageUrl}
                        alt="Limpio"
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom info banner */}
            <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 flex items-center justify-between text-xs text-emerald-900">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>
                  Foto optimizada lista para enviar por WhatsApp al técnico o publicar en catálogo.
                </span>
              </div>
              <button
                onClick={handleDownload}
                className="font-bold underline text-emerald-800 hover:text-emerald-950 shrink-0 ml-2"
              >
                Guardar PNG
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
