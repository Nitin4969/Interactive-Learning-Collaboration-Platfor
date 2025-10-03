import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';

const Content = () => {
  const [contents, setContents] = useState([]);
  const { user, updateUser } = useAuth();
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState('article');

  useEffect(() => {
    const stored = localStorage.getItem('contents');
    if (stored) setContents(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('contents', JSON.stringify(contents));
  }, [contents]);

  const addContent = () => {
    if (newTitle.trim()) {
      setContents([...contents, { id: Date.now(), title: newTitle, type: newType, author: user.name }]);
      updateUser({ points: user.points + 10 });
      setNewTitle('');
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl mb-4">Learning Content</h1>
      <div className="mb-4 flex flex-col md:flex-row">
        <input
          type="text"
          placeholder="Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="p-2 border mr-2 mb-2 md:mb-0 flex-1"
        />
        <select value={newType} onChange={(e) => setNewType(e.target.value)} className="p-2 border mr-2 mb-2 md:mb-0">
          <option value="article">Article</option>
          <option value="tutorial">Tutorial</option>
          <option value="video">Video</option>
        </select>
        <button onClick={addContent} className="bg-blue-500 text-white p-2">Add</button>
      </div>
      <ul className="list-disc pl-6">
        {contents.map(c => <li key={c.id}>{c.title} ({c.type}) by {c.author}</li>)}
      </ul>
    </Layout>
  );
};

export default Content;