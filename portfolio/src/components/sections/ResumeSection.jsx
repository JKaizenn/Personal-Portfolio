// src/components/sections/ResumeSection.jsx
import React from 'react';

function ResumeSection() {
  return (
    <section id="resume" className="resume-section">
      <div className="container">
        <h2>Resume</h2>
        
        <div className="resume-content">
          <div className="resume-actions">
            <a 
              href="/resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="resume-button view-button"
            >
              View Resume
            </a>
            <a 
              href="/resume.pdf" 
              download="Jake_Forbush_Resume.pdf"
              className="resume-button download-button"
            >
              Download Resume
            </a>
          </div>
          
          <div className="resume-viewer">
            <iframe
              src="/resume.pdf"
              title="Jake Forbush Resume"
              className="resume-iframe"
            >
              <p>
                Your browser doesn't support PDF viewing. 
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  Click here to view the resume
                </a>
              </p>
            </iframe>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResumeSection;