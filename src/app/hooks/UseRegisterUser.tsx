"use client";
import { useState } from "react";
import { authServices } from "../services/AuthService";
import { parseApiError } from "../errors/apiError";
import { useRouter } from "next/navigation";
import { setCookie } from "nookies";


export const useRegisterUser = () => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setsuccess] = useState<string | null>(null);
  const router = useRouter();

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    if (!userName.trim() || !password) {
      setError("Preencha usuário e senha.");
      return null;
    }

    if (password !== confirmPassword) {
      setError("As senhas não conferem.");
      return null;
    }
    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    setIsLoading(true);
    try {
      const user = await authServices.registerUser({ userName, password });
      setCookie(undefined, "auth.token", user.token, {
        maxAge: 60 * 60 * 2,
        path: "/",
      });
      setsuccess(user.message);
      await sleep(4000)
      router.push("/sumary");
      return user;
    } catch (err: unknown) {
      const msgError = parseApiError(err)
      setError(msgError.message)
    } finally {
      setIsLoading(false);
    }
  };

  return {
    userName,
    setUserName,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    handleRegister,
    isLoading,
    error,
    success,
  };
};


