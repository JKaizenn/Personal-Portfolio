// src/components/sections/ResumeSection.jsx
import React, { useState, useEffect } from 'react';

function ResumeSection() {
  const [showFullPdf, setShowFullPdf] = useState(false);
  const [pdfError, setPdfError] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handlePdfError = () => {
    setPdfError(true);
  };

  const togglePdfView = () => {
    setIsTransitioning(true);
    
    // Add small delay for smooth transition
    setTimeout(() => {
      setShowFullPdf(!showFullPdf);
      setPdfError(false); // Reset error state when toggling
      setIsTransitioning(false);
    }, 150);
  };

  // Reset error state when component mounts
  useEffect(() => {
    setPdfError(false);
  }, []);

  // PDF URL with parameters to force PDF display
  const pdfUrl = `${window.location.origin}/resume.pdf`;
  const pdfEmbedUrl = `${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`;
  const pdfFullUrl = `${pdfUrl}#toolbar=1&navpanes=1&scrollbar=1&view=FitH`;

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
                href={pdfUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="resume-button view-button"
              >
                <span className="button-icon">👁️</span>
                View Full Resume
              </a>
              <a 
                href={pdfUrl} 
                download="Jessen_Resume.pdf"
                className="resume-button download-button"
              >
                <span className="button-icon">⬇️</span>
                Download PDF
              </a>
              <button 
                onClick={togglePdfView}
                className={`resume-button toggle-button ${isTransitioning ? 'transitioning' : ''}`}
                disabled={isTransitioning}
              >
                <span className="button-icon">
                  {isTransitioning ? '⏳' : (showFullPdf ? '🔼' : '🔽')}
                </span>
                {isTransitioning ? 'Loading...' : (showFullPdf ? 'Hide Preview' : 'Show Preview')}
              </button>
            </div>

            {/* PDF Preview Container with smooth transitions */}
            <div className={`resume-preview-container ${isTransitioning ? 'transitioning' : ''}`}>
              {!showFullPdf ? (
                // Thumbnail Preview
                <div className={`resume-thumbnail ${isTransitioning ? 'fade-out' : 'fade-in'}`} onClick={togglePdfView}>
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
                  
                  {/* PDF Thumbnail with error handling */}
                  {!pdfError ? (
                    <iframe
                      src={pdfEmbedUrl}
                      title="Resume Thumbnail"
                      className="resume-thumbnail-frame"
                      onError={handlePdfError}
                      onLoad={(e) => {
                        // Check if iframe loaded successfully
                        try {
                          const iframe = e.target;
                          // If iframe content is empty or shows error, fallback
                          if (!iframe.contentDocument && !iframe.contentWindow) {
                            handlePdfError();
                          }
                        } catch (error) {
                          handlePdfError();
                        }
                      }}
                    />
                  ) : (
                    // Fallback thumbnail
                    <div className="pdf-thumbnail-fallback">
                      <div className="fallback-thumbnail-content">
                        <div className="fallback-icon">📄</div>
                        <h3>Resume Preview</h3>
                        <p>PDF preview not available in this browser</p>
                        <div className="fallback-buttons">
                          <a 
                            href={pdfUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="button button-primary"
                          >
                            View PDF
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                // Full PDF Viewer
                <div className={`resume-viewer-full ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
                  <div className="pdf-viewer-header">
                    <h3>Resume Preview</h3>
                    <div className="pdf-controls">
                      <a 
                        href={pdfUrl} 
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
                        disabled={isTransitioning}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                  
                  <div className="pdf-viewer-container">
                    {!pdfError ? (
                      <iframe
                        key={showFullPdf ? 'full' : 'thumb'} // Force re-render
                        src={pdfFullUrl}
                        title="Jessen Resume"
                        className="resume-iframe-full"
                        onError={handlePdfError}
                        onLoad={(e) => {
                          try {
                            const iframe = e.target;
                            if (!iframe.contentDocument && !iframe.contentWindow) {
                              handlePdfError();
                            }
                          } catch (error) {
                            handlePdfError();
                          }
                        }}
                      />
                    ) : (
                      <div className="pdf-fallback">
                        <div className="fallback-content">
                          <div className="fallback-icon">📄</div>
                          <h3>PDF Preview Unavailable</h3>
                          <p>Your browser doesn't support PDF viewing or the PDF couldn't be loaded.</p>
                          <div className="fallback-actions">
                            <a 
                              href={pdfUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="button button-primary"
                            >
                              Open PDF in New Tab
                            </a>
                            <a 
                              href={pdfUrl} 
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