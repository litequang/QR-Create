export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const cleanHex = hex.replace('#', '').trim();
  if (cleanHex.length === 3) {
    return {
      r: parseInt(cleanHex[0] + cleanHex[0], 16),
      g: parseInt(cleanHex[1] + cleanHex[1], 16),
      b: parseInt(cleanHex[2] + cleanHex[2], 16),
    };
  }
  if (cleanHex.length === 6) {
    return {
      r: parseInt(cleanHex.substring(0, 2), 16),
      g: parseInt(cleanHex.substring(2, 4), 16),
      b: parseInt(cleanHex.substring(4, 6), 16),
    };
  }
  return null;
}

export function getRelativeLuminance(r: number, g: number, b: number): number {
  const sRGB = [r, g, b].map((val) => {
    const s = val / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
}

export function calculateContrastRatio(hex1: string, hex2: string): number {
  const rgb1 = hexToRgb(hex1) || { r: 0, g: 0, b: 0 };
  const rgb2 = hexToRgb(hex2) || { r: 255, g: 255, b: 255 };

  const l1 = getRelativeLuminance(rgb1.r, rgb1.g, rgb1.b);
  const l2 = getRelativeLuminance(rgb2.r, rgb2.g, rgb2.b);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
}

export function getContrastEvaluation(ratio: number): {
  label: string;
  isScannable: boolean;
  score: 'excellent' | 'good' | 'fair' | 'poor';
} {
  if (ratio >= 7.0) {
    return { label: 'Độ tương phản tuyệt vời (Dễ quét nhất)', isScannable: true, score: 'excellent' };
  }
  if (ratio >= 4.5) {
    return { label: 'Độ tương phản tốt (Chuẩn WCAG AA)', isScannable: true, score: 'good' };
  }
  if (ratio >= 3.0) {
    return { label: 'Tương phản trung bình (Có thể khó quét ở camera yếu)', isScannable: true, score: 'fair' };
  }
  return { label: 'Cảnh báo: Tương phản quá thấp, nguy cơ không quét được', isScannable: false, score: 'poor' };
}
