import { Button } from "@/components/ui/button";
import { Wrench, Users, Award, Palette } from "lucide-react";

interface AboutSectionProps {
  onOpenQuote: () => void;
}

export default function AboutSection({ onOpenQuote }: AboutSectionProps) {
  const features = [
    {
      icon: Wrench,
      title: "Factory Production",
      description: "All elements factory-made under controlled conditions",
      color: "text-secondary"
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Professional support throughout the project",
      color: "text-primary"
    },
    {
      icon: Award,
      title: "Quality Assured",
      description: "Constant supervision and monitoring",
      color: "text-yellow-600"
    },
    {
      icon: Palette,
      title: "Customizable",
      description: "Built according to your ideas and preferences",
      color: "text-purple-600"
    }
  ];

  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Your Partner for Prefabricated Buildings
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              InstaCasa specializes in the design, construction, and assembly of low-energy houses and buildings. 
              We build prefabricated single-storey houses, houses with attics, two-storey houses, commercial, 
              hospitality and tourist buildings.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Our advantages include fast construction, immediate habitability, modern materials and construction 
              technology, energy savings up to 60% compared to standard buildings, earthquake resistance, 
              fire resistance, and competitive pricing without compromising quality.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {features.map((feature) => {
                const IconComponent = feature.icon;
                return (
                  <div key={feature.title} className="flex items-start">
                    <div className={`bg-opacity-10 w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 bg-current`}>
                      <IconComponent className={`${feature.color} text-xl h-6 w-6`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-primary hover:bg-primary/90">
                Learn More About Us
              </Button>
              <Button 
                variant="outline" 
                onClick={onOpenQuote}
                className="border-primary text-primary hover:bg-primary hover:text-white"
              >
                Request Estimate
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
              alt="Happy family in modern home interior"
              className="rounded-xl shadow-2xl w-full h-auto"
            />
            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-6 max-w-xs">
              <div className="text-2xl font-bold text-primary mb-1">15+ Years</div>
              <div className="text-sm text-gray-600">Experience in prefabricated construction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
