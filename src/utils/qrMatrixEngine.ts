import QRCode from 'qrcode';
import { ErrorCorrectionLevel, MatrixCell, ModuleCategory } from '../types/qr';

// Alignment pattern center positions per QR Version (ISO/IEC 18004 standard)
const ALIGNMENT_PATTERN_POSITIONS: Record<number, number[]> = {
  1: [],
  2: [6, 18],
  3: [6, 22],
  4: [6, 26],
  5: [6, 30],
  6: [6, 34],
  7: [6, 22, 38],
  8: [6, 24, 42],
  9: [6, 26, 46],
  10: [6, 28, 50],
  11: [6, 30, 54],
  12: [6, 32, 58],
  13: [6, 34, 62],
  14: [6, 26, 46, 66],
  15: [6, 26, 48, 70],
  16: [6, 26, 50, 74],
  17: [6, 30, 54, 78],
  18: [6, 30, 56, 82],
  19: [6, 30, 58, 86],
  20: [6, 34, 62, 90],
};

export interface QRAnalysisResult {
  size: number;
  version: number;
  eccLevel: ErrorCorrectionLevel;
  totalModules: number;
  darkCount: number;
  lightCount: number;
  grid: MatrixCell[][];
  categoryCounts: Record<ModuleCategory, number>;
  capacityBytes: number;
  eccRedundancyPct: number;
  isInsideLogoZone: (r: number, c: number, logoSize: number) => boolean;
}

export function generateQRMatrix(payload: string, eccLevel: ErrorCorrectionLevel): QRAnalysisResult {
  const qr = QRCode.create(payload || 'https://example.com', {
    errorCorrectionLevel: eccLevel,
  });

  const size = qr.modules.size;
  const version = Math.floor((size - 17) / 4);

  // Recovery percentages based on Reed-Solomon standard
  const eccMap: Record<ErrorCorrectionLevel, number> = {
    L: 7,
    M: 15,
    Q: 25,
    H: 30,
  };

  const alignCoords = ALIGNMENT_PATTERN_POSITIONS[version] || [];
  const alignCenters: [number, number][] = [];
  for (const r of alignCoords) {
    for (const c of alignCoords) {
      // Do not place alignment if overlapping with the 3 finder patterns
      if (r < 9 && c < 9) continue;
      if (r < 9 && c >= size - 9) continue;
      if (r >= size - 9 && c < 9) continue;
      alignCenters.push([r, c]);
    }
  }

  const grid: MatrixCell[][] = [];
  let darkCount = 0;
  let lightCount = 0;
  const categoryCounts: Record<ModuleCategory, number> = {
    'finder-frame': 0,
    'finder-ball': 0,
    separator: 0,
    timing: 0,
    alignment: 0,
    format: 0,
    version: 0,
    data: 0,
    ecc: 0,
  };

  for (let r = 0; r < size; r++) {
    const rowCells: MatrixCell[] = [];
    for (let c = 0; c < size; c++) {
      // Access module state from qrcode internal modules
      // QRCode uses .get(r, c)
      const isDark = (qr.modules as any).get ? (qr.modules as any).get(r, c) === 1 : (qr.modules.data as any)[r * size + c] === 1;

      if (isDark) darkCount++;
      else lightCount++;

      let category: ModuleCategory = 'data';

      // 1. Top-left Finder
      if (r < 7 && c < 7) {
        if (r === 0 || r === 6 || c === 0 || c === 6) category = 'finder-frame';
        else if (r >= 2 && r <= 4 && c >= 2 && c <= 4) category = 'finder-ball';
        else category = 'finder-frame';
      }
      // 2. Top-right Finder
      else if (r < 7 && c >= size - 7) {
        if (r === 0 || r === 6 || c === size - 7 || c === size - 1) category = 'finder-frame';
        else if (r >= 2 && r <= 4 && c >= size - 5 && c <= size - 3) category = 'finder-ball';
        else category = 'finder-frame';
      }
      // 3. Bottom-left Finder
      else if (r >= size - 7 && c < 7) {
        if (r === size - 7 || r === size - 1 || c === 0 || c === 6) category = 'finder-frame';
        else if (r >= size - 5 && r <= size - 3 && c >= 2 && c <= 4) category = 'finder-ball';
        else category = 'finder-frame';
      }
      // 4. Separators around finders
      else if (
        (r === 7 && c <= 7) ||
        (c === 7 && r <= 7) ||
        (r === 7 && c >= size - 8) ||
        (c === size - 8 && r <= 7) ||
        (r === size - 8 && c <= 7) ||
        (c === 7 && r >= size - 8)
      ) {
        category = 'separator';
      }
      // 5. Timing Patterns (Row 6, Col 6)
      else if (r === 6 || c === 6) {
        category = 'timing';
      }
      // 6. Alignment patterns ($5\times 5$)
      else if (alignCenters.some(([ar, ac]) => Math.abs(r - ar) <= 2 && Math.abs(c - ac) <= 2)) {
        category = 'alignment';
      }
      // 7. Format Information
      else if (
        (r === 8 && (c <= 8 || c >= size - 8)) ||
        (c === 8 && (r <= 8 || r >= size - 8))
      ) {
        category = 'format';
      }
      // 8. Version Information (for Version >= 7)
      else if (
        version >= 7 &&
        ((r >= size - 11 && r <= size - 9 && c < 6) ||
          (c >= size - 11 && c <= size - 9 && r < 6))
      ) {
        category = 'version';
      } else {
        // Data vs ECC (approximated based on capacity & ECC level redundancy)
        const totalCodeModules = size * size - 3 * 64;
        const eccRatio = eccMap[eccLevel] / 100;
        const isEcc = (r * size + c) % Math.round(1 / eccRatio) === 0;
        category = isEcc ? 'ecc' : 'data';
      }

      categoryCounts[category]++;
      rowCells.push({ row: r, col: c, isDark: Boolean(isDark), category });
    }
    grid.push(rowCells);
  }

  // Function to test if a module falls inside the center logo exclusion zone
  const isInsideLogoZone = (r: number, c: number, logoFraction: number) => {
    const center = (size - 1) / 2;
    const halfWidth = (size * logoFraction) / 2;
    return Math.abs(r - center) <= halfWidth && Math.abs(c - center) <= halfWidth;
  };

  return {
    size,
    version,
    eccLevel,
    totalModules: size * size,
    darkCount,
    lightCount,
    grid,
    categoryCounts,
    capacityBytes: Math.round((size * size * 0.12)),
    eccRedundancyPct: eccMap[eccLevel],
    isInsideLogoZone,
  };
}
