import React, { useState } from 'react';
import PostModal from './PostModal';

const initialPosts = Array.from({ length: 9 }).map((_, i) => ({
  id: i + 1,
  image: `https://picsum.photos/seed/${i + 1}/600/600`,
  thumbnail: `https://picsum.photos/seed/${i + 1}/300/300`,
  caption: `Sample caption ${i + 1}`,
  date: `2025-06-${String(i + 1).padStart(2, '0')}`,
  status: 'scheduled',
  tags: ['demo', 'post']
}));

export default function InstagramGrid() {
  const [posts, setPosts] = useState(initialPosts);
  const [dragIndex, setDragIndex] = useState(null);
  const [overIndex, setOverIndex] = useState(null);
  const [selected, setSelected] = useState(null);

  const handleDragStart = index => setDragIndex(index);
  const handleDragEnter = index => setOverIndex(index);
  const handleDragOver = e => e.preventDefault();
  const handleDrop = () => {
    if (dragIndex === null || overIndex === null || dragIndex === overIndex) return;
    const updated = [...posts];
    const [moved] = updated.splice(dragIndex, 1);
    updated.splice(overIndex, 0, moved);
    setPosts(updated);
    setDragIndex(null);
    setOverIndex(null);
  };

  const handleSave = updatedPost => {
    setPosts(posts.map(p => (p.id === updatedPost.id ? updatedPost : p)));
    setSelected(null);
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {posts.map((post, index) => (
        <div
          key={post.id}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragEnter={() => handleDragEnter(index)}
          onDragOver={handleDragOver}
          onDragEnd={handleDrop}
          className="relative cursor-move"
        >
          <img
            src={post.thumbnail}
            alt={post.caption}
            className="w-full object-cover rounded"
            onClick={() => setSelected(post)}
          />
          <span className="absolute bottom-1 left-1 bg-black bg-opacity-60 text-white text-xs px-1 rounded">
            {post.status}
          </span>
        </div>
      ))}
      {selected && (
        <PostModal
          post={selected}
          onSave={handleSave}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
