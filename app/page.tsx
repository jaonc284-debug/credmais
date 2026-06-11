"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [valor, setValor] = useState("8000");
  const [parcelas, setParcelas] = useState("36");
  const [tipo, setTipo] = useState<"novo" | "renegociacao">("novo");
  const [beneficioSelecionado, setBeneficioSelecionado] = useState("");
  const [pagina, setPagina] = useState<"home" | "sucesso">("home");
  const [loading, setLoading] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  const formatCPF = (value: string) => value.replace(/\D/g, "").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2").slice(0, 14);
  const formatWhatsapp = (value: string) => value.replace(/\D/g, "").replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d{4})$/, "$1-$2").slice(0, 15);

  const consultarBeneficio = () => {
    if (!cpf || cpf.length < 14) return alert("Digite um CPF válido.");
    setStep(2);
    setTimeout(() => setStep(3), 2400);
  };

  async function enviarLead() {
    if (!nome || !cpf || !whatsapp || !beneficioSelecionado) {
      return alert("Preencha todos os campos e selecione o benefício.");
    }

    setLoading(true);

    const { error } = await supabase.from("leads").insert([{
      nome: nome.trim(),
      cpf,
      whatsapp,
      valor: Number(valor),
      parcelas: Number(parcelas),
      tipo: tipo === "renegociacao" ? "Renegociação" : "Novo Crédito",
      beneficio: beneficioSelecionado,
      status: "novo",
    }]);

    if (error) {
      console.error(error);
      alert("Erro ao enviar: " + error.message);
      setLoading(false);
      return;
    }

    setPagina("sucesso");
    setLoading(false);
  }

  const valorParcela = Math.round((Number(valor) * 1.29) / Number(parcelas));

  if (showSplash) {
    return (
      <div style={styles.splash}>
        <div style={styles.logoContainer}>
          <div style={styles.logoBig}>
            <span style={{ color: "#00C26B", fontSize: "130px", fontWeight: "900" }}>C+</span>
            <span style={{ color: "#0F172A", fontWeight: "900" }}>CredMais</span>
          </div>
          <p style={styles.loadingText}>Cuidando do seu futuro...</p>
          <div style={styles.loader}></div>
        </div>
      </div>
    );
  }

  if (pagina === "sucesso") {
    return (
      <div style={styles.successPage}>
        <div style={styles.successCard}>
          <div style={{ fontSize: "110px", marginBottom: 20 }}>🎉</div>
          <h1 style={styles.successTitle}>Solicitação Recebida com Sucesso!</h1>
          <p style={styles.successText}>
            Obrigado, <strong>{nome.split(" ")[0]}</strong>!<br /><br />
            Entraremos em contato pelo WhatsApp em até 30 minutos.
          </p>
          <button onClick={() => window.location.reload()} style={styles.button}>
            Fazer Nova Simulação
          </button>
        </div>
      </div>
    );
  }

  return (
    <main style={styles.main}>
      <div style={styles.watermark}>CredMais</div>

      <header style={styles.header}>
        <div style={styles.logo}>
          <span style={{ color: "#00C26B", fontSize: "52px", fontWeight: "900" }}>C+</span>
          <span style={{ color: "#0F172A", fontWeight: "900" }}>CredMais</span>
        </div>
        <div style={styles.headerInfo}>☎️ Atendimento 24h</div>
      </header>

      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <p style={styles.badge}>CRÉDITO PARA APOSENTADOS E PENSIONISTAS</p>
          <h1 style={styles.title}>Veja quanto você pode pegar agora</h1>
          <p style={styles.subtitle}>Consulte seu benefício e descubra sua margem disponível.</p>

          <div style={styles.card}>
            <h3 style={{ textAlign: "center", marginBottom: 24 }}>Faça sua consulta gratuita</h3>

            <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
              <button onClick={() => { setTipo("novo"); setStep(1); }} style={{...styles.tipoBtn, background: tipo === "novo" ? "#00C26B" : "#fff", color: tipo === "novo" ? "#fff" : "#0F172A"}}>Novo Crédito</button>
              <button onClick={() => { setTipo("renegociacao"); setStep(1); }} style={{...styles.tipoBtn, background: tipo === "renegociacao" ? "#00C26B" : "#fff", color: tipo === "renegociacao" ? "#fff" : "#0F172A"}}>Renegociar</button>
            </div>

            {step === 1 && (
              <>
                <label style={styles.label}>CPF</label>
                <input value={cpf} onChange={(e) => setCpf(formatCPF(e.target.value))} style={styles.input} placeholder="000.000.000-00" maxLength={14} />
                <button onClick={consultarBeneficio} style={styles.button}>Consultar meus benefícios no INSS</button>
              </>
            )}

            {step === 2 && (
              <div style={{ textAlign: "center", padding: "60px 0" }}>
                <p style={{ fontSize: 18, marginBottom: 30 }}>Consultando seus benefícios no INSS...</p>
                <div style={styles.loader} />
              </div>
            )}

            {step === 3 && (
              <>
                <h4 style={{ marginBottom: 20, textAlign: "center", color: "#166534" }}>✅ Benefícios encontrados!</h4>
                <p style={{ textAlign: "center", marginBottom: 20 }}>Selecione o seu benefício:</p>

                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 25 }}>
                  {["Aposentadoria por Idade", "Aposentadoria por Tempo de Contribuição", "Pensão por Morte", "Aposentadoria Especial", "Auxílio Doença"].map((ben, i) => (
                    <button
                      key={i}
                      onClick={() => setBeneficioSelecionado(ben)}
                      style={{
                        padding: "16px",
                        borderRadius: 12,
                        border: beneficioSelecionado === ben ? "2px solid #00C26B" : "1px solid #CBD5E1",
                        background: beneficioSelecionado === ben ? "#F0FDF4" : "#fff",
                        textAlign: "left",
                        fontSize: 17,
                        cursor: "pointer"
                      }}
                    >
                      {ben}
                    </button>
                  ))}
                </div>

                {beneficioSelecionado && (
                  <div style={styles.margemBox}>
                    ✅ Você possui <strong>margem disponível</strong> para empréstimo consignado.
                  </div>
                )}

                <label style={styles.label}>
                  {tipo === "renegociacao" ? "Valor atual do contrato (R$)" : "Valor desejado (R$)"}
                </label>
                <input type="number" value={valor} onChange={(e) => setValor(e.target.value)} style={styles.input} />

                <label style={styles.label}>Nome completo</label>
                <input value={nome} onChange={(e) => setNome(e.target.value)} style={styles.input} placeholder="Seu nome completo" />

                <label style={styles.label}>WhatsApp</label>
                <input value={whatsapp} onChange={(e) => setWhatsapp(formatWhatsapp(e.target.value))} style={styles.input} placeholder="(00) 00000-0000" maxLength={15} />

                <label style={styles.label}>Número de parcelas</label>
                <select value={parcelas} onChange={(e) => setParcelas(e.target.value)} style={styles.input}>
                  {[12,24,36,48,60,72,84,96].map(n => <option key={n} value={n}>{n} parcelas</option>)}
                </select>

                <div style={styles.resultado}>
                  Parcela estimada: <strong>R$ {valorParcela.toLocaleString("pt-BR")}</strong>
                </div>

                <button onClick={enviarLead} disabled={loading} style={styles.button}>
                  {loading ? "ENVIANDO..." : "SOLICITAR ANÁLISE GRATUITA"}
                </button>
              </>
            )}
          </div>
        </div>

        <div style={styles.heroImageContainer}>
          <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800" alt="Aposentados" style={styles.heroImage} />
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Por que escolher a CredMais?</h2>
        <div style={styles.grid}>
          <div style={styles.productCard}>Atendimento humanizado</div>
          <div style={styles.productCard}>Taxas competitivas</div>
          <div style={styles.productCard}>Processo simples</div>
          <div style={styles.productCard}>Segurança total</div>
        </div>
      </section>

      <footer style={styles.footer}>
        <p>© {new Date().getFullYear()} CredMais • Crédito com respeito para aposentados e pensionistas</p>
      </footer>
    </main>
  );
}

/* ================= STYLES ================= */
const styles: any = {
  main: { fontFamily: "system-ui, sans-serif", background: "#F8FAFC", margin: 0, position: "relative", overflow: "hidden", color: "#0F172A" },
  splash: { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "#F8FAFC", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999 },
  logoContainer: { textAlign: "center" },
  logoBig: { display: "flex", alignItems: "center", justifyContent: "center", gap: 10, fontSize: 48, marginBottom: 30 },
  loadingText: { color: "#64748B", fontSize: 19, marginBottom: 25 },
  loader: { width: "60px", height: "60px", border: "6px solid #E2E8F0", borderTop: "6px solid #00C26B", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto" },

  watermark: { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontSize: "360px", fontWeight: "900", color: "rgba(0, 194, 107, 0.04)", pointerEvents: "none", zIndex: 0, whiteSpace: "nowrap" },

  header: { padding: "22px 8%", background: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #eee", zIndex: 10 },
  logo: { display: "flex", alignItems: "center", fontSize: 38 },
  headerInfo: { fontSize: 17, fontWeight: 600, color: "#166534" },

  hero: { padding: "100px 8% 90px", display: "flex", alignItems: "center", gap: 80, background: "linear-gradient(135deg, #F0FDF4 0%, #E6F4EA 100%)", minHeight: "100vh", position: "relative", zIndex: 2 },
  heroContent: { flex: 1, maxWidth: 620 },
  badge: { background: "#00C26B", color: "#fff", padding: "8px 24px", borderRadius: 30, fontSize: 15, fontWeight: 600, display: "inline-block", marginBottom: 20 },
  title: { fontSize: 52, fontWeight: 900, lineHeight: 1.15 },
  subtitle: { fontSize: 21, color: "#475569", margin: "26px 0 40px" },

  card: { background: "#fff", padding: 40, borderRadius: 24, boxShadow: "0 25px 70px rgba(0,0,0,0.1)" },
  label: { display: "block", margin: "16px 0 6px", fontWeight: 600 },
  input: { width: "100%", padding: 16, borderRadius: 12, border: "1px solid #CBD5E1", fontSize: 17, marginBottom: 10 },
  resultado: { background: "#F0FDF4", padding: 22, borderRadius: 14, textAlign: "center", margin: "24px 0", fontSize: 20, fontWeight: 700, color: "#00C26B" },
  button: { width: "100%", padding: 18, background: "#00C26B", color: "#fff", border: "none", borderRadius: 14, fontSize: 18, fontWeight: 700, marginTop: 15, cursor: "pointer" },

  tipoBtn: { flex: 1, padding: "14px", borderRadius: 12, fontWeight: 600, border: "2px solid #00C26B" },

  heroImageContainer: { flex: 1 },
  heroImage: { width: "100%", borderRadius: 20, boxShadow: "0 25px 50px rgba(0,0,0,0.15)" },

  margemBox: { background: "#F0FDF4", padding: 20, borderRadius: 16, textAlign: "center", fontSize: 18, marginBottom: 25, border: "2px solid #00C26B" },

  section: { padding: "100px 8%", background: "#fff" },
  sectionTitle: { fontSize: 36, fontWeight: 800, textAlign: "center", marginBottom: 50 },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 },
  productCard: { background: "#F0FDF4", padding: 28, borderRadius: 16, textAlign: "center", fontSize: 18 },

  footer: { background: "#0F172A", color: "#94A3B8", padding: "50px 8%", textAlign: "center" },

  successPage: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #F0FDF4, #E6F4EA)" },
  successCard: { background: "#fff", padding: "70px 50px", borderRadius: 28, textAlign: "center", maxWidth: 520, boxShadow: "0 25px 60px rgba(0,0,0,0.12)" },
  successTitle: { fontSize: 34, color: "#0F172A" },
  successText: { fontSize: 19, lineHeight: 1.6, color: "#334155" },
};