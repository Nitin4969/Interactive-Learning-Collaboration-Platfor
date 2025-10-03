import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';

const Dashboard = () => {
  const { user } = useAuth();
  const [contents, setContents] = useState([]);
  const [posts, setPosts] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setContents(JSON.parse(localStorage.getItem('contents') || '[]'));
    setPosts(JSON.parse(localStorage.getItem('posts') || '[]'));
    setProjects(JSON.parse(localStorage.getItem('projects') || '[]'));
  }, []);

  const badges = user.points > 10 ? ['Contributor'] : user.points > 5 ? ['Active'] : [];

  return (
    <Layout>
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl mb-4">Welcome, {user.name} ({user.role})</h2>
        <p>Points: {user.points}</p>
        <p>Badges: {badges.join(', ') || 'None'}</p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-100 p-4 rounded">
            <h3 className="text-lg font-semibold">Contents Created</h3>
            <p className="text-2xl">{contents.length}</p>
          </div>
          <div className="bg-green-100 p-4 rounded">
            <h3 className="text-lg font-semibold">Forum Posts</h3>
            <p className="text-2xl">{posts.length}</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded">
            <h3 className="text-lg font-semibold">Projects Created</h3>
            <p className="text-2xl">{projects.length}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
