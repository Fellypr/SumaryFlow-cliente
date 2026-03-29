"use client";

import { authServices } from "../services/AuthService";
import { parseApiError } from "../errors/apiError";
import { useState } from "react";
import { setCookie } from "nookies";
import { AUTH_TOKEN_COOKIE_KEY } from "@/app/utils/authToken";
import { useRouter } from 'next/navigation';
import toast from "react-hot-toast";
export const UseAuth = () => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();




  async function AuthenticateUser(e:React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
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
        toast.success(user.message)
        router.push(
            "/sumary"
        )
        return user
    } catch(err){
        const msgError = parseApiError(err);
        setError(msgError.message)
    } finally {
        setLoading(false)
    }
  }
  return {
    userName,
    setUserName,
    password,
    setPassword,
    rememberMe,
    setRememberMe,
    error,
    loading,
    AuthenticateUser,
  };
};
