import { Geist, Geist_Mono, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

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
  icons: {
    icon: "/careLinkLogo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${robotoMono.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-col min-h-screen">
          <header>
            <Navbar></Navbar>
          </header>
          <main className={`mt-16 lg:mt-20 px-2 sm:px-0 flex-grow`}>
            {children}
          </main>
          <footer>
            <Footer></Footer>
          </footer>
        </div>
      </body>
    </html>
  );
}
