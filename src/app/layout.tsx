import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import { Header } from "@/components/header";
import { StoreProvider } from "@/app/StoreProvider";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Impact Shop",
  description: "A modern e-commerce platform",
};

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <StoreProvider>
          <Header />
          <main className={inter.className}>{children}</main>
        </StoreProvider>
      </body>
    </html>
  );
}
