import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const { user, updateUser } = useAuth();
  const [newTitle, setNewTitle] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('posts');
    if (stored) setPosts(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  const addPost = () => {
    if (newTitle.trim()) {
      setPosts([...posts, { id: Date.now(), title: newTitle, author: user.name }]);
      updateUser({ points: user.points + 5 });
      setNewTitle('');
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl mb-4">Discussion Forum</h1>
      <div className="mb-4 flex flex-col md:flex-row">
        <input
          type="text"
          placeholder="Post title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="p-2 border mr-2 mb-2 md:mb-0 flex-1"
        />
        <button onClick={addPost} className="bg-blue-500 text-white p-2">Post</button>
      </div>
      <ul className="list-disc pl-6">
        {posts.map(p => <li key={p.id}>{p.title} by {p.author}</li>)}
      </ul>
    </Layout>
  );
};

export default Forum;
