import Footer from "@/Components/layout/Footer";
import NavbarComponent from "@/Components/layout/Navbar";
import Script from "next/script";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "CodeSync Station",
  description: "My App Description",
};
export default function LandingLayout({ children }) {
  return (
    <>
      <Toaster />
      <NavbarComponent />
      {children}
      <Footer />
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js"
        integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy"
        crossorigin="anonymous"
      ></Script>
    </>
  );
}
