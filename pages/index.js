export default function Home() {
  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <div style={styles.badge}>Finance Tools</div>

        <h1 style={styles.title}>Finance Toolkit</h1>

        <p style={styles.subtitle}>Choose a tool below.</p>

        <div style={styles.grid}>
          <a href="/currency" style={styles.option}>
            <div style={styles.icon}>💱</div>
            <h2 style={styles.optionTitle}>Currency Converter</h2>
            <p style={styles.optionText}>
              Look up historical exchange rates by currency and date.
            </p>
          </a>

          <a href="/chart" style={styles.option}>
            <div style={styles.icon}>📊</div>
            <h2 style={styles.optionTitle}>Currency Chart</h2>
            <p style={styles.optionText}>
              View historical exchange-rate trends over a date range.
            </p>
          </a>

          <a href="/stock" style={styles.option}>
            <div style={styles.icon}>📈</div>
            <h2 style={styles.optionTitle}>Stock Price Lookup</h2>
            <p style={styles.optionText}>
              Look up historical stock prices by ticker and date.
            </p>
          </a>

          <a href="/etf" style={styles.option}>
            <div style={styles.icon}>📉</div>
            <h2 style={styles.optionTitle}>ETF Return Calculator</h2>
            <p style={styles.optionText}>
              Estimate ETF portfolio growth with recurring investments.
            </p>
          </a>

          <a href="/compound" style={styles.option}>
            <div style={styles.icon}>🧮</div>
            <h2 style={styles.optionTitle}>Compound Interest</h2>
            <p style={styles.optionText}>
              Calculate long-term portfolio growth with recurring investments.
            </p>
          </a>

          <a href="/inflation" style={styles.option}>
            <div style={styles.icon}>🛒</div>
            <h2 style={styles.optionTitle}>Inflation Calculator</h2>
            <p style={styles.optionText}>
              See how purchasing power changes over time.
            </p>
          </a>

          <a href="/mortgage" style={styles.option}>
            <div style={styles.icon}>🏠</div>
            <h2 style={styles.optionTitle}>Mortgage Calculator</h2>
            <p style={styles.optionText}>
              Estimate monthly payments, total interest, and payoff timeline.
            </p>
          </a>

          <a href="/retirement" style={styles.option}>
            <div style={styles.icon}>🌴</div>
            <h2 style={styles.optionTitle}>Retirement Calculator</h2>
            <p style={styles.optionText}>
              Estimate whether your savings can support your retirement goals.
            </p>
          </a>
        </div>

        <div style={styles.footer}>
          Data is provided by external sources. Calculators are for
          informational purposes only. No guarantee is made regarding accuracy or
          completeness. Use at your own risk.
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
      "linear-gradient(135deg, #e0f2fe 0%, #f8fafc 45%, #fef3c7 100%)",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif",
    padding: "20px",
  },

  card: {
    width: "100%",
    maxWidth: "1080px",
    background: "rgba(255, 255, 255, 0.94)",
    padding: "38px",
    borderRadius: "28px",
    boxShadow: "0 24px 70px rgba(15, 23, 42, 0.14)",
    border: "1px solid rgba(255, 255, 255, 0.8)",
  },

  badge: {
    display: "inline-block",
    padding: "6px 12px",
    borderRadius: "999px",
    background: "#e0f2fe",
    color: "#0369a1",
    fontSize: "13px",
    fontWeight: "700",
    marginBottom: "16px",
  },

  title: {
    margin: 0,
    fontSize: "38px",
    letterSpacing: "-0.05em",
    color: "#0f172a",
  },

  subtitle: {
    marginTop: "10px",
    marginBottom: "30px",
    color: "#64748b",
    fontSize: "16px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "18px",
  },

  option: {
    display: "block",
    padding: "24px",
    borderRadius: "22px",
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    textDecoration: "none",
    color: "#0f172a",
    boxShadow: "0 14px 35px rgba(15, 23, 42, 0.08)",
  },

  icon: {
    fontSize: "38px",
    marginBottom: "14px",
  },

  optionTitle: {
    margin: 0,
    fontSize: "22px",
    letterSpacing: "-0.03em",
  },

  optionText: {
    marginTop: "10px",
    marginBottom: 0,
    color: "#64748b",
    fontSize: "15px",
    lineHeight: 1.5,
  },

  footer: {
    marginTop: "28px",
    textAlign: "center",
    fontSize: "13px",
    color: "#64748b",
    lineHeight: 1.5,
  },
};
