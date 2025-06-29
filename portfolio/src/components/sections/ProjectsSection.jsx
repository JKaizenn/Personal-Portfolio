// src/components/sections/ProjectsSection.jsx
import React, { useState, useEffect, useCallback } from 'react';

// Move constants outside component to avoid dependency issues
const GITHUB_USERNAME = 'jkaizenn'; // Replace with your actual GitHub username

// Optional: Specify which repos to feature (leave empty to show all public repos)
const FEATURED_REPOS = [
  'portfolio',
  'react-weather-app', 
  'ecommerce-project',
  // Add your repo names here
];

function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Wrap fetchGitHubProjects in useCallback to prevent unnecessary re-renders
  const fetchGitHubProjects = useCallback(async () => {

  // Helper functions (moved inside useCallback to access state setters)
  const formatRepoName = (name) => {
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const generateProjectImage = (repoName, language) => {
    const colors = {
      JavaScript: '#F7DF1E',
      TypeScript: '#3178C6',
      React: '#61DAFB',
      Python: '#3776AB',
      Java: '#ED8B00',
      'C++': '#00599C',
      CSS: '#1572B6',
      HTML: '#E34F26',
      default: '#4A90E2'
    };
    
    const color = colors[language] || colors.default;
    const encodedName = encodeURIComponent(formatRepoName(repoName));
    
    return `https://via.placeholder.com/400x250/${color.replace('#', '')}/ffffff?text=${encodedName}`;
  };

  const getFallbackProjects = () => [
    {
      id: 1,
      title: "Portfolio Website",
      description: "A modern, responsive portfolio built with React and Vite. Features dark mode toggle, smooth scrolling navigation, and mobile-optimized design.",
      technologies: ["React", "Vite", "CSS3", "JavaScript"],
      liveLink: "https://jforbush.dev",
      githubLink: "#",
      stars: 0,
      forks: 0,
      image: "https://via.placeholder.com/400x250/4A90E2/ffffff?text=Portfolio"
    },
    {
      id: 2,
      title: "Coming Soon",
      description: "More projects will be displayed here automatically from your GitHub repositories once you update your GitHub username.",
      technologies: ["GitHub", "API", "React"],
      liveLink: "#",
      githubLink: `https://github.com/${GITHUB_USERNAME}`,
      stars: 0,
      forks: 0,
      image: "https://via.placeholder.com/400x250/87CEEB/ffffff?text=Coming+Soon"
    }
  ];
        try {
      setLoading(true);
      
      // Fetch user's repositories
      const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch GitHub repositories');
      }
      
      const repos = await response.json();
      
      // Filter and process repositories
      let filteredRepos = repos.filter(repo => {
        // Filter out forks and archived repos
        if (repo.fork || repo.archived) return false;
        
        // If featured repos are specified, only show those
        if (FEATURED_REPOS.length > 0) {
          return FEATURED_REPOS.includes(repo.name);
        }
        
        // Otherwise show repos with descriptions and recent activity
        return repo.description && repo.updated_at;
      });

      // Sort by stars, then by last updated
      filteredRepos.sort((a, b) => {
        if (b.stargazers_count !== a.stargazers_count) {
          return b.stargazers_count - a.stargazers_count;
        }
        return new Date(b.updated_at) - new Date(a.updated_at);
      });

      // Take top 6 projects
      filteredRepos = filteredRepos.slice(0, 6);

      // Process the data for our component
      const processedProjects = await Promise.all(
        filteredRepos.map(async (repo) => {
          // Try to get additional info like languages
          let languages = [];
          try {
            const langResponse = await fetch(repo.languages_url);
            if (langResponse.ok) {
              const langData = await langResponse.json();
              languages = Object.keys(langData).slice(0, 4); // Top 4 languages
            }
          } catch (err) {
            console.warn('Could not fetch languages for', repo.name);
          }

          return {
            id: repo.id,
            title: formatRepoName(repo.name),
            description: repo.description || 'No description available',
            technologies: languages.length > 0 ? languages : ['JavaScript'], // Fallback
            liveLink: repo.homepage || `https://${GITHUB_USERNAME}.github.io/${repo.name}`,
            githubLink: repo.html_url,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            lastUpdated: repo.updated_at,
            language: repo.language,
            image: generateProjectImage(repo.name, repo.language)
          };
        })
      );

      setProjects(processedProjects);
    } catch (err) {
      console.error('Error fetching GitHub projects:', err);
      setError(err.message);
      
      // Fallback to manual projects if API fails
      setProjects(getFallbackProjects());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGitHubProjects();
  }, [fetchGitHubProjects]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  if (loading) {
    return (
      <section id="projects" className="projects-section">
        <div className="container">
          <div className="section-content">
            <h2 className="section-title">Projects</h2>
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>Loading projects from GitHub...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error && projects.length === 0) {
    return (
      <section id="projects" className="projects-section">
        <div className="container">
          <div className="section-content">
            <h2 className="section-title">Projects</h2>
            <div className="error-state">
              <p>Unable to load projects from GitHub API.</p>
              <p className="error-message">{error}</p>
              <a 
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="button button-primary"
              >
                View GitHub Profile
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <div className="section-content">
          <h2 className="section-title">Projects</h2>
          <p className="section-subtitle">
            Here are some of my recent projects, automatically loaded from my GitHub repositories. 
            Each project represents different technologies and challenges I've worked with.
          </p>
          
          <div className="projects-grid">
            {projects.map(project => (
              <div key={project.id} className="project-card">
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                  <div className="project-overlay">
                    <div className="project-links">
                      {project.liveLink && project.liveLink !== '#' && (
                        <a 
                          href={project.liveLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="project-link"
                        >
                          Live Demo
                        </a>
                      )}
                      <a 
                        href={project.githubLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        GitHub
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="project-content">
                  <div className="project-header">
                    <h3 className="project-title">{project.title}</h3>
                    <div className="project-stats">
                      {project.stars > 0 && (
                        <span className="stat">
                          ⭐ {project.stars}
                        </span>
                      )}
                      {project.forks > 0 && (
                        <span className="stat">
                          🍴 {project.forks}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <p className="project-description">{project.description}</p>
                  
                  {project.lastUpdated && (
                    <p className="project-updated">
                      Last updated: {formatDate(project.lastUpdated)}
                    </p>
                  )}
                  
                  <div className="project-technologies">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="projects-footer">
            <a 
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-secondary"
            >
              View More on GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;