import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './component/MainPage.js';
import ProjectPage from './component/projects/ProjectPage.js';
import ResumePage from './component/resume/ResumePage.js';
import Information from './component/communication/Information.js';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='project' element={<ProjectPage />} />
        <Route path='resume' element={<ResumePage />} />
        <Route path='communication' element={<Information />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
