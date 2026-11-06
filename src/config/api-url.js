const DEFAULT_LOCAL_API = "http://localhost:3005";

export function isLocalApiUrl(value = DEFAULT_LOCAL_API) {
  try {
    return ["localhost", "127.0.0.1", "[::1]"].includes(new URL(value || DEFAULT_LOCAL_API).hostname);
  } catch {
    return false;
  }
}

export function getApiBaseUrl(value) {
  const configured = value?.trim() || DEFAULT_LOCAL_API;
  // Vite forwards this to the host machine's API, including for LAN visitors.
  return isLocalApiUrl(configured) ? "/api" : configured.replace(/\/$/, "");
}
