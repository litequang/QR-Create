import React from 'react';
import { BodyShape, EyeBallShape, EyeFrameShape, QRDesign } from '../types/qr';

interface DesignCustomizerProps {
  design: QRDesign;
  onChange: (updated: Partial<QRDesign>) => void;
}

const BODY_SHAPES: { id: BodyShape; label: string; previewSvg: string }[] = [
  {
    id: 'square',
    label: 'Vuông chuẩn',
    previewSvg: '<rect x="3" y="3" width="18" height="18" fill="currentColor" />',
  },
  {
    id: 'dots',
    label: 'Hạt tròn',
    previewSvg: '<circle cx="12" cy="12" r="9" fill="currentColor" />',
  },
  {
    id: 'rounded',
    label: 'Bo góc nhẹ',
    previewSvg: '<rect x="3" y="3" width="18" height="18" rx="5" fill="currentColor" />',
  },
  {
    id: 'extra-rounded',
    label: 'Bo tròn sâu',
    previewSvg: '<rect x="3" y="3" width="18" height="18" rx="8" fill="currentColor" />',
  },
  {
    id: 'diamond',
    label: 'Kim cương',
    previewSvg: '<polygon points="12,3 21,12 12,21 3,12" fill="currentColor" />',
  },
  {
    id: 'leaf',
    label: 'Hình lá',
    previewSvg: '<path d="M 3 12 A 9 9 0 0 1 12 3 H 21 V 12 A 9 9 0 0 1 12 21 H 3 Z" fill="currentColor" />',
  },
  {
    id: 'scanline-v',
    label: 'Vạch quét dọc',
    previewSvg: '<rect x="7" y="2" width="10" height="20" rx="4" fill="currentColor" />',
  },
  {
    id: 'scanline-h',
    label: 'Vạch quét ngang',
    previewSvg: '<rect x="2" y="7" width="20" height="10" rx="4" fill="currentColor" />',
  },
  {
    id: 'star',
    label: 'Sao 4 cánh',
    previewSvg: '<path d="M 12 2 Q 12 12 22 12 Q 12 12 12 22 Q 12 12 2 12 Q 12 12 12 2 Z" fill="currentColor" />',
  },
];

const EYE_FRAME_SHAPES: { id: EyeFrameShape; label: string; previewSvg: string }[] = [
  {
    id: 'square',
    label: 'Vuông cơ bản',
    previewSvg: `
      <rect x="2" y="2" width="20" height="20" fill="currentColor" />
      <rect x="5.5" y="5.5" width="13" height="13" fill="var(--bg-color, white)" />
    `,
  },
  {
    id: 'rounded',
    label: 'Bo tròn mềm',
    previewSvg: `
      <rect x="2" y="2" width="20" height="20" rx="6" fill="currentColor" />
      <rect x="5.5" y="5.5" width="13" height="13" rx="3.5" fill="var(--bg-color, white)" />
    `,
  },
  {
    id: 'circle',
    label: 'Vành tròn',
    previewSvg: `
      <circle cx="12" cy="12" r="10" fill="currentColor" />
      <circle cx="12" cy="12" r="6.5" fill="var(--bg-color, white)" />
    `,
  },
  {
    id: 'leaf',
    label: 'Chiếc lá',
    previewSvg: `
      <path d="M 2 12 A 10 10 0 0 1 12 2 H 22 V 12 A 10 10 0 0 1 12 22 H 2 Z" fill="currentColor" />
      <path d="M 6 12 A 6 6 0 0 1 12 6 H 18 V 12 A 6 6 0 0 1 12 18 H 6 Z" fill="var(--bg-color, white)" />
    `,
  },
  {
    id: 'octagon',
    label: 'Bát giác',
    previewSvg: `
      <polygon points="7,2 17,2 22,7 22,17 17,22 7,22 2,17 2,7" fill="currentColor" />
      <polygon points="8.5,5.5 15.5,5.5 18.5,8.5 18.5,15.5 15.5,18.5 8.5,18.5 5.5,15.5 5.5,8.5" fill="var(--bg-color, white)" />
    `,
  },
  {
    id: 'shield',
    label: 'Hình khiên',
    previewSvg: `
      <path d="M 2 2 H 22 V 14 A 10 10 0 0 1 12 22 A 10 10 0 0 1 2 14 Z" fill="currentColor" />
      <path d="M 5.5 5.5 H 18.5 V 13 A 6.5 6.5 0 0 1 12 18.5 A 6.5 6.5 0 0 1 5.5 13 Z" fill="var(--bg-color, white)" />
    `,
  },
  {
    id: 'sharp-bracket',
    label: 'Ngoặc góc',
    previewSvg: `
      <path d="M 2 2 H 10 V 5.5 H 5.5 V 18.5 H 10 V 22 H 2 Z" fill="currentColor" />
      <path d="M 22 2 H 14 V 5.5 H 18.5 V 18.5 H 14 V 22 H 22 Z" fill="currentColor" />
    `,
  },
];

const EYE_BALL_SHAPES: { id: EyeBallShape; label: string; previewSvg: string }[] = [
  {
    id: 'square',
    label: 'Vuông',
    previewSvg: '<rect x="6" y="6" width="12" height="12" fill="currentColor" />',
  },
  {
    id: 'circle',
    label: 'Hình tròn',
    previewSvg: '<circle cx="12" cy="12" r="6" fill="currentColor" />',
  },
  {
    id: 'rounded-square',
    label: 'Bo góc',
    previewSvg: '<rect x="6" y="6" width="12" height="12" rx="3.5" fill="currentColor" />',
  },
  {
    id: 'diamond',
    label: 'Kim cương',
    previewSvg: '<polygon points="12,5 19,12 12,19 5,12" fill="currentColor" />',
  },
  {
    id: 'leaf-pupil',
    label: 'Lá đồng tử',
    previewSvg: '<path d="M 6 12 A 6 6 0 0 1 12 6 H 18 V 12 A 6 6 0 0 1 12 18 H 6 Z" fill="currentColor" />',
  },
  {
    id: 'star',
    label: 'Ngôi sao',
    previewSvg: '<path d="M 12 5 Q 12 12 19 12 Q 12 12 12 19 Q 12 12 5 12 Q 12 12 12 5 Z" fill="currentColor" />',
  },
];

export const DesignCustomizer: React.FC<DesignCustomizerProps> = ({
  design,
  onChange,
}) => {
  return (
    <div className="space-y-6">
      {/* 1. Body Shapes */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
          1. Hình thái thân ma trận (Body Pattern)
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2.5">
          {BODY_SHAPES.map((shape) => {
            const isSelected = design.bodyShape === shape.id;
            return (
              <button
                key={shape.id}
                type="button"
                onClick={() => onChange({ bodyShape: shape.id })}
                className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                  isSelected
                    ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-500 text-indigo-600 dark:text-indigo-400 shadow-2xs font-semibold'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                }`}
              >
                <div className="w-8 h-8 flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-6 h-6"
                    dangerouslySetInnerHTML={{ __html: shape.previewSvg }}
                  />
                </div>
                <span className="text-[11px] truncate w-full text-center">
                  {shape.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Eye Frame Shapes */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
          2. Khung viền 3 mắt định vị (Eye Frame Shape)
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 gap-2.5">
          {EYE_FRAME_SHAPES.map((shape) => {
            const isSelected = design.eyeFrameShape === shape.id;
            return (
              <button
                key={shape.id}
                type="button"
                onClick={() => onChange({ eyeFrameShape: shape.id })}
                className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                  isSelected
                    ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-500 text-indigo-600 dark:text-indigo-400 shadow-2xs font-semibold'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                }`}
              >
                <div className="w-8 h-8 flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-6 h-6"
                    style={{ '--bg-color': 'var(--color-slate-100, #f1f5f9)' } as any}
                    dangerouslySetInnerHTML={{ __html: shape.previewSvg }}
                  />
                </div>
                <span className="text-[11px] truncate w-full text-center">
                  {shape.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Eye Ball Shapes */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
          3. Đồng tử tâm mắt định vị (Eye Ball Shape)
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
          {EYE_BALL_SHAPES.map((shape) => {
            const isSelected = design.eyeBallShape === shape.id;
            return (
              <button
                key={shape.id}
                type="button"
                onClick={() => onChange({ eyeBallShape: shape.id })}
                className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                  isSelected
                    ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-500 text-indigo-600 dark:text-indigo-400 shadow-2xs font-semibold'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                }`}
              >
                <div className="w-8 h-8 flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-6 h-6"
                    dangerouslySetInnerHTML={{ __html: shape.previewSvg }}
                  />
                </div>
                <span className="text-[11px] truncate w-full text-center">
                  {shape.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
