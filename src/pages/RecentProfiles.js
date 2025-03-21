import { useEffect, useState } from "react";
import ProfileList from '../components/ProfileList'; 
function RecentProfiles() {
  const [recentProfiles, setRecentProfiles] = useState([]);

  useEffect(() => {
    const savedProfiles =
      JSON.parse(localStorage.getItem("recentProfiles")) || [];
    setRecentProfiles(savedProfiles);
  }, []);

  return (
    <main className="font-secondary flex flex-col items-center w-full max-w-lg mx-auto p-5">
      <h1 className="font-primary font-extrabold text-github-light dark:text-github-dark text-3xl sm:text-4xl md:text-5xl md:leading-tight ">
        Últimos Perfis Acessados
      </h1>

      {recentProfiles.length > 0 ? (
        <section aria-labelledby="recent-profiles-heading" className="w-full">
          <h2 id="recent-profiles-heading" className="sr-only">
            Lista de últimos perfis acessados
          </h2>

            {recentProfiles.length > 0 ? (
              <ProfileList profiles={recentProfiles} />
            ) : (
              <p className="text-github-light dark:text-github-dark mt-4">
                Nenhum resultado encontrado.
              </p>
            )}
        </section>
      ) : (
        <p className="text-github-light dark:text-github-dark mt-4">
          Nenhum perfil acessado recentemente.
        </p>
      )}
    </main>
  );
}

export default RecentProfiles;
