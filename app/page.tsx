"use client";
import { useState } from "react";

export default function Home() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [valor, setValor] = useState("");
  const [loading, setLoading] = useState(false);

  const formatCPF = (v: string) => v.replace(/\D/g, "").replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4").slice(0,14);
  const formatWhats = (v: string) => v.replace(/\D/g, "").replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3").slice(0,15);

  const enviarParaWhats = () => {
    if (!nome || !cpf || !whatsapp || !valor) {
      alert("❌ Preencha todos os campos!");
      return;
    }

    setLoading(true);

    const mensagem = `*🚨 NOVA SOLICITAÇÃO - CREDMAIS*%0A%0A` +
      `*👤 Cliente:* ${nome}%0A` +
      `*CPF:* ${cpf}%0A` +
      `*WhatsApp:* ${whatsapp}%0A%0A` +
      `*💰 Valor Desejado:* R$ ${valor}%0A` +
      `*Parcelas:* 24x%0A%0A` +
      `Enviado pelo site CredMais - ${new Date().toLocaleString('pt-BR')}`;

    window.open(`https://wa.me/19988677177?text=${mensagem}`, "_blank");

    alert("✅ Redirecionando para o WhatsApp...");

    setNome(""); setCpf(""); setWhatsapp(""); setValor("");
    setLoading(false);
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "linear-gradient(135deg, #0066cc, #00A86B)", 
      fontFamily: "Arial, sans-serif",
      padding: "20px"
    }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", gap: "40px", alignItems: "center", minHeight: "90vh" }}>
        
        {/* Lado Esquerdo - Texto */}
        <div style={{ flex: 1, color: "white" }}>
          <h1 style={{ fontSize: "42px", lineHeight: "1.1", marginBottom: "20px" }}>
            Crédito Consignado INSS com <br/>as melhores taxas
          </h1>
          <p style={{ fontSize: "22px", marginBottom: "30px", opacity: 0.95 }}>
            Aposentados e pensionistas: simule agora e receba dinheiro rápido na conta.
          </p>
          <div style={{ fontSize: "18px" }}>
            ✅ Análise imediata<br/>
            ✅ Taxas a partir de 0,99% ao mês<br/>
            ✅ 100% Online e Seguro
          </div>
        </div>

        {/* Lado Direito - Formulário */}
        <div style={{ 
          background: "white", 
          padding: "40px", 
          borderRadius: "16px", 
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
          width: "420px"
        }}>
          <h2 style={{ textAlign: "center", marginBottom: "25px", color: "#0066cc" }}>Faça sua Simulação</h2>

          <input placeholder="Nome completo" value={nome} onChange={e => setNome(e.target.value)} style={{width:"100%", padding:14, margin:"10px 0", borderRadius:8, border:"1px solid #ddd", fontSize:16}} />
          <input placeholder="CPF" value={cpf} onChange={e => setCpf(formatCPF(e.target.value))} style={{width:"100%", padding:14, margin:"10px 0", borderRadius:8, border:"1px solid #ddd", fontSize:16}} />
          <input placeholder="WhatsApp" value={whatsapp} onChange={e => setWhatsapp(formatWhats(e.target.value))} style={{width:"100%", padding:14, margin:"10px 0", borderRadius:8, border:"1px solid #ddd", fontSize:16}} />
          <input type="number" placeholder="Valor desejado (R$)" value={valor} onChange={e => setValor(e.target.value)} style={{width:"100%", padding:14, margin:"10px 0", borderRadius:8, border:"1px solid #ddd", fontSize:16}} />

          <button 
            onClick={enviarParaWhats} 
            disabled={loading}
            style={{width:"100%", padding:16, background:"#00A86B", color:"white", border:"none", borderRadius:8, fontSize:18, marginTop:20, fontWeight:"bold"}}
          >
            {loading ? "Abrindo WhatsApp..." : "ENVIAR PELO WHATSAPP"}
          </button>
        </div>
      </div>
    </div>
  );
}