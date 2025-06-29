// src/components/layout/Header.jsx
import React from 'react';
import '../../styles/Header.css';

function Header() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h3>Jessen</h3>
        </div>
        
        <nav className="navigation">
          <ul className="nav-list">
            <li>
              <button 
                onClick={() => scrollToSection('hero')}
                className="nav-link"
              >
                Home
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('about')}
                className="nav-link"
              >
                About
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('resume')}
                className="nav-link"
              >
                Resume
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('contact')}
                className="nav-link"
              >
                Contact
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;