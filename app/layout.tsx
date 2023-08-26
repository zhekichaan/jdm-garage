import "./globals.css";
import { Montserrat } from "next/font/google";
import { Header } from "./Header";
import DropdownMenu from "./DropdownMenu";
import { Footer } from "./Footer";
import MobileMenu from "./MobileMenu";
import { Providers } from "@/redux/provider";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "JDM Garage",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
