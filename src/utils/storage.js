export const setToken = (token) => {
  localStorage.setItem("authorization", token);
};

export const getToken = () => {
  return localStorage.getItem("authorization");
};

export const removeToken = () => {
  localStorage.removeItem("authorization");
};

/**
 * Reads cached data from localStorage with optional TTL check (in ms)
 * Safely handles parsing errors, quota limits, and corrupted payloads
 */
export const getLocalCache = (key, maxAgeMs = null) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;

    if (maxAgeMs && parsed.timestamp && Date.now() - parsed.timestamp > maxAgeMs) {
      return null;
    }

    return parsed.data !== undefined ? parsed.data : parsed;
  } catch (err) {
    console.warn(`[storage] Error reading cache key "${key}":`, err?.message);
    return null;
  }
};

/**
 * Saves data into localStorage wrapped with timestamp metadata
 */
export const setLocalCache = (key, data) => {
  try {
    const payload = {
      timestamp: Date.now(),
      data,
    };
    localStorage.setItem(key, JSON.stringify(payload));
  } catch (err) {
    console.warn(`[storage] Error saving cache key "${key}":`, err?.message);
  }
};

/**
 * Removes a specific cache key from localStorage
 */
export const removeLocalCache = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.warn(`[storage] Error clearing cache key "${key}":`, err?.message);
  }
};

