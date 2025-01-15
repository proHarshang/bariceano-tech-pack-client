import Auth from './pages/Auth';
import { AuthProvider } from './context/AuthContext';
import MainHeader from './common/main-header';
import MainLayout from './layout/MainLayout';
import TechPack from './pages/TechPack';
import TechPacksTable from './pages/TechPacksTable';
import Setting from './components/Setting';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { TechPackProvider } from './context/TechPackContext';

function App() {
  return (
    <AuthProvider>
      <TechPackProvider>
        <Router>
          <MainLayout>
            <Routes>
              <Route path="/" element={<Auth />} />
              <Route path="/tech-pack" element={<TechPack />} />
              <Route path='/tech-pack-data' element={<TechPacksTable />} />
              <Route path='/setting' element={<Setting />} />
            </Routes>
          </MainLayout>
        </Router>
      </TechPackProvider>
    </AuthProvider>
  );
}

export default App;
