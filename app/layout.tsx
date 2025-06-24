import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/src/components/header";
import { Provider } from "@/src/components/provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Тестовое здание",
  description: "тестовое, надеюсь на овтет",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${inter.variable}`}>
        <Header />
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
