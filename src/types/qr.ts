export type QRContentType =
  | 'url'
  | 'text'
  | 'wifi'
  | 'vcard'
  | 'email'
  | 'phone'
  | 'sms'
  | 'location'
  | 'social'
  | 'crypto'
  | 'event';

export type BodyShape =
  | 'square'
  | 'dots'
  | 'rounded'
  | 'extra-rounded'
  | 'diamond'
  | 'leaf'
  | 'scanline-v'
  | 'scanline-h'
  | 'star';

export type EyeFrameShape =
  | 'square'
  | 'rounded'
  | 'circle'
  | 'leaf'
  | 'octagon'
  | 'shield'
  | 'sharp-bracket';

export type EyeBallShape =
  | 'square'
  | 'circle'
  | 'diamond'
  | 'rounded-square'
  | 'star'
  | 'leaf-pupil';

export type GradientType = 'single' | 'linear' | 'radial';

export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export interface QRColors {
  mode: GradientType;
  fgColor: string;
  fgColor2: string;
  gradientRotation: number; // 0, 45, 90, 135, 180, etc.
  bgColor: string;
  isTransparentBg: boolean;
  customEyeColors: boolean;
  eyeFrameColor: string;
  eyeBallColor: string;
}

export interface QRLogo {
  url: string | null;
  size: number; // 0.15 - 0.35
  removeBg: boolean;
}

export interface QRDesign {
  bodyShape: BodyShape;
  eyeFrameShape: EyeFrameShape;
  eyeBallShape: EyeBallShape;
}

export interface WifiData {
  ssid: string;
  password: string;
  encryption: 'WPA' | 'WEP' | 'nopass';
  hidden: boolean;
}

export interface VCardData {
  firstName: string;
  lastName: string;
  organization: string;
  title: string;
  phoneWork: string;
  phoneMobile: string;
  email: string;
  website: string;
  street: string;
  city: string;
  country: string;
}

export interface EmailData {
  email: string;
  subject: string;
  body: string;
}

export interface SmsData {
  phone: string;
  message: string;
}

export interface LocationData {
  latitude: string;
  longitude: string;
  label?: string;
}

export interface SocialData {
  network: 'facebook' | 'twitter' | 'youtube' | 'instagram' | 'linkedin' | 'tiktok' | 'telegram' | 'whatsapp';
  handleOrUrl: string;
}

export interface CryptoData {
  currency: 'BTC' | 'ETH' | 'USDT' | 'SOL';
  address: string;
  amount: string;
  message: string;
}

export interface EventData {
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface QRConfig {
  type: QRContentType;
  url: string;
  text: string;
  wifi: WifiData;
  vcard: VCardData;
  email: EmailData;
  phone: string;
  sms: SmsData;
  location: LocationData;
  social: SocialData;
  crypto: CryptoData;
  event: EventData;
  colors: QRColors;
  design: QRDesign;
  logo: QRLogo;
  eccLevel: ErrorCorrectionLevel;
  resolution: number;
}

export type ModuleCategory =
  | 'finder-frame'
  | 'finder-ball'
  | 'separator'
  | 'timing'
  | 'alignment'
  | 'format'
  | 'version'
  | 'data'
  | 'ecc';

export interface MatrixCell {
  row: number;
  col: number;
  isDark: boolean;
  category: ModuleCategory;
}

export interface QRPreset {
  id: string;
  name: string;
  description: string;
  colors: QRColors;
  design: QRDesign;
  eccLevel: ErrorCorrectionLevel;
}
