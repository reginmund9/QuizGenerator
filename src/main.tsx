import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

// Entry point of the React application.
// Mounts the App component to the root DOM element.
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
