import { Button } from "@/components/ui/button";
import { Calculator, Home } from "lucide-react";

interface HeroSectionProps {
  onOpenQuote: () => void;
}

export default function HeroSection({ onOpenQuote }: HeroSectionProps) {
  const scrollToModels = () => {
    const element = document.getElementById("models");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2075&q=80')`
        }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-40" />
      
      <div className="relative z-10 container-padding text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in-up">
          Build Your Dream Home in{" "}
          <span className="text-yellow-400">15-30 Days</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up">
          Premium prefabricated homes with energy savings up to 60%. Modern, sustainable, and built to last.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up">
          <Button 
            onClick={onOpenQuote}
            size="lg"
            className="bg-accent text-white hover:bg-accent/90 transform hover:scale-105 transition-all"
          >
            <Calculator className="mr-2 h-5 w-5" />
            Get Free Quote
          </Button>
          <Button 
            onClick={scrollToModels}
            size="lg"
            variant="secondary"
            className="bg-white text-gray-900 hover:bg-gray-100"
          >
            <Home className="mr-2 h-5 w-5" />
            View Models
          </Button>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="glass-effect rounded-lg p-6">
            <div className="text-3xl font-bold text-yellow-400 mb-2">15-30</div>
            <div className="text-sm uppercase tracking-wide">Days Construction</div>
          </div>
          <div className="glass-effect rounded-lg p-6">
            <div className="text-3xl font-bold text-yellow-400 mb-2">60%</div>
            <div className="text-sm uppercase tracking-wide">Energy Savings</div>
          </div>
          <div className="glass-effect rounded-lg p-6">
            <div className="text-3xl font-bold text-yellow-400 mb-2">100%</div>
            <div className="text-sm uppercase tracking-wide">Eco-Friendly</div>
          </div>
        </div>
      </div>
    </section>
  );
}
