import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CookieConsent from "../components/CookieConsent";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#F4F5F2] text-[#2A2F2D] selection:bg-[#D6DCD5] selection:text-[#2A2F2D] font-sans antialiased">
      <Navbar />
      <div className="flex-1">
        {children}
      </div>
      <Footer />
      <CookieConsent />
    </div>
  );
}
