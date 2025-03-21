import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CustomSelect from '../components/CustomSelect'; 

function ProfileDetails() {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const sortOptions = [
    { name: 'Estrelas', value: 'stars' },
    { name: 'Nome', value: 'name' },
  ];

  const orderOptions = [
    { name: 'Decrescente', value: 'desc' },
    { name: 'Crescente', value: 'asc' },
  ];

  async function fetchUserData() {
    setLoading(true);
    setError(null);
    const recentProfiles = getRecentProfiles()
    const profile = recentProfiles.find(
      (p) => p.login == username
    );
    if(profile != null){
      setUserData({ ...profile, repos: profile.reposData });
      setLoading(false);
      return
    }
    try {
      const userResponse = await fetch(`https://api.github.com/users/${username}`);
      if (!userResponse.ok) {
        throw new Error('Usuário não encontrado');
      }
      const userData = await userResponse.json();

      const reposResponse = await fetch(userData.repos_url);
      if (!reposResponse.ok) {
        throw new Error('Erro ao buscar repositórios');
      }
      const reposData = await reposResponse.json();

      setUserData({ ...userData, repos: reposData });
      saveRecentProfile(userData, reposData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  function getRecentProfiles(){
    return JSON.parse(localStorage.getItem("recentProfiles")) || [];
  }
  function saveRecentProfile(profile, reposData) {
    const recentProfiles = getRecentProfiles()
    profile.reposData = reposData
    const updatedProfiles = recentProfiles.filter(
      (p) => p.login !== profile.login
    );

    updatedProfiles.unshift(profile);

    if (updatedProfiles.length > 5) {
      updatedProfiles.pop();
    }

    localStorage.setItem('recentProfiles', JSON.stringify(updatedProfiles));
  }

  const sortedRepos = () => {
    if (!userData?.repos) return [];

    return [...userData.repos].sort((a, b) => {
      if (sortBy?.value === 'stars') {
        return sortOrder?.value === 'desc'
          ? b.stargazers_count - a.stargazers_count
          : a.stargazers_count - b.stargazers_count;
      } else if (sortBy?.value === 'name') {
        return sortOrder?.value === 'desc'
          ? b.name.localeCompare(a.name)
          : a.name.localeCompare(b.name);
      }
      return 0;
    });
  };

  const paginatedRepos = () => {
    const sorted = sortedRepos();
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return sorted.slice(indexOfFirstItem, indexOfLastItem);
  };

  useEffect(() => {
    fetchUserData();
  }, [username]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <main className="font-secondary flex flex-col items-center w-full max-w-lg mx-auto p-5 h-auto">
      {userData && (
        <article className="space-y-8">
          <header className="text-center">
            <h1 className="font-primary font-extrabold text-white text-3xl sm:text-4xl md:text-5xl md:leading-snug">
              {userData.name || userData.login}
            </h1>
            <img
              src={userData.avatar_url}
              alt={`Avatar de ${userData.login}`}
              className="w-24 h-24 rounded-full mx-auto"
            />
            <p className="font-secondary text-palette-light text-base md:text-lg lg:text-xl">
              {userData.bio || 'Sem descrição'}
            </p>
            <div className="flex justify-center space-x-4 text-gray-900">
              <p>Seguidores: {userData.followers}</p>
              <p>Seguindo: {userData.following}</p>
            </div>
          </header>

          <section className="flex space-x-4">
            <CustomSelect
              options={sortOptions}
              selectedOption={sortBy}
              setSelectedOption={setSortBy}
              label="Ordenar por"
            />
            <CustomSelect
              options={orderOptions}
              selectedOption={sortOrder}
              setSelectedOption={setSortOrder}
              label="Ordem"
            />
          </section>

          <section>
            <h2 className="font-primary font-extrabold text-white text-2xl sm:text-3xl md:text-4xl">
              Repositórios
            </h2>
            <ul className="space-y-4">
              {paginatedRepos().map((repo) => (
                <li key={repo.id} className="text-palette-light">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {repo.name} ({repo.stargazers_count} ⭐)
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <footer className="flex justify-center space-x-4">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-github-blue text-white rounded-lg disabled:opacity-50"
              aria-label="Página anterior"
            >
              Anterior
            </button>
            <span className="text-github-light dark:text-github-dark">
              Página {currentPage} de {Math.ceil(sortedRepos().length / itemsPerPage)}
            </span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage * itemsPerPage >= sortedRepos().length}
              className="px-4 py-2 bg-github-blue text-white rounded-lg disabled:opacity-50"
              aria-label="Próxima página"
            >
              Próxima
            </button>
          </footer>
        </article>
      )}
    </main>
  );
}

export default ProfileDetails;