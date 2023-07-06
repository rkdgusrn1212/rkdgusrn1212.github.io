import { Route, Routes } from 'react-router-dom';
import HomePage from 'pages/HomePage';
import PostListPage from 'pages/PostListPage';
import PostPage from 'pages/PostPage';

function App() {
  return (
    <Routes>
      <Route path="" element={<HomePage />}></Route>
      <Route path="posts" element={<PostListPage />}></Route>
      <Route path="post/:idx" element={<PostPage />}></Route>
      <Route path="*" element={<>404 NOT FOUND</>}></Route>
    </Routes>
  );
}

export default App;
