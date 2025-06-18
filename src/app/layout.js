import { Lato } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: ["400","700"],
});


export const metadata = {
  title: "Adino Investment Limited",
  description: "We provide smart, diversified investment strategies tailored for sustainable growth",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${lato.variable} antialiased`}
      >
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
