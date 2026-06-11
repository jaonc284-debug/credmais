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

    const mensagem = `*🚨 NOVA SOLICITAÇÃO - CREDMAIS*%0A%0A` +
      `*👤 Cliente:*%0A` +
      `Nome: ${nome}%0A` +
      `CPF: ${cpf}%0A` +
      `WhatsApp: ${whatsapp}%0A%0A` +
      `*💰 Simulação:*%0A` +
      `Valor: R$ ${valor}%0A` +
      `Parcelas: 24x%0A%0A` +
      `Enviado pelo site - ${new Date().toLocaleString('pt-BR')}`;

    window.open(`https://wa.me/19988677177?text=${mensagem}`, "_blank");

    alert("✅ Abrindo WhatsApp... Revise e envie a mensagem.");

    setNome(""); setCpf(""); setWhatsapp(""); setValor("");
  };

  return (
    <div style={{ maxWidth: 500, margin: "40px auto", padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#0066cc" }}>CredMais</h1>
      <p style={{ textAlign: "center", color: "#555" }}>Crédito Consignado INSS</p>

      <input placeholder="Nome completo" value={nome} onChange={e => setNome(e.target.value)} style={{width:"100%", padding:12, margin:"8px 0", borderRadius:8, border:"1px solid #ccc"}} />
      <input placeholder="CPF" value={cpf} onChange={e => setCpf(formatCPF(e.target.value))} style={{width:"100%", padding:12, margin:"8px 0", borderRadius:8, border:"1px solid #ccc"}} />
      <input placeholder="WhatsApp" value={whatsapp} onChange={e => setWhatsapp(formatWhats(e.target.value))} style={{width:"100%", padding:12, margin:"8px 0", borderRadius:8, border:"1px solid #ccc"}} />
      <input type="number" placeholder="Valor desejado (R$)" value={valor} onChange={e => setValor(e.target.value)} style={{width:"100%", padding:12, margin:"8px 0", borderRadius:8, border:"1px solid #ccc"}} />

      <button 
        onClick={enviarParaWhats}
        style={{width:"100%", padding:16, background:"#00A86B", color:"white", border:"none", borderRadius:8, fontSize:18, marginTop:15, fontWeight:"bold"}}
      >
        ENVIAR PELO WHATSAPP
      </button>
    </div>
  );
}