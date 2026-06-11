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
      `*👤 Cliente:* ${nome}%0A` +
      `*CPF:* ${cpf}%0A` +
      `*WhatsApp:* ${whatsapp}%0A` +
      `*Benefício:* ${beneficio}%0A%0A` +
      `*💰 Valor Desejado:* R$ ${valor}%0A` +
      `*Parcelas:* 24x%0A%0A` +
      `Enviado pelo site CredMais`;

    window.open(`https://wa.me/19988677177?text=${mensagem}`, "_blank");

    alert("✅ Redirecionando para o WhatsApp... Revise e envie!");

    setNome(""); setCpf(""); setWhatsapp(""); setValor(""); setBeneficio("");
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "system-ui, Arial, sans-serif" }}>
      {/* Header */}
      <header style={{ background: "white", padding: "15px 5%", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: "28px", fontWeight: "bold", color: "#0066cc" }}>C+ CredMais</div>
          <div style={{ display: "flex", gap: "30px", fontWeight: "500" }}>
            <a href="#" style={{ color: "#333" }}>Início</a>
            <a href="#" style={{ color: "#333" }}>Empréstimos</a>
            <a href="#" style={{ color: "#333" }}>Como Funciona</a>
            <a href="#" style={{ color: "#333" }}>Sobre Nós</a>
          </div>
          <button style={{ background: "#00A86B", color: "white", padding: "10px 24px", border: "none", borderRadius: "50px", fontWeight: "bold" }}>
            Simular agora
          </button>
        </div>
      </header>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "60px 5%", display: "flex", gap: "80px", alignItems: "center" }}>
        {/* Hero Text */}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: "48px", lineHeight: "1.1", color: "#0F172A", marginBottom: "20px" }}>
            Crédito consignado aprovado<br/>de forma <span style={{ color: "#00A86B" }}>rápida e segura</span>
          </h1>
          <p style={{ fontSize: "22px", color: "#475569", marginBottom: "30px" }}>
            Para aposentados e pensionistas do INSS. Dinheiro na conta com as melhores taxas.
          </p>

          <div style={{ display: "flex", gap: "20px", marginBottom: "40px" }}>
            <div style={{ background: "white", padding: "15px 20px", borderRadius: "12px", boxShadow: "0 5px 15px rgba(0,0,0,0.08)" }}>
              ✅ Análise em minutos<br/>
              <strong>100% Online</strong>
            </div>
            <div style={{ background: "white", padding: "15px 20px", borderRadius: "12px", boxShadow: "0 5px 15px rgba(0,0,0,0.08)" }}>
              ✅ Taxas a partir de<br/>
              <strong>1,49% a.m.</strong>
            </div>
          </div>
        </div>

        {/* Formulário */}
        <div style={{ 
          flex: "1", 
          background: "white", 
          padding: "45px", 
          borderRadius: "20px", 
          boxShadow: "0 20px 60px rgba(0,0,0,0.12)"
        }}>
          <h2 style={{ textAlign: "center", marginBottom: "25px", color: "#0F172A" }}>Simule seu Crédito</h2>

          <select value={beneficio} onChange={e => setBeneficio(e.target.value)} style={{width:"100%", padding:14, margin:"10px 0", borderRadius:10, border:"1px solid #ddd", fontSize:16}}>
            <option value="">Selecione seu Benefício</option>
            <option value="Aposentadoria por Idade">Aposentadoria por Idade</option>
            <option value="Aposentadoria por Tempo de Contribuição">Aposentadoria por Tempo</option>
            <option value="Pensão por Morte">Pensão por Morte</option>
            <option value="BPC/LOAS">BPC/LOAS</option>
          </select>

          <input placeholder="Nome completo" value={nome} onChange={e => setNome(e.target.value)} style={{width:"100%", padding:14, margin:"10px 0", borderRadius:10, border:"1px solid #ddd"}} />
          <input placeholder="CPF" value={cpf} onChange={e => setCpf(formatCPF(e.target.value))} style={{width:"100%", padding:14, margin:"10px 0", borderRadius:10, border:"1px solid #ddd"}} />
          <input placeholder="WhatsApp" value={whatsapp} onChange={e => setWhatsapp(formatWhats(e.target.value))} style={{width:"100%", padding:14, margin:"10px 0", borderRadius:10, border:"1px solid #ddd"}} />
          <input type="number" placeholder="Valor desejado (R$)" value={valor} onChange={e => setValor(e.target.value)} style={{width:"100%", padding:14, margin:"10px 0", borderRadius:10, border:"1px solid #ddd"}} />

          <button 
            onClick={enviarParaWhats} 
            disabled={loading}
            style={{width:"100%", padding:18, background:"#00A86B", color:"white", border:"none", borderRadius:12, fontSize:19, marginTop:25, fontWeight:"bold"}}
          >
            {loading ? "Abrindo WhatsApp..." : "ENVIAR PELO WHATSAPP"}
          </button>
        </div>
      </div>
    </div>
  );
}