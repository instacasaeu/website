import { Clock, Leaf, Zap, Shield } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: Clock,
      title: "Fast Construction",
      description: "Complete construction in just 15-30 days with our efficient prefabricated system",
      color: "text-primary"
    },
    {
      icon: Leaf,
      title: "Eco-Friendly",
      description: "Built with sustainable materials and designed for minimal environmental impact",
      color: "text-secondary"
    },
    {
      icon: Zap,
      title: "Energy Efficient",
      description: "Save up to 60% on heating costs with our advanced insulation technology",
      color: "text-yellow-600"
    },
    {
      icon: Shield,
      title: "Durable & Safe",
      description: "Earthquake resistant, fire resistant, and built to withstand extreme weather",
      color: "text-purple-600"
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-padding">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose InstaCasa?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the future of home construction with our innovative prefabricated building solutions
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div key={feature.title} className="text-center group">
                <div className={`bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-opacity-20 transition-colors bg-current`}>
                  <IconComponent className={`${feature.color} text-2xl h-8 w-8`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
