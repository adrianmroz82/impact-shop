import type { Metadata } from "next";
import localFont from "next/font/local";
import { ReactNode } from "react";
import { Header } from "@/components/header/header";
import { StoreProvider } from "@/app/StoreProvider";

import "./globals.css";

const satoshiFont = localFont({ src: "../../public/fonts/satoshi-light.otf" });

export const metadata: Metadata = {
  title: "Impact Shop",
  description: "A modern e-commerce platform",
};

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" suppressHydrationWarning className={`${satoshiFont.className}`}>
      <body>
        <StoreProvider>
          <Header />
          <main>{children}</main>
        </StoreProvider>
      </body>
    </html>
  );
}
