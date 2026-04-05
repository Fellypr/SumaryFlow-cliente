"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";
import { parseCookies, setCookie } from "nookies";
import { authServices } from "../app/services/AuthService";
import { parseApiError } from "../app/errors/apiError";
import { AUTH_TOKEN_COOKIE_KEY, getUserIdFromToken, isAuthTokenValid } from "../app/utils/authToken";
import { useRouter } from 'next/navigation';
import toast from "react-hot-toast";

interface AuthContextData {
  userName: string;
  setUserName: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  rememberMe: boolean;
  setRememberMe: (val: boolean) => void;
  error: string | null;
  loading: boolean;
  idUser: number | null;
  isAuthenticated: boolean;
  AuthenticateUser: (e: React.FormEvent) => Promise<any>;
}

export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [idUser, setIdUser] = useState<number | null>(null);

  const router = useRouter();

  useEffect(() => {
    const token = parseCookies()[AUTH_TOKEN_COOKIE_KEY];
    if (token && isAuthTokenValid(token)) {
      setIdUser(getUserIdFromToken(token));
    }
  }, []);

  async function AuthenticateUser(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const user = await authServices.loginUser({
        userName,
        password,
        rememberMe,
      });
      setCookie(undefined, AUTH_TOKEN_COOKIE_KEY, user.token, {
        maxAge: rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 2,
        path: "/",
      });
      toast.success(user.message, {
        toasterId: "menssageSuccess",
      });
      
      const newIdUser = getUserIdFromToken(user.token);
      setIdUser(newIdUser);
      
      router.push("/sumary");
      return user;
    } catch (err) {
      const msgError = parseApiError(err);
      toast.error(msgError.message, {
        toasterId: 'menssageErro'
      });
      setError(msgError.message);
    } finally {
      setLoading(false);
    }
  }

  const isAuthenticated = !!idUser;

  return (
    <AuthContext.Provider
      value={{
        userName,
        setUserName,
        password,
        setPassword,
        rememberMe,
        setRememberMe,
        error,
        loading,
        idUser,
        isAuthenticated,
        AuthenticateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
