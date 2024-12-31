import './App.css';
import Auth from './pages/Auth';
import { AuthProvider } from './context/AuthContext';
import MainHeader from './common/main-header';
import TechPack from './pages/TechPack';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TechPacksTable from './pages/TechPacksTable';
import TechPackPdfGenerator from './TechPackPdfGenerator';

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <MainHeader />
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/tech-pack" element={<TechPack />} />
            <Route path='/tech-pack-data' element={<TechPacksTable />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
