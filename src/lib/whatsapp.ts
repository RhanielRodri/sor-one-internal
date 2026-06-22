export function createWhatsAppUrl(phone: string, message: string) {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export const SOR_WHATSAPP_NUMBER = "5527992812845";
export const SOR_WHATSAPP_MESSAGE =
  "Olá, vim pelo SOR ONE e quero falar sobre um projeto.";
export const SOR_WHATSAPP_URL = createWhatsAppUrl(
  SOR_WHATSAPP_NUMBER,
  SOR_WHATSAPP_MESSAGE,
);
