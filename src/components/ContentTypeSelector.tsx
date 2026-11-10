import React from 'react';
import {
  Link2,
  FileText,
  Wifi,
  Contact,
  Mail,
  Phone,
  MessageSquare,
  MapPin,
  Share2,
  Coins,
  Calendar,
} from 'lucide-react';
import { QRContentType } from '../types/qr';

interface ContentTypeSelectorProps {
  activeType: QRContentType;
  onChange: (type: QRContentType) => void;
}

interface TypeItem {
  type: QRContentType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const CONTENT_TYPES: TypeItem[] = [
  { type: 'url', label: 'URL / Link', icon: Link2 },
  { type: 'text', label: 'Văn bản', icon: FileText },
  { type: 'wifi', label: 'Mạng Wi-Fi', icon: Wifi },
  { type: 'vcard', label: 'Danh bạ (vCard)', icon: Contact },
  { type: 'email', label: 'Email', icon: Mail },
  { type: 'phone', label: 'Điện thoại', icon: Phone },
  { type: 'sms', label: 'Tin nhắn SMS', icon: MessageSquare },
  { type: 'location', label: 'Tọa độ GPS', icon: MapPin },
  { type: 'social', label: 'Mạng xã hội', icon: Share2 },
  { type: 'crypto', label: 'Tiền số (Crypto)', icon: Coins },
  { type: 'event', label: 'Sự kiện (Event)', icon: Calendar },
];

export const ContentTypeSelector: React.FC<ContentTypeSelectorProps> = ({
  activeType,
  onChange,
}) => {
  return (
    <div className="w-full overflow-x-auto pb-1 scrollbar-thin">
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700/60 min-w-max">
        {CONTENT_TYPES.map((item) => {
          const Icon = item.icon;
          const isActive = activeType === item.type;
          return (
            <button
              key={item.type}
              type="button"
              onClick={() => onChange(item.type)}
              className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg transition-all duration-150 whitespace-nowrap shrink-0 ${
                isActive
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs border border-slate-200/70 dark:border-slate-700'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
