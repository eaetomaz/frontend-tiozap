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
         {historico.map((item, i) => {            
            return (
              <li key={i}>{item.id} | {new Date(item.datahoraenvio).toLocaleString("pt-BR")} | {item.mensagemenviada} | {item.destinatario}</li>
            );
          })}
      </ul>
    </div>
  );
}
