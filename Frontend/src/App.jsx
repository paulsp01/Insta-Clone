import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./features/auth/pages/Login.jsx";
import Register from "./features/auth/pages/Register";
import Feed from './features/post/pages/Feed.jsx';
import CreatePost from './features/post/pages/CreatePost.jsx';

const App = () => {
 return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/feed" element={<Feed/>}/>
           <Route path="/create-post" element={<CreatePost/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App