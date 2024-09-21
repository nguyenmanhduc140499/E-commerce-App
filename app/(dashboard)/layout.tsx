"use client";

import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import LeftSideBar from "@/components/layout/LeftSideBar";
import "../globals.css";
import TopBar from "@/components/layout/TopBar";
import { ToasterProvider } from "@/lib/ToasterProvider";
import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apolloClient";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    document.title = "Nghien - Admin Dashboard";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Admin dashboard to manage Nghien data"
      );
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = "Admin dashboard to manage Nghien data";
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <ClerkProvider>
      <ApolloProvider client={client}>
        <html lang="en">
          <body className={inter.className}>
            <ToasterProvider />
            <div className="flex max-lg:flex-col text-grey-1">
              <LeftSideBar />
              <TopBar />
              <div className="flex-1">{children}</div>
            </div>
          </body>
        </html>
      </ApolloProvider>
    </ClerkProvider>
  );
}
