import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

interface NavigationProps {
  onOpenQuote: () => void;
}

export default function Navigation({ onOpenQuote }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  const navLinks = [
    { label: "Home", href: "home" },
    { label: "Models", href: "models" },
    { label: "About", href: "about" },
    { label: "Construction", href: "construction" },
    { label: "Contact", href: "contact" },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container-padding">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-primary">InstaCasa</h1>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link, index) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className={`px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${
                    index === 0 ? "text-gray-900" : "text-gray-600"
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <Button 
                onClick={onOpenQuote}
                className="bg-accent text-white hover:bg-accent/90"
              >
                Get Quote
              </Button>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-4 mt-8">
                  {navLinks.map((link) => (
                    <button
                      key={link.href}
                      onClick={() => scrollToSection(link.href)}
                      className="text-left py-2 text-lg font-medium text-gray-600 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </button>
                  ))}
                  <Button 
                    onClick={() => {
                      onOpenQuote();
                      setIsOpen(false);
                    }}
                    className="bg-accent text-white hover:bg-accent/90 mt-4"
                  >
                    Get Quote
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
