import { Cinzel, Lora, Caudex, Domine, Literata } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout/ClientLayout";
import CustomToast from "@/components/CustomAlert/CustomToast";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cinzel",
  display: "swap",
});
const domine = Domine({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-domine",
  display: "swap",
});
const literata = Literata({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-literata",
  display: "swap",
});
const caudex = Caudex({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-caudex",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-lora",
  display: "swap",
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
        className={`${cinzel.variable} ${lora.variable} ${domine.variable} ${literata.variable} antialiased`}
      >
        <CustomToast />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
