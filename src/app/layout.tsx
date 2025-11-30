import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BackgroundCanvas from "@/components/BackgroundCanvas";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "tokkikim's portfolio",
  description: "Explore the futuristic portfolio of Tokkikim, a project builder specializing in AI and modern web technologies.",
  icons: {
    icon: [
      { url: '/images/logo/logo_black-removebg.png?v=2', href: '/images/logo/logo_black-removebg.png?v=2' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
        <BackgroundCanvas />
        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}
