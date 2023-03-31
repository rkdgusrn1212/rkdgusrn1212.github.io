import HomePage from 'pages/HomePage';
import PostListPage from 'pages/PostListPage';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="" element={<HomePage />}></Route>
      <Route path="posts" element={<PostListPage />}></Route>
      <Route path="*" element={<>404 NOT FOUND</>}></Route>
    </Routes >
  );
}

export default App;
