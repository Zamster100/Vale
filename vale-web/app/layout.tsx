import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VALE – Compare Funeral Prices. Choose with Confidence.",
  description:
    "Find and compare funeral directors near you. See real prices upfront. No hidden fees.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased" style={{ background: '#F5F1E8' }}>
        {children}
      </body>
    </html>
  );
}
