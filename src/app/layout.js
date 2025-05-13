import { Geist, Geist_Mono, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CARE LINK - A Charity Foundation",
  description: "Donation-Charity-Non-Profit-Organization",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/svg+xml"
          href="careLinkLogo.png"
        />
      </head>
      <body
        className={`${robotoMono.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header>
          <Navbar></Navbar>
        </header>
        <main className="max-w-7xl mx-auto px-2">{children}</main>
        <footer></footer>
      </body>
    </html>
  );
}
