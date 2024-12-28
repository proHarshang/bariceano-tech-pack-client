import './App.css';
import Auth from './pages/Auth';
import TechPack from './pages/TechPack';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/tech-pack" element={<TechPack />} />
      </Routes>
    </Router>
  );
}

export default App;
