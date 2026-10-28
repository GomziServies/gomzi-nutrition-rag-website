import { useWebsiteContent } from './WebsiteContent';
import settings from './website-settings.json';

export default function useBranding() {
  return useWebsiteContent().get('website.branding', settings.branding);
}
