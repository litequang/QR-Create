import React, { useState } from 'react';
import { ErrorCorrectionLevel, QRConfig } from '../types/qr';
import { QRAnalysisResult } from '../utils/qrMatrixEngine';
import {
  generateSvgString,
  downloadSvgFile,
  downloadPngFile,
  downloadPdfFile,
  copyQrToClipboard,
} from '../utils/qrRenderer';
import {
  Download,
  Copy,
  FileCode,
  FileText,
  Check,
  ZoomIn,
  Sliders,
  Shield,
  Printer,
} from 'lucide-react';

interface LivePreviewProps {
  config: QRConfig;
  analysis: QRAnalysisResult;
  payloadText: string;
  isXRayMode: boolean;
  onUpdateConfig: (updated: Partial<QRConfig>) => void;
}

export const LivePreview: React.FC<LivePreviewProps> = ({
  config,
  analysis,
  payloadText,
  isXRayMode,
  onUpdateConfig,
}) => {
  const [copied, setCopied] = useState(false);
  const [downloadingFormat, setDownloadingFormat] = useState<string | null>(null);
  const [zoomPreview, setZoomPreview] = useState(false);

  // Generate SVG string for real-time vector preview
  const svgPreviewString = generateSvgString({
    analysis,
    colors: config.colors,
    design: config.design,
    logo: config.logo,
    sizePx: 360,
    marginModules: 3,
    isXRayMode,
  });

  // Calculate physical print size at 300 DPI
  const printCm = ((config.resolution / 300) * 2.54).toFixed(1);
  const printInch = (config.resolution / 300).toFixed(2);

  const handleDownloadPng = async () => {
    try {
      setDownloadingFormat('png');
      await downloadPngFile(
        {
          analysis,
          colors: config.colors,
          design: config.design,
          logo: config.logo,
          sizePx: config.resolution,
          marginModules: 3,
          isXRayMode,
        },
        `qrcode-${config.type}-${config.resolution}px.png`
      );
    } finally {
      setDownloadingFormat(null);
    }
  };

  const handleDownloadSvg = () => {
    setDownloadingFormat('svg');
    const svgContent = generateSvgString({
      analysis,
      colors: config.colors,
      design: config.design,
      logo: config.logo,
      sizePx: 800,
      marginModules: 3,
      isXRayMode,
    });
    downloadSvgFile(svgContent, `qrcode-${config.type}-vector.svg`);
    setDownloadingFormat(null);
  };

  const handleDownloadPdf = async () => {
    try {
      setDownloadingFormat('pdf');
      await downloadPdfFile(
        {
          analysis,
          colors: config.colors,
          design: config.design,
          logo: config.logo,
          sizePx: 1200,
          marginModules: 3,
          isXRayMode,
        },
        payloadText,
        `qrcode-spec-${config.type}.pdf`
      );
    } finally {
      setDownloadingFormat(null);
    }
  };

  const handleCopyClipboard = async () => {
    const success = await copyQrToClipboard({
      analysis,
      colors: config.colors,
      design: config.design,
      logo: config.logo,
      sizePx: 1000,
      marginModules: 3,
      isXRayMode,
    });
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const ECC_LEVELS: { id: ErrorCorrectionLevel; label: string; pct: string; desc: string }[] = [
    { id: 'L', label: 'Cấp L', pct: '7%', desc: 'Chứa nhiều dữ liệu nhất' },
    { id: 'M', label: 'Cấp M', pct: '15%', desc: 'Chuẩn tiêu chuẩn quốc tế' },
    { id: 'Q', label: 'Cấp Q', pct: '25%', desc: 'Khuyên dùng khi có logo' },
    { id: 'H', label: 'Cấp H', pct: '30%', desc: 'Khả năng phục hồi cao nhất' },
  ];

  return (
    <div className="sticky top-20 space-y-4">
      {/* 1. Main QR Code Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              {isXRayMode ? 'Bản đồ X-Ray ma trận' : 'Bản xem trước trực tiếp'}
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              {analysis.size}x{analysis.size}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setZoomPreview(!zoomPreview)}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            title="Phóng to"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>

        {/* Live Vector QR Viewport */}
        <div
          className={`relative mx-auto rounded-xl flex items-center justify-center p-3 transition-all ${
            config.colors.isTransparentBg
              ? 'bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:12px_12px]'
              : ''
          } ${zoomPreview ? 'max-w-md' : 'max-w-[280px] sm:max-w-[320px]'}`}
        >
          <div
            className="w-full aspect-square drop-shadow-xs transition-transform duration-200"
            dangerouslySetInnerHTML={{ __html: svgPreviewString }}
          />
        </div>

        {/* Error Correction Level Selector */}
        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-indigo-500" />
              <span>Mức sửa lỗi Reed-Solomon</span>
            </label>
            <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 font-bold">
              ~{analysis.eccRedundancyPct}% phục hồi
            </span>
          </div>
          <div className="grid grid-cols-4 gap-1.5">
            {ECC_LEVELS.map((lvl) => (
              <button
                key={lvl.id}
                type="button"
                onClick={() => onUpdateConfig({ eccLevel: lvl.id })}
                className={`p-2 rounded-lg border text-center transition-all ${
                  config.eccLevel === lvl.id
                    ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-500 text-indigo-700 dark:text-indigo-300 font-bold shadow-2xs'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                }`}
              >
                <div className="text-xs">{lvl.label}</div>
                <div className="text-[10px] text-slate-400 font-mono">{lvl.pct}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Resolution Slider */}
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-indigo-500" />
              <span>Độ phân giải xuất ảnh (Resolution)</span>
            </label>
            <span className="text-xs font-mono font-bold text-slate-900 dark:text-white">
              {config.resolution} × {config.resolution} px
            </span>
          </div>
          <input
            type="range"
            min="600"
            max="4000"
            step="200"
            value={config.resolution}
            onChange={(e) => onUpdateConfig({ resolution: Number(e.target.value) })}
            className="w-full accent-indigo-600 cursor-pointer"
          />
          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 font-mono">
            <span className="flex items-center gap-1">
              <Printer className="w-3 h-3" />
              In ấn ở 300 DPI:
            </span>
            <span>
              ~{printCm} cm ({printInch} inches)
            </span>
          </div>
        </div>

        {/* 2. Export Actions Grid */}
        <div className="mt-6 space-y-2.5">
          <div className="grid grid-cols-2 gap-2">
            {/* Download PNG */}
            <button
              type="button"
              onClick={handleDownloadPng}
              disabled={downloadingFormat === 'png'}
              className="flex items-center justify-center gap-2 px-3.5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{downloadingFormat === 'png' ? 'Đang xuất...' : 'Tải PNG nét cao'}</span>
            </button>

            {/* Download SVG */}
            <button
              type="button"
              onClick={handleDownloadSvg}
              disabled={downloadingFormat === 'svg'}
              className="flex items-center justify-center gap-2 px-3.5 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors disabled:opacity-50"
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Tải SVG Vector</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {/* Download PDF */}
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={downloadingFormat === 'pdf'}
              className="flex items-center justify-center gap-2 px-3 py-2 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-semibold rounded-xl transition-colors disabled:opacity-50"
            >
              <FileText className="w-3.5 h-3.5 text-red-500" />
              <span>Tài liệu PDF</span>
            </button>

            {/* Copy to Clipboard */}
            <button
              type="button"
              onClick={handleCopyClipboard}
              className={`flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold rounded-xl border transition-all ${
                copied
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-500'
                  : 'bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Đã sao chép!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Chép Clipboard</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
