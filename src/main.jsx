import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx'; // Importing the main App component
import './index.css'; // Importing global styles

// Sample initial data for tasks
const DATA = [
  { id: "todo-0", name: "Eat", completed: true },
  { id: "todo-1", name: "Sleep", completed: false },
  { id: "todo-2", name: "Repeat", completed: false },
];

// Creating the root and rendering the App component inside <StrictMode> 
createRoot(document.getElementById('root')).render(
  <StrictMode> {/* Ensures strict adherence to React best practices */}
    <App task={DATA} /> {/* Passing initial tasks as props to the App */}
  </StrictMode>
);
