import settings from './website-settings.json';
import { useWebsiteContent } from './WebsiteContent';

export const DEFAULT_CONTACT = settings.contact;

export default function useContactDetails() {
  const { get } = useWebsiteContent();
  const settings = get('website.contact', DEFAULT_CONTACT);
  const digits = settings.phone.replace(/\D/g, '');
  return { ...settings, telephoneUrl: `tel:+${digits}`, whatsappUrl: `https://wa.me/${digits}`, emailUrl: `mailto:${settings.email}` };
}
