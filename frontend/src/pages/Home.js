import React, { useState, useEffect } from "react";
import Footer from "../components/footer";
import Contact from "../components/contact";
import Services from "../components/service";
import CookieContent from "../components/cookies";
import SideContactNavbar from "../components/SideContactDialogue";

const Home = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Show scroll button when user scrolls down 
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    
    // Clean up 
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Function 
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  
  return (
    <div>
      <Services/>
      <Contact/>
      <SideContactNavbar/>
      <Footer/>
      <CookieContent/>
      
      {/* Advanced Scroll up button */}
      {showScrollButton && (
        <button
        className="animate-bounce"
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            backgroundColor: "blue",
            color: "white",
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            border: "none",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
            transition: "all 0.1s ease"
          }}
          aria-label="Scroll to top"
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "translateY(-5px)";
            e.currentTarget.style.boxShadow = "0 6px 15px rgba(0, 0, 0, 0.4)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.3)";
          }}
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            style={{
              transition: "all 0.3s ease"
            }}
          >
            <path 
              d="M12 5L12 19" 
              stroke="white" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M5 12L12 5L19 12" 
              stroke="white" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Home;