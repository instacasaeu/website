import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import ModelsGallery from "@/components/models-gallery";
import AboutSection from "@/components/about-section";
import ConstructionSection from "@/components/construction-section";
import TestimonialsSection from "@/components/testimonials-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import QuoteModal from "@/components/quote-modal";
import { useState } from "react";

export default function Home() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navigation onOpenQuote={() => setIsQuoteModalOpen(true)} />
      <HeroSection onOpenQuote={() => setIsQuoteModalOpen(true)} />
      <FeaturesSection />
      <ModelsGallery />
      <AboutSection onOpenQuote={() => setIsQuoteModalOpen(true)} />
      <ConstructionSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
      <QuoteModal 
        isOpen={isQuoteModalOpen} 
        onClose={() => setIsQuoteModalOpen(false)} 
      />
    </div>
  );
}
