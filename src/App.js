import Auth from './pages/Auth';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './layout/MainLayout';
import TechPack from './pages/TechPack';
import TechPacksTable from './pages/TechPacksTable';
import Setting from './components/Setting';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddTechpack from './pages/AddTechpack';
import PrivateRoute from './components/PrivateRoute';
import Logout from './pages/Logout';
import PreviewPage from './pages/PreviewPage';
import { TechPackProvider } from './context/TechPackContext';
import PageNotFound from './pages/PageNotFound';
import { Navigate } from 'react-router-dom';
import { Toaster } from "react-hot-toast";


function App() {
  return (
    <AuthProvider>
      <Router>
        <MainLayout>
            <Toaster />
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/tech-pack" element={
              <PrivateRoute>
                <TechPackProvider>
                  <TechPack />
                </TechPackProvider>
              </PrivateRoute>
            } />
            <Route path='/tech-pack-data' element={
              <PrivateRoute>
                <TechPacksTable />
              </PrivateRoute>
            } />
            <Route path='/preview/:id' element={
              <PreviewPage />
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
            <Route
              path="/logout"
              element={
                <PrivateRoute>
                  <Logout />
                </PrivateRoute>
              }
            />

            <Route path="/404" element={<PageNotFound />} />
            <Route path="*" element={<Navigate to="/404" />} />
          </Routes>
        </MainLayout>
      </Router>
    </AuthProvider>
  );
}

export default App;
