import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "./components/CustomCursor";
import { Analytics } from "@vercel/analytics/react"; 
// 👈 IMPORT THIS

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Comet Connect", 
  description: "Connect Without Limits. The ultimate context migration protocol.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white cursor-none overflow-x-hidden selection:bg-green-500 selection:text-black`}>
        <CustomCursor />
        {children}
       
        <Analytics /> {/* 👈 ADD THIS COMPONENT */}
      </body>
    </html>
  );
}