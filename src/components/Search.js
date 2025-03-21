import { useState } from 'react';

function Search({ onSearch }) {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  function isValidGitHubUsername(username) {
    const regex = /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/;
    return regex.test(username);
  }
  function handleSubmit(e) {
    e.preventDefault();

    if (!isValidGitHubUsername(username)) {
      setError('Username inválido. Use apenas letras, números e hífens.');
      return;
    }

    setError(null); 
    setLoading(true);

    onSearch(username);
  }

  return (
    <div className="font-secondary flex flex-col items-center w-full max-w-lg mx-auto">
      <form
        className="flex w-full px-2"
        onSubmit={handleSubmit}
      >
        <input
          className="border border-r-0 border-palette-light rounded-l-lg w-full
                focus:outline-none focus:ring-1 focus:ring-palette-primary"
          type="text"
          required
          placeholder="Digite um username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className={`py-3 px-4 bg-palette-primary hover:bg-palette-dark text-white text-sm sm:text-base font-semibold rounded-r-lg border border-transparent 
            focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-palette-primary ${
              loading ? 'pointer-events-none opacity-75' : ''
            }`}
        >
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </form>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}

export default Search;