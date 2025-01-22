import Auth from './pages/Auth';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './layout/MainLayout';
import TechPack from './pages/TechPack';
import TechPacksTable from './pages/TechPacksTable';
import Setting from './components/Setting';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { TechPackProvider } from './context/TechPackContext';
import AddTechpack from './pages/AddTechpack';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/tech-pack" element={
              <PrivateRoute>
                <TechPackProvider><TechPack /></TechPackProvider>
              </PrivateRoute>
            } />
            <Route path='/tech-pack-data' element={
              <PrivateRoute>
                <TechPacksTable />
              </PrivateRoute>
            } />
            <Route path='/setting' element={
              <PrivateRoute>
                <Setting />
              </PrivateRoute>
            } />
            <Route path='/addTechpack' element={
              <PrivateRoute>
                <AddTechpack />
              </PrivateRoute>
            } />
          </Routes>
        </MainLayout>
      </Router>
    </AuthProvider>
  );
}

export default App;
