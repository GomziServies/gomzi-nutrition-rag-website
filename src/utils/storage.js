const AUTH_TOKEN_KEY = "authorization";
const AUTH_USER_KEY = "auth_user";
export const AUTH_EVENT_NAME = "auth-session-sync";

/**
 * Normalizes user object to guarantee consistent properties across all API response shapes.
 */
export const normalizeUser = (user) => {
  if (!user || typeof user !== "object") return null;

  const firstName = (user.first_name || user.given_name || "").trim();
  const lastName = (user.last_name || user.family_name || "").trim();
  const combinedName = [firstName, lastName].filter(Boolean).join(" ");
  const fallbackName =
    user.name ||
    combinedName ||
    (user.email ? user.email.split("@")[0] : "") ||
    "User";

  const displayName = firstName || fallbackName.split(" ")[0] || "Account";

  return {
    ...user,
    first_name: firstName,
    last_name: lastName,
    name: fallbackName,
    displayName,
  };
};

export const dispatchAuthSync = (token = getToken(), user = getCachedUser()) => {
  if (typeof window === "undefined") return;
  try {
    window.dispatchEvent(
      new CustomEvent(AUTH_EVENT_NAME, {
        detail: { token, user },
      })
    );
  } catch {
    // fallback
  }
};

export const setToken = (token) => {
  try {
    if (token) {
      localStorage.setItem(AUTH_TOKEN_KEY, token);
    } else {
      localStorage.removeItem(AUTH_TOKEN_KEY);
    }
    dispatchAuthSync(token, getCachedUser());
  } catch (err) {
    console.error("setToken error:", err);
  }
};

export const getToken = () => {
  try {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  } catch {
    return null;
  }
};

export const setCachedUser = (user) => {
  try {
    if (user) {
      const normalized = normalizeUser(user);
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(normalized));
      return normalized;
    } else {
      localStorage.removeItem(AUTH_USER_KEY);
      return null;
    }
  } catch (err) {
    console.error("setCachedUser error:", err);
    return null;
  }
};

export const getCachedUser = () => {
  try {
    const raw = localStorage.getItem(AUTH_USER_KEY);
    if (!raw) return null;
    return normalizeUser(JSON.parse(raw));
  } catch {
    return null;
  }
};

export const saveAuthSession = (token, user) => {
  if (typeof token !== "string" || !token.trim()) {
    throw new Error("Sign-in did not return a valid session. Please try again.");
  }
  try {
    if (token) {
      localStorage.setItem(AUTH_TOKEN_KEY, token);
    }
    const normalized = setCachedUser(user || null);
    dispatchAuthSync(token, normalized);
    return normalized;
  } catch (err) {
    console.error("saveAuthSession error:", err);
    return null;
  }
};

export const removeToken = () => {
  try {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
  } catch (err) {
    console.error("removeToken error:", err);
  }
  dispatchAuthSync(null, null);
};

export const getLocalCache = (key, maxAgeMs = 1000 * 60 * 60 * 24) => {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && "timestamp" in parsed && "data" in parsed) {
      if (Date.now() - parsed.timestamp > maxAgeMs) {
        localStorage.removeItem(key);
        return null;
      }
      return parsed.data;
    }
    return parsed;
  } catch {
    return null;
  }
};

export const setLocalCache = (key, data) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify({ timestamp: Date.now(), data }));
  } catch {
    // quota exceeded or private browsing fallback
  }
};
