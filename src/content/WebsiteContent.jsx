import { createContext, createElement, useContext, useEffect, useMemo, useState } from 'react';
import api from '../api/axios';
import { assetUrl, createContentReader, isSafeLink } from './contentValues';

const ContentContext = createContext({ get: createContentReader() });

export function WebsiteContentProvider({ children, initialValues = {} }) {
  const [values, setValues] = useState(initialValues);
  useEffect(() => {
    const controller = new AbortController();
    let busy = false;
    let lastVersion;
    const refresh = async () => {
      if (busy || document.visibilityState === 'hidden') return;
      busy = true;
      try {
        const response = await api.get('/public/v1/website-content', { signal: controller.signal });
        const content = response.data?.data;
        if (content && typeof content.values === 'object' && content.version !== lastVersion) {
          lastVersion = content.version;
          setValues(content.values);
        }
      } catch { /* Existing content remains available if the content API is offline. */ }
      finally { busy = false; }
    };
    refresh();
    const timer = window.setInterval(refresh, 60000);
    window.addEventListener('focus', refresh);
    document.addEventListener('visibilitychange', refresh);
    return () => {
      controller.abort();
      window.clearInterval(timer);
      window.removeEventListener('focus', refresh);
      document.removeEventListener('visibilitychange', refresh);
    };
  }, []);
  const content = useMemo(() => ({ get: createContentReader(values) }), [values]);
  const branding = content.get('website.branding', {});
  const theme = {};
  for (const [property, key] of Object.entries({ primary: 'primaryColor', hover: 'hoverColor', light: 'backgroundColor', text: 'textColor', border: 'borderColor' })) {
    if (/^#[a-f\d]{6}$/i.test(branding[key] || '')) theme[`--color-${property}`] = branding[key];
  }
  if (theme['--color-primary']) theme['--color-btn-dark'] = theme['--color-primary'];
  if (theme['--color-text']) theme['--color-text-black'] = theme['--color-text'];
  return <ContentContext.Provider value={content}><div style={{ display: 'contents', ...theme }}>{children}</div></ContentContext.Provider>;
}

export const useWebsiteContent = () => useContext(ContentContext);

export function CmsText({ contentKey, fallback }) {
  const { get } = useWebsiteContent();
  const value = get(contentKey, fallback);
  return typeof value === 'string' ? value : fallback;
}

export function CmsElement({ as, contentFields, contentVisibilityKey, ...props }) {
  const { get } = useWebsiteContent();
  if (contentVisibilityKey && get(contentVisibilityKey, true) === false) return null;
  const resolved = { ...props };
  for (const [attribute, key] of Object.entries(contentFields)) {
    const value = get(key, props[attribute]);
    if (typeof value !== 'string') continue;
    if (['href', 'to'].includes(attribute) && !isSafeLink(value)) continue;
    if (['src', 'poster', 'image'].includes(attribute)) {
      if (/^(javascript|data|vbscript):/i.test(value) || value.startsWith('//') || value.includes('\\')) continue;
      resolved[attribute] = assetUrl(value);
    } else resolved[attribute] = value;
  }
  return createElement(as, resolved);
}
