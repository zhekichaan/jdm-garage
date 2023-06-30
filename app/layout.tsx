import "./globals.css";
import { Montserrat } from "next/font/google";
import { Header } from "./Header";
import DropdownMenu from "./DropdownMenu";
import { Footer } from "./Footer";
import MobileMenu from "./MobileMenu";

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
        <Header />
        <DropdownMenu />
        <MobileMenu />
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
