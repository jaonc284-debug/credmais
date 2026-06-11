"use client";
import { useState } from "react";

export default function Home() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [valor, setValor] = useState("");
  const [beneficio, setBeneficio] = useState("");
  const [loading, setLoading] = useState(false);

  const formatCPF = (v: string) => v.replace(/\D/g, "").replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4").slice(0,14);
  const formatWhats = (v: string) => v.replace(/\D/g, "").replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3").slice(0,15);

  const enviarParaWhats = () => {
    if (!nome || !cpf || !whatsapp || !valor || !beneficio) {
      alert("❌ Preencha todos os campos!");
      return;
    }

    setLoading(true);

    const mensagem = `*🚨 NOVA SOLICITAÇÃO - CREDMAIS*%0A%0A` +
      `*Nome:* ${nome}%0A` +
      `*CPF:* ${cpf}%0A` +
      `*WhatsApp:* ${whatsapp}%0A` +
      `*Benefício:* ${beneficio}%0A%0A` +
      `*Valor Desejado:* R$ ${valor}%0A` +
      `*Parcelas:* 24x%0A%0A` +
      `Enviado pelo site CredMais`;

    window.open(`https://wa.me/19988677177?text=${mensagem}`, "_blank");

    alert("✅ Redirecionando para o WhatsApp...");

    setNome(""); setCpf(""); setWhatsapp(""); setValor(""); setBeneficio("");
    setLoading(false);
  };

  return (
    <div style={{ fontFamily: "system-ui, Arial, sans-serif" }}>
      {/* Header */}
      <header style={{ background: "#0033a0", color: "white", padding: "16px 5%", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: "38px", fontWeight: "bold", display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "48px" }}>C+</span> CredMais
          </div>
          <nav style={{ display: "flex", gap: "40px", fontSize: "17px" }}>
            <a href="#" style={{ color: "white" }}>Início</a>
            <a href="#" style={{ color: "white" }}>Empréstimos</a>
            <a href="#" style={{ color: "white" }}>Como Funciona</a>
            <a href="#" style={{ color: "white" }}>Sobre Nós</a>
          </nav>
        </div>
      </header>

      {/* Hero com seu Banner */}
      <div style={{ position: "relative", height: "680px", background: "#0033a0", overflow: "hidden" }}>
        <img 
          src="https://i.imgur.com/2vXzK8L.png" 
          alt="Banner CredMais" 
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{ position: "absolute", top: "50%", left: "8%", transform: "translateY(-50%)", color: "white", maxWidth: "650px", zIndex: 2 }}>
          <h1 style={{ fontSize: "52px", lineHeight: "1.1", marginBottom: "20px" }}>
            Crédito consignado aprovado<br/>com rapidez e segurança
          </h1>
          <p style={{ fontSize: "24px", marginBottom: "30px" }}>
            Para aposentados e pensionistas do INSS. Dinheiro na conta sem burocracia.
          </p>
        </div>
      </div>

      {/* Formulário Centralizado */}
      <div style={{ maxWidth: "1280px", margin: "-100px auto 80px", padding: "0 5%", position: "relative", zIndex: 10 }}>
        <div style={{ 
          background: "white", 
          padding: "50px", 
          borderRadius: "20px", 
          boxShadow: "0 30px 80px rgba(0,0,0,0.25)",
          maxWidth: "520px",
          margin: "0 auto"
        }}>
          <h2 style={{ textAlign: "center", marginBottom: "35px", color: "#0033a0", fontSize: "28px" }}>
            Simule seu Crédito
          </h2>

          <select value={beneficio} onChange={e => setBeneficio(e.target.value)} style={{width:"100%", padding:16, margin:"12px 0", borderRadius:10, border:"1px solid #ddd", fontSize:17}}>
            <option value="">Selecione seu Benefício</option>
            <option value="Aposentadoria por Idade">Aposentadoria por Idade</option>
            <option value="Aposentadoria por Tempo de Contribuição">Aposentadoria por Tempo</option>
            <option value="Pensão por Morte">Pensão por Morte</option>
            <option value="BPC/LOAS">BPC/LOAS</option>
          </select>

          <input placeholder="Nome completo" value={nome} onChange={e => setNome(e.target.value)} style={{width:"100%", padding:16, margin:"12px 0", borderRadius:10, border:"1px solid #ddd"}} />
          <input placeholder="CPF" value={cpf} onChange={e => setCpf(formatCPF(e.target.value))} style={{width:"100%", padding:16, margin:"12px 0", borderRadius:10, border:"1px solid #ddd"}} />
          <input placeholder="WhatsApp" value={whatsapp} onChange={e => setWhatsapp(formatWhats(e.target.value))} style={{width:"100%", padding:16, margin:"12px 0", borderRadius:10, border:"1px solid #ddd"}} />
          <input type="number" placeholder="Valor desejado (R$)" value={valor} onChange={e => setValor(e.target.value)} style={{width:"100%", padding:16, margin:"12px 0", borderRadius:10, border:"1px solid #ddd"}} />

          <button 
            onClick={enviarParaWhats} 
            disabled={loading}
            style={{width:"100%", padding:18, background:"#00A86B", color:"white", border:"none", borderRadius:12, fontSize:19, marginTop:30, fontWeight:"bold"}}
          >
            {loading ? "Abrindo WhatsApp..." : "ENVIAR PELO WHATSAPP"}
          </button>
        </div>
      </div>
    </div>
  );
}