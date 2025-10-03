import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const { user, updateUser } = useAuth();
  const [newName, setNewName] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('projects');
    if (stored) setProjects(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  const addProject = () => {
    if (newName.trim()) {
      setProjects([...projects, { id: Date.now(), name: newName, members: 1, creator: user.name }]);
      updateUser({ points: user.points + 15 });
      setNewName('');
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl mb-4">Collaborative Projects</h1>
      <div className="mb-4 flex flex-col md:flex-row">
        <input
          type="text"
          placeholder="Project name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="p-2 border mr-2 mb-2 md:mb-0 flex-1"
        />
        <button onClick={addProject} className="bg-blue-500 text-white p-2">Create</button>
      </div>
      <ul className="list-disc pl-6">
        {projects.map(p => <li key={p.id}>{p.name} - {p.members} members (by {p.creator})</li>)}
      </ul>
    </Layout>
  );
};

export default Projects;
