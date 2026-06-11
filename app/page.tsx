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

  const enviar = () => {
    if (!nome || !cpf || !whatsapp || !valor) {
      alert("❌ Preencha todos os campos!");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      alert(`✅ SOLICITAÇÃO ENVIADA COM SUCESSO!\n\nNome: ${nome}\nCPF: ${cpf}\nWhatsApp: ${whatsapp}\nValor: R$ ${valor}\n\nEm breve entraremos em contato!`);
      setSuccess(true);
      setNome(""); 
      setCpf(""); 
      setWhatsapp(""); 
      setValor("");
      setLoading(false);
    }, 800);
  };

  if (success) {
    return (
      <div style={{ padding: 40, textAlign: "center", minHeight: "100vh", background: "#e6f7e6" }}>
        <h1>✅ Enviado com Sucesso!</h1>
        <p>Em breve entraremos em contato pelo WhatsApp.</p>
        <button onClick={() => window.location.reload()} style={{ marginTop: 20, padding: "12px 30px", background: "#00A86B", color: "white", border: "none", borderRadius: 8, fontSize: 16 }}>
          Fazer Nova Simulação
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 500, margin: "40px auto", padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#0066cc" }}>CredMais</h1>
      <p style={{ textAlign: "center", color: "#555", marginBottom: 30 }}>Crédito Consignado INSS</p>

      <input placeholder="Nome completo" value={nome} onChange={e => setNome(e.target.value)} style={{width:"100%", padding:12, margin:"8px 0", borderRadius:8, border:"1px solid #ccc", fontSize:16}} />
      <input placeholder="CPF" value={cpf} onChange={e => setCpf(formatCPF(e.target.value))} style={{width:"100%", padding:12, margin:"8px 0", borderRadius:8, border:"1px solid #ccc", fontSize:16}} />
      <input placeholder="WhatsApp" value={whatsapp} onChange={e => setWhatsapp(formatWhats(e.target.value))} style={{width:"100%", padding:12, margin:"8px 0", borderRadius:8, border:"1px solid #ccc", fontSize:16}} />
      <input type="number" placeholder="Valor desejado (R$)" value={valor} onChange={e => setValor(e.target.value)} style={{width:"100%", padding:12, margin:"8px 0", borderRadius:8, border:"1px solid #ccc", fontSize:16}} />

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