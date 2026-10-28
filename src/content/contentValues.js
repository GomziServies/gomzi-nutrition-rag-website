const forbidden = new Set(['__proto__', 'constructor', 'prototype']);
export const isSafeLink = value => typeof value === 'string' && !/[\u0000-\u0020\\]/.test(value) && (/^\/(?!\/)/.test(value) || /^(https?:\/\/|mailto:|tel:|#)/i.test(value));
export const assetUrl = value => !value || /^(https?:\/\/|\/)/i.test(value) ? value : `https://files.fggroup.in/${value}`;

// Preserve source-only React icons while replacing the editable content around them.
export function mergeContent(value, fallback, field = '') {
  if (typeof value === 'string') {
    if (/(^href$|url$|^to$|^link$)/i.test(field) && !isSafeLink(value)) return fallback;
    if (/^(src|image|video|poster|logo)$/i.test(field)) return /^(javascript|data|vbscript):/i.test(value) || value.startsWith('//') || value.includes('\\') ? fallback : assetUrl(value);
    return value;
  }
  if (Array.isArray(value)) return value.map((item, index) => {
    const original = Array.isArray(fallback) ? fallback.find(candidate => candidate && item && typeof item === 'object' && candidate.id != null && candidate.id === item.id) ?? fallback[index] ?? fallback[0] : undefined;
    return mergeContent(item, original);
  });
  if (value && typeof value === 'object') {
    const result = fallback?.icon && !Object.hasOwn(value, 'icon') ? { icon: fallback.icon } : {};
    for (const [key, child] of Object.entries(value)) if (!forbidden.has(key)) result[key] = mergeContent(child, result[key], key);
    return result;
  }
  return value;
}

export function createContentReader(values = {}) {
  const cache = new Map();
  return (key, fallback) => {
    if (!Object.hasOwn(values, key)) return fallback;
    const saved = cache.get(key);
    if (saved?.fallback === fallback) return saved.value;
    const value = mergeContent(values[key], fallback);
    cache.set(key, { fallback, value });
    return value;
  };
}
