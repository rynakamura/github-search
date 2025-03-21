import { useNavigate } from 'react-router-dom';

function ProfileList({ profiles }) {
  const navigate = useNavigate();

  const handleSelectProfile = (profile) => {
    navigate(`/profile/${profile.login}`);
  };

  const handleKeyDown = (event, profile) => {
    if (event.key === 'Enter') {
      handleSelectProfile(profile);
    }
  };

  return (
    <div className="w-full px-4 py-16">
      <div className="mx-auto w-full max-w-md">
        <div role="list" className="space-y-2">
          {profiles.map((profile) => (
            <div
              key={profile.id?? profile.login}
              role="listitem"
              tabIndex={0} 
              className="bg-gray-100 relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none focus:ring-2 focus:ring-sky-300"
              onClick={() => handleSelectProfile(profile)}
              onKeyDown={(event) => handleKeyDown(event, profile)}
            >
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={profile.avatar_url}
                    alt={`Avatar de ${profile.login}`}
                    className="h-10 w-10 rounded-full mr-4"
                  />
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">{profile.login}</p>
                    <span className="inline text-gray-500">
                      <span>{profile.followers} seguidores</span>{' '}
                      <span aria-hidden="true">&middot;</span>{' '}
                      <span>{profile.public_repos} repositórios</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfileList;