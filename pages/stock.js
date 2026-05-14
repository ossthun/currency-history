import { useState } from "react";

export default function StockPage() {
  const [ticker, setTicker] = useState("");
  const [date, setDate] = useState("");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function convertDateToApiFormat(input) {
    const match = input.trim().match(/^(\d{2})\.(\d{2})\.(\d{4})$/);

    if (!match) {
      throw new Error("Please enter the date as dd.mm.yyyy.");
    }

    const [, day, month, year] = match;
    return `${year}-${month}-${day}`;
  }

  async function fetchStockPrice() {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      if (!ticker.trim()) {
        throw new Error("Please enter a stock ticker.");
      }

      if (!date.trim()) {
        throw new Error("Please enter a date.");
      }

      const apiDate = convertDateToApiFormat(date);

      const response = await fetch(
        `/api/stock-price?ticker=${encodeURIComponent(
          ticker
        )}&date=${encodeURIComponent(apiDate)}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not load stock price.");
      }

      setResult(data);
    } catch (err) {
      setError(err.message || "Could not load stock price.");
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      fetchStockPrice();
    }
  }

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <a href="/" style={styles.backLink}>
          ← Currency converter
        </a>

        <div style={styles.badge}>Historical Stock Price</div>

        <h1 style={styles.title}>Stock Price Lookup</h1>

        <p style={styles.subtitle}>
          Type a ticker and a date, then press Enter.
        </p>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>Stock ticker</label>
          <input
            type="text"
            value={ticker}
            onChange={(e) => setTicker(e.target.value.toUpperCase())}
            onKeyDown={handleKeyDown}
            placeholder="AAPL.US"
            style={styles.input}
          />
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>Date</label>
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="dd.mm.yyyy"
            style={styles.input}
          />
        </div>

        <div style={styles.hint}>
          Examples: AAPL.US, MSFT.US, TSLA.US, NESN.CH, NOVN.CH
        </div>

        {loading && <div style={styles.loading}>Loading stock price...</div>}

        {result && (
          <div style={styles.result}>
            <div style={styles.resultTop}>{result.ticker}</div>

            <div style={styles.resultRate}>
              {result.close}
            </div>

            <div style={styles.small}>
              Closing price on {result.usedDate}
            </div>

            {!result.exact && (
              <div style={styles.notice}>
                No trading data was found for {result.requestedDate}. Showing
                the previous available trading day instead.
              </div>
            )}

            <div style={styles.details}>
              Open: {result.open} · High: {result.high} · Low: {result.low}
            </div>
          </div>
        )}

        {error && <div style={styles.error}>{error}</div>}

        <div style={styles.footer}>
          Stock data provided by Stooq.
          <br />
          This website is not officially affiliated with Stooq or any stock
          exchange.
          <br />
          No guarantee is made regarding the accuracy or completeness of prices.
          Use at your own risk.
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
      "linear-gradient(135deg, #fef3c7 0%, #f8fafc 45%, #dbeafe 100%)",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif",
    padding: "20px",
  },

  card: {
    width: "100%",
    maxWidth: "700px",
    background: "rgba(255, 255, 255, 0.94)",
    padding: "34px",
    borderRadius: "24px",
    boxShadow: "0 24px 70px rgba(15, 23, 42, 0.14)",
    border: "1px solid rgba(255, 255, 255, 0.8)",
  },

  backLink: {
    display: "inline-block",
    marginBottom: "18px",
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "700",
    fontSize: "14px",
  },

  badge: {
    display: "inline-block",
    padding: "6px 12px",
    borderRadius: "999px",
    background: "#fef3c7",
    color: "#92400e",
    fontSize: "13px",
    fontWeight: "700",
    marginBottom: "16px",
  },

  title: {
    margin: 0,
    fontSize: "32px",
    letterSpacing: "-0.04em",
    color: "#0f172a",
  },

  subtitle: {
    marginTop: "10px",
    marginBottom: "26px",
    color: "#64748b",
    fontSize: "15px",
    lineHeight: 1.5,
  },

  fieldGroup: {
    marginTop: "16px",
  },

  label: {
    display: "block",
    marginBottom: "8px",
    fontSize: "14px",
    fontWeight: "700",
    color: "#334155",
  },

  input: {
    width: "100%",
    height: "52px",
    padding: "0 14px",
    borderRadius: "14px",
    border: "1px solid #cbd5e1",
    background: "#ffffff",
    fontSize: "16px",
    color: "#0f172a",
    boxSizing: "border-box",
    outline: "none",
  },

  hint: {
    marginTop: "12px",
    color: "#64748b",
    fontSize: "13px",
  },

  loading: {
    marginTop: "24px",
    padding: "14px",
    borderRadius: "14px",
    background: "#f8fafc",
    color: "#475569",
    textAlign: "center",
    fontWeight: "700",
  },

  result: {
    marginTop: "24px",
    padding: "22px",
    borderRadius: "18px",
    background: "linear-gradient(135deg, #dbeafe 0%, #eff6ff 100%)",
    textAlign: "center",
    border: "1px solid #bfdbfe",
  },

  resultTop: {
    color: "#1d4ed8",
    fontSize: "15px",
    fontWeight: "700",
  },

  resultRate: {
    marginTop: "6px",
    color: "#1e3a8a",
    fontSize: "34px",
    fontWeight: "800",
    letterSpacing: "-0.03em",
  },

  small: {
    marginTop: "10px",
    fontSize: "14px",
    color: "#1e40af",
  },

  notice: {
    marginTop: "12px",
    padding: "12px",
    borderRadius: "12px",
    background: "#fff7ed",
    color: "#9a3412",
    fontSize: "13px",
    fontWeight: "700",
  },

  details: {
    marginTop: "14px",
    color: "#475569",
    fontSize: "13px",
  },

  error: {
    marginTop: "24px",
    padding: "16px",
    borderRadius: "14px",
    background: "#fee2e2",
    color: "#991b1b",
    textAlign: "center",
    fontWeight: "700",
    border: "1px solid #fecaca",
  },

  footer: {
    marginTop: "24px",
    textAlign: "center",
    fontSize: "13px",
    color: "#64748b",
    lineHeight: 1.5,
  },
};
