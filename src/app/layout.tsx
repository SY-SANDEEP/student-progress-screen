import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Priya's Biology Progress",
  description: "Student progress screen for GCSE Biology"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
