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

// Secure SHA-256 hash of Tatiana's password - never stores plaintext in client bundle
const ADMIN_PASSWORD_HASH = '0f7321149cb1e75ed86900680d625b7219322ae8ff9dbd659b9f81494384ffa4';

export async function verifyAdminPassword(passwordAttempt: string): Promise<boolean> {
  if (!passwordAttempt) return false;
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(passwordAttempt);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex === ADMIN_PASSWORD_HASH;
  } catch {
    return false;
  }
}
