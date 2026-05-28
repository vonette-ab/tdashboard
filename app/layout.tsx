
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FinSet – Analytics Dashboard",
  description: "Detailed overview of your financial situation",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
