import React from 'react';
import { Globe, Smartphone, Cloud, Brain } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';


const Services = () => {
  const navigate = useNavigate();
  
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

  const handleSeeOurWork = () => {
    navigate('/work');
  };

  return (
    <div className="py-20 bg-gray-50">
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-4">
                Building Digital Solutions That <span className="text-blue-600">Drive Growth</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                We're a trusted software development partner for businesses worldwide. 
                Let us transform your ideas into powerful digital solutions.
              </p>
              <div className="flex space-x-4">
                <Link to="#contact" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
                  Get Started
                </Link>
                <button
                  onClick={handleSeeOurWork}
                  className="border border-gray-300 hover:border-blue-600 text-gray-700 font-bold py-3 px-6 rounded-lg transition duration-300" 
                >
                  See Our Work
                </button>
              </div>
            </div>
            <div className="md:w-1/2 mt-10 md:mt-0">
            <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                alt="Software Development" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>
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