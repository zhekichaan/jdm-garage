import "./globals.css";
import { Montserrat } from "next/font/google";
import { Header } from "./Header";

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
        {children}
      </body>
    </html>
  );
}
