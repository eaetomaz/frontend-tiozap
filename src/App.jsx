import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import Login from "./pages/Login";
import Historico from "./pages/Historico";
import Configuracoes from "./pages/Configuracoes";
import "./styles/App.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
// import ProtectedRoute from "./components/ProtectedRoute"; // desativado por enquanto

export default function App() {
  return (
    <Router>      
      <div className="body">
      '  <nav className="navbar">
          <Link to="/historico" className="navbar-link">
            <i className="fa fa-history"/> Histórico
          </Link>  
          <Link to="/configuracoes" className="navbar-link">
            <i className="fa fa-cog"/> Configurações
          </Link>              
        </nav>

        <Routes>
          <Route path="/" element={<Navigate to="/historico" replace />} />
          <Route path="/login" element={<Login />} />
          
          <Route path="/historico" element={<Historico />} />
          <Route path="/configuracoes" element={<Configuracoes />} />
        </Routes>
      </div>
    </Router>
  );
}
