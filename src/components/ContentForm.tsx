import React from 'react';
import { QRConfig } from '../types/qr';

interface ContentFormProps {
  config: QRConfig;
  onChange: (updated: Partial<QRConfig>) => void;
}

export const ContentForm: React.FC<ContentFormProps> = ({ config, onChange }) => {
  const inputClass =
    'w-full px-3.5 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all';
  const labelClass = 'block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5';
  const helperClass = 'text-[11px] text-slate-500 dark:text-slate-400 mt-1';

  switch (config.type) {
    case 'url':
      return (
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Địa chỉ liên kết (URL)</label>
            <input
              type="url"
              placeholder="https://example.com hoặc yourdomain.com"
              value={config.url}
              onChange={(e) => onChange({ url: e.target.value })}
              className={inputClass}
            />
            <p className={helperClass}>
              Mã QR sẽ mở trực tiếp trang web này khi quét bằng camera điện thoại.
            </p>
          </div>
        </div>
      );

    case 'text':
      return (
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className={labelClass}>Văn bản thuần túy</label>
              <span className="text-[11px] text-slate-400 tabular-nums">
                {config.text.length} ký tự
              </span>
            </div>
            <textarea
              rows={4}
              placeholder="Nhập nội dung tin nhắn, ghi chú, mã sản phẩm hoặc thông điệp của bạn..."
              value={config.text}
              onChange={(e) => onChange({ text: e.target.value })}
              className={inputClass}
            />
            <p className={helperClass}>
              Thiết bị quét sẽ hiển thị nguyên văn nội dung này trên màn hình.
            </p>
          </div>
        </div>
      );

    case 'wifi':
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Tên mạng Wi-Fi (SSID)</label>
              <input
                type="text"
                placeholder="Ví dụ: Coffee_Shop_5G"
                value={config.wifi.ssid}
                onChange={(e) =>
                  onChange({ wifi: { ...config.wifi, ssid: e.target.value } })
                }
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Mật khẩu (Password)</label>
              <input
                type="text"
                placeholder="Nhập mật khẩu Wi-Fi..."
                value={config.wifi.password}
                onChange={(e) =>
                  onChange({ wifi: { ...config.wifi, password: e.target.value } })
                }
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <div>
              <label className={labelClass}>Chuẩn bảo mật</label>
              <select
                value={config.wifi.encryption}
                onChange={(e) =>
                  onChange({
                    wifi: {
                      ...config.wifi,
                      encryption: e.target.value as any,
                    },
                  })
                }
                className={inputClass}
              >
                <option value="WPA">WPA / WPA2 / WPA3 (Phổ biến nhất)</option>
                <option value="WEP">WEP (Cũ)</option>
                <option value="nopass">Không có mật khẩu (Open)</option>
              </select>
            </div>

            <div className="pt-5">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={config.wifi.hidden}
                  onChange={(e) =>
                    onChange({
                      wifi: { ...config.wifi, hidden: e.target.checked },
                    })
                  }
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span>Mạng ẩn (Hidden SSID)</span>
              </label>
            </div>
          </div>
        </div>
      );

    case 'vcard':
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Họ & Tên đệm</label>
              <input
                type="text"
                placeholder="Nguyễn Văn"
                value={config.vcard.lastName}
                onChange={(e) =>
                  onChange({ vcard: { ...config.vcard, lastName: e.target.value } })
                }
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Tên</label>
              <input
                type="text"
                placeholder="An"
                value={config.vcard.firstName}
                onChange={(e) =>
                  onChange({ vcard: { ...config.vcard, firstName: e.target.value } })
                }
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Công ty / Tổ chức</label>
              <input
                type="text"
                placeholder="Tập đoàn Công nghệ ABC"
                value={config.vcard.organization}
                onChange={(e) =>
                  onChange({
                    vcard: { ...config.vcard, organization: e.target.value },
                  })
                }
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Chức vụ</label>
              <input
                type="text"
                placeholder="Trưởng phòng Nghiên cứu R&D"
                value={config.vcard.title}
                onChange={(e) =>
                  onChange({ vcard: { ...config.vcard, title: e.target.value } })
                }
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Số điện thoại di động</label>
              <input
                type="tel"
                placeholder="+84 901 234 567"
                value={config.vcard.phoneMobile}
                onChange={(e) =>
                  onChange({
                    vcard: { ...config.vcard, phoneMobile: e.target.value },
                  })
                }
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Email cá nhân / công việc</label>
              <input
                type="email"
                placeholder="nguyenvanan@company.com"
                value={config.vcard.email}
                onChange={(e) =>
                  onChange({ vcard: { ...config.vcard, email: e.target.value } })
                }
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Website</label>
              <input
                type="url"
                placeholder="https://annguyen.design"
                value={config.vcard.website}
                onChange={(e) =>
                  onChange({ vcard: { ...config.vcard, website: e.target.value } })
                }
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Thành phố / Quốc gia</label>
              <input
                type="text"
                placeholder="Hà Nội, Việt Nam"
                value={config.vcard.city}
                onChange={(e) =>
                  onChange({ vcard: { ...config.vcard, city: e.target.value } })
                }
                className={inputClass}
              />
            </div>
          </div>
        </div>
      );

    case 'email':
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Địa chỉ nhận thư (Email)</label>
              <input
                type="email"
                placeholder="contact@company.vn"
                value={config.email.email}
                onChange={(e) =>
                  onChange({ email: { ...config.email, email: e.target.value } })
                }
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Tiêu đề thư (Subject)</label>
              <input
                type="text"
                placeholder="Liên hệ hợp tác nghiên cứu..."
                value={config.email.subject}
                onChange={(e) =>
                  onChange({ email: { ...config.email, subject: e.target.value } })
                }
                className={inputClass}
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>Nội dung thư mẫu</label>
            <textarea
              rows={3}
              placeholder="Xin chào, tôi muốn tìm hiểu thêm về giải pháp của bạn..."
              value={config.email.body}
              onChange={(e) =>
                onChange({ email: { ...config.email, body: e.target.value } })
              }
              className={inputClass}
            />
          </div>
        </div>
      );

    case 'phone':
      return (
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Số điện thoại gọi trực tiếp</label>
            <input
              type="tel"
              placeholder="+84 901 234 567"
              value={config.phone}
              onChange={(e) => onChange({ phone: e.target.value })}
              className={inputClass}
            />
            <p className={helperClass}>
              Khi quét mã này, điện thoại sẽ tự động mở màn hình gọi đến số trên.
            </p>
          </div>
        </div>
      );

    case 'sms':
      return (
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Số điện thoại nhận tin nhắn</label>
            <input
              type="tel"
              placeholder="+84 901 234 567"
              value={config.sms.phone}
              onChange={(e) =>
                onChange({ sms: { ...config.sms, phone: e.target.value } })
              }
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Nội dung tin nhắn SMS</label>
            <textarea
              rows={3}
              placeholder="Soạn nội dung tin nhắn gửi sẵn..."
              value={config.sms.message}
              onChange={(e) =>
                onChange({ sms: { ...config.sms, message: e.target.value } })
              }
              className={inputClass}
            />
          </div>
        </div>
      );

    case 'location':
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Vĩ độ (Latitude)</label>
              <input
                type="text"
                placeholder="21.028511"
                value={config.location.latitude}
                onChange={(e) =>
                  onChange({
                    location: { ...config.location, latitude: e.target.value },
                  })
                }
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Kinh độ (Longitude)</label>
              <input
                type="text"
                placeholder="105.854444"
                value={config.location.longitude}
                onChange={(e) =>
                  onChange({
                    location: { ...config.location, longitude: e.target.value },
                  })
                }
                className={inputClass}
              />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[11px] text-slate-500">Mẫu tọa độ nhanh:</span>
            {[
              { label: 'Hà Nội', lat: '21.0285', lng: '105.8544' },
              { label: 'TP. Hồ Chí Minh', lat: '10.7769', lng: '106.7009' },
              { label: 'Đà Nẵng', lat: '16.0544', lng: '108.2022' },
              { label: 'Tokyo', lat: '35.6762', lng: '139.6503' },
            ].map((loc) => (
              <button
                key={loc.label}
                type="button"
                onClick={() =>
                  onChange({
                    location: {
                      latitude: loc.lat,
                      longitude: loc.lng,
                    },
                  })
                }
                className="px-2.5 py-1 text-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-md transition-colors"
              >
                {loc.label}
              </button>
            ))}
          </div>
        </div>
      );

    case 'social':
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Mạng xã hội</label>
              <select
                value={config.social.network}
                onChange={(e) =>
                  onChange({
                    social: {
                      ...config.social,
                      network: e.target.value as any,
                    },
                  })
                }
                className={inputClass}
              >
                <option value="facebook">Facebook</option>
                <option value="youtube">YouTube</option>
                <option value="twitter">X (Twitter)</option>
                <option value="instagram">Instagram</option>
                <option value="tiktok">TikTok</option>
                <option value="linkedin">LinkedIn</option>
                <option value="telegram">Telegram</option>
                <option value="whatsapp">WhatsApp</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Tên người dùng (@username) hoặc Link</label>
              <input
                type="text"
                placeholder="username hoặc link trang cá nhân"
                value={config.social.handleOrUrl}
                onChange={(e) =>
                  onChange({
                    social: { ...config.social, handleOrUrl: e.target.value },
                  })
                }
                className={inputClass}
              />
            </div>
          </div>
        </div>
      );

    case 'crypto':
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Đồng tiền số</label>
              <select
                value={config.crypto.currency}
                onChange={(e) =>
                  onChange({
                    crypto: {
                      ...config.crypto,
                      currency: e.target.value as any,
                    },
                  })
                }
                className={inputClass}
              >
                <option value="BTC">Bitcoin (BTC)</option>
                <option value="ETH">Ethereum (ETH)</option>
                <option value="USDT">Tether (USDT)</option>
                <option value="SOL">Solana (SOL)</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass}>Địa chỉ ví nhận tiền</label>
              <input
                type="text"
                placeholder="1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa..."
                value={config.crypto.address}
                onChange={(e) =>
                  onChange({
                    crypto: { ...config.crypto, address: e.target.value },
                  })
                }
                className={inputClass}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Số lượng yêu cầu (Tùy chọn)</label>
              <input
                type="text"
                placeholder="0.05"
                value={config.crypto.amount}
                onChange={(e) =>
                  onChange({
                    crypto: { ...config.crypto, amount: e.target.value },
                  })
                }
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Ghi chú thanh toán</label>
              <input
                type="text"
                placeholder="Donation / Hóa đơn #123"
                value={config.crypto.message}
                onChange={(e) =>
                  onChange({
                    crypto: { ...config.crypto, message: e.target.value },
                  })
                }
                className={inputClass}
              />
            </div>
          </div>
        </div>
      );

    case 'event':
      return (
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Tên sự kiện / Lịch hẹn</label>
            <input
              type="text"
              placeholder="Hội thảo Khoa học Quốc tế 2026"
              value={config.event.title}
              onChange={(e) =>
                onChange({
                  event: { ...config.event, title: e.target.value },
                })
              }
              className={inputClass}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Thời gian bắt đầu</label>
              <input
                type="datetime-local"
                value={config.event.startDate}
                onChange={(e) =>
                  onChange({
                    event: { ...config.event, startDate: e.target.value },
                  })
                }
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Thời gian kết thúc</label>
              <input
                type="datetime-local"
                value={config.event.endDate}
                onChange={(e) =>
                  onChange({
                    event: { ...config.event, endDate: e.target.value },
                  })
                }
                className={inputClass}
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>Địa điểm tổ chức</label>
            <input
              type="text"
              placeholder="Trung tâm Hội nghị Quốc gia, Hà Nội"
              value={config.event.location}
              onChange={(e) =>
                onChange({
                  event: { ...config.event, location: e.target.value },
                })
              }
              className={inputClass}
            />
          </div>
        </div>
      );

    default:
      return null;
  }
};
