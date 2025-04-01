import React, { useState, useEffect } from "react";

const SideContactNavbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  
  // Contact information
  const email = "techhike@gmail.com";
  const whatsapp = "+91 8075920705";
  const phone = "+91 8075920705";
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  
  // Toggle navbar expansion
  const toggleNavbar = () => {
    setIsExpanded(!isExpanded);
  };

  // Determine collapse width based on screen size
  const collapseWidth = windowWidth < 640 ? "-200px" : "-240px";

  return (
    <div 
      className={`fixed top-1/2 -translate-y-1/2 z-50 flex transition-all duration-300 ease-in-out drop-shadow-xl`}
      style={{
        right: isExpanded ? "0" : collapseWidth,
      }}
    >
      {/* Advanced Toggle Button */}
      <div
        className="relative bg-blue-600 text-white p-4 sm:p-5 rounded-l-xl cursor-pointer flex flex-col items-center justify-center gap-6 shadow-lg transition-all duration-300 hover:bg-blue-700"
        onClick={toggleNavbar}
      >
        <div className="flex flex-col items-center justify-center">
          {/* Advanced Arrow Animation */}
          <div className="relative w-8 h-8 flex items-center justify-center overflow-hidden">
            <div className={`absolute transition-all duration-300 ${isExpanded ? 'opacity-0 translate-x-3' : 'opacity-100'}`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 5L8 12L15 19" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className={`absolute transition-all duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 -translate-x-3'}`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 5L16 12L9 19" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          
          <div className="w-full h-px bg-blue-400 my-4 opacity-70"></div>
          
          {/* Vertical Text with Rotation */}
          <span className="text-xs font-semibold tracking-widest writing-vertical-lr whitespace-nowrap">
            TECH
          </span>
        </div>
        
        {/* Pulse Effect Indicator */}
        <div className="absolute -top-2 -right-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"/>
          </span>
        </div>
      </div>

      {/* Contact Options */}
      <div
        className="bg-white w-60 sm:w-60 p-4 sm:p-5 rounded-r-xl flex flex-col gap-4"
      >
        <h3 className="m-0 mb-4 text-center text-gray-800 text-base sm:text-lg font-semibold">
          Contact Us
        </h3>
        
        {/* Email Option */}
        <a 
          href={`mailto:${email}`}
          className="group flex items-center p-3 sm:p-4 bg-gray-50 rounded-xl no-underline text-gray-800 gap-3 transition-all duration-300 ease-in-out border border-transparent hover:bg-white hover:translate-x-1 hover:border-gray-200 hover:shadow-sm"
        >
          {/* Email Icon with Animation */}
          <div className="transition-transform duration-300 group-hover:scale-110">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z" fill="#3a86ff"/>
            </svg>
          </div>
          <div>
            <div className="font-semibold text-xs sm:text-sm">Email</div>
            <div className="text-xs text-gray-600 mt-1">{email}</div>
          </div>
        </a>

        {/* WhatsApp Option */}
        <a 
          href={`https://wa.me/${whatsapp.replace(/\+|\s/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center p-3 sm:p-4 bg-gray-50 rounded-xl no-underline text-gray-800 gap-3 transition-all duration-300 ease-in-out border border-transparent hover:bg-white hover:translate-x-1 hover:border-gray-200 hover:shadow-sm"
        >
          {/* WhatsApp Icon with Animation */}
          <div className="transition-transform duration-300 group-hover:scale-110">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.05 4.91C17.18 3.03 14.69 2 12.04 2C6.5 2 2 6.5 2 12.05C2 13.75 2.45 15.38 3.29 16.83L2 22L7.3 20.73C8.69 21.5 10.35 21.91 12.04 21.91C17.58 21.91 22.08 17.41 22.08 11.86C22.08 9.2 21.04 6.73 19.05 4.91ZM12.04 20.15C10.57 20.15 9.12 19.76 7.85 19.03L7.55 18.86L4.43 19.59L5.18 16.56L4.99 16.24C4.18 14.93 3.76 13.41 3.76 11.86C3.76 7.47 7.45 3.77 12.04 3.77C14.24 3.77 16.31 4.63 17.87 6.2C19.43 7.77 20.29 9.83 20.29 12.04C20.29 16.44 16.63 20.15 12.04 20.15ZM16.56 13.99C16.31 13.86 15.09 13.26 14.87 13.17C14.64 13.09 14.48 13.05 14.31 13.29C14.14 13.54 13.67 14.09 13.53 14.26C13.4 14.42 13.26 14.45 13.01 14.32C11.33 13.47 10.22 12.78 9.11 10.9C8.87 10.49 9.32 10.52 9.75 9.66C9.83 9.49 9.79 9.35 9.73 9.22C9.67 9.09 9.24 7.87 9.03 7.37C8.83 6.89 8.62 6.96 8.48 6.95C8.35 6.94 8.19 6.94 8.02 6.94C7.85 6.94 7.59 7 7.36 7.24C7.14 7.49 6.49 8.09 6.49 9.31C6.49 10.53 7.37 11.7 7.49 11.87C7.62 12.04 9.23 14.54 11.71 15.61C13.13 16.22 13.68 16.28 14.38 16.18C14.8 16.12 15.78 15.59 15.99 15.01C16.2 14.43 16.2 13.93 16.14 13.84C16.09 13.73 15.92 13.67 15.67 13.55L16.56 13.99Z" fill="#25D366"/>
            </svg>
          </div>
          <div>
            <div className="font-semibold text-xs sm:text-sm">WhatsApp</div>
            <div className="text-xs text-gray-600 mt-1">{whatsapp}</div>
          </div>
        </a>

        {/* Call Option */}
        <a 
          href={`tel:${phone.replace(/\s/g, '')}`}
          className="group flex items-center p-3 sm:p-4 bg-gray-50 rounded-xl no-underline text-gray-800 gap-3 transition-all duration-300 ease-in-out border border-transparent hover:bg-white hover:translate-x-1 hover:border-gray-200 hover:shadow-sm"
        >
          {/* Phone Icon with Animation */}
          <div className="transition-transform duration-300 group-hover:scale-110">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.23 15.26L16.69 14.97C16.08 14.9 15.48 15.11 15.05 15.54L13.21 17.38C10.38 15.94 8.06 13.63 6.62 10.79L8.47 8.94C8.9 8.51 9.11 7.91 9.04 7.3L8.75 4.78C8.63 3.77 7.78 3.01 6.76 3.01H5.03C3.9 3.01 2.96 3.95 3.03 5.08C3.56 13.62 10.39 20.44 18.92 20.97C20.05 21.04 20.99 20.1 20.99 18.97V17.24C21 16.23 20.24 15.38 19.23 15.26Z" fill="#3a86ff"/>
            </svg>
          </div>
          <div>
            <div className="font-semibold text-xs sm:text-sm">Call Us</div>
            <div className="text-xs text-gray-600 mt-1">{phone}</div>
          </div>
        </a>
        
        {/* Quick Contact Banner - Visible on small screens only */}
        <div className="mt-4 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 p-3 text-white text-center hidden sm:block">
          <p className="text-xs mb-2 font-medium">Need immediate help?</p>
          <a 
            href={`tel:${phone.replace(/\s/g, '')}`}
            className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-3 py-1 rounded-md text-xs font-medium hover:bg-blue-50 transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.23 15.26L16.69 14.97C16.08 14.9 15.48 15.11 15.05 15.54L13.21 17.38C10.38 15.94 8.06 13.63 6.62 10.79L8.47 8.94C8.9 8.51 9.11 7.91 9.04 7.3L8.75 4.78C8.63 3.77 7.78 3.01 6.76 3.01H5.03C3.9 3.01 2.96 3.95 3.03 5.08C3.56 13.62 10.39 20.44 18.92 20.97C20.05 21.04 20.99 20.1 20.99 18.97V17.24C21 16.23 20.24 15.38 19.23 15.26Z" fill="#3a86ff"/>
            </svg>
            Call Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default SideContactNavbar;