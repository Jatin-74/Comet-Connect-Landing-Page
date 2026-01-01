import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";


import Footer from "./components/Footer";
import MatrixRain from "./components/MatrixRain";
import CustomCursor from "./components/CustomCursor";
import SystemBoot from "./components/SystemBoot"; 

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"], 
  variable: '--font-tech',
  weight: ['300', '400', '500', '600', '700']
});

const inter = Inter({ 
  subsets: ["latin"], 
  variable: '--font-body',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const metadata: Metadata = {
  title: "Suronex | System Active",
  description: "Enterprise security architecture.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${inter.variable} bg-black text-white antialiased overflow-x-hidden cursor-none`}>
        
        <SystemBoot />

        
        <CustomCursor />
        <MatrixRain />

        
        
        {children}
        <Footer />
      </body>
    </html>
  );
}