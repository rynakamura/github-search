import { useNavigate } from 'react-router-dom';
import Search from '../components/Search';

function Home() {
  const navigate = useNavigate();

  function handleSearch(username) {
    navigate(`/search/${username}`);
  }

  return (
    <div className="bg-gradient-to-tr from-red-500 to-purple-400 dark:from-gray-800 dark:to-gray-900 relative h-screen w-screen">
      <div className="absolute inset-0 flex flex-col justify-center items-center w-5/6 max-w-lg mx-auto text-center">
        <div className="space-y-8">
          <h1 className="font-primary font-extrabold text-white text-3xl sm:text-4xl md:text-5xl md:leading-tight">
            GH {' '}
            <span className="text-palette-primary">
              Search
            </span>
          </h1>
          <p className="font-secondary text-palette-light dark:text-gray-300 text-base md:text-lg lg:text-xl">
            Find any user profile at GitHub.
          </p>
          <Search onSearch={(username) => navigate(`/search/${username}`)} />
        </div>
      </div>
    </div>
  );
}

export default Home;