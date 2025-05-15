import "@/app/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ClientBody from './ClientBody';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kenyan Radio | Find and Listen to Kenyan Radio Stations",
  description: "Discover and listen to Kenyan radio stations by genre, region, or browse all available stations. Get the latest radio schedules and now playing segments.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}
