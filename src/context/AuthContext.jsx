import { createContext, useEffect, useState } from "react";
import { getProfileApi } from "../api/auth.api";
import { syncGuestCart } from "../utils/syncGuestCart";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("authorization");

      if (!token) {
        setUser(null);
        return;
      }

      const response = await getProfileApi();

      try {
        await syncGuestCart();
      } catch (err) {
        console.error("Guest cart sync failed:", err);
      }
      setUser(response.data.data.user);
    } catch {
      localStorage.removeItem("authorization");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("authorization");
    setUser(null);

    window.location.href = "/";
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        logout,
        fetchProfile,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
