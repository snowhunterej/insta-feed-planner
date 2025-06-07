import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { initialPosts } from './data';
import PostModal from './PostModal';

function reorder(list, startIndex, endIndex) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

export default function PostGrid() {
  const [posts, setPosts] = useState(initialPosts);
  const [selected, setSelected] = useState(null);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = reorder(posts, result.source.index, result.destination.index);
    setPosts(items);
  };

  const handleSave = (updatedPost) => {
    setPosts(posts.map(p => (p.id === updatedPost.id ? updatedPost : p)));
    console.log('Saved post:', updatedPost);
    setSelected(null);
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="grid" direction="horizontal">
          {(provided) => (
            <div
              className="grid"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {posts.map((post, index) => (
                <Draggable key={post.id} draggableId={post.id} index={index}>
                  {(provided) => (
                    <div
                      className="grid-item"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      onClick={() => setSelected(post)}
                    >
                      <img src={post.image} alt={post.caption} />
                      <span className="badge">{post.status}</span>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <PostModal post={selected} onClose={() => setSelected(null)} onSave={handleSave} />
    </>
  );
}
