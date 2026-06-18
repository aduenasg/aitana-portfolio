import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/main.css';
import './styles/project.css';

import HomePage   from './pages/HomePage';
import ProjectPage from './pages/ProjectPage';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/"                  element={<HomePage />} />
      <Route path="/proyecto/:id"      element={<ProjectPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
