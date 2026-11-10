import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { ContentTypeSelector } from './components/ContentTypeSelector';
import { ContentForm } from './components/ContentForm';
import { ColorCustomizer } from './components/ColorCustomizer';
import { LogoCustomizer } from './components/LogoCustomizer';
import { DesignCustomizer } from './components/DesignCustomizer';
import { PresetsModal } from './components/PresetsModal';
import { LivePreview } from './components/LivePreview';
import { ScientificInspector } from './components/ScientificInspector';
import { IsoSpecsSection } from './components/IsoSpecsSection';

import { QRConfig, QRPreset } from './types/qr';
import { formatQRPayload } from './utils/formatPayload';
import { generateQRMatrix } from './utils/qrMatrixEngine';
import {
  ChevronDown,
  Palette,
  Image as ImageIcon,
  Shapes,
  FileCode,
  Sparkles,
} from 'lucide-react';

const INITIAL_CONFIG: QRConfig = {
  type: 'url',
  url: 'https://ais-dev-2yebacwlftunod2qo6lzfw-552006333937.asia-southeast1.run.app',
  text: 'Chào mừng bạn đến với QRCode Studio Pro & Scientific Lab!',
  wifi: {
    ssid: 'Studio_Network_5G',
    password: 'password1234',
    encryption: 'WPA',
    hidden: false,
  },
  vcard: {
    firstName: 'An',
    lastName: 'Nguyễn',
    organization: 'Viện Nghiên cứu Công nghệ',
    title: 'Lead Research Engineer',
    phoneWork: '+84 24 3838 8888',
    phoneMobile: '+84 901 234 567',
    email: 'an.nguyen@lab.org',
    website: 'https://annguyen.design',
    street: '123 Đường Công Nghệ',
    city: 'Hà Nội',
    country: 'Việt Nam',
  },
  email: {
    email: 'contact@research.edu.vn',
    subject: 'Trao đổi về cấu trúc mã ma trận QR',
    body: 'Xin chào nhóm nghiên cứu, tôi quan tâm đến thuật toán Reed-Solomon...',
  },
  phone: '+84901234567',
  sms: {
    phone: '+84901234567',
    message: 'Xin chào từ QRCode Studio Pro!',
  },
  location: {
    latitude: '21.028511',
    longitude: '105.854444',
    label: 'Hồ Hoàn Kiếm, Hà Nội',
  },
  social: {
    network: 'youtube',
    handleOrUrl: 'GoogleAIStudio',
  },
  crypto: {
    currency: 'BTC',
    address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
    amount: '0.015',
    message: 'Nghiên cứu khoa học mã QR',
  },
  event: {
    title: 'Hội nghị Khoa học Công nghệ 2026',
    location: 'Trung tâm Đổi mới Sáng tạo Quốc gia, Hà Nội',
    startDate: '2026-11-20T08:30',
    endDate: '2026-11-20T17:00',
    description: 'Báo cáo chuyên sâu về mã hóa dữ liệu 2D ma trận và thị giác máy tính.',
  },
  colors: {
    mode: 'single',
    fgColor: '#0F172A',
    fgColor2: '#3B82F6',
    gradientRotation: 45,
    bgColor: '#FFFFFF',
    isTransparentBg: false,
    customEyeColors: false,
    eyeFrameColor: '#0F172A',
    eyeBallColor: '#0F172A',
  },
  design: {
    bodyShape: 'rounded',
    eyeFrameShape: 'rounded',
    eyeBallShape: 'rounded-square',
  },
  logo: {
    url: null,
    size: 0.22,
    removeBg: true,
  },
  eccLevel: 'M',
  resolution: 1200,
};

export default function App() {
  const [config, setConfig] = useState<QRConfig>(INITIAL_CONFIG);
  const [isDark, setIsDark] = useState<boolean>(() => {
    return (
      localStorage.getItem('qr_theme') === 'dark' ||
      window.matchMedia('(prefers-color-scheme: dark)').matches
    );
  });
  const [isXRayMode, setIsXRayMode] = useState<boolean>(false);
  const [isPresetsOpen, setIsPresetsOpen] = useState<boolean>(false);
  const [activeAccordion, setActiveAccordion] = useState<string>('content');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Synchronize Dark class on HTML root
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('qr_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('qr_theme', 'light');
    }
  }, [isDark]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleUpdateConfig = (updated: Partial<QRConfig>) => {
    setConfig((prev) => ({ ...prev, ...updated }));
  };

  const handleApplyPreset = (preset: QRPreset) => {
    setConfig((prev) => ({
      ...prev,
      colors: { ...preset.colors },
      design: { ...preset.design },
      eccLevel: preset.eccLevel,
    }));
    showToast(`Đã áp dụng mẫu "${preset.name}" thành công`);
  };

  const handleResetDefaults = () => {
    setConfig(INITIAL_CONFIG);
    setIsXRayMode(false);
    showToast('Đã đặt lại toàn bộ thông số về mặc định');
  };

  // Compute formatted payload text
  const payloadText = useMemo(() => {
    return formatQRPayload(config);
  }, [config]);

  // Compute matrix data and scientific classification
  const analysis = useMemo(() => {
    return generateQRMatrix(payloadText, config.eccLevel);
  }, [payloadText, config.eccLevel]);

  const toggleAccordion = (id: string) => {
    setActiveAccordion((prev) => (prev === id ? '' : id));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      {/* 1. Header */}
      <Header
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
        onResetDefaults={handleResetDefaults}
        onOpenPresets={() => setIsPresetsOpen(true)}
      />

      {/* Toast alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl text-xs font-semibold shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-200">
          {toastMessage}
        </div>
      )}

      {/* 2. Main Studio Content Area */}
      <main id="editor" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Intro Subtitle Bar */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Studio Tạo Mã QR & Nghiên Cứu Ma Trận
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Tùy biến hình thái, dải màu gradient, chèn logo và phân tích cấu trúc mã hóa Reed-Solomon.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsPresetsOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 border border-indigo-200 dark:border-indigo-800 rounded-xl transition-colors whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Khám phá 7+ Mẫu thiết kế</span>
            </button>
          </div>
        </div>

        {/* 2-Column Responsive Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Configurator Accordions (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Section 1: Content Type & Dynamic Form */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
              <button
                type="button"
                onClick={() => toggleAccordion('content')}
                className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs">
                    01
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                      Nhập nội dung dữ liệu (Enter Content)
                    </h2>
                    <p className="text-xs text-slate-500">
                      Chọn loại dữ liệu cần mã hóa vào ma trận QR
                    </p>
                  </div>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
                    activeAccordion === 'content' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {activeAccordion === 'content' && (
                <div className="px-5 pb-5 pt-1 space-y-4 border-t border-slate-100 dark:border-slate-800/60">
                  <ContentTypeSelector
                    activeType={config.type}
                    onChange={(newType) => handleUpdateConfig({ type: newType })}
                  />
                  <div className="pt-2">
                    <ContentForm
                      config={config}
                      onChange={handleUpdateConfig}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Section 2: Colors & Gradient */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
              <button
                type="button"
                onClick={() => toggleAccordion('colors')}
                className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs">
                    02
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                      Phối màu sắc & Độ tương phản (Set Colors)
                    </h2>
                    <p className="text-xs text-slate-500">
                      Đơn sắc, Gradient, màu nền và màu mắt chuyên biệt
                    </p>
                  </div>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
                    activeAccordion === 'colors' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {activeAccordion === 'colors' && (
                <div className="px-5 pb-5 pt-3 border-t border-slate-100 dark:border-slate-800/60">
                  <ColorCustomizer
                    colors={config.colors}
                    onChange={(colorsUpdate) =>
                      handleUpdateConfig({
                        colors: { ...config.colors, ...colorsUpdate },
                      })
                    }
                  />
                </div>
              )}
            </div>

            {/* Section 3: Add Logo Image */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
              <button
                type="button"
                onClick={() => toggleAccordion('logo')}
                className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-xs">
                    03
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                      Tích hợp Logo thương hiệu (Add Logo Image)
                    </h2>
                    <p className="text-xs text-slate-500">
                      Tải ảnh cá nhân hoặc chọn nhanh từ 16+ biểu tượng vector
                    </p>
                  </div>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
                    activeAccordion === 'logo' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {activeAccordion === 'logo' && (
                <div className="px-5 pb-5 pt-3 border-t border-slate-100 dark:border-slate-800/60">
                  <LogoCustomizer
                    logo={config.logo}
                    onChange={(logoUpdate) =>
                      handleUpdateConfig({
                        logo: { ...config.logo, ...logoUpdate },
                      })
                    }
                  />
                </div>
              )}
            </div>

            {/* Section 4: Customize Design Shapes */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
              <button
                type="button"
                onClick={() => toggleAccordion('design')}
                className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-xs">
                    04
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                      Tùy biến hình thái ma trận (Customize Design)
                    </h2>
                    <p className="text-xs text-slate-500">
                      Hình dạng thân hạt, khung viền góc và đồng tử tâm mắt
                    </p>
                  </div>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
                    activeAccordion === 'design' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {activeAccordion === 'design' && (
                <div className="px-5 pb-5 pt-3 border-t border-slate-100 dark:border-slate-800/60">
                  <DesignCustomizer
                    design={config.design}
                    onChange={(designUpdate) =>
                      handleUpdateConfig({
                        design: { ...config.design, ...designUpdate },
                      })
                    }
                  />
                </div>
              )}
            </div>

            {/* Section 5: Scientific QR Inspector & Diagnostics */}
            <ScientificInspector
              analysis={analysis}
              isXRayMode={isXRayMode}
              onToggleXRay={() => setIsXRayMode(!isXRayMode)}
              payloadText={payloadText}
            />
          </div>

          {/* Right Column: Sticky Live Vector Preview & Export Toolbar (5 cols) */}
          <div className="lg:col-span-5">
            <LivePreview
              config={config}
              analysis={analysis}
              payloadText={payloadText}
              isXRayMode={isXRayMode}
              onUpdateConfig={handleUpdateConfig}
            />
          </div>
        </div>

        {/* 3. Scientific Specs & Educational Reference */}
        <IsoSpecsSection />
      </main>

      {/* 4. Curated Presets Modal */}
      <PresetsModal
        isOpen={isPresetsOpen}
        onClose={() => setIsPresetsOpen(false)}
        onSelectPreset={handleApplyPreset}
      />

      {/* 5. Minimalist Footer */}
      <footer className="mt-16 border-t border-slate-200 dark:border-slate-800 py-6 bg-white dark:bg-slate-900 text-xs text-slate-500 text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>QRCode Studio Pro & Scientific Lab · Mô phỏng và cải tiến QRCode Monkey</span>
          <span className="font-mono text-[11px]">Tiêu chuẩn ISO/IEC 18004 · Reed-Solomon GF(256)</span>
        </div>
      </footer>
    </div>
  );
}
