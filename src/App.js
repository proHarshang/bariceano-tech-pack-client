import './App.css';
import Auth from './pages/Auth';
import TechPack from './pages/TechPack';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TechPacksTable from './pages/TechPacksTable';
import TechPackPdfGenerator from './TechPackPdfGenerator';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path='/test' element={<TechPackPdfGenerator />} />
        <Route path="/tech-pack" element={<TechPack />} />
        <Route path='/tech-pack-data' element={<TechPacksTable />} />
      </Routes>
    </Router>
  );
}

export default App;
