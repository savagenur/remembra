import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthListener } from "@/stores/authListener";
import { UseRequireAuth } from "@/hooks/useRequireAuth";
import { PeopleSubscriber } from "@/stores/peopleSubscriber";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Remembra",
  description: "My new record people's data app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UseRequireAuth />
        <AuthListener />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
