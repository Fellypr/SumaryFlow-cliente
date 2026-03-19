"use client";

import { authServices } from "../services/AuthService";
import { parseApiError } from "../errors/apiError";
import { useState } from "react";

import { useRouter } from 'next/navigation'

export const UseAuth = () => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setIsSuccess] = useState<string | null>(null);
  const router = useRouter();



  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  async function AuthenticateUser(e:React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
        const user = await authServices.loginUser({userName,password})
        setIsSuccess(user.message)
        await sleep(5000)
        router.push("/sumary")
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
    error,
    loading,
    success,
    AuthenticateUser,
  };
};
