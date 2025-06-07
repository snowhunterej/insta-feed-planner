import React from 'react';

const posts = Array.from({ length: 9 }).map((_, i) => ({
  id: i + 1,
  image: `https://via.placeholder.com/300?text=Post+${i + 1}`,
}));

export default function InstagramGrid() {
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {posts.map(post => (
        <img
          key={post.id}
          src={post.image}
          alt={`Post ${post.id}`}
          className="w-full object-cover rounded"
        />
      ))}
    </div>
  );
}
