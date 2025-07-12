import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertQuoteRequestSchema, InsertQuoteRequest } from "@shared/schema";
import { Phone, Mail, MapPin, Clock, Check, NotebookPen } from "lucide-react";

export default function ContactSection() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<InsertQuoteRequest>({
    resolver: zodResolver(insertQuoteRequestSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      location: "",
      homeSize: "",
      details: ""
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertQuoteRequest) => {
      return await apiRequest("POST", "/api/quote-requests", data);
    },
    onSuccess: () => {
      setIsSubmitted(true);
      form.reset();
      toast({
        title: "Quote Request Sent!",
        description: "We'll respond within 24 hours with your personalized quote.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send quote request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertQuoteRequest) => {
    mutation.mutate(data);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      value: "+385 91 26 5555 2",
      href: "tel:+385912655552"
    },
    {
      icon: Mail,
      title: "Email", 
      value: "info@instacasa.eu",
      href: "mailto:info@instacasa.eu"
    },
    {
      icon: MapPin,
      title: "Office",
      value: "Zagreb, Croatia"
    },
    {
      icon: Clock,
      title: "Business Hours",
      value: "Mon - Fri: 8:00 - 18:00"
    }
  ];

  const benefits = [
    "15+ years of experience",
    "Eco-friendly construction", 
    "Fast 15-30 day completion",
    "60% energy savings",
    "Professional project management"
  ];

  return (
    <section id="contact" className="section-padding bg-gray-900 text-white">
      <div className="container-padding">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get Your Free Quote Today
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to start building your dream home? Contact us for a personalized quote and consultation
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            <div className="space-y-6 mb-8">
              {contactInfo.map((info) => {
                const IconComponent = info.icon;
                return (
                  <div key={info.title} className="flex items-center">
                    <div className="bg-primary w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                      <IconComponent className="text-white h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-semibold">{info.title}</div>
                      {info.href ? (
                        <a href={info.href} className="text-gray-300 hover:text-white transition-colors">
                          {info.value}
                        </a>
                      ) : (
                        <div className="text-gray-300">{info.value}</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="bg-gray-800 rounded-lg p-6">
              <h4 className="font-semibold mb-2">Why Choose InstaCasa?</h4>
              <ul className="text-gray-300 space-y-2">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center">
                    <Check className="text-secondary mr-2 h-4 w-4" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div>
            {isSubmitted ? (
              <div className="bg-white rounded-xl p-8 text-gray-900 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="text-green-600 h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h3>
                <p className="text-gray-600 mb-6">
                  Your quote request has been received. Our team will review your requirements and 
                  respond within 24 hours with a personalized quote.
                </p>
                <Button 
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                >
                  Send Another Request
                </Button>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white rounded-xl p-8 text-gray-900">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Request Your Quote</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name *</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name *</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="mb-6">
                        <FormLabel>Email *</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="mb-6">
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input type="tel" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem className="mb-6">
                        <FormLabel>Project Location</FormLabel>
                        <FormControl>
                          <Input placeholder="City, Country" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="homeSize"
                    render={({ field }) => (
                      <FormItem className="mb-6">
                        <FormLabel>Home Size (m²)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="e.g. 120" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="details"
                    render={({ field }) => (
                      <FormItem className="mb-6">
                        <FormLabel>Project Details</FormLabel>
                        <FormControl>
                          <Textarea 
                            rows={4}
                            placeholder="Tell us about your project requirements, timeline, and any specific needs..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-accent hover:bg-accent/90"
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? (
                      "Sending..."
                    ) : (
                      <>
                        <NotebookPen className="mr-2 h-4 w-4" />
                        Send Quote Request
                      </>
                    )}
                  </Button>
                  
                  <p className="text-sm text-gray-500 mt-4 text-center">
                    * Required fields. We'll respond within 24 hours.
                  </p>
                </form>
              </Form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
