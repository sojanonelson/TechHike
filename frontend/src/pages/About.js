import React, { useState, useEffect } from "react";
import { GithubIcon, Mail, Globe, Code, Coffee, Heart, Award } from "lucide-react";
import { motion } from "framer-motion";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const About = () => {
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.general);
  const [developerImages, setDeveloperImages] = useState({});

  const developers = [
    {
      name: "Anand",
      role: "Software Developer",
      github: "https://github.com/anandhu-12-boo/",
      email: "anand@example.com",
      website: "https://anand.dev",
    },
    {
      name: "Sojan",
      role: "Software Developer",
      github: "https://github.com/sojanonelson",
      email: "sojan@example.com",
      website: "https://sojanthomas.com",
    },
  ];

  const companyValues = [
    {
      title: "Innovation",
      description: "Pushing boundaries with cutting-edge technology.",
      icon: <Code className="w-8 h-8 text-blue-500" />,
    },
    {
      title: "Quality",
      description: "Delivering robust, high-standard solutions.",
      icon: <Award className="w-8 h-8 text-blue-500" />,
    },
    {
      title: "Collaboration",
      description: "Teamwork drives our success.",
      icon: <Coffee className="w-8 h-8 text-blue-500" />,
    },
    {
      title: "User-Centered",
      description: "Designed with users at the heart.",
      icon: <Heart className="w-8 h-8 text-blue-500" />,
    },
  ];

  // Fetch GitHub profile images
  useEffect(() => {
    const fetchImages = async () => {
      const images = {};
      for (const dev of developers) {
        const username = dev.github.split('/').filter(Boolean).pop();
        try {
          const response = await fetch(`https://api.github.com/users/${username}`);
          const data = await response.json();
          images[dev.name] = data.avatar_url;
        } catch (error) {
          console.error(`Error fetching GitHub avatar for ${username}:`, error);
          images[dev.name] = null;
        }
      }
      setDeveloperImages(images);
    };
    fetchImages();
  }, []);

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    hover: {
      y: -10,
      boxShadow: theme === "dark" ? "0 15px 30px rgba(0, 0, 0, 0.4)" : "0 15px 30px rgba(0, 0, 0, 0.15)",
      transition: { duration: 0.3 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'} overflow-x-hidden`}>
      {/* Hero Section */}
      <motion.section
        className={`relative py-24 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <h1 className={`text-4xl sm:text-5xl font-extrabold mb-6 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-800'}`}>
            About Our Team
          </h1>
          <p className={`text-lg sm:text-xl ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-10 max-w-3xl mx-auto leading-relaxed`}>
            Crafting innovative, user-centric web solutions with passion and precision since our inception.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate('/services')}
              className={`${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white px-6 py-3 rounded-full font-semibold transition-all duration-300`}
            >
              Explore Services
            </button>
            <button
              onClick={() => navigate('/contact')}
              className={`${theme === 'dark' ? 'bg-transparent border-blue-500 text-blue-400 hover:bg-blue-900' : 'bg-transparent border-blue-600 text-blue-600 hover:bg-blue-50'} border-2 px-6 py-3 rounded-full font-semibold transition-all duration-300`}
            >
              Get in Touch
            </button>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-100 opacity-20 dark:opacity-10 pointer-events-none" />
      </motion.section>

      {/* Company Values */}
      <motion.section
        className={`py-20 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <h2 className={`text-3xl sm:text-4xl font-bold mb-12 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            What Drives Us
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, index) => (
              <motion.div
                key={index}
                className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border shadow-md hover:shadow-lg transition-all duration-300`}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">{value.icon}</div>
                  <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {value.title}
                  </h3>
                  
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Meet the Team - New Design */}
      <motion.section
        className={`py-20 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
          <motion.h2
            className={`text-4xl sm:text-5xl font-extrabold mb-6 text-center ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            Our Team
          </motion.h2>
          <motion.p
            className={`text-lg sm:text-xl ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            } mb-16 text-center max-w-3xl mx-auto leading-relaxed`}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            Meet the brilliant minds crafting exceptional digital solutions with creativity and expertise.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {developers.map((dev, index) => (
              <motion.div
                key={index}
                className={`${
                  theme === "dark" ? "bg-gray-800" : "bg-white"
                } rounded-3xl overflow-hidden border ${
                  theme === "dark" ? "border-gray-700" : "border-gray-200"
                } shadow-md`}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
              >
                <div className="relative pt-8 pb-12 px-6 flex flex-col items-center">
                 
                  <div
                    className={`absolute top-0 left-0 w-full h-32 ${
                      theme === "dark" ? "bg-gradient-to-b from-blue-900 to-gray-800" : "bg-white"
                    }`}
                  />
                  <div className="relative z-10 text-center">
                    <h3
                      className={`text-2xl font-semibold mb-2 ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {dev.name}
                    </h3>
                    <p
                      className={`text-base font-medium mb-4 ${
                        theme === "dark" ? "text-blue-400" : "text-blue-600"
                      }`}
                    >
                      {dev.role}
                    </p>
                    <p
                      className={`text-sm ${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      } mb-6 max-w-xs mx-auto`}
                    >
                      {dev.bio}
                    </p>
                    <div className="flex justify-center gap-6">
                      <a
                        href={dev.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${
                          theme === "dark"
                            ? "text-gray-400 hover:text-blue-400"
                            : "text-gray-600 hover:text-blue-600"
                        } transition-all duration-300 hover:scale-110`}
                      >
                        <GithubIcon size={24} />
                      </a>
                      <a
                        href={`mailto:${dev.email}`}
                        className={`${
                          theme === "dark"
                            ? "text-gray-400 hover:text-blue-400"
                            : "text-gray-600 hover:text-blue-600"
                        } transition-all duration-300 hover:scale-110`}
                      >
                        <Mail size={24} />
                      </a>
                      <a
                        href={dev.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${
                          theme === "dark"
                            ? "text-gray-400 hover:text-blue-400"
                            : "text-gray-600 hover:text-blue-600"
                        } transition-all duration-300 hover:scale-110`}
                      >
                        <Globe size={24} />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Contact CTA */}
      <motion.section
        className={`${theme === 'dark' ? 'bg-blue-900' : 'bg-blue-600'} py-20 px-6 text-white`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Let’s Collaborate</h2>
          <p className={`text-lg ${theme === 'dark' ? 'text-blue-300' : 'text-blue-100'} mb-8 max-w-2xl mx-auto`}>
            Ready to turn your ideas into reality? We’re excited to partner with you.
          </p>
          <button
            onClick={() => navigate('/contact')}
            className={`${theme === 'dark' ? 'bg-white text-blue-900 hover:bg-gray-100' : 'bg-white text-blue-600 hover:bg-blue-50'} px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg`}
          >
            Contact Us
          </button>
        </div>
      </motion.section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default About;