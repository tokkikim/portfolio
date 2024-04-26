import { BrowserRouter, Routes, Route, Form } from 'react-router-dom';
import MainPage from './component/MainPage.js';
import ProjectPage from './component/projects/ProjectPage.js';
import ResumePage from './component/resume/ResumePage.js';
import Information from './component/communication/Information.js';
import DetailPage from './component/projects/DetailPage.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='project' element={<ProjectPage />} />
        <Route path='project/detail' element={<DetailPage />} />
        <Route path='resume' element={<ResumePage />} />
        <Route path='communication' element={<Information />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
