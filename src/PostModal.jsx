import React, { useState } from 'react';

export default function PostModal({ post, onClose, onSave }) {
  const [status, setStatus] = useState(post?.status || 'draft');
  const [tags, setTags] = useState(post?.tags.join(', ') || '');

  if (!post) return null;

  const handleSave = () => {
    const updated = { ...post, status, tags: tags.split(',').map(t => t.trim()).filter(Boolean) };
    onSave(updated);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <span className="close-btn" onClick={onClose}>&times;</span>
        <img src={post.image} alt={post.caption} />
        <p><strong>{post.caption}</strong></p>
        <p>Scheduled: {post.date}</p>
        <label>
          Status:
          <select value={status} onChange={e => setStatus(e.target.value)}>
            <option value="draft">draft</option>
            <option value="scheduled">scheduled</option>
            <option value="posted">posted</option>
          </select>
        </label>
        <label>
          Tags:
          <input value={tags} onChange={e => setTags(e.target.value)} />
        </label>
        <button className="save-btn" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}
