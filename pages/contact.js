const email = "fintool-kit@proton.me";

export default function ContactPage() {
  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <a href="/" style={styles.backLink}>
          ← Back
        </a>

        <div style={styles.badge}>Contact</div>

        <h1 style={styles.title}>Contact</h1>

        <p style={styles.subtitle}>
          Questions, feedback, suggestions, bug reports, or partnership
          inquiries are welcome.
        </p>

        <div style={styles.contactBox}>
          <h2 style={styles.heading}>Email</h2>

          <a href={`mailto:${email}`} style={styles.email}>
            {email}
          </a>

          <p style={styles.text}>
            If you notice incorrect calculations, broken data, bugs, or have
            ideas for new financial tools, feel free to get in touch.
          </p>
        </div>

        <div style={styles.footer}>
          Educational financial tools created in Switzerland.
        </div>
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
    background:
      "linear-gradient(135deg, #dbeafe 0%, #f8fafc 45%, #ede9fe 100%)",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif",
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
