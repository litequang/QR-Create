import { QRConfig } from '../types/qr';

export function formatQRPayload(config: QRConfig): string {
  switch (config.type) {
    case 'url': {
      const url = config.url.trim();
      if (!url) return 'https://example.com';
      if (/^https?:\/\//i.test(url)) return url;
      return `https://${url}`;
    }

    case 'text':
      return config.text || 'Chào mừng bạn đến với QRCode Studio Pro';

    case 'wifi': {
      const { ssid, password, encryption, hidden } = config.wifi;
      const s = ssid.replace(/([\\;:"])/g, '\\$1');
      const p = password.replace(/([\\;:"])/g, '\\$1');
      const t = encryption === 'nopass' ? 'nopass' : encryption;
      return `WIFI:T:${t};S:${s};P:${p};H:${hidden ? 'true' : 'false'};;`;
    }

    case 'vcard': {
      const { firstName, lastName, organization, title, phoneWork, phoneMobile, email, website, street, city, country } = config.vcard;
      const fullName = `${firstName} ${lastName}`.trim() || 'John Doe';
      const lines = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `N:${lastName || ''};${firstName || ''};;;`,
        `FN:${fullName}`,
      ];
      if (organization) lines.push(`ORG:${organization}`);
      if (title) lines.push(`TITLE:${title}`);
      if (phoneWork) lines.push(`TEL;TYPE=WORK,VOICE:${phoneWork}`);
      if (phoneMobile) lines.push(`TEL;TYPE=CELL,VOICE:${phoneMobile}`);
      if (email) lines.push(`EMAIL:${email}`);
      if (website) lines.push(`URL:${website}`);
      if (street || city || country) {
        lines.push(`ADR;TYPE=WORK:;;${street || ''};${city || ''};;;${country || ''}`);
      }
      lines.push('END:VCARD');
      return lines.join('\n');
    }

    case 'email': {
      const { email, subject, body } = config.email;
      const params = new URLSearchParams();
      if (subject) params.set('subject', subject);
      if (body) params.set('body', body);
      const query = params.toString();
      return `mailto:${email || 'contact@example.com'}${query ? `?${query}` : ''}`;
    }

    case 'phone': {
      const phone = config.phone.trim() || '+84901234567';
      return `tel:${phone.replace(/\s+/g, '')}`;
    }

    case 'sms': {
      const phone = config.sms.phone.trim() || '+84901234567';
      const msg = config.sms.message || '';
      return `smsto:${phone}:${msg}`;
    }

    case 'location': {
      const lat = config.location.latitude.trim() || '21.028511';
      const lng = config.location.longitude.trim() || '105.854444';
      return `geo:${lat},${lng}?q=${lat},${lng}`;
    }

    case 'social': {
      const { network, handleOrUrl } = config.social;
      const clean = handleOrUrl.trim().replace(/^@/, '');
      if (/^https?:\/\//i.test(clean)) return clean;
      switch (network) {
        case 'facebook':
          return `https://facebook.com/${clean || 'profile'}`;
        case 'twitter':
          return `https://twitter.com/${clean || 'twitter'}`;
        case 'youtube':
          return `https://youtube.com/@${clean || 'youtube'}`;
        case 'instagram':
          return `https://instagram.com/${clean || 'instagram'}`;
        case 'linkedin':
          return `https://linkedin.com/in/${clean || 'profile'}`;
        case 'tiktok':
          return `https://tiktok.com/@${clean || 'tiktok'}`;
        case 'telegram':
          return `https://t.me/${clean || 'telegram'}`;
        case 'whatsapp':
          return `https://wa.me/${clean.replace(/[^0-9]/g, '') || '84901234567'}`;
        default:
          return `https://${clean}`;
      }
    }

    case 'crypto': {
      const { currency, address, amount, message } = config.crypto;
      const addr = address.trim() || '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa';
      const params = new URLSearchParams();
      if (amount) params.set('amount', amount);
      if (message) params.set('message', message);
      const query = params.toString();

      switch (currency) {
        case 'BTC':
          return `bitcoin:${addr}${query ? `?${query}` : ''}`;
        case 'ETH':
          return `ethereum:${addr}${query ? `?${query}` : ''}`;
        case 'USDT':
        case 'SOL':
          return `${currency.toLowerCase()}:${addr}${query ? `?${query}` : ''}`;
        default:
          return addr;
      }
    }

    case 'event': {
      const { title, location, startDate, endDate, description } = config.event;
      const formatDT = (dtStr: string) => {
        if (!dtStr) return '20261110T090000Z';
        const d = new Date(dtStr);
        return isNaN(d.getTime()) ? '20261110T090000Z' : d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
      };

      const lines = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'BEGIN:VEVENT',
        `SUMMARY:${title || 'Sự kiện Khoa học'}`,
        `LOCATION:${location || 'Hà Nội'}`,
        `DTSTART:${formatDT(startDate)}`,
        `DTEND:${formatDT(endDate || startDate)}`,
      ];
      if (description) lines.push(`DESCRIPTION:${description}`);
      lines.push('END:VEVENT');
      lines.push('END:VCALENDAR');
      return lines.join('\n');
    }

    default:
      return 'https://example.com';
  }
}
