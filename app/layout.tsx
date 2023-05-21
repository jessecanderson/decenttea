import { Session } from "inspector";
import { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import Navbar from "../components/navbar";

import "../styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "Next.js App Router",
    template: "%s | Next.js App Router",
  },
  description:
    "A playground to explore new Next.js App Router features such as nested layouts, instant loading states, streaming, and component level data fetching.",
};

// Root layout (app/layout.js)
// - Applies to all routes
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        {/* <Header /> */}
        <Navbar />
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
