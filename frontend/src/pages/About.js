import React from "react";

const About = () => {
  const developers = [
    { name: "Anand", github: "https://github.com/dev1" },
    { name: "Sojan", github: "https://github.com/dev2" }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-32 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">About Us</h1>
        <p className="text-lg text-gray-300 mb-6 text-center">
          Our mission is to develop innovative and user-friendly web applications that 
          enhance productivity, collaboration, and user experience. We are a team of 
          passionate developers dedicated to creating high-quality solutions.
        </p>
        <h2 className="text-2xl font-semibold mb-4">Meet the Developers</h2>
        <ul className="space-y-4">
          {developers.map((dev, index) => (
            <li key={index} className="p-4 bg-gray-800 rounded-lg flex justify-between items-center">
              <span className="text-xl">{dev.name}</span>
              <a
                href={dev.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                GitHub Profile
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default About;