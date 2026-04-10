"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UseAuth } from "./hooks/UseAuthUser";
import {
  clearAuthTokenCookie,
  isAuthTokenValid,
  AUTH_TOKEN_COOKIE_KEY,
} from "./utils/authToken";
import { parseCookies } from "nookies";
import LoadingAuth from "./components/loading/loadingAuthUser"

function PersonIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6 text-emerald-400"
    >
      <path
        fillRule="evenodd"
        d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function EnvelopeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5 text-gray-400 shrink-0"
    >
      <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
      <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5 text-gray-400 shrink-0"
    >
      <path
        fillRule="evenodd"
        d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5 text-gray-400 shrink-0"
    >
      <path d="M12 15.75a3.75 3.75 0 1 1 0-7.5 3.75 3.75 0 0 1 0 7.5Z" />
      <path
        fillRule="evenodd"
        d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5 text-gray-400 shrink-0"
    >
      <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.25 11.25 0 0 1 4.242-.827 11.25 11.25 0 0 1 10.675 8.803Z" />
      <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.243 4.243Z" />
      <path d="M6.75 12c0-.619.083-1.213.237-1.809L1.323 11.447a11.25 11.25 0 0 1 17.313-5.19l-1.257 1.256a8.64 8.64 0 0 0-.784.09 5.25 5.25 0 0 0-6.71 6.71 8.64 8.64 0 0 0 .09.784l-1.257 1.256a11.213 11.213 0 0 1-5.19.237A11.25 11.25 0 0 1 6.75 12Z" />
    </svg>
  );
}

export default function Home() {
  const {
    userName,
    setUserName,
    password,
    setPassword,
    rememberMe,
    setRememberMe,
    error,
    loading,
    AuthenticateUser,
  } = UseAuth();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const token = parseCookies()[AUTH_TOKEN_COOKIE_KEY];
    if (!token) return;
    if (!isAuthTokenValid(token)) {
      clearAuthTokenCookie();
      return;
    }
    router.replace("/sumary");
  }, [router]);

  return (
    <div className="min-h-screen  flex items-center justify-center p-4 ">
      <div className="w-full max-w-md bg-neutral-900/90 rounded-3xl p-8 shadow-xl">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-full border-2 border-emerald-400 flex items-center justify-center bg-neutral-900">
            <PersonIcon />
          </div>
        </div>

        <form className="space-y-6" onSubmit={AuthenticateUser}>
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              UserName
            </label>
            <div className="flex items-center gap-3 px-4 py-3 bg-neutral-800/80 rounded-xl border border-neutral-600 focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500">
              <EnvelopeIcon />
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none"
                placeholder="User1234"
              />
            </div>
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Password
            </label>
            <div className="flex items-center gap-3 px-4 py-3 bg-neutral-800/80 rounded-xl border border-neutral-600 focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500">
              <LockIcon />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-neutral-600 bg-neutral-800 text-emerald-400 focus:ring-emerald-400"
            />
            <label htmlFor="remember" className="text-white text-sm">
              Remember Me
            </label>
          </div>

          {loading ? (
            <button
              type="submit"
              disabled
              aria-busy="true"
              className="w-full py-1 px-1 bg-linear-to-r from-emerald-700 to-sky-800 text-white font-semibold rounded-xl transition-colors cursor-wait flex justify-center items-center shadow-lg shadow-emerald-950/40 opacity-90"
            >
              <LoadingAuth />
            </button>
          ) : (
            <button
              type="submit"
              className="w-full py-3 px-4 bg-linear-to-r from-sky-500 to-emerald-400 hover:from-sky-600 hover:to-emerald-500 text-white font-semibold rounded-xl transition-colors text-center inline-flex items-center justify-center cursor-pointer"
            >
              Sign up now
            </button>
          )}
        </form>

        <p className="text-gray-500 text-xs text-center mt-6">
          Need an account?{" "}
          <Link
            href="/register"
            className="text-emerald-300 hover:text-emerald-200"
          >
            Register
          </Link>
        </p>
      </div>
      
      
    </div>
  );
}
