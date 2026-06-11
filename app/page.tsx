"use client";
import { useState } from "react";

export default function Home() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [valor, setValor] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const formatCPF = (v: string) => v.replace(/\D/g, "").replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4").slice(0,14);
  const formatWhats = (v: string) => v.replace(/\D/g, "").replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3").slice(0,15);

  const enviar = async () => {
    if (!nome || !cpf || !whatsapp || !valor) {
      alert("❌ Preencha todos os campos!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, cpf, whatsapp, valor })
      });

      const result = await response.json();

      if (response.ok) {
        alert("✅ Solicitação enviada com sucesso!\n\nEm breve entraremos em contato pelo WhatsApp.");
        setSuccess(true);
        setNome(""); 
        setCpf(""); 
        setWhatsapp(""); 
        setValor("");
      } else {
        alert("Erro: " + (result.error || "Falha ao enviar"));
      }
    } catch (err) {
      console.error(err);
      alert("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={{ padding: 40, textAlign: "center", minHeight: "100vh", background: "#e6f7e6" }}>
        <h1>✅ Enviado com Sucesso!</h1>
        <p>Em breve entraremos em contato.</p>
        <button onClick={() => window.location.reload()} style={{ marginTop: 20, padding: "12px 30px", background: "#00A86B", color: "white", border: "none", borderRadius: 8 }}>
          Nova Simulação
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 500, margin: "40px auto", padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#0066cc" }}>CredMais</h1>
      <p style={{ textAlign: "center", color: "#555" }}>Crédito Consignado INSS</p>

      <input placeholder="Nome completo" value={nome} onChange={e => setNome(e.target.value)} style={{width:"100%", padding:12, margin:"8px 0", borderRadius:8, border:"1px solid #ccc"}} />
      <input placeholder="CPF" value={cpf} onChange={e => setCpf(formatCPF(e.target.value))} style={{width:"100%", padding:12, margin:"8px 0", borderRadius:8, border:"1px solid #ccc"}} />
      <input placeholder="WhatsApp" value={whatsapp} onChange={e => setWhatsapp(formatWhats(e.target.value))} style={{width:"100%", padding:12, margin:"8px 0", borderRadius:8, border:"1px solid #ccc"}} />
      <input type="number" placeholder="Valor desejado (R$)" value={valor} onChange={e => setValor(e.target.value)} style={{width:"100%", padding:12, margin:"8px 0", borderRadius:8, border:"1px solid #ccc"}} />

      <button 
        onClick={enviar} 
        disabled={loading}
        style={{width:"100%", padding:16, background:"#00A86B", color:"white", border:"none", borderRadius:8, fontSize:18, marginTop:15, fontWeight:"bold"}}
      >
        {loading ? "Enviando..." : "ENVIAR SOLICITAÇÃO"}
      </button>
    </div>
  );
}