export interface LogoPresetItem {
  id: string;
  name: string;
  category: 'social' | 'tech' | 'general' | 'crypto';
  svgDataUri: string;
}

// Clean vector SVG data URIs for popular logos
export const PRESET_LOGOS: LogoPresetItem[] = [
  {
    id: 'globe',
    name: 'Website / Link',
    category: 'general',
    svgDataUri: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%232563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>',
  },
  {
    id: 'wifi',
    name: 'Wi-Fi Network',
    category: 'tech',
    svgDataUri: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%2310b981" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>',
  },
  {
    id: 'mail',
    name: 'Email Contact',
    category: 'general',
    svgDataUri: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%23ea580c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
  },
  {
    id: 'phone',
    name: 'Phone Call',
    category: 'general',
    svgDataUri: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%2316a34a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    category: 'social',
    svgDataUri: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%231877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    category: 'social',
    svgDataUri: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23FF0000"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
  },
  {
    id: 'twitter',
    name: 'X (Twitter)',
    category: 'social',
    svgDataUri: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23000000"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    category: 'social',
    svgDataUri: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%23E1306C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>',
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    category: 'social',
    svgDataUri: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%2325D366"><path d="M12.01 0C5.38 0 .01 5.37.01 12c0 2.12.55 4.19 1.6 6.01L0 24l6.19-1.62C8 23.44 10 24 12.01 24 18.64 24 24 18.63 24 12s-5.36-12-11.99-12zm6.98 17.06c-.29.82-1.44 1.55-2.01 1.6-.54.05-1.22.07-3.95-1.02-3.48-1.4-5.74-4.88-5.91-5.11-.17-.23-1.42-1.89-1.42-3.6 0-1.72.9-2.56 1.22-2.91.32-.35.7-.44.93-.44.23 0 .47 0 .67.01.21.01.5.08.77.72.29.7.99 2.41 1.08 2.58.09.18.15.39.03.62-.12.24-.18.38-.35.58-.18.2-.37.45-.53.6-.18.18-.37.37-.16.73.21.36.93 1.53 1.99 2.48 1.37 1.22 2.52 1.6 2.88 1.78.36.18.57.15.78-.09.21-.24.9-1.05 1.14-1.41.24-.36.48-.3.8-.18.33.12 2.07.98 2.42 1.16.36.18.59.27.68.42.09.15.09.87-.2 1.69z"/></svg>',
  },
  {
    id: 'telegram',
    name: 'Telegram',
    category: 'social',
    svgDataUri: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%2326A5E4"><path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.56 8.16l-1.92 9.06c-.14.65-.53.81-1.08.5l-2.96-2.18-1.43 1.38c-.16.16-.29.29-.6.29l.21-3.03 5.51-4.98c.24-.21-.05-.33-.37-.12l-6.81 4.29-2.94-.92c-.64-.2-.65-.64.13-.95l11.48-4.43c.53-.19.99.13.82.88z"/></svg>',
  },
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    category: 'crypto',
    svgDataUri: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23F7931A"><path d="M12 0a12 12 0 1 0 12 12A12.013 12.013 0 0 0 12 0zm3.33 8.35c.67.5 1.05 1.23 1.02 2.08-.04.99-.54 1.76-1.39 2.15 1.14.36 1.77 1.31 1.62 2.44-.2 1.48-1.42 2.37-3.13 2.48l-.4.02v2.48h-1.6v-2.43c-.42 0-.85-.02-1.28-.04v2.47H8.57v-2.52c-.6-.05-1.1-.1-1.57-.15l-.01-1.8c.43.08.85.16 1.25.2.5.06.77-.1.84-.48l1.04-4.16.29-1.15c.07-.37-.09-.54-.48-.6-.35-.06-.72-.11-1.1-.18l.33-1.74c.48.05.98.09 1.49.15v-2.5h1.6v2.55c.42.02.84.03 1.26.04v-2.59h1.6v2.66c1.17.15 2.21.6 2.71 1.54zm-3.8 6.55c1.07 0 1.92-.37 2-1.21.08-.88-.7-1.27-1.85-1.29l-1.35.03-.6 2.46c.55 0 1.15.01 1.8.01zm.55-4.22c.98 0 1.7-.35 1.77-1.13.07-.79-.6-1.13-1.63-1.15l-1.27.02-.53 2.23c.53.02 1.07.03 1.66.03z"/></svg>',
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    category: 'crypto',
    svgDataUri: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23627EEA"><path d="M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0zm.01 3.5l5.24 8.68-5.24 2.39-5.24-2.39zm0 12.18l5.24-3.08-5.24 7.4-5.24-7.4z"/></svg>',
  },
  {
    id: 'map-pin',
    name: 'Location Pin',
    category: 'general',
    svgDataUri: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%23dc2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>',
  },
  {
    id: 'shopping-cart',
    name: 'Store / Cart',
    category: 'general',
    svgDataUri: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%237c3aed" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>',
  },
  {
    id: 'shield-check',
    name: 'Security Shield',
    category: 'tech',
    svgDataUri: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%23059669" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>',
  },
];
