import type { Metadata, Viewport } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import { AppProvider } from "@/lib/store";
import Toast from "@/components/Toast";
import "./globals.css";
import "./screens.css";
import "./motion.css";

const sans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "CapitalEcho — Africa’s Business & Financial Intelligence Platform", template: "%s · CapitalEcho" },
  description: "CapitalEcho : l’actualité économique et financière africaine, organisée en neuf séries éditoriales.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <AppProvider>
          <div className="app">{children}</div>
          <Toast />
        </AppProvider>
      </body>
    </html>
  );
}
