import { useEffect, useState } from "react";

const email = "fintool-kit@proton.me";

const translations = {
  en: {
    back: "← All tools",
    badge: "Contact",
    title: "Contact",
    subtitle: "Questions, feedback, suggestions, bug reports, or partnership inquiries are welcome.",
    heading: "Email",
    footer: "Educational financial tools created in Switzerland.",
  },
  de: {
    back: "← Alle Tools",
    badge: "Kontakt",
    title: "Kontakt",
    subtitle: "Fragen, Feedback, Vorschläge, Fehlermeldungen oder Kooperationsanfragen sind willkommen.",
    heading: "E-Mail",
    footer: "Pädagogische Finanztools aus der Schweiz.",
  },
  fr: {
    back: "← Tous les outils",
    badge: "Contact",
    title: "Contact",
    subtitle: "Questions, commentaires, suggestions, signalements de bugs ou demandes de partenariat sont les bienvenus.",
    heading: "E-mail",
    text: "2026, fintool-kit.",
    footer: "Outils financiers éducatifs créés en Suisse.",
  },
  it: {
    back: "← Tutti gli strumenti",
    badge: "Contatto",
    title: "Contatto",
    subtitle: "Domande, feedback, suggerimenti, segnalazioni di bug o richieste di collaborazione sono benvenuti.",
    heading: "E-mail",
    text: "2026, fintool-kit.",
    footer: "Strumenti finanziari educativi creati in Svizzera.",
  },
  es: {
    back: "← Todas las herramientas",
    badge: "Contacto",
    title: "Contacto",
    subtitle: "Preguntas, comentarios, sugerencias, informes de errores o consultas de colaboración son bienvenidos.",
    heading: "Correo electrónico",
    text: "2026, fintool-kit.",
    footer: "Herramientas financieras educativas creadas en Suiza.",
  },
  pt: {
    back: "← Todas as ferramentas",
    badge: "Contato",
    title: "Contato",
    subtitle: "Perguntas, feedback, sugestões, relatos de bugs ou propostas de parceria são bem-vindos.",
    heading: "E-mail",
    text: "2026, fintool-kit.",
    footer: "Ferramentas financeiras educacionais criadas na Suíça.",
  },
};

export default function ContactPage() {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const browserLang = navigator.language.toLowerCase();

    if (browserLang.startsWith("de")) setLang("de");
    else if (browserLang.startsWith("fr")) setLang("fr");
    else if (browserLang.startsWith("it")) setLang("it");
    else if (browserLang.startsWith("es")) setLang("es");
    else if (browserLang.startsWith("pt")) setLang("pt");
    else setLang("en");
  }, []);

  const t = translations[lang] || translations.en;

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <a href="/" style={styles.backLink}>{t.back}</a>

        <div style={styles.badge}>{t.badge}</div>

        <h1 style={styles.title}>{t.title}</h1>

        <p style={styles.subtitle}>{t.subtitle}</p>

        <div style={styles.contactBox}>
          <h2 style={styles.heading}>{t.heading}</h2>

          <a href={`mailto:${email}`} style={styles.email}>
            {email}
          </a>

          <p style={styles.text}>{t.text}</p>
        </div>

        <div style={styles.footer}>{t.footer}</div>
      </div>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    margin: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #dbeafe 0%, #f8fafc 45%, #ede9fe 100%)",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif",
    padding: "20px",
  },
  card: {
    width: "100%",
    maxWidth: "700px",
    background: "rgba(255,255,255,0.95)",
    padding: "40px",
    borderRadius: "28px",
    boxShadow: "0 24px 70px rgba(15,23,42,0.14)",
    border: "1px solid rgba(255,255,255,0.8)",
  },
  backLink: {
    display: "inline-flex",
    marginBottom: "28px",
    padding: "8px 14px",
    borderRadius: "999px",
    background: "#eff6ff",
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "700",
    fontSize: "14px",
  },
  badge: {
    display: "inline-block",
    padding: "6px 12px",
    borderRadius: "999px",
    background: "#dbeafe",
    color: "#1d4ed8",
    fontSize: "13px",
    fontWeight: "700",
    marginBottom: "16px",
  },
  title: {
    margin: 0,
    fontSize: "40px",
    color: "#0f172a",
    letterSpacing: "-0.04em",
  },
  subtitle: {
    marginTop: "14px",
    marginBottom: "32px",
    color: "#64748b",
    fontSize: "17px",
    lineHeight: 1.7,
  },
  contactBox: {
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "20px",
    padding: "28px",
  },
  heading: {
    marginTop: 0,
    color: "#0f172a",
  },
  email: {
    display: "inline-block",
    marginBottom: "18px",
    fontSize: "20px",
    fontWeight: "700",
    color: "#2563eb",
    textDecoration: "none",
  },
  text: {
    color: "#475569",
    lineHeight: 1.8,
    fontSize: "16px",
  },
  footer: {
    marginTop: "32px",
    textAlign: "center",
    color: "#94a3b8",
    fontSize: "14px",
  },
};
