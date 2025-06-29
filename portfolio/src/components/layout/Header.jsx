// src/components/layout/Header.jsx
import React from 'react';
import DarkModeToggle from './DarkModeToggle';
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
          <button 
            onClick={() => scrollToSection('hero')}
            className="logo-button"
          >
            <h3>Jessen</h3>
          </button>
        </div>
        
        <nav className="navigation">
          <ul className="nav-list">
            <li>
              <button 
                onClick={() => scrollToSection('hero')}
                className="nav-link"
                aria-label="Go to home section"
              >
                Home
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('about')}
                className="nav-link"
                aria-label="Go to about section"
              >
                About
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('projects')}
                className="nav-link"
                aria-label="Go to projects section"
              >
                Projects
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('resume')}
                className="nav-link"
                aria-label="Go to resume section"
              >
                Resume
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('contact')}
                className="nav-link"
                aria-label="Go to contact section"
              >
                Contact
              </button>
            </li>
          </ul>
        </nav>
        
        <DarkModeToggle />
      </div>
    </header>
  );
}

export default Header;