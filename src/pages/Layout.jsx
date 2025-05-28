// src/pages/Layout.jsx
import { Outlet } from "react-router-dom";      // <-- import directly from react-router-dom
import ScrollToTop from "../components/ScrollToTop";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export const Layout = () => (
  <ScrollToTop>
    <Navbar />
    <main className="flex-grow-1">
      <Outlet />
    </main>
    <Footer />
  </ScrollToTop>
);
