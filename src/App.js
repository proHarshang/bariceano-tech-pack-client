import './App.css';
import Auth from './pages/Auth';
import { AuthProvider } from './context/AuthContext';
import MainHeader from './common/main-header';
import TechPack from './pages/TechPack';
import TechPacksTable from './pages/TechPacksTable';
import Setting from './components/Setting';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  return (
    <AuthProvider>
        <Router>
          <MainHeader />
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/tech-pack" element={<TechPack />} />
            <Route path='/tech-pack-data' element={<TechPacksTable />} />
            <Route path='/setting' element={<Setting />} />
          </Routes>
        </Router>
    </AuthProvider>
  );
}

export default App;
