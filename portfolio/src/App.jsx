// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import About from './pages/About';
// Import other pages as needed (you'll create these later)
// import AboutPage from './pages/AboutPage';
// import ProjectsPage from './pages/ProjectsPage';
// import ContactPage from './pages/ContactPage';
// Test

function App() {
  return (
    <Router>
      <div className="app">
        {/* You can add a navbar here later */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* Add more routes as you create more pages */}
            {/* <Route path="/about" element={<AboutPage />} /> */}
            {/* <Route path="/projects" element={<ProjectsPage />} /> */}
            {/* <Route path="/contact" element={<ContactPage />} /> */}
            {/* Add a catch-all route for 404 pages */}
            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Routes>
        </main>
        {/* You can add a footer here later */}
      </div>
      <div>About</div>
    </Router>
  );
}

export default App;