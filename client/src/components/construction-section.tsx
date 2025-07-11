import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

export default function ConstructionSection() {
  const steps = [
    {
      number: 1,
      title: "Wooden Frame Structure",
      description: "Production begins with fabrication of load-bearing wooden frame structure using premium quality timber"
    },
    {
      number: 2,
      title: "Advanced Insulation",
      description: "Space between vertical elements filled with high-performance insulation based on selected construction system"
    },
    {
      number: 3,
      title: "Load-Bearing Boards",
      description: "Wooden frame covered on both sides with load-bearing gypsum fiber boards for structural integrity"
    },
    {
      number: 4,
      title: "Quality Control",
      description: "Constant supervision and monitoring by experts ensure highest quality standards"
    }
  ];

  const benefits = [
    "Superior thermal performance",
    "Earthquake and fire resistant",
    "Environmentally friendly materials",
    "Long-lasting durability"
  ];

  return (
    <section id="construction" className="section-padding bg-gray-50">
      <div className="container-padding">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            About Our Construction System
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Advanced wooden frame technology with superior insulation and load-bearing capabilities
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
              alt="Sustainable building materials and construction process"
              className="rounded-xl shadow-lg w-full h-auto"
            />
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Wall Element Production Process
            </h3>
            <div className="space-y-6">
              {steps.map((step) => (
                <div key={step.number} className="flex items-start">
                  <div className="bg-primary bg-opacity-10 w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                    <span className="text-primary font-bold text-sm">{step.number}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">{step.title}</h4>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-6 bg-secondary bg-opacity-10 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Key Benefits</h4>
              <ul className="text-gray-600 space-y-1">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center">
                    <Check className="text-secondary mr-2 h-4 w-4" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
