export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(amount);
}

export function generateWhatsAppLink(phone: string, text: string): string {
  const cleanPhone = phone.replace(/\D/g, '');
  const internationalPhone = cleanPhone.startsWith('57') ? cleanPhone : `57${cleanPhone}`;
  return `https://wa.me/${internationalPhone}?text=${encodeURIComponent(text)}`;
}

export const OFFICIAL_WHATSAPP = '573103586278';
export const OFFICIAL_PHONE_DISPLAY = '310 358 6278';
export const ADMIN_EMAIL = 'tatianasystems409@gmail.com';
export const ADMIN_PASS = 'TatianaRural#2026!System';
