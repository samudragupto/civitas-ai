"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { User, API_BASE } from "@/lib/api";
import { useRouter, usePathname } from "next/navigation";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
  setGuestMode: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const initAuth = async () => {
      const token = Cookies.get("civitas_access_token");
      const guestCookie = Cookies.get("civitas_guest_mode");

      if (token) {
        try {
          const res = await fetch(`${API_BASE}/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
          if (res.ok) {
            const data = await res.json();
            setUser({
              id: data.id,
              username: data.username,
              email: data.email,
              role: data.role || "registered",
            });
          } else {
            Cookies.remove("civitas_access_token");
            setUser(null);
          }
        } catch (err) {
          console.error("Auth verification failed", err);
          setUser(null);
        }
      } else if (guestCookie === "true") {
        setUser({
          id: 0,
          username: "Guest Explorer",
          email: "guest@civitasai.org",
          role: "guest",
        });
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = (token: string, userData: User) => {
    Cookies.set("civitas_access_token", token, { expires: 7 });
    Cookies.remove("civitas_guest_mode");
    setUser(userData);
    router.push("/dashboard");
  };

  const logout = () => {
    Cookies.remove("civitas_access_token");
    Cookies.remove("civitas_guest_mode");
    setUser(null);
    router.push("/auth/login");
  };

  const setGuestMode = () => {
    Cookies.set("civitas_guest_mode", "true", { expires: 1 });
    const guestUser: User = {
      id: 0,
      username: "Guest Explorer",
      email: "guest@civitasai.org",
      role: "guest",
    };
    setUser(guestUser);
    router.push("/dashboard");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user && user.role !== "guest",
        isLoading,
        login,
        logout,
        setGuestMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
