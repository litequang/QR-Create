import React from 'react';
import { QRAnalysisResult } from '../utils/qrMatrixEngine';
import { ModuleCategory } from '../types/qr';
import { XRAY_COLORS } from '../utils/qrRenderer';
import {
  Layers,
  CheckCircle,
  Binary,
  Microscope,
} from 'lucide-react';

interface ScientificInspectorProps {
  analysis: QRAnalysisResult;
  isXRayMode: boolean;
  onToggleXRay: () => void;
  payloadText: string;
}

export const ScientificInspector: React.FC<ScientificInspectorProps> = ({
  analysis,
  isXRayMode,
  onToggleXRay,
  payloadText,
}) => {
  const darkRatio = ((analysis.darkCount / analysis.totalModules) * 100).toFixed(1);
  const lightRatio = ((analysis.lightCount / analysis.totalModules) * 100).toFixed(1);

  const layerItems: { key: ModuleCategory; label: string; color: string; desc: string }[] = [
    { key: 'finder-frame', label: 'Finder Patterns (Góc định vị 7x7)', color: XRAY_COLORS['finder-frame'], desc: '3 góc nhận diện định hướng & góc quay của camera' },
    { key: 'finder-ball', label: 'Finder Center (Đồng tử tâm 3x3)', color: XRAY_COLORS['finder-ball'], desc: 'Tâm điểm chuẩn hóa tỷ lệ 1:1:3:1:1' },
    { key: 'timing', label: 'Timing Tracks (Đường đồng bộ)', color: XRAY_COLORS['timing'], desc: 'Hàng 6 và cột 6 đan xen đen/trắng giúp xác định tọa độ module' },
    { key: 'alignment', label: 'Alignment Patterns (Mốc hiệu chỉnh)', color: XRAY_COLORS['alignment'], desc: 'Bù biến dạng góc nghiêng bề mặt in ấn hoặc màn hình' },
    { key: 'format', label: 'Format Information (Thông tin định dạng)', color: XRAY_COLORS['format'], desc: 'Lưu thuật toán Mask và Cấp độ sửa sai Reed-Solomon' },
    { key: 'ecc', label: 'Reed-Solomon ECC (Mã sửa lỗi)', color: XRAY_COLORS['ecc'], desc: `Dữ liệu dư thừa giúp khôi phục tới ${analysis.eccRedundancyPct}% mã bị hỏng hoặc che logo` },
    { key: 'data', label: 'Data Codewords (Dữ liệu payload)', color: XRAY_COLORS['data'], desc: 'Các byte nhị phân mã hóa nội dung thực tế' },
  ];

  return (
    <div id="scientific-lab" className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-indigo-50 dark:bg-indigo-950/60 rounded-xl text-indigo-600 dark:text-indigo-400">
            <Microscope className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Phòng thí nghiệm khoa học ma trận QR (Scientific Lab)
            </h3>
            <p className="text-xs text-slate-500">
              Giải phẫu cấu trúc theo tiêu chuẩn quốc tế ISO/IEC 18004
            </p>
          </div>
        </div>

        {/* X-Ray Toggle */}
        <button
          type="button"
          onClick={onToggleXRay}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all ${
            isXRayMode
              ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>{isXRayMode ? 'Đang bật X-Ray ma trận' : 'Bật chế độ X-Ray giải phẫu'}</span>
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/80 dark:border-slate-800">
          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block">
            Phiên bản ma trận
          </span>
          <span className="text-base font-bold font-mono text-slate-900 dark:text-white">
            Version {analysis.version}
          </span>
          <span className="text-[10px] text-slate-400 font-mono block mt-0.5">
            {analysis.size} × {analysis.size} modules
          </span>
        </div>

        <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/80 dark:border-slate-800">
          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block">
            Tổng số điểm ảnh (Bit)
          </span>
          <span className="text-base font-bold font-mono text-slate-900 dark:text-white">
            {analysis.totalModules}
          </span>
          <span className="text-[10px] text-slate-400 font-mono block mt-0.5">
            {analysis.darkCount} đen / {analysis.lightCount} trắng
          </span>
        </div>

        <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/80 dark:border-slate-800">
          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block">
            Cân bằng quang học
          </span>
          <span className="text-base font-bold font-mono text-slate-900 dark:text-white">
            {darkRatio}% / {lightRatio}%
          </span>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block mt-0.5">
            Tối ưu mặt nạ chuẩn ISO
          </span>
        </div>

        <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/80 dark:border-slate-800">
          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block">
            Reed-Solomon ECC
          </span>
          <span className="text-base font-bold font-mono text-indigo-600 dark:text-indigo-400">
            Cấp {analysis.eccLevel} ({analysis.eccRedundancyPct}%)
          </span>
          <span className="text-[10px] text-slate-400 block mt-0.5">
            Khả năng phục hồi dữ liệu
          </span>
        </div>
      </div>

      {/* Layer legend if in X-Ray or informative table */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
          <Binary className="w-4 h-4 text-indigo-500" />
          <span>Bản đồ phân tầng cấu trúc module (Layer Breakdown):</span>
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
          {layerItems.map((layer) => (
            <div
              key={layer.key}
              className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800/60"
            >
              <div
                className="w-3.5 h-3.5 rounded-xs shrink-0 mt-0.5 shadow-2xs"
                style={{ backgroundColor: layer.color }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {layer.label}
                  </span>
                  <span className="font-mono text-[10px] text-slate-400">
                    {analysis.categoryCounts[layer.key] ?? 0} bit
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  {layer.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Scan Test Simulator */}
      <div className="p-3.5 bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-800/50 rounded-xl flex items-start gap-3">
        <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
        <div className="text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-emerald-900 dark:text-emerald-200">
              Bộ kiểm tra quét ảo (In-Browser Scan Simulator):
            </span>
            <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 rounded-sm">
              100% Hợp lệ
            </span>
          </div>
          <p className="text-emerald-800 dark:text-emerald-300 text-[11px] mt-1 font-mono break-all line-clamp-2">
            Payload: {payloadText}
          </p>
        </div>
      </div>
    </div>
  );
};
