import settings from './website-settings.json';
import { useWebsiteContent } from './WebsiteContent';

export const DEFAULT_CONTACT = settings.contact;

const DEFAULT_WHATSAPP_MSG =
  "Hello Gomzi Nutrition! I am browsing your website and need some assistance with products / my order.";

export default function useContactDetails() {
  const { get } = useWebsiteContent();
  const contactSettings = get('website.contact', DEFAULT_CONTACT);
  const digits = (contactSettings.phone || '').replace(/\D/g, '');
  const baseWa = `https://wa.me/${digits}`;

  return {
    ...contactSettings,
    telephoneUrl: `tel:+${digits}`,
    whatsappUrl: baseWa,
    whatsappWithText: (text = DEFAULT_WHATSAPP_MSG) =>
      `${baseWa}?text=${encodeURIComponent(text)}`,
    emailUrl: `mailto:${contactSettings.email}`,
  };
}
