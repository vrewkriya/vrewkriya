import Footer from "@/components/layout/Footer";
import ScrollUpOnMount from "@/components/ui/ScrollUpOnMount";
import ServicesCards from "./ServicesCards";

export const metadata = {
  title: "All Services | Vrew Kriya",
  description: "Explore our comprehensive suite of digital marketing and creative services designed to elevate your brand.",
};

export default function ServicesIndexPage() {
  return (
    <>
      <ScrollUpOnMount />
      <div className="bg-[#0a0a0a] min-h-screen font-sans relative overflow-hidden">
        {/* Subtle Background Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none z-0 opacity-10 mix-blend-overlay"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2670&auto=format&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <ServicesCards />
        
      </div>
      <Footer />
    </>
  );
}