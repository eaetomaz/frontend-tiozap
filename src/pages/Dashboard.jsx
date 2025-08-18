import { useState, useEffect } from "react";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const [qrCode, setQrCode] = useState(null);
  const [connected, setConnected] = useState(false);
  const [checking, setChecking] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

          console.log("Status atual:", data);

          if (data.status === "connected") {
            setConnected(true);
            setChecking(false);
            setShowModal(false);
            clearInterval(intervalId);
          }
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
      <div class="fancy-box">
        <span class="text">Welcome</span>
        <span class="cursor"></span>
        <span class="text faded">to TioZap</span>
      </div>
      <div className="div-one">
        <button onClick={connectWhatsApp} disabled={connected} className="whatsapp-btn">
          {connected ? "WhatsApp conectado ✅" : "Conectar WhatsApp"}
        </button>
      </div>

      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
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
