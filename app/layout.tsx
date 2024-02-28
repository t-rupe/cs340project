import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Shell from "@/components/ApplicationShell";
import { ActiveLinkProvider } from "../app/contexts/ActiveLinkContext";
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NexaLibrium",
  description: "The LMS of the future.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ActiveLinkProvider>
          <Shell>{children}</Shell>

        </ActiveLinkProvider>
      <Toaster />
      </body>
    </html>
  );
}
