import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProfileList from '../components/ProfileList';

function SearchResults() {
  const { username } = useParams();
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const itemsPerPage = 5;

  async function fetchSuggestions(page) {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.github.com/search/users?q=${username}&page=${page}&per_page=${itemsPerPage}`
      );
      if (!response.ok) {
        throw new Error('Erro ao buscar sugestões');
      }
      const data = await response.json();
      setSuggestions(data.items);
      setTotalCount(data.total_count);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSuggestions(currentPage);
  }, [username, currentPage]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <main className="font-secondary flex flex-col items-center w-full h-full max-w-lg mx-auto px-5">
      <h1 className="font-primary font-extrabold text-github-light dark:text-github-dark text-3xl sm:text-4xl md:text-5xl md:leading-tight mt-8">
        Resultados para: {username}
      </h1>

      {suggestions.length > 0 ? (
        <ProfileList profiles={suggestions} />
      ) : (
        <p className="text-github-light dark:text-github-dark mt-4">
          Nenhum resultado encontrado.
        </p>
      )}

      <footer className="flex justify-center space-x-4 mt-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1 || loading}
          className="px-4 py-2 bg-github-blue text-white rounded-lg disabled:opacity-50"
          aria-label="Página anterior"
        >
          Anterior
        </button>
        <span className="text-github-light dark:text-github-dark">
          Página {currentPage} de {Math.ceil(totalCount / itemsPerPage)}
        </span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage * itemsPerPage >= totalCount || loading}
          className="px-4 py-2 bg-github-blue text-white rounded-lg disabled:opacity-50"
          aria-label="Próxima página"
        >
          Próxima
        </button>
      </footer>

      {error && (
        <p className="text-red-500 dark:text-red-400 mt-2" role="alert">
          {error}
        </p>
      )}
    </main>
  );
}

export default SearchResults;