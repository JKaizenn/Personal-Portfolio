// src/components/sections/ResumeSection.jsx
import React, { useState } from 'react';

function ResumeSection() {
  const [showFullPdf, setShowFullPdf] = useState(false);
  const [pdfError, setPdfError] = useState(false);

  const handlePdfError = () => {
    setPdfError(true);
  };

  const togglePdfView = () => {
    setShowFullPdf(!showFullPdf);
  };

  return (
    <section id="resume" className="resume-section">
      <div className="container">
        <div className="section-content">
          <h2 className="section-title">Resume</h2>
          <p className="section-subtitle">
            Take a look at my professional experience, skills, and background.
          </p>
          
          <div className="resume-content">
            {/* Action Buttons */}
            <div className="resume-actions">
              <a 
                href="/resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="resume-button view-button"
              >
                <span className="button-icon">👁️</span>
                View Full Resume
              </a>
              <a 
                href="/resume.pdf" 
                download="Jessen_Resume.pdf"
                className="resume-button download-button"
              >
                <span className="button-icon">⬇️</span>
                Download PDF
              </a>
              <button 
                onClick={togglePdfView}
                className="resume-button toggle-button"
              >
                <span className="button-icon">
                  {showFullPdf ? '🔼' : '🔽'}
                </span>
                {showFullPdf ? 'Hide Preview' : 'Show Preview'}
              </button>
            </div>

            {/* PDF Preview Container */}
            <div className="resume-preview-container">
              {!showFullPdf ? (
                // Thumbnail Preview
                <div className="resume-thumbnail" onClick={togglePdfView}>
                  <div className="thumbnail-overlay">
                    <div className="thumbnail-content">
                      <div className="thumbnail-icon">📄</div>
                      <h3>Resume Preview</h3>
                      <p>Click to expand or use buttons above to view/download</p>
                      <div className="thumbnail-hint">
                        <span className="expand-icon">🔍</span>
                        Click to preview
                      </div>
                    </div>
                  </div>
                  
                  {/* Actual PDF Thumbnail (first page only) */}
                  <iframe
                    src="/resume.pdf#page=1&view=Fit&toolbar=0&navpanes=0&scrollbar=0"
                    title="Resume Thumbnail"
                    className="resume-thumbnail-frame"
                    onError={handlePdfError}
                  />
                </div>
              ) : (
                // Full PDF Viewer
                <div className="resume-viewer-full">
                  <div className="pdf-viewer-header">
                    <h3>Resume Preview</h3>
                    <div className="pdf-controls">
                      <a 
                        href="/resume.pdf" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="pdf-control-btn"
                        title="Open in new tab"
                      >
                        🔗
                      </a>
                      <button 
                        onClick={togglePdfView}
                        className="pdf-control-btn"
                        title="Close preview"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                  
                  <div className="pdf-viewer-container">
                    {!pdfError ? (
                      <iframe
                        src="/resume.pdf#toolbar=1&navpanes=1&scrollbar=1"
                        title="Jessen Resume"
                        className="resume-iframe-full"
                        onError={handlePdfError}
                      />
                    ) : (
                      <div className="pdf-fallback">
                        <div className="fallback-content">
                          <div className="fallback-icon">📄</div>
                          <h3>PDF Preview Unavailable</h3>
                          <p>Your browser doesn't support PDF viewing.</p>
                          <div className="fallback-actions">
                            <a 
                              href="/resume.pdf" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="button button-primary"
                            >
                              Open PDF in New Tab
                            </a>
                            <a 
                              href="/resume.pdf" 
                              download="Jessen_Resume.pdf"
                              className="button button-secondary"
                            >
                              Download PDF
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Resume Highlights */}
            <div className="resume-highlights">
              <h3>Quick Highlights</h3>
              <div className="highlights-grid">
                <div className="highlight-item">
                  <div className="highlight-icon">💼</div>
                  <h4>Experience</h4>
                  <p>Frontend Development & Design</p>
                </div>
                <div className="highlight-item">
                  <div className="highlight-icon">🛠️</div>
                  <h4>Skills</h4>
                  <p>React, JavaScript, CSS, Vite</p>
                </div>
                <div className="highlight-item">
                  <div className="highlight-icon">🎓</div>
                  <h4>Education</h4>
                  <p>Continuous Learning & Growth</p>
                </div>
                <div className="highlight-item">
                  <div className="highlight-icon">🚀</div>
                  <h4>Projects</h4>
                  <p>Portfolio & Web Applications</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResumeSection;