import * as React from 'react';
import { Provider } from 'react-redux';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import store from './store';
import HomePage from 'pages/HomePage';
import PostsPage from 'pages/PostsPage';
import ProjectsPage from 'pages/ProjectsPage';

function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="" element={<HomePage />}></Route>
            <Route path="posts" element={<PostsPage />}>
              <Route path=":idx" element={<PostsPage />}></Route>
            </Route>
            <Route path="projects" element={<ProjectsPage />}></Route>
            <Route path="*" element={<>404 NOT FOUND</>}></Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
}

export default App;
