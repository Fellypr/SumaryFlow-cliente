"use client";

import { ReactNode } from "react";
import { AuthProvider } from "./AuthContext";
import { SummaryProvider } from "./SummaryContext";

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <SummaryProvider>
        {children}
      </SummaryProvider>
    </AuthProvider>
  );
}
