import { jsPDF } from 'jspdf';
import { BodyShape, EyeBallShape, EyeFrameShape, QRColors, QRDesign, QRLogo } from '../types/qr';
import { QRAnalysisResult } from './qrMatrixEngine';

export interface RenderOptions {
  analysis: QRAnalysisResult;
  colors: QRColors;
  design: QRDesign;
  logo: QRLogo;
  sizePx: number;
  marginModules?: number;
  isXRayMode?: boolean;
}

// Generate an SVG path for a specific body module shape
function getModulePath(
  shape: BodyShape,
  x: number,
  y: number,
  s: number
): string {
  const r = s * 0.5;
  const cx = x + r;
  const cy = y + r;

  switch (shape) {
    case 'dots': {
      const radius = s * 0.44;
      return `M ${cx - radius},${cy} A ${radius},${radius} 0 1,0 ${cx + radius},${cy} A ${radius},${radius} 0 1,0 ${cx - radius},${cy} Z`;
    }
    case 'rounded': {
      const rad = s * 0.28;
      return `M ${x + rad},${y} h ${s - 2 * rad} a ${rad},${rad} 0 0 1 ${rad},${rad} v ${s - 2 * rad} a ${rad},${rad} 0 0 1 -${rad},${rad} h -${s - 2 * rad} a ${rad},${rad} 0 0 1 -${rad},-${rad} v -${s - 2 * rad} a ${rad},${rad} 0 0 1 ${rad},-${rad} Z`;
    }
    case 'extra-rounded': {
      const rad = s * 0.46;
      return `M ${x + rad},${y} h ${s - 2 * rad} a ${rad},${rad} 0 0 1 ${rad},${rad} v ${s - 2 * rad} a ${rad},${rad} 0 0 1 -${rad},${rad} h -${s - 2 * rad} a ${rad},${rad} 0 0 1 -${rad},-${rad} v -${s - 2 * rad} a ${rad},${rad} 0 0 1 ${rad},-${rad} Z`;
    }
    case 'diamond': {
      return `M ${cx},${y} L ${x + s},${cy} L ${cx},${y + s} L ${x},${cy} Z`;
    }
    case 'leaf': {
      const rad = s * 0.45;
      return `M ${x + rad},${y} h ${s - rad} v ${s - rad} a ${rad},${rad} 0 0 1 -${rad},${rad} h -${s - rad} v -${s - rad} a ${rad},${rad} 0 0 1 ${rad},-${rad} Z`;
    }
    case 'scanline-v': {
      const rad = s * 0.25;
      return `M ${x + s * 0.15 + rad},${y} h ${s * 0.7 - 2 * rad} a ${rad},${rad} 0 0 1 ${rad},${rad} v ${s - 2 * rad} a ${rad},${rad} 0 0 1 -${rad},${rad} h -${s * 0.7 - 2 * rad} a ${rad},${rad} 0 0 1 -${rad},-${rad} v -${s - 2 * rad} a ${rad},${rad} 0 0 1 ${rad},-${rad} Z`;
    }
    case 'scanline-h': {
      const rad = s * 0.25;
      return `M ${x + rad},${y + s * 0.15} h ${s - 2 * rad} a ${rad},${rad} 0 0 1 ${rad},${rad} v ${s * 0.7 - 2 * rad} a ${rad},${rad} 0 0 1 -${rad},${rad} h -${s - 2 * rad} a ${rad},${rad} 0 0 1 -${rad},-${rad} v -${s * 0.7 - 2 * rad} a ${rad},${rad} 0 0 1 ${rad},-${rad} Z`;
    }
    case 'star': {
      return `M ${cx},${y} Q ${cx},${cy} ${x + s},${cy} Q ${cx},${cy} ${cx},${y + s} Q ${cx},${cy} ${x},${cy} Q ${cx},${cy} ${cx},${y} Z`;
    }
    case 'square':
    default:
      return `M ${x},${y} h ${s} v ${s} h -${s} Z`;
  }
}

// Generate SVG path for Corner Eye Frame (7x7 modules)
function getEyeFramePath(
  shape: EyeFrameShape,
  x: number,
  y: number,
  s: number
): string {
  const outerSize = 7 * s;
  const innerSize = 5 * s;
  const offset = s; // 1 module thickness
  const ix = x + offset;
  const iy = y + offset;

  switch (shape) {
    case 'circle': {
      const R = outerSize / 2;
      const r = innerSize / 2;
      const cx = x + R;
      const cy = y + R;
      return `
        M ${cx - R},${cy} A ${R},${R} 0 1,0 ${cx + R},${cy} A ${R},${R} 0 1,0 ${cx - R},${cy} Z
        M ${cx - r},${cy} A ${r},${r} 0 1,1 ${cx + r},${cy} A ${r},${r} 0 1,1 ${cx - r},${cy} Z
      `;
    }
    case 'rounded': {
      const or = outerSize * 0.32;
      const ir = innerSize * 0.24;
      return `
        M ${x + or},${y} h ${outerSize - 2 * or} a ${or},${or} 0 0 1 ${or},${or} v ${outerSize - 2 * or} a ${or},${or} 0 0 1 -${or},${or} h -${outerSize - 2 * or} a ${or},${or} 0 0 1 -${or},-${or} v -${outerSize - 2 * or} a ${or},${or} 0 0 1 ${or},-${or} Z
        M ${ix + ir},${iy} h ${innerSize - 2 * ir} a ${ir},${ir} 0 0 1 ${ir},${ir} v ${innerSize - 2 * ir} a ${ir},${ir} 0 0 1 -${ir},${ir} h -${innerSize - 2 * ir} a ${ir},${ir} 0 0 1 -${ir},-${ir} v -${innerSize - 2 * ir} a ${ir},${ir} 0 0 1 ${ir},-${ir} Z
      `;
    }
    case 'leaf': {
      const or = outerSize * 0.45;
      const ir = innerSize * 0.35;
      return `
        M ${x + or},${y} h ${outerSize - or} v ${outerSize - or} a ${or},${or} 0 0 1 -${or},${or} h -${outerSize - or} v -${outerSize - or} a ${or},${or} 0 0 1 ${or},-${or} Z
        M ${ix + ir},${iy} h ${innerSize - ir} v ${innerSize - ir} a ${ir},${ir} 0 0 1 -${ir},${ir} h -${innerSize - ir} v -${innerSize - ir} a ${ir},${ir} 0 0 1 ${ir},-${ir} Z
      `;
    }
    case 'octagon': {
      const cut = 1.8 * s;
      const icut = 1.2 * s;
      return `
        M ${x + cut},${y} L ${x + outerSize - cut},${y} L ${x + outerSize},${y + cut} L ${x + outerSize},${y + outerSize - cut} L ${x + outerSize - cut},${y + outerSize} L ${x + cut},${y + outerSize} L ${x},${y + outerSize - cut} L ${x},${y + cut} Z
        M ${ix + icut},${iy} L ${ix + innerSize - icut},${iy} L ${ix + innerSize},${iy + icut} L ${ix + innerSize},${iy + innerSize - icut} L ${ix + innerSize - icut},${iy + innerSize} L ${ix + icut},${iy + innerSize} L ${ix},${iy + innerSize - icut} L ${ix},${iy + icut} Z
      `;
    }
    case 'shield': {
      const rad = outerSize * 0.25;
      return `
        M ${x},${y} h ${outerSize} v ${outerSize * 0.6} a ${rad},${rad} 0 0 1 -${outerSize / 2},${outerSize * 0.4} a ${rad},${rad} 0 0 1 -${outerSize / 2},-${outerSize * 0.4} Z
        M ${ix},${iy} h ${innerSize} v ${innerSize * 0.6} a ${rad * 0.7},${rad * 0.7} 0 0 1 -${innerSize / 2},${innerSize * 0.4} a ${rad * 0.7},${rad * 0.7} 0 0 1 -${innerSize / 2},-${innerSize * 0.4} Z
      `;
    }
    case 'sharp-bracket': {
      const arm = 2.5 * s;
      return `
        M ${x},${y} h ${arm} v ${s} h -${arm - s} v ${outerSize - 2 * s} h ${arm - s} v ${s} h -${arm} Z
        M ${x + outerSize},${y} h -${arm} v ${s} h ${arm - s} v ${outerSize - 2 * s} h -${arm - s} v ${s} h ${arm} Z
      `;
    }
    case 'square':
    default:
      return `
        M ${x},${y} h ${outerSize} v ${outerSize} h -${outerSize} Z
        M ${ix},${iy} h ${innerSize} v ${innerSize} h -${innerSize} Z
      `;
  }
}

// Generate SVG path for Corner Eye Ball (3x3 modules)
function getEyeBallPath(
  shape: EyeBallShape,
  x: number,
  y: number,
  s: number
): string {
  const size = 3 * s;
  const cx = x + size / 2;
  const cy = y + size / 2;

  switch (shape) {
    case 'circle': {
      const r = size * 0.48;
      return `M ${cx - r},${cy} A ${r},${r} 0 1,0 ${cx + r},${cy} A ${r},${r} 0 1,0 ${cx - r},${cy} Z`;
    }
    case 'rounded-square': {
      const rad = size * 0.32;
      return `M ${x + rad},${y} h ${size - 2 * rad} a ${rad},${rad} 0 0 1 ${rad},${rad} v ${size - 2 * rad} a ${rad},${rad} 0 0 1 -${rad},${rad} h -${size - 2 * rad} a ${rad},${rad} 0 0 1 -${rad},-${rad} v -${size - 2 * rad} a ${rad},${rad} 0 0 1 ${rad},-${rad} Z`;
    }
    case 'diamond': {
      return `M ${cx},${y} L ${x + size},${cy} L ${cx},${y + size} L ${x},${cy} Z`;
    }
    case 'star': {
      return `M ${cx},${y} Q ${cx},${cy} ${x + size},${cy} Q ${cx},${cy} ${cx},${y + size} Q ${cx},${cy} ${x},${cy} Q ${cx},${cy} ${cx},${y} Z`;
    }
    case 'leaf-pupil': {
      const rad = size * 0.45;
      return `M ${x + rad},${y} h ${size - rad} v ${size - rad} a ${rad},${rad} 0 0 1 -${rad},${rad} h -${size - rad} v -${size - rad} a ${rad},${rad} 0 0 1 ${rad},-${rad} Z`;
    }
    case 'square':
    default:
      return `M ${x},${y} h ${size} v ${size} h -${size} Z`;
  }
}

// Check if a cell coordinate belongs to one of the 3 finder corners (outer 7x7 or inner 3x3)
function isFinderCell(r: number, c: number, total: number): boolean {
  if (r < 7 && c < 7) return true; // Top-left
  if (r < 7 && c >= total - 7) return true; // Top-right
  if (r >= total - 7 && c < 7) return true; // Bottom-left
  return false;
}

// Color coding for scientific X-Ray inspection
export const XRAY_COLORS: Record<string, string> = {
  'finder-frame': '#3B82F6', // Blue
  'finder-ball': '#1D4ED8',  // Deep Blue
  timing: '#10B981',         // Emerald Green
  alignment: '#8B5CF6',      // Purple
  format: '#F59E0B',         // Amber
  version: '#EC4899',        // Pink
  data: '#0F172A',           // Dark Navy/Slate
  ecc: '#06B6D4',            // Cyan
  separator: '#94A3B8',      // Light Slate
};

export function generateSvgString(options: RenderOptions): string {
  const { analysis, colors, design, logo, sizePx, marginModules = 3, isXRayMode = false } = options;
  const matrixSize = analysis.size;
  const totalModuleCount = matrixSize + 2 * marginModules;
  const modulePx = sizePx / totalModuleCount;

  // Background
  const bgFill = colors.isTransparentBg ? 'none' : colors.bgColor;
  const eyeFrameFill = colors.customEyeColors ? colors.eyeFrameColor : 'url(#qr-gradient)';
  const eyeBallFill = colors.customEyeColors ? colors.eyeBallColor : 'url(#qr-gradient)';

  // Gradient Definition
  let gradientDef = '';
  if (colors.mode === 'linear') {
    const rot = colors.gradientRotation || 45;
    const rad = (rot * Math.PI) / 180;
    const x1 = Math.round(50 - Math.cos(rad) * 50);
    const y1 = Math.round(50 - Math.sin(rad) * 50);
    const x2 = Math.round(50 + Math.cos(rad) * 50);
    const y2 = Math.round(50 + Math.sin(rad) * 50);
    gradientDef = `
      <linearGradient id="qr-gradient" x1="${x1}%" y1="${y1}%" x2="${x2}%" y2="${y2}%">
        <stop offset="0%" stop-color="${colors.fgColor}" />
        <stop offset="100%" stop-color="${colors.fgColor2 || colors.fgColor}" />
      </linearGradient>
    `;
  } else if (colors.mode === 'radial') {
    gradientDef = `
      <radialGradient id="qr-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="0%" stop-color="${colors.fgColor}" />
        <stop offset="100%" stop-color="${colors.fgColor2 || colors.fgColor}" />
      </radialGradient>
    `;
  } else {
    gradientDef = `
      <linearGradient id="qr-gradient" x1="0%" y1="0%" x2="0%" y2="0%">
        <stop offset="0%" stop-color="${colors.fgColor}" />
        <stop offset="100%" stop-color="${colors.fgColor}" />
      </linearGradient>
    `;
  }

  // 1. Body Paths
  const bodyPaths: string[] = [];
  const xrayModulePaths: { color: string; path: string }[] = [];

  for (let r = 0; r < matrixSize; r++) {
    for (let c = 0; c < matrixSize; c++) {
      const cell = analysis.grid[r][c];
      const isFinder = isFinderCell(r, c, matrixSize);

      if (isFinder) continue; // Eye shapes rendered separately

      // Check logo exclusion zone
      if (logo.url && logo.removeBg && analysis.isInsideLogoZone(r, c, logo.size)) {
        continue;
      }

      const x = (c + marginModules) * modulePx;
      const y = (r + marginModules) * modulePx;

      if (isXRayMode) {
        if (cell.isDark) {
          const color = XRAY_COLORS[cell.category] || '#334155';
          const p = getModulePath('square', x, y, modulePx);
          xrayModulePaths.push({ color, path: p });
        }
      } else if (cell.isDark) {
        bodyPaths.push(getModulePath(design.bodyShape, x, y, modulePx));
      }
    }
  }

  // 2. Eye Frames & Balls (3 corners)
  const eyeFramePaths: string[] = [];
  const eyeBallPaths: string[] = [];

  const cornerPositions = [
    { r: 0, c: 0 }, // Top-left
    { r: 0, c: matrixSize - 7 }, // Top-right
    { r: matrixSize - 7, c: 0 }, // Bottom-left
  ];

  for (const pos of cornerPositions) {
    const fx = (pos.c + marginModules) * modulePx;
    const fy = (pos.r + marginModules) * modulePx;
    const bx = (pos.c + 2 + marginModules) * modulePx;
    const by = (pos.r + 2 + marginModules) * modulePx;

    eyeFramePaths.push(getEyeFramePath(design.eyeFrameShape, fx, fy, modulePx));
    eyeBallPaths.push(getEyeBallPath(design.eyeBallShape, bx, by, modulePx));
  }

  // 3. Logo Element
  let logoSvg = '';
  if (logo.url) {
    const logoAreaSize = sizePx * logo.size;
    const logoX = (sizePx - logoAreaSize) / 2;
    const logoY = (sizePx - logoAreaSize) / 2;
    const padding = modulePx * 0.8;

    let logoBgRect = '';
    if (logo.removeBg) {
      const bgW = logoAreaSize + padding * 2;
      const bgH = logoAreaSize + padding * 2;
      const bgX = (sizePx - bgW) / 2;
      const bgY = (sizePx - bgH) / 2;
      const radius = bgW * 0.16;
      logoBgRect = `<rect x="${bgX}" y="${bgY}" width="${bgW}" height="${bgH}" rx="${radius}" fill="${colors.bgColor || '#ffffff'}" />`;
    }

    logoSvg = `
      ${logoBgRect}
      <image href="${logo.url}" x="${logoX}" y="${logoY}" width="${logoAreaSize}" height="${logoAreaSize}" preserveAspectRatio="xMidYMid meet" />
    `;
  }

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${sizePx} ${sizePx}" width="${sizePx}" height="${sizePx}">
      <defs>
        ${gradientDef}
      </defs>
      ${bgFill !== 'none' ? `<rect width="100%" height="100%" fill="${bgFill}" />` : ''}

      ${
        isXRayMode
          ? xrayModulePaths.map((m) => `<path d="${m.path}" fill="${m.color}" />`).join('\n')
          : `<path d="${bodyPaths.join(' ')}" fill="url(#qr-gradient)" fill-rule="evenodd" />`
      }

      <path d="${eyeFramePaths.join(' ')}" fill="${isXRayMode ? XRAY_COLORS['finder-frame'] : eyeFrameFill}" fill-rule="evenodd" />
      <path d="${eyeBallPaths.join(' ')}" fill="${isXRayMode ? XRAY_COLORS['finder-ball'] : eyeBallFill}" fill-rule="evenodd" />

      ${logoSvg}
    </svg>
  `.trim();
}

// Render to Canvas (Offscreen or visible DOM canvas) for PNG high-res export
export async function renderToCanvas(
  options: RenderOptions,
  targetCanvas?: HTMLCanvasElement
): Promise<HTMLCanvasElement> {
  const svgString = generateSvgString(options);
  const canvas = targetCanvas || document.createElement('canvas');
  canvas.width = options.sizePx;
  canvas.height = options.sizePx;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get 2D context');

  // Convert SVG to Image
  const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const img = new Image();
  img.crossOrigin = 'anonymous';

  await new Promise<void>((resolve, reject) => {
    img.onload = () => {
      ctx.clearRect(0, 0, options.sizePx, options.sizePx);
      ctx.drawImage(img, 0, 0, options.sizePx, options.sizePx);
      URL.revokeObjectURL(url);
      resolve();
    };
    img.onerror = (err) => {
      URL.revokeObjectURL(url);
      reject(err);
    };
    img.src = url;
  });

  return canvas;
}

// Download helpers
export function downloadSvgFile(svgString: string, filename = 'qrcode-studio.svg') {
  const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export async function downloadPngFile(options: RenderOptions, filename = 'qrcode-studio.png') {
  const canvas = await renderToCanvas(options);
  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 'image/png');
}

export async function copyQrToClipboard(options: RenderOptions): Promise<boolean> {
  try {
    const canvas = await renderToCanvas(options);
    return new Promise((resolve) => {
      canvas.toBlob(async (blob) => {
        if (!blob) return resolve(false);
        try {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob }),
          ]);
          resolve(true);
        } catch {
          resolve(false);
        }
      }, 'image/png');
    });
  } catch {
    return false;
  }
}

export async function downloadPdfFile(options: RenderOptions, payloadText: string, filename = 'qrcode-studio.pdf') {
  const canvas = await renderToCanvas({ ...options, sizePx: 1200 });
  const imgData = canvas.toDataURL('image/png');

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  // Modern clean header
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(22);
  pdf.setTextColor(15, 23, 42); // slate-900
  pdf.text('QRCode Studio Pro', 20, 25);

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10);
  pdf.setTextColor(100, 116, 139); // slate-500
  pdf.text('Tài liệu mã QR vector chất lượng cao phục vụ nghiên cứu & in ấn', 20, 32);

  pdf.setDrawColor(226, 232, 240);
  pdf.line(20, 36, 190, 36);

  // QR Image Centered
  const qrSizeMm = 110;
  const qrX = (210 - qrSizeMm) / 2;
  const qrY = 45;
  pdf.addImage(imgData, 'PNG', qrX, qrY, qrSizeMm, qrSizeMm);

  // Specification box
  const boxY = qrY + qrSizeMm + 12;
  pdf.setFillColor(248, 250, 252);
  pdf.roundedRect(20, boxY, 170, 60, 3, 3, 'F');
  pdf.setDrawColor(203, 213, 225);
  pdf.roundedRect(20, boxY, 170, 60, 3, 3, 'D');

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(12);
  pdf.setTextColor(30, 41, 59);
  pdf.text('Thông số kỹ thuật mã QR (Specifications):', 26, boxY + 10);

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(9);
  pdf.setTextColor(71, 85, 105);

  pdf.text(`- Phiên bản ma trận: Version ${options.analysis.version} (${options.analysis.size} x ${options.analysis.size} modules)`, 26, boxY + 18);
  pdf.text(`- Cấp độ sửa sai (Reed-Solomon): Cấp ${options.analysis.eccLevel} (~${options.analysis.eccRedundancyPct}% phục hồi)`, 26, boxY + 25);
  pdf.text(`- Tổng số module: ${options.analysis.totalModules} (${options.analysis.darkCount} dark / ${options.analysis.lightCount} light)`, 26, boxY + 32);
  pdf.text(`- Hình thái thân mã: ${options.design.bodyShape} | Khung mắt: ${options.design.eyeFrameShape}`, 26, boxY + 39);

  // Payload excerpt
  const truncatedPayload = payloadText.length > 70 ? payloadText.substring(0, 70) + '...' : payloadText;
  pdf.text(`- Nội dung dữ liệu mã hóa: ${truncatedPayload}`, 26, boxY + 46);

  // Footer
  pdf.setFontSize(8);
  pdf.setTextColor(148, 163, 184);
  pdf.text('Được tạo bởi QRCode Studio Pro · Tiêu chuẩn ISO/IEC 18004', 20, 285);

  pdf.save(filename);
}
