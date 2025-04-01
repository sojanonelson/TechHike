import React from "react";
import { GithubIcon, Linkedin, Mail, Globe, Code, Coffee, Heart, User, Calendar, Award, FileText } from "lucide-react";
import Footer from "../components/footer";

const About = () => {
  const developers = [
    { 
      name: "Anand", 
      role: "Software Developer",
      bio: "Passionate about creating intuitive user interfaces and scalable backend systems. Expertise in React, Node.js, and cloud infrastructure.",
      github: "https://github.com/anandhu-12-boo/",
      linkedin: "https://linkedin.com/in/anand",
      email: "anand@example.com",
      website: "https://anand.dev",

    },
    { 
      name: "Sojan", 
      role: "Software Developer",
      bio: "Design-focused developer with an eye for creating beautiful and functional user experiences. Specializes in responsive design and animation.",
      github: "https://github.com/sojanonelson",
      linkedin: "https://linkedin.com/in/sojan",
      email: "sojan@example.com",
      website: "https://sojanthomas.com",

    }
  ];

  const companyValues = [
    {
      title: "Innovation",
      description: "We constantly explore new technologies and approaches to deliver cutting-edge solutions.",
      icon: <Code className="w-6 h-6 text-blue-600" />
    },
    {
      title: "Quality",
      description: "We're committed to delivering robust, well-tested code and exceptional user experiences.",
      icon: <Award className="w-6 h-6 text-blue-600" />
    },
    {
      title: "Collaboration",
      description: "We believe in the power of teamwork and open communication to achieve outstanding results.",
      icon: <Coffee className="w-6 h-6 text-blue-600" />
    },
    {
      title: "User-Centered",
      description: "We design and develop with real users in mind, focusing on solving genuine problems.",
      icon: <Heart className="w-6 h-6 text-blue-600" />
    }
  ];

  const milestones = [
    { year: "2020", event: "Company founded" },
    { year: "2021", event: "First major client project completed" },
    { year: "2022", event: "Team expanded to 5 members" },
    { year: "2023", event: "Launched our first SaaS product" },
    { year: "2024", event: "Reached 50+ successful projects" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <div className="bg-white py-20 border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-8">
          <h1 className="text-5xl font-bold mb-6 text-center text-blue-800">About Us</h1>
          <p className="text-xl text-gray-600 mb-8 text-center max-w-3xl mx-auto leading-relaxed">
            Our mission is to develop innovative and user-friendly web applications that 
            enhance productivity, collaboration, and user experience. We are a team of 
            passionate developers dedicated to creating high-quality solutions that make a difference.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition">Our Services</button>
            <button className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition">Contact Us</button>
          </div>
        </div>
      </div>

      {/* Company Values */}
      <div className="py-16 px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {companyValues.map((value, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    {value.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Meet the Team */}
      <div className="py-16 px-8 bg-gray-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Meet Our Team</h2>
          <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Our talented team brings together diverse skills and perspectives to create exceptional digital experiences.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
  {developers.map((dev, index) => (
    <div
      key={index}
      className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition w-80 h-60 flex flex-col"
    >
      <div className="bg-blue-600 h-12"></div>
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold mb-1">{dev.name}</h3>
          <p className="text-blue-600 font-medium mb-3">{dev.role}</p>
         
        </div>

        <div className="flex space-x-3 pt-4 border-t border-gray-100">
          <a href={dev.github} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition">
            <GithubIcon size={18} />
          </a>
          
          <a href={`mailto:${dev.email}`} className="text-gray-600 hover:text-blue-600 transition">
            <Mail size={18} />
          </a>
          <a href={dev.website} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition">
            <Globe size={18} />
          </a>
        </div>
      </div>
    </div>
  ))}
</div>

        </div>
      </div>

      {/* <div className="py-16 px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Journey</h2>
          
          <div className="relative">
          
            <div className="absolute left-4 lg:left-1/2 transform lg:-translate-x-1/2 h-full w-0.5 bg-blue-200"></div>
            
           
            {milestones.map((milestone, index) => (
              <div key={index} className={`flex mb-8 relative ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                <div className="hidden lg:block lg:w-1/2"></div>
                <div className="absolute left-4 lg:left-1/2 transform lg:-translate-x-1/2 -translate-y-1/4">
                  <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center shadow-md">
                    <Calendar size={16} className="text-white" />
                  </div>
                </div>
                <div className="ml-12 lg:ml-0 lg:w-1/2 lg:px-8">
                  <div className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-100">
                    <span className="font-bold text-blue-600">{milestone.year}</span>
                    <p className="text-gray-700">{milestone.event}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}

      {/* Contact CTA */}
      <div className="py-16 px-8 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Work With Us?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            We're always looking for new challenges and exciting projects. 
            Reach out to discuss how we can help bring your vision to life.
          </p>
          <button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-medium transition">
            Get in Touch
          </button>
        </div>
      </div>

      {/* Footer */}
    <Footer/>
    </div>
  );
};

export default About;