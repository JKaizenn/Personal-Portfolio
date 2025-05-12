// src/components/sections/HeroSection.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/HeroSection.css';

function HeroSection() {
  // State to manage the typing effect
  const [displayText, setDisplayText] = useState('');
  const fullText = "Frontend Developer & Designer";
  const [index, setIndex] = useState(0);

  // useEffect for typing animation
  useEffect(() => {
    if (index < fullText.length) {
      // Set a timeout to add the next character
      const timeoutId = setTimeout(() => {
        setDisplayText(displayText + fullText[index]);
        setIndex(index + 1);
      }, 100); // Adjust speed as needed
      
      // Clean up the timeout to prevent memory leaks
      return () => clearTimeout(timeoutId);
    }
  }, [displayText, index, fullText]);

  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            <span>Hello, I'm </span>
            <span className="highlight">Jake Forbush</span>
          </h1>
          
          <h2 className="hero-subtitle">
            {displayText}<span className="cursor">|</span>
          </h2>
          
          <p className="hero-description">
            Building modern, responsive web applications with React, Vite, and Supabase.
          </p>
          
          <div className="hero-buttons">
            <Link to="/projects" className="button primary-button">
              View My Work
            </Link>
            <Link to="/contact" className="button secondary-button">
              Get In Touch
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;