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
    <div style={{ fontFamily: "system-ui, Arial, sans-serif", background: "#f8fafc" }}>
      {/* Header Azul */}
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

      {/* Hero */}
      <div style={{ background: "#0033a0", color: "white", padding: "120px 5% 100px", textAlign: "center" }}>
        <h1 style={{ fontSize: "52px", lineHeight: "1.1", marginBottom: "20px" }}>
          Crédito consignado aprovado<br/>com rapidez e segurança
        </h1>
        <p style={{ fontSize: "24px", maxWidth: "700px", margin: "0 auto" }}>
          Para aposentados e pensionistas do INSS. Dinheiro na conta sem sair de casa.
        </p>
      </div>

      {/* Formulário Centralizado */}
      <div style={{ maxWidth: "1280px", margin: "-90px auto 80px", padding: "0 5%", position: "relative", zIndex: 10 }}>
        <div style={{ background: "white", padding: "50px", borderRadius: "20px", boxShadow: "0 30px 80px rgba(0,0,0,0.25)", maxWidth: "520px", margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#0033a0" }}>Simule seu Crédito</h2>

          <select value={beneficio} onChange={e => setBeneficio(e.target.value)} style={{width:"100%", padding:16, margin:"12px 0", borderRadius:10, border:"1px solid #ddd"}}>
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

          <button onClick={enviarParaWhats} disabled={loading} style={{width:"100%", padding:18, background:"#00A86B", color:"white", border:"none", borderRadius:12, fontSize:19, marginTop:30, fontWeight:"bold"}}>
            {loading ? "Abrindo WhatsApp..." : "ENVIAR PELO WHATSAPP"}
          </button>
        </div>
      </div>

      {/* Seção Somos Credenciados */}
      <div style={{ background: "white", padding: "80px 5%", textAlign: "center" }}>
        <h2 style={{ fontSize: "32px", marginBottom: "20px" }}>Somos Credenciados</h2>
        <p style={{ fontSize: "20px", maxWidth: "700px", margin: "0 auto" }}>
          CredMais é uma empresa autorizada e credenciada para oferecer crédito consignado INSS com total segurança e transparência.
        </p>
      </div>

      {/* Seção Dúvidas Frequentes */}
      <div style={{ background: "#f8fafc", padding: "80px 5%" }}>
        <h2 style={{ textAlign: "center", marginBottom: "50px", fontSize: "36px" }}>Dúvidas Frequentes</h2>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <details style={{ marginBottom: "15px", background: "white", padding: "20px", borderRadius: "12px" }}>
            <summary style={{ fontWeight: "bold", cursor: "pointer" }}>Como funciona o crédito consignado?</summary>
            <p style={{ marginTop: "10px" }}>É um empréstimo com desconto direto na folha de pagamento ou benefício do INSS. Taxas mais baixas e aprovação rápida.</p>
          </details>
          <details style={{ marginBottom: "15px", background: "white", padding: "20px", borderRadius: "12px" }}>
            <summary style={{ fontWeight: "bold", cursor: "pointer" }}>Quem pode solicitar?</summary>
            <p style={{ marginTop: "10px" }}>Aposentados, pensionistas e beneficiários do INSS com margem disponível.</p>
          </details>
          <details style={{ marginBottom: "15px", background: "white", padding: "20px", borderRadius: "12px" }}>
            <summary style={{ fontWeight: "bold", cursor: "pointer" }}>Quanto tempo leva para receber?</summary>
            <p style={{ marginTop: "10px" }}>Após aprovação, o dinheiro cai na conta em até 24h úteis.</p>
          </details>
        </div>
      </div>

      <footer style={{ background: "#0033a0", color: "white", padding: "60px 5% 30px", textAlign: "center" }}>
        <p>© 2026 CredMais - Crédito consignado INSS</p>
        <p style={{ marginTop: "10px" }}>Empresa autorizada e credenciada</p>
      </footer>
    </div>
  );
}