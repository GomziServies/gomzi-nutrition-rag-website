import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { getProfileApi } from "../api/auth.api";
import {
  AUTH_EVENT_NAME,
  getCachedUser,
  getToken,
  normalizeUser,
  removeToken,
  saveAuthSession,
  setCachedUser,
} from "../utils/storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Synchronous tick-0 initialization from local cache to prevent ANY flash of unauthenticated state
  const [user, setUser] = useState(() => getCachedUser());
  const [token, setTokenState] = useState(() => getToken());
  const [loading, setLoading] = useState(false);

  const profileRequest = useRef(null);
  const isAuthenticated = Boolean(token);

  // Background profile & cart synchronizer (non-blocking)
  const fetchProfile = useCallback(async (silent = false) => {
    const currentToken = getToken();

    if (!currentToken) {
      setUser(null);
      setTokenState(null);
      return;
    }

    if (profileRequest.current?.token === currentToken)
      return profileRequest.current.promise;
    if (!silent) setLoading(true);
    const promise = (async () => {
      try {
        const response = await getProfileApi();
        if (getToken() !== currentToken) return;
        const remoteUser = response?.data?.data?.user;

        if (remoteUser) {
          const normalized = normalizeUser(remoteUser);
          setUser(normalized);
          setCachedUser(normalized);
        }
      } catch (err) {
        console.error("Profile verification error:", err);
        // Only discard credentials if server explicitly returns 401 Unauthorized
        if (err?.response?.status === 401 && getToken() === currentToken) {
          removeToken();
          setUser(null);
          setTokenState(null);
        }
      } finally {
        if (profileRequest.current?.token === currentToken) {
          profileRequest.current = null;
          setLoading(false);
        }
      }
    })();
    profileRequest.current = { token: currentToken, promise };
    return promise;
  }, []);

  // Synchronous login action: updates state in 0ms tick and verifies in background
  const login = useCallback((newToken, userData) => {
    const normalized = saveAuthSession(newToken, userData);
    setTokenState(newToken);
    setUser(normalized);
  }, []);

  // Logout action: synchronously purges session storage and memory
  const logout = useCallback(() => {
    removeToken();
    setUser(null);
    setTokenState(null);
    window.location.href = "/";
  }, []);

  // Synchronize across tabs and immediate synthetic events
  useEffect(() => {
    const handleAuthChange = () => {
      const currentToken = getToken();
      const currentUser = getCachedUser();
      setTokenState(currentToken);
      setUser(currentUser);
    };

    window.addEventListener(AUTH_EVENT_NAME, handleAuthChange);
    window.addEventListener("storage", handleAuthChange);

    return () => {
      window.removeEventListener(AUTH_EVENT_NAME, handleAuthChange);
      window.removeEventListener("storage", handleAuthChange);
    };
  }, []);

  useEffect(() => {
    if (token) fetchProfile(true);
  }, [token, fetchProfile]);

  const value = useMemo(
    () => ({
      user,
      setUser,
      loading,
      logout,
      login,
      fetchProfile,
      isAuthenticated,
      token,
    }),
    [user, loading, logout, login, fetchProfile, isAuthenticated, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
