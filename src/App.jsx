import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/main.css';
import './styles/project.css';

import HomePage        from './pages/HomePage';
import ProjectPage     from './pages/ProjectPage';
import ProcessPage     from './pages/ProcessPage';
import Coleccion3DPage from './pages/Coleccion3DPage';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/"                  element={<HomePage />} />
      <Route path="/proyecto/:id"      element={<ProjectPage />} />
      <Route path="/proceso-clo3d"     element={<ProcessPage />} />
      <Route path="/coleccion-3d"      element={<Coleccion3DPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
