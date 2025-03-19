import { useNavigate } from 'react-router-dom';

function ProfileListItem({ username, avatar_url }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/profile/${username}`);
  };

  return (
    <li
      className="p-2 hover:bg-github-hover cursor-pointer border-b border-github last:border-b-0"
      onClick={handleClick}
    >
      <div className="flex items-center">
        <img
          src={avatar_url}
          alt={`${username}'s avatar`}
          className="w-8 h-8 rounded-full mr-2"
        />
        <span className="text-github-light dark:text-github-dark">{username}</span>
      </div>
    </li>
  );
}

export default ProfileListItem;