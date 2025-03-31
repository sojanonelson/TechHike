import React from 'react';
import { Globe, Smartphone, Cloud, Brain } from 'lucide-react';

const Services = () => {
  const services = [
    {
      title: "Web Development",
      description: "Custom web applications built with modern technologies",
      icon: Globe
    },
    {
      title: "Mobile Development",
      description: "Native and cross-platform mobile applications",
      icon: Smartphone
    },
    {
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure and deployment",
      icon: Cloud
    },
    {
      title: "AI & Machine Learning",
      description: "Intelligent solutions for business automation",
      icon: Brain
    }
  ];

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md group hover:shadow-xl transition-all duration-300 hover:bg-blue-50 relative overflow-hidden transform hover:-translate-y-1"
              >
                <div className="absolute w-2 h-0 bg-blue-500 top-0 left-0 group-hover:h-full transition-all duration-300"></div>
                <div className="relative z-10">
                  <div className="text-gray-700 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                    <IconComponent size={36} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-700 transition-colors duration-300">{service.title}</h3>
                  <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">{service.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Services;