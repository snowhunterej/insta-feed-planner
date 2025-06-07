import React, { useState } from 'react';

export default function PostModal({ post, onSave, onClose }) {
  const [status, setStatus] = useState(post.status);
  const [tags, setTags] = useState(post.tags.join(', '));

  const handleSave = () => {
    const updated = {
      ...post,
      status,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
    };
    onSave(updated);
    console.log('Saved post', updated);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded w-11/12 max-w-md">
        <img src={post.image} alt={post.caption} className="w-full mb-4" />
        <p className="font-semibold mb-2">{post.caption}</p>
        <p className="text-sm text-gray-500 mb-2">{post.date}</p>
        <label className="block mb-2">
          <span className="text-sm">Status:</span>
          <select
            className="border p-1 w-full mt-1"
            value={status}
            onChange={e => setStatus(e.target.value)}
          >
            <option value="scheduled">Scheduled</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </label>
        <label className="block mb-4">
          <span className="text-sm">Tags:</span>
          <input
            className="border p-1 w-full mt-1"
            value={tags}
            onChange={e => setTags(e.target.value)}
            placeholder="comma separated"
          />
        </label>
        <div className="flex justify-end space-x-2">
          <button
            className="px-3 py-1 bg-blue-500 text-white rounded"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="px-3 py-1 bg-gray-300 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
