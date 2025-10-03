import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold">Learning Platform</div>
      <div className="flex space-x-4">
        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        <Link to="/content" className="hover:underline">Content</Link>
        <Link to="/forum" className="hover:underline">Forum</Link>
        <Link to="/projects" className="hover:underline">Projects</Link>
      </div>
      <div className="flex items-center space-x-4">
        <span>Welcome, {user?.name}</span>
        <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
