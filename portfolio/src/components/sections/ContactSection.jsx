// src/components/sections/ContactSection.jsx
import React from 'react';

function ContactSection() {
  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <h2>Contact Me</h2>
        <p>
          Feel free to reach out if you want to collaborate or just have a chat
          about web development!
        </p>
        
        <div className="contact-info">
          <div className="contact-item">
            <h3>Email</h3>
            <p>your.email@example.com</p>
          </div>
          
          <div className="contact-item">
            <h3>Location</h3>
            <p>Your City, State</p>
          </div>
          
          <div className="contact-item">
            <h3>Connect</h3>
            <div className="social-links">
              <a href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="#" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="#" target="_blank" rel="noopener noreferrer">Twitter</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;