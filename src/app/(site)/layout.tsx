import React from "react";

import Head from "next/head";

import { Inter } from "next/font/google";
import "../globals.css";
import Nav from "../../../components/Nav";
import PageTransitionEffect from "../../../components/PageTransitionEffect";
import CookieConsent from "../../../components/CookieConsent";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mark Julien Hahn",
  description:
    "Graphic Design, Programming and Typography Studio, based in Berlin.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <body>
        <Nav />
        <PageTransitionEffect>{children}</PageTransitionEffect>
        <CookieConsent />
      </body>
    </html>
  );
}
