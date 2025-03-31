import React from 'react';

const Hero = () => {
  return (
    <div className="bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 py-20 md:py-32">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Innovative Solutions for Your Digital Success
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            We transform businesses through cutting-edge technology and expert solutions
          </p>
          <div className="space-x-4">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50">
              Get Started
            </button>
            <button className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;