# Insta Feed Planner

This is a simple React app that displays a draggable grid of posts in three columns. Each post has a thumbnail and status badge. Clicking a post opens a modal with more details and allows updating the post status and tags.

## Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the dev server:
   ```bash
   npm run dev
   ```

Use the modal's **Save** button to update a post's status or tags. The new values are logged to the console.

The app uses [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd) for drag-and-drop interactions and is built with Vite.
