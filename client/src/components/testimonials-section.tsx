export default function TestimonialsSection() {
  const testimonials = [
    {
      content: "The construction process was incredibly fast and efficient. Our dream home was completed in just 25 days, and the quality exceeded our expectations. The energy savings are remarkable!",
      name: "Maria & Carlos Rodriguez",
      location: "Madrid, Spain"
    },
    {
      content: "InstaCasa delivered exactly what they promised. The eco-friendly materials and modern design perfectly match our lifestyle. We love our new home!",
      name: "Johann & Lisa Schmidt", 
      location: "Munich, Germany"
    },
    {
      content: "Professional service from start to finish. The team handled everything while we didn't need to be present. The final result is a beautiful, energy-efficient home.",
      name: "Pierre & Sophie Dubois",
      location: "Lyon, France"
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-padding">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real experiences from satisfied InstaCasa homeowners
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-8 relative">
              <div className="text-4xl text-primary mb-4">&ldquo;</div>
              <p className="text-gray-600 mb-6">{testimonial.content}</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
