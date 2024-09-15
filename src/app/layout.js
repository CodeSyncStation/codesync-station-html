"use client";
import Aos from "aos";
import "aos/dist/aos.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import { useEffect } from "react";
import "../assets/css/style.min.css";

const inter = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  useEffect(() => {
    Aos.init({
      duration: 1000,
      mirror: true,
      once: false,
    });
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
