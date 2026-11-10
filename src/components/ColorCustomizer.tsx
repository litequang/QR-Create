import React from 'react';
import { QRColors } from '../types/qr';
import { calculateContrastRatio, getContrastEvaluation } from '../utils/contrast';
import { Palette, CheckCircle2, AlertTriangle } from 'lucide-react';

interface ColorCustomizerProps {
  colors: QRColors;
  onChange: (updated: Partial<QRColors>) => void;
}

const QUICK_SWATCHES = [
  { label: 'Classic Noir', fg1: '#0F172A', fg2: '#0F172A', bg: '#FFFFFF' },
  { label: 'Emerald Deep', fg1: '#059669', fg2: '#0F766E', bg: '#FFFFFF' },
  { label: 'Royal Violet', fg1: '#4F46E5', fg2: '#7C3AED', bg: '#FFFFFF' },
  { label: 'Sunset Coral', fg1: '#E11D48', fg2: '#F97316', bg: '#FFFFFF' },
  { label: 'Sapphire Ocean', fg1: '#0284C7', fg2: '#1D4ED8', bg: '#FFFFFF' },
  { label: 'Dark Obsidian', fg1: '#38BDF8', fg2: '#818CF8', bg: '#0F172A' },
];

export const ColorCustomizer: React.FC<ColorCustomizerProps> = ({
  colors,
  onChange,
}) => {
  const contrastRatio = calculateContrastRatio(colors.fgColor, colors.bgColor);
  const evaluation = getContrastEvaluation(contrastRatio);

  return (
    <div className="space-y-6">
      {/* 1. Mode selector: Single Color vs Linear Gradient vs Radial Gradient */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
          Kiểu phối màu chính (Color Style)
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'single', label: 'Đơn sắc (Solid)' },
            { id: 'linear', label: 'Gradient thẳng' },
            { id: 'radial', label: 'Gradient tỏa tròn' },
          ].map((mode) => (
            <button
              key={mode.id}
              type="button"
              onClick={() => onChange({ mode: mode.id as any })}
              className={`px-3 py-2 text-xs font-medium rounded-lg border text-center transition-all ${
                colors.mode === mode.id
                  ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-500 text-indigo-700 dark:text-indigo-300 font-semibold'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Color Pickers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Foreground 1 */}
        <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
            {colors.mode === 'single' ? 'Màu mã QR (Foreground)' : 'Màu bắt đầu (Start)'}
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={colors.fgColor}
              onChange={(e) => onChange({ fgColor: e.target.value })}
              className="w-10 h-10 rounded-lg cursor-pointer border border-slate-300 dark:border-slate-600 p-0.5 bg-transparent"
            />
            <input
              type="text"
              value={colors.fgColor}
              onChange={(e) => onChange({ fgColor: e.target.value })}
              className="w-full px-3 py-1.5 text-xs font-mono uppercase bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
            />
          </div>
        </div>

        {/* Foreground 2 (if gradient) */}
        {colors.mode !== 'single' && (
          <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Màu kết thúc (Gradient End)
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={colors.fgColor2 || colors.fgColor}
                onChange={(e) => onChange({ fgColor2: e.target.value })}
                className="w-10 h-10 rounded-lg cursor-pointer border border-slate-300 dark:border-slate-600 p-0.5 bg-transparent"
              />
              <input
                type="text"
                value={colors.fgColor2 || colors.fgColor}
                onChange={(e) => onChange({ fgColor2: e.target.value })}
                className="w-full px-3 py-1.5 text-xs font-mono uppercase bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>
        )}

        {/* Background Color */}
        <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Màu nền (Background)
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer text-[11px] text-slate-600 dark:text-slate-400">
              <input
                type="checkbox"
                checked={colors.isTransparentBg}
                onChange={(e) => onChange({ isTransparentBg: e.target.checked })}
                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span>Trong suốt</span>
            </label>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="color"
              disabled={colors.isTransparentBg}
              value={colors.bgColor}
              onChange={(e) => onChange({ bgColor: e.target.value })}
              className={`w-10 h-10 rounded-lg cursor-pointer border border-slate-300 dark:border-slate-600 p-0.5 bg-transparent ${
                colors.isTransparentBg ? 'opacity-40 cursor-not-allowed' : ''
              }`}
            />
            <input
              type="text"
              disabled={colors.isTransparentBg}
              value={colors.isTransparentBg ? 'TRANSPARENT' : colors.bgColor}
              onChange={(e) => onChange({ bgColor: e.target.value })}
              className={`w-full px-3 py-1.5 text-xs font-mono uppercase bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 ${
                colors.isTransparentBg ? 'opacity-40 cursor-not-allowed' : ''
              }`}
            />
          </div>
        </div>

        {/* Gradient Angle (if linear) */}
        {colors.mode === 'linear' && (
          <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Góc xoay Gradient
              </label>
              <span className="text-xs font-mono text-slate-500">
                {colors.gradientRotation}°
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="360"
              step="45"
              value={colors.gradientRotation}
              onChange={(e) => onChange({ gradientRotation: Number(e.target.value) })}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>0° (Ngang)</span>
              <span>45° (Chéo)</span>
              <span>90° (Dọc)</span>
              <span>135°</span>
            </div>
          </div>
        )}
      </div>

      {/* 3. Quick Color Presets */}
      <div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
          <Palette className="w-3.5 h-3.5 text-indigo-500" />
          <span>Bảng màu gợi ý nhanh</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {QUICK_SWATCHES.map((swatch) => (
            <button
              key={swatch.label}
              type="button"
              onClick={() =>
                onChange({
                  fgColor: swatch.fg1,
                  fgColor2: swatch.fg2,
                  bgColor: swatch.bg,
                  mode: swatch.fg1 === swatch.fg2 ? 'single' : 'linear',
                  isTransparentBg: false,
                })
              }
              className="flex items-center gap-2 p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-lg hover:border-indigo-400 transition-colors text-left"
            >
              <div
                className="w-5 h-5 rounded-md border border-slate-300 shrink-0 shadow-2xs"
                style={{
                  background:
                    swatch.fg1 === swatch.fg2
                      ? swatch.fg1
                      : `linear-gradient(135deg, ${swatch.fg1}, ${swatch.fg2})`,
                }}
              />
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300 truncate">
                {swatch.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 4. Custom Eye Colors (Distinct corner frame & pupil color) */}
      <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
        <label className="flex items-center gap-2 cursor-pointer mb-3">
          <input
            type="checkbox"
            checked={colors.customEyeColors}
            onChange={(e) => onChange({ customEyeColors: e.target.checked })}
            className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
          />
          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
            Tùy biến màu riêng cho 3 mắt định vị (Custom Eye Colors)
          </span>
        </label>

        {colors.customEyeColors && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Màu khung viền mắt (Eye Frame)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={colors.eyeFrameColor}
                  onChange={(e) => onChange({ eyeFrameColor: e.target.value })}
                  className="w-8 h-8 rounded-md cursor-pointer border border-slate-300 p-0.5"
                />
                <input
                  type="text"
                  value={colors.eyeFrameColor}
                  onChange={(e) => onChange({ eyeFrameColor: e.target.value })}
                  className="w-full px-2.5 py-1 text-xs font-mono uppercase bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Màu đồng tử tâm mắt (Eye Ball)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={colors.eyeBallColor}
                  onChange={(e) => onChange({ eyeBallColor: e.target.value })}
                  className="w-8 h-8 rounded-md cursor-pointer border border-slate-300 p-0.5"
                />
                <input
                  type="text"
                  value={colors.eyeBallColor}
                  onChange={(e) => onChange({ eyeBallColor: e.target.value })}
                  className="w-full px-2.5 py-1 text-xs font-mono uppercase bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 5. Scientific Contrast Diagnostics */}
      <div
        className={`p-3.5 rounded-xl border text-xs flex items-start gap-3 transition-colors ${
          evaluation.isScannable
            ? 'bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-200'
            : 'bg-amber-50/80 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800/60 text-amber-900 dark:text-amber-200'
        }`}
      >
        {evaluation.isScannable ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
        ) : (
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        )}
        <div>
          <div className="flex items-center gap-2 font-semibold">
            <span>Tỷ lệ tương phản quang phổ (WCAG):</span>
            <span className="font-mono tabular-nums text-sm font-bold">
              {contrastRatio.toFixed(2)}:1
            </span>
          </div>
          <p className="mt-0.5 text-[11px] opacity-90">{evaluation.label}</p>
        </div>
      </div>
    </div>
  );
};
