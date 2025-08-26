import { useState, useEffect } from "react";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const [qrCode, setQrCode] = useState(null);
  const [connected, setConnected] = useState(false);
  const [checking, setChecking] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [messagesSend, setMessagesSend] = useState(0);
  const [averageMessages, setAverageMessages] = useState(1);
  const [messagesReceived, setMessagesReceived] = useState(0);

  const connectWhatsApp = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/connect");
      const data = await response.json();

      setQrCode(data.qr);
      setChecking(true);
      setShowModal(true);
    } catch (err) {
      console.error("Erro ao conectar:", err);
    }
  };

const loadData = async () => {
  try {
    const response = await fetch("http://localhost:3001/summary");
    const data = await response.json();

    if(response.ok)
    {
      setMessagesSend(data.respostas);
      setAverageMessages(data.mediaResposta);
      setMessagesReceived(data.recebidos);
    }

  } catch (err) {
    console.error("Erro ao carregar dados:", err);
  }
}
  
  useEffect(() => {
    const checkInitialStatus = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/status");
        const data = await response.json();

        if (data.status === "connected") {
          setConnected(true);
        } else {
          setConnected(false);
        }
      } catch (err) {
        console.error("Erro ao verificar status inicial:", err);
      }
    };

    checkInitialStatus();
  }, []);

  useEffect(() => {
    let intervalId;

    if (checking) {
      intervalId = setInterval(async () => {
        try {
          const response = await fetch("http://localhost:3001/api/status");
          const data = await response.json();

          // console.log("Status atual:", data);

          if (data.status === "connected") {
            setConnected(true);
            setChecking(false);
            setShowModal(false);
            clearInterval(intervalId);
          }

          loadData();

        } catch (err) {
          console.error("Erro ao verificar status:", err);
        }
      }, 2000);
    }

    return () => clearInterval(intervalId);
  }, [checking]);

  return (
    <div className="div-principal">
      <h1>Dashboard</h1>
      <div className="fancy-box">
        <span className="text">Welcome</span>
        <span className="cursor"></span>
        <span className="text faded">to TioZap</span>
      </div>

      <div className="div-options">
        <div className="div-one">
          <button onClick={connectWhatsApp} disabled={connected} className="whatsapp-btn">
            {connected ? "WhatsApp conectado ✅" : "Conectar WhatsApp"}
          </button>
      </div>    

        <div className="div-one">
          <button className="btn-options">
            {messagesSend}
            <p>Mensagens enviadas</p>
          </button>
        </div>
        <div className="div-one">
          <button className="btn-options">
            {averageMessages.toFixed(1)}%
            <p>Tempo médio de resposta</p>
          </button>
        </div>
        <div className="div-one">
          <button className="btn-options">
            {messagesReceived}
            <p>Mensagem(ns) recebida(s)</p>
          </button>
        </div>
      </div>

      {showModal && (
          <div className="div-modal-connection">
            <div
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              <h2>Escaneie o QR Code:</h2>
              <img src={qrCode} alt="QR Code" style={{ width: 256, height: 256 }} />
              <br />
              <button
                style={{ marginTop: "15px" }}
                onClick={() => setShowModal(false)}
              >
                Fechar
              </button>
            </div>
          </div>        
        )}

    </div>
  );
}
