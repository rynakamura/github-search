import { useEffect, useState } from 'react';
import ProfileListItem from '../components/ProfileListItem';

function RecentProfiles() {
  const [recentProfiles, setRecentProfiles] = useState([]);

  useEffect(() => {
    const savedProfiles = JSON.parse(localStorage.getItem('recentProfiles')) || [];
    setRecentProfiles(savedProfiles);
  }, []);

  return (
    <div className="font-secondary flex flex-col items-center w-full max-w-lg mx-auto">
      <h1 className="font-primary font-extrabold text-github-light dark:text-github-dark text-3xl sm:text-4xl md:text-5xl md:leading-tight mt-8">
        Últimos Perfis Acessados
      </h1>

      {recentProfiles.length > 0 ? (
        <ul className="w-full max-w-lg bg-github-light dark:bg-github-dark border border-github rounded-lg mt-2 overflow-hidden">
          {recentProfiles.map((profile, index) => (
            <ProfileListItem
              key={index}
              username={profile.username}
              avatar_url={profile.avatar_url}
            />
          ))}
        </ul>
      ) : (
        <p className="text-github-light dark:text-github-dark mt-4">Nenhum perfil acessado recentemente.</p>
      )}
    </div>
  );
}

export default RecentProfiles;