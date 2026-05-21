import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Finset",
  description: "Detailed Analysis of financial situation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: "#ffffff" }}>
        {children}
      </body>
    </html>
  );
}