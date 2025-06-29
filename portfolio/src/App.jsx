// src/App.jsx
import React from 'react';
import Header from './components/layout/Header';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import ProjectsSection from './components/sections/ProjectsSection';
import ResumeSection from './components/sections/ResumeSection';
import ContactSection from './components/sections/ContactSection';
import './styles/globals.css';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ResumeSection />
        <ContactSection />
      </main>
    </div>
  );
}

export default App;