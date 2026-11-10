import React, { useRef } from 'react';
import { QRLogo } from '../types/qr';
import { PRESET_LOGOS } from '../utils/logoIcons';
import { Upload, X, ShieldAlert, Image as ImageIcon } from 'lucide-react';

interface LogoCustomizerProps {
  logo: QRLogo;
  onChange: (updated: Partial<QRLogo>) => void;
}

export const LogoCustomizer: React.FC<LogoCustomizerProps> = ({ logo, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        onChange({ url: event.target.result });
      }
    };
    reader.readAsDataURL(file);
  };

  const clearLogo = () => {
    onChange({ url: null });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-6">
      {/* 1. Custom File Upload / Current Logo Display */}
      <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800">
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
          Tải lên Logo của bạn (PNG, JPG, SVG)
        </label>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          {logo.url ? (
            <div className="relative group shrink-0">
              <div className="w-20 h-20 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center p-2 shadow-xs">
                <img
                  src={logo.url}
                  alt="QR Logo"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <button
                type="button"
                onClick={clearLogo}
                title="Xóa logo"
                className="absolute -top-2 -right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 shadow-sm transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="w-20 h-20 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 shrink-0">
              <ImageIcon className="w-6 h-6 mb-1" />
              <span className="text-[10px]">Chưa có logo</span>
            </div>
          )}

          <div className="w-full space-y-2">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg transition-colors"
            >
              <Upload className="w-4 h-4 text-indigo-500" />
              <span>{logo.url ? 'Thay đổi Logo khác' : 'Chọn ảnh từ máy tính'}</span>
            </button>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Khuyên dùng hình ảnh tỷ lệ vuông, độ phân giải sắc nét với nền trong suốt (PNG/SVG).
            </p>
          </div>
        </div>
      </div>

      {/* 2. Controls: Size & Background Clearing */}
      {logo.url && (
        <div className="space-y-4 p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Kích thước Logo so với mã QR
              </label>
              <span className="text-xs font-mono tabular-nums text-slate-500">
                {Math.round(logo.size * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0.15"
              max="0.32"
              step="0.01"
              value={logo.size}
              onChange={(e) => onChange({ size: parseFloat(e.target.value) })}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>Nhỏ (15%)</span>
              <span>Khuyên dùng (22%)</span>
              <span>Lớn (32%)</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200 dark:border-slate-700/60">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={logo.removeBg}
                onChange={(e) => onChange({ removeBg: e.target.checked })}
                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                Xóa các hạt QR phía sau Logo (Remove background behind logo)
              </span>
            </label>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 pl-6">
              Tạo viền trắng bảo vệ quanh logo để các hạt ma trận không che lấp biểu tượng, tăng khả năng quét chính xác.
            </p>
          </div>
        </div>
      )}

      {/* 3. Preset Logos Gallery */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
          Hoặc chọn nhanh biểu tượng phổ biến
        </label>
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2.5">
          {PRESET_LOGOS.map((item) => {
            const isSelected = logo.url === item.svgDataUri;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onChange({ url: item.svgDataUri, removeBg: true })}
                className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                  isSelected
                    ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-500 shadow-2xs'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                <div className="w-7 h-7 flex items-center justify-center">
                  <img
                    src={item.svgDataUri}
                    alt={item.name}
                    className="w-6 h-6 object-contain"
                  />
                </div>
                <span className="text-[10px] font-medium text-slate-600 dark:text-slate-400 truncate w-full text-center">
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Scientific Tip for Reed-Solomon when using logos */}
      <div className="p-3 bg-blue-50/70 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/50 rounded-xl text-xs text-blue-900 dark:text-blue-200 flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
        <p className="text-[11px] leading-relaxed">
          <strong>Lưu ý khoa học Reed-Solomon:</strong> Việc chèn Logo chiếm diện tích ở tâm ma trận đòi hỏi khả năng sửa sai cao. Chúng tôi khuyến nghị chọn mức sửa lỗi <strong>Q (25%)</strong> hoặc <strong>H (30%)</strong> để đảm bảo máy quét giải mã chính xác 100%.
        </p>
      </div>
    </div>
  );
};
