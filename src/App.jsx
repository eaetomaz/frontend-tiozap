import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import Login from "./pages/Login";
import Historico from "./pages/Historico";
import Configuracoes from "./pages/Configuracoes";
// import ProtectedRoute from "./components/ProtectedRoute"; // desativado por enquanto

export default function App() {
  return (
    <Router>
      {/* Menu simples */}
      <nav style={{ display: "flex", gap: "10px", padding: "10px", background: "#f1f1f1" }}>
        <Link to="/historico">Histórico</Link>
        <Link to="/configuracoes">Configurações</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/historico" replace />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/historico" element={<Historico />} />
        <Route path="/configuracoes" element={<Configuracoes />} />
      </Routes>
    </Router>
  );
}
