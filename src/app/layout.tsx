import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AppProvider } from "../context/AppProvider";
import {
   CheckCircleIcon,
   CircleX

} from "lucide-react";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Summary Flow | Resumos Inteligentes de Videos do YouTube",
    template: "%s | Summary Flow",
  },
  description:
    "Transforme videos do YouTube em resumos claros, objetivos e rapidos com apoio de IA. Organize ideias, economize tempo e revise os pontos mais importantes em segundos.",
  applicationName: "Summary Flow",
  keywords: [
    "resumo de videos",
    "resumo de YouTube",
    "youtube summary",
    "inteligencia artificial",
    "resumo com IA",
    "sumarizador de videos",
    "produtividade",
    "estudo com IA",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Summary Flow | Resumos Inteligentes de Videos do YouTube",
    description:
      "Gere resumos inteligentes de videos do YouTube com rapidez, clareza e apoio de IA.",
    siteName: "Summary Flow",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Summary Flow | Resumos Inteligentes de Videos do YouTube",
    description:
      "Resuma videos do YouTube com IA e encontre rapidamente os pontos mais importantes.",
  },
  icons: {
    icon: "/img/logo/favicon.ico",
    apple: "/img/logo/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppProvider>
          {children}
          <Toaster 
          toasterId="menssageSuccess"
          position="top-right"
          reverseOrder={false}
           toastOptions={{
            duration: 5000,
            style: {
              background: "#363636",
              color: "#fff",
              minWidth: "200px"
            },
              className: "text-left flex items-center gap-2",
              icon: <CheckCircleIcon className="w-5 h-5 text-green-500" />,
          }}
          containerStyle={{
            top: "100px",
          }}
           />
           <Toaster 
          toasterId="menssageErro"
          position="top-right"
          reverseOrder={false}
           toastOptions={{
            duration: 3000,
            style: {
              background: "#363636",
              color: "#fff",
              minWidth: "200px"
            },
              className: "text-left flex items-center gap-2 z-10",
              icon: <CircleX className="w-5 h-5 text-red-500" />
          }}
          containerStyle={{
            top: "100px",
          }}
           />
        </AppProvider>
      </body>
    </html>
  );
}
