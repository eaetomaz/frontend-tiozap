import { useEffect, useState } from "react";
import { apiFetch } from "../services/api";

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
      <ul>
        {historico.map((item, i) => (
          <li key={i}>{item.mensagem}</li>
        ))}
      </ul>
    </div>
  );
}
