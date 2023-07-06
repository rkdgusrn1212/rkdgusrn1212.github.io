import { Route, Routes } from 'react-router-dom';
import HomePage from 'pages/HomePage';
import PostsPage from 'pages/PostsPage';

function App() {
  return (
    <Routes>
      <Route path="" element={<HomePage />}></Route>
      <Route path="posts" element={<PostsPage />}>
        <Route path=":idx" element={<PostsPage />}></Route>
      </Route>
      <Route path="*" element={<>404 NOT FOUND</>}></Route>
    </Routes>
  );
}

export default App;
