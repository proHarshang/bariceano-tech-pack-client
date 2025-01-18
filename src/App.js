import Auth from './pages/Auth';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './layout/MainLayout';
import TechPack from './pages/TechPack';
import TechPacksTable from './pages/TechPacksTable';
import Setting from './components/Setting';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { TechPackProvider } from './context/TechPackContext';
import AddTechpack from './pages/AddTechpack';

function App() {
  return (
    <AuthProvider>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/tech-pack" element={<TechPackProvider><TechPack /></TechPackProvider>} />
            <Route path='/tech-pack-data' element={<TechPacksTable />} />
            <Route path='/setting' element={<Setting />} />
            <Route path='/addTechpack' element={<AddTechpack />} />
          </Routes>
          </MainLayout>
      </Router>
    </AuthProvider>
  );
}

export default App;
