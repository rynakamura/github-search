import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import ProfileDetails from './pages/ProfileDetails';
import RecentProfiles from './pages/RecentProfiles';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    return savedDarkMode ? JSON.parse(savedDarkMode) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <Router>
        <button
          onClick={toggleDarkMode}
          className="fixed top-4 right-4 p-2 bg-gray-200 dark:bg-gray-800 rounded-full shadow-lg focus:outline-none"
          aria-label="Toggle dark mode"
        >
          {darkMode ? '🌙' : '☀️'}
        </button>

        <Link
          to="/recent-profiles"
          className="fixed top-4 left-4 p-2 bg-gray-200 dark:bg-gray-800 rounded-lg shadow-lg text-sm font-semibold"
        >
          Últimos Perfis
        </Link>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search/:username" element={<SearchResults />} />
          <Route path="/profile/:username" element={<ProfileDetails />} />
          <Route path="/recent-profiles" element={<RecentProfiles />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;