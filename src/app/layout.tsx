import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BackgroundCanvas from "@/components/BackgroundCanvas";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfolio | AI & Future",
  description: "A futuristic portfolio showcasing my work.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BackgroundCanvas />
        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}
