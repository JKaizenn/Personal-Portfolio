// src/components/sections/HeroSection.jsx
import React from 'react';

function HeroSection() {
  return (
    <section id="hero" className="hero-section">
      <div className="container">
        <h1>Hello, I'm Jessen</h1>
        <h2>Frontend Developer & Designer</h2>
        <p>
          Building modern, responsive web applications with React, Vite, and passion.
        </p>
        <div className="hero-buttons">
          <a href="#about" className="button primary-button">
            Learn More
          </a>
          <a href="#contact" className="button secondary-button">
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;