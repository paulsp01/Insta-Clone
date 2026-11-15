import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './features/auth/context/auth.context.jsx'
import { PostProvider } from './features/post/context/post.context.jsx';

createRoot(document.getElementById('root')).render(
  <AuthProvider>
   <PostProvider>
     <StrictMode>
    <App />
  </StrictMode>,
   </PostProvider>
  </AuthProvider>
)
