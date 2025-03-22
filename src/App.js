import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import ProfileDetails from "./pages/ProfileDetails";
import RecentProfiles from "./pages/RecentProfiles";
import Header from "./components/Header";
import ConnectionModal from "./components/Modal";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    return savedDarkMode ? JSON.parse(savedDarkMode) : false;
  });

  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setIsModalOpen(false);
    };
    const handleOffline = () => {
      setIsOnline(false);
      setIsModalOpen(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? "dark h-screen" : "h-screen "}>
      <div className="bg-gradient-to-tr from-red-500 to-purple-400 dark:from-gray-800 dark:to-gray-900 relative h-full w-full flex flex-col ">
        <Router>
          <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search/:username" element={<SearchResults />} />
            <Route path="/profile/:username" element={<ProfileDetails />} />
            <Route path="/recent-profiles" element={<RecentProfiles />} />
          </Routes>
        </Router>

        <ConnectionModal
          isOpen={!isOnline && isModalOpen}
          onClose={() => setIsModalOpen(false)} 
        />
      </div>
    </div>
  );
}

export default App;