import { useEffect, useState } from "react";
import { apiFetch } from "../services/api";
import '../styles/Historico.css';

export default function Historico() {
  const [historico, setHistorico] = useState([]);

  useEffect(() => {
    apiFetch("/historico")
      .then(data => setHistorico(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Histórico</h1>      
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Data/Hora Envio</th>
            <th>Mensagem Enviada</th>
            <th>Destinatário</th>
          </tr>
        </thead>
        <tbody>
          {historico.map((item, i) => (
            <tr key={i}>
              <td>{item.id}</td>
              <td>{new Date(item.datahoraenvio).toLocaleString("pt-BR")}</td>
              <td>{item.mensagemenviada}</td>
              <td>{item.destinatario}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
