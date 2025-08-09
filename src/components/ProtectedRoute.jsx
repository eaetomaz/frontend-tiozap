export default function ProtectedRoute({ children }) {
  // Retire essa verificação para liberar acesso temporariamente
  // const token = localStorage.getItem('token');
  // return token ? children : <Navigate to="/login" />;

  return children; // libera acesso sem autenticação
}