import { useEffect, useState } from "react";
import { apiFetch } from "../services/api";
import '../styles/Configuracoes.css';

export default function Configuracoes() {
   const [formData, setFormData] = useState({
        id: 1,
        ativar: false,
        diassemana: "",
        horarioinicial: "",
        horariofinal: ""
    }); 
  
  useEffect(() => {
    apiFetch("/config")
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const config = data[0]; // revisar depois
          setFormData({
            id: config.id,
            ativar: config.ativar === "1" ? true : false,
            diassemana: config.diassemana,
            horarioinicial: formatTime(config.horarioinicial),
            horariofinal: formatTime(config.horariofinal)
          });
        }
      })
      .catch(err => console.error("Erro ao carregar configurações:", err));
  }, []);

  function formatTime(t) {        
    if(!t) return "";            
    return t.substring(0,5);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      ...formData,
      ativar: formData.ativar ? "1" : "0"
    };

    apiFetch(`/config/${formData.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(() => alert("Configurações salvas com sucesso!"))
      .catch(err => console.error("Erro ao salvar configurações:", err));      
  }

  return (
    <div className="div-configuracoes">
      <h1>Configurações</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Ativar:
          <input
            type="checkbox"
            name="ativar"
            checked={formData.ativar}
            onChange={e => setFormData(prev => ({
              ...prev,
              ativar: e.target.checked
            }))}
          />
        </label>        
        <label>
          Dias da semana:
          <select
            name="diassemana"
            value={formData.diassemana}
            onChange={handleChange}
            >
                <option>Segunda à sexta</option>
                <option>Segunda à domingo</option>
                <option>Segunda, quarta e sexta</option>
                <option>Terça e quinta</option>
            </select>
        </label>

        <label className="horario">
        Horário inicial:
        <input
            type="time"
            name="horarioinicial"
            value={formData.horarioinicial}
            onChange={handleChange}
        />
        </label>

        <label className="horario">
        Horário final:
        <input
            type="time"
            name="horariofinal"
            value={formData.horariofinal}
            onChange={handleChange}
        />
        </label>
        <button type="submit">Gravar</button>
      </form>
    </div>
  );
}
