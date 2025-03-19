import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProfileDetails() {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchUserData() {
    setLoading(true);
    setError(null);

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

      saveRecentProfile(userData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function saveRecentProfile(profile) {
    const recentProfiles = JSON.parse(localStorage.getItem('recentProfiles')) || [];
    const newProfile = { username: profile.login, avatar_url: profile.avatar_url };

    const updatedProfiles = recentProfiles.filter(
      (p) => p.username !== newProfile.username
    );

    updatedProfiles.unshift(newProfile);

    if (updatedProfiles.length > 10) {
      updatedProfiles.pop();
    }

    localStorage.setItem('recentProfiles', JSON.stringify(updatedProfiles));
  }

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
    <div className="font-secondary flex flex-col items-center w-full max-w-lg mx-auto">
      {userData && (
        <div className="space-y-8">
          <h1 className="font-primary font-extrabold text-white text-3xl sm:text-4xl md:text-5xl md:leading-snug">
            {userData.name || userData.login}
          </h1>
          <img
            src={userData.avatar_url}
            alt={`${userData.login}'s avatar`}
            className="w-24 h-24 rounded-full mx-auto"
          />
          <p className="font-secondary text-palette-light text-base md:text-lg lg:text-xl">
            {userData.bio || 'Sem descrição'}
          </p>
          <div className="flex justify-center space-x-4">
            <p>Seguidores: {userData.followers}</p>
            <p>Seguindo: {userData.following}</p>
          </div>
          <h2 className="font-primary font-extrabold text-white text-2xl sm:text-3xl md:text-4xl">
            Repositórios
          </h2>
          <ul className="space-y-4">
            {userData.repos.map((repo) => (
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
        </div>
      )}
    </div>
  );
}

export default ProfileDetails;